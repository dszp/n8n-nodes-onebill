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
import { NodeApiError } from 'n8n-workflow';

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

	const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
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
 * Check an API response for application-level errors (HTTP 200 with error body).
 * OneBill returns { status: "Bad Request", validationResponse: { ... } } on validation failures.
 */
function checkForApiError(
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
 */
export async function oneBillApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('oneBillApi');
	const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
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
		checkForApiError.call(this, response);
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
				checkForApiError.call(this, retryResponse);
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
	let startCount = 0;
	let hasMore = true;

	// If a limit is set and smaller than page size, only request what we need
	const pageSize = limit && limit < maxPageSize ? limit : maxPageSize;
	qs.resultCount = pageSize;
	qs.countRequired = true;

	while (hasMore) {
		qs.startCount = startCount;

		const response = await oneBillApiRequest.call(this, method, endpoint, body, qs);

		let items: IDataObject[];
		if (dataKey && response[dataKey]) {
			items = response[dataKey] as IDataObject[];
		} else if (dataKey && !response[dataKey]) {
			// dataKey was expected but not present (e.g. empty result set)
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

		// Check if there are more pages
		// totalCount is the true total; resultSize is just the page size returned
		const totalCount = response.totalCount || response.total;
		if (!totalCount || returnData.length >= (totalCount as number)) {
			hasMore = false;
			continue;
		}

		startCount += pageSize;
	}

	if (limit) {
		return returnData.slice(0, limit);
	}

	return returnData;
}
