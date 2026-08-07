import { createHash } from 'crypto';
import type {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';

/**
 * Validate and normalize the base URL from credentials.
 * Strips trailing slash and enforces HTTPS to prevent credential leakage over HTTP.
 */
function validateBaseUrl(
	context: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	rawBaseUrl: string,
): string {
	const baseUrl = rawBaseUrl.replace(/\/$/, '');
	if (!baseUrl.startsWith('https://')) {
		throw new NodeOperationError(context.getNode(),
			'Base URL must use HTTPS to protect credentials during transmission',
			{ description: `The configured base URL '${baseUrl}' does not use HTTPS. Update the OneBill credentials to use an HTTPS URL.` },
		);
	}
	return baseUrl;
}

// Module-level token cache
const tokenCache = new Map<string, { token: string; expiresAt: number }>();

/**
 * SHA256-hash a password string and return the lowercase hex digest.
 */
export function hashPassword(password: string): string {
	return createHash('sha256').update(password).digest('hex');
}

/**
 * Clear a cached token entry.
 */
export function clearTokenCache(cacheKey: string): void {
	tokenCache.delete(cacheKey);
}

/**
 * Acquire (or return cached) OAuth access token for OneBill.
 */
export async function getAccessToken(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	credentials: IDataObject,
): Promise<string> {
	const tenantId = credentials.tenantId as string;
	const username = credentials.username as string;
	const cacheKey = `${tenantId}:${username}`;

	const cached = tokenCache.get(cacheKey);
	if (cached && cached.expiresAt > Date.now()) {
		return cached.token;
	}

	const baseUrl = validateBaseUrl(this, credentials.baseUrl as string);
	const clientSecret = credentials.clientSecret as string;
	const password = credentials.password as string;
	const scope = (credentials.scope as string) || 'trust';
	const hashedPassword = hashPassword(password);

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/oauth/token`,
		qs: {
			grant_type: 'password',
			client_id: tenantId,
			client_secret: clientSecret,
			username,
			password: hashedPassword,
			scope,
		},
		json: true,
	};

	const response = (await this.helpers.httpRequest(options)) as IDataObject;

	const accessToken = response.access_token as string;
	const expiresIn = (response.expires_in as number) || 3600;

	// Cache with 5-minute safety margin
	tokenCache.set(cacheKey, {
		token: accessToken,
		expiresAt: Date.now() + (expiresIn - 300) * 1000,
	});

	return accessToken;
}

/**
 * OneBill's error code for "this order has no quote document".
 *
 * The response is a lie: it reports USER_AUTHENTICATION_FAILED at HTTP 200 with a perfectly
 * valid token whose very next request succeeds.  Reacting by refreshing the token was measured
 * firing on ~85% of orders and minting a token per miss — key on the code instead.  Most orders
 * genuinely have no document, so absence is an ordinary outcome, not a failure.
 */
export const NO_QUOTE_DOCUMENT_CODE = '11ORDWS0049';

/**
 * Whether a response is OneBill reporting an absent quote document rather than a real failure.
 */
export function isMissingQuoteDocument(response: IDataObject): boolean {
	if (response.errorCode === NO_QUOTE_DOCUMENT_CODE) {
		return true;
	}
	const errorMessage = response.errorMessage;
	return typeof errorMessage === 'string' && /quote document/i.test(errorMessage);
}

/**
 * Check an API response for application-level errors (HTTP 200 with error body).
 * OneBill returns { status: "Bad Request", validationResponse: { ... } } on validation failures.
 */
export function assertNoApiError(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	response: IDataObject,
): void {
	if (response.status && response.status !== 'OK' && response.validationResponse) {
		const validation = response.validationResponse as IDataObject;
		const errors = validation.validationErrorInfo as IDataObject[] | undefined;
		const messages = errors?.map((e) => e.message as string).join('; ') || (response.status as string);
		throw new NodeApiError(this.getNode(), response as unknown as JsonObject, {
			message: `OneBill API: ${response.status as string}`,
			description: messages,
		});
	}
}

/**
 * Make an authenticated API request to OneBill.
 *
 * Set `skipErrorCheck` when the caller needs to inspect an in-band error rather than have it
 * raised — the quote-document read reports an ordinary "no document" outcome that way, and it
 * is indistinguishable from a real failure until the error code is examined.  Callers that
 * pass it are responsible for calling `assertNoApiError` on anything they do not handle.
 */
export async function oneBillApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	skipErrorCheck = false,
): Promise<IDataObject> {
	const credentials = await this.getCredentials('oneBillApi');
	const baseUrl = validateBaseUrl(this, credentials.baseUrl as string);
	const tenantId = credentials.tenantId as string;

	let token = await getAccessToken.call(this, credentials);

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl}${endpoint}`,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'X-OB-Tenant-Identifier': tenantId,
		},
		qs,
		json: true,
	};

	if (method !== 'GET' && method !== 'DELETE' && Object.keys(body).length > 0) {
		options.body = body;
	}

	try {
		const response = (await this.helpers.httpRequest(options)) as IDataObject;
		if (!skipErrorCheck) {
			assertNoApiError.call(this, response);
		}
		return response;
	} catch (error) {
		// On 401, clear cache and retry once
		if ((error as JsonObject).httpCode === '401' || (error as JsonObject).statusCode === 401) {
			const cacheKey = `${tenantId}:${credentials.username as string}`;
			clearTokenCache(cacheKey);

			token = await getAccessToken.call(this, credentials);
			options.headers = {
				...options.headers,
				Authorization: `Bearer ${token}`,
			};

			try {
				const retryResponse = (await this.helpers.httpRequest(options)) as IDataObject;
				if (!skipErrorCheck) {
					assertNoApiError.call(this, retryResponse);
				}
				return retryResponse;
			} catch (retryError) {
				if (retryError instanceof NodeApiError) {
					throw retryError;
				}
				throw new NodeApiError(this.getNode(), retryError as JsonObject, {
					message: 'Authentication failed after token refresh',
				});
			}
		}

		if (error instanceof NodeApiError) {
			throw error;
		}
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an authenticated API request and return all items with pagination.
 * OneBill uses startCount/resultCount query params for GET-based pagination.
 */
export async function oneBillApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	dataKey?: string,
	limit?: number,
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	const maxPageSize = 50;
	// Safety net: an endpoint that ignores startCount would otherwise loop forever
	const maxPages = 200;
	let startCount = 0;
	let hasMore = true;
	let pages = 0;

	// If a limit is set and smaller than page size, only request what we need
	const pageSize = limit && limit < maxPageSize ? limit : maxPageSize;
	qs.resultCount = pageSize;
	qs.countRequired = true;

	while (hasMore) {
		if (++pages > maxPages) {
			throw new NodeOperationError(
				this.getNode(),
				`Pagination did not terminate after ${maxPages} pages (${returnData.length} items retrieved)`,
				{
					description:
						'The endpoint may be ignoring the startCount offset and returning the same page repeatedly. Set a limit instead of returning all results.',
				},
			);
		}

		qs.startCount = startCount;

		const response = await oneBillApiRequest.call(this, method, endpoint, body, qs);

		let items: IDataObject[];
		if (dataKey && Array.isArray(response[dataKey])) {
			items = response[dataKey] as IDataObject[];
		} else if (dataKey) {
			// dataKey absent or not a list.  Usually an empty result set — but OneBill also
			// reports failures in-band at HTTP 200 (an unrecognised search value comes back as
			// `10PARWS0018 Find Customer has been failed.`), and those look identical here.
			// Treating a rejected query as "no results" is how a silently truncated list happens.
			if (typeof response.status === 'string' && response.status !== 'OK') {
				throw new NodeApiError(this.getNode(), response as unknown as JsonObject, {
					message: `OneBill API: ${response.status}`,
					description: `The request was rejected but returned HTTP 200 with no '${dataKey}' data. Check the filter values.`,
				});
			}
			hasMore = false;
			continue;
		} else if (Array.isArray(response)) {
			items = response as IDataObject[];
		} else {
			// Single object response or unknown structure
			returnData.push(response);
			hasMore = false;
			continue;
		}

		returnData.push(...items);

		// Check if we've reached the limit
		if (limit && returnData.length >= limit) {
			return returnData.slice(0, limit);
		}

		// Primary stop: a short page — including an empty one — means there is no more data.
		// This is the only reliable signal, because several endpoints (leads, invoices) report
		// resultSize only and never return a total.
		if (items.length < pageSize) {
			hasMore = false;
			continue;
		}

		// Secondary stop: honour totalCount when the endpoint supplies it (subscribers, orders)
		// so we don't fire one extra request just to receive an empty page.
		// Use ?? rather than ||: a real totalCount of 0 must not fall through to total.
		const totalCount = response.totalCount ?? response.total;
		if (typeof totalCount === 'number' && returnData.length >= totalCount) {
			hasMore = false;
			continue;
		}

		// Advance by the rows actually received, not by the requested page size: some endpoints
		// (products) ignore resultCount and return more than asked for.
		startCount += items.length;
	}

	if (limit) {
		return returnData.slice(0, limit);
	}

	return returnData;
}
