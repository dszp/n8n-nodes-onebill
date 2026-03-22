import type {
	IExecuteFunctions,
	ICredentialTestFunctions,
	ICredentialsDecrypted,
	IDataObject,
	INode,
	INodeCredentialTestResult,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';

/**
 * Parse a JSON string from a node parameter, providing a user-friendly error
 * message that names the field on invalid input.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseJsonField(node: INode, value: string, fieldName: string): any {
	try {
		return JSON.parse(value);
	} catch {
		throw new NodeOperationError(node, `Invalid JSON in '${fieldName}'`, {
			description: 'Check the JSON syntax and try again',
		});
	}
}

import { oneBillApiRequest, oneBillApiRequestAllItems } from './GenericFunctions';

import { subscriberOperations, subscriberFields } from './descriptions/SubscriberDescription';
import { orderOperations, orderFields } from './descriptions/OrderDescription';
import { invoiceOperations, invoiceFields } from './descriptions/InvoiceDescription';
import { paymentOperations, paymentFields } from './descriptions/PaymentDescription';
import { productOperations, productFields } from './descriptions/ProductDescription';
import { ticketOperations, ticketFields } from './descriptions/TicketDescription';
import { leadOperations, leadFields } from './descriptions/LeadDescription';
import { bundleOperations, bundleFields } from './descriptions/BundleDescription';
import { partnerOperations, partnerFields } from './descriptions/PartnerDescription';
import { vendorOperations, vendorFields } from './descriptions/VendorDescription';

export class OneBill implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'OneBill',
		name: 'oneBill',
		icon: 'file:oneBill.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the OneBill billing and subscription management API',
		defaults: {
			name: 'OneBill',
		},
		inputs: ['main'],
		outputs: ['main'],
		usableAsTool: true,
		credentials: [
			{
				name: 'oneBillApi',
				required: true,
				testedBy: 'testOneBillCredential',
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Bundle',
						value: 'bundle',
					},
					{
						name: 'Invoice',
						value: 'invoice',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Partner/Agent',
						value: 'partner',
					},
					{
						name: 'Payment',
						value: 'payment',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Subscriber',
						value: 'subscriber',
					},
					{
						name: 'Ticket',
						value: 'ticket',
					},
					{
						name: 'Vendor',
						value: 'vendor',
					},
				],
				default: 'subscriber',
			},
			...bundleOperations,
			...bundleFields,
			...invoiceOperations,
			...invoiceFields,
			...leadOperations,
			...leadFields,
			...orderOperations,
			...orderFields,
			...partnerOperations,
			...partnerFields,
			...paymentOperations,
			...paymentFields,
			...productOperations,
			...productFields,
			...subscriberOperations,
			...subscriberFields,
			...ticketOperations,
			...ticketFields,
			...vendorOperations,
			...vendorFields,
		],
	};

	methods = {
		credentialTest: {
			/* eslint-disable @n8n/community-nodes/no-deprecated-workflow-functions */
			async testOneBillCredential(
				this: ICredentialTestFunctions,
				credential: ICredentialsDecrypted,
			): Promise<INodeCredentialTestResult> {
				const credentials = credential.data as IDataObject;
				const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
				const tenantId = credentials.tenantId as string;
				const clientSecret = credentials.clientSecret as string;
				const username = credentials.username as string;
				const password = credentials.password as string;
				const scope = (credentials.scope as string) || 'trust';

				try {
					// Hash password
					const { createHash } = await import('crypto');
					const hashedPassword = createHash('sha256').update(password).digest('hex');

					// Get token — ICredentialTestFunctions only exposes helpers.request
					const tokenResponse = await this.helpers.request({
						method: 'POST',
						uri: `${baseUrl}/oauth/token`,
						qs: {
							grant_type: 'password',
							client_id: tenantId,
							client_secret: clientSecret,
							username,
							password: hashedPassword,
							scope,
						},
						json: true,
					});

					const token = tokenResponse.access_token;

					// Test API call
					await this.helpers.request({
						method: 'GET',
						uri: `${baseUrl}/rest/ProductService/v1/products`,
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
							Accept: 'application/json',
							'X-OB-Tenant-Identifier': tenantId,
						},
						qs: {
							resultCount: 1,
						},
						json: true,
					});

					return {
						status: 'OK',
						message: 'Connection successful',
					};
				} catch (error) {
					return {
						status: 'Error',
						message: `Connection failed: ${(error as Error).message}`,
					};
				}
			},
			/* eslint-enable @n8n/community-nodes/no-deprecated-workflow-functions */
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[];

				if (resource === 'subscriber') {
					responseData = await handleSubscriber.call(this, operation, i);
				} else if (resource === 'order') {
					responseData = await handleOrder.call(this, operation, i);
				} else if (resource === 'invoice') {
					responseData = await handleInvoice.call(this, operation, i);
				} else if (resource === 'payment') {
					responseData = await handlePayment.call(this, operation, i);
				} else if (resource === 'product') {
					responseData = await handleProduct.call(this, operation, i);
				} else if (resource === 'ticket') {
					responseData = await handleTicket.call(this, operation, i);
				} else if (resource === 'lead') {
					responseData = await handleLead.call(this, operation, i);
				} else if (resource === 'bundle') {
					responseData = await handleBundle.call(this, operation, i);
				} else if (resource === 'partner') {
					responseData = await handlePartner.call(this, operation, i);
				} else if (resource === 'vendor') {
					responseData = await handleVendor.call(this, operation, i);
				} else {
					throw new NodeApiError(this.getNode(), { message: `Unknown resource: ${resource}` } as JsonObject);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

/**
 * Strip password hashes from contact userDetail/userDetails objects in-place.
 */
function stripPasswordsFromContacts(contacts: IDataObject[]): void {
	for (const contact of contacts) {
		for (const key of ['userDetail', 'userDetails'] as const) {
			if (contact[key] && typeof contact[key] === 'object') {
				delete (contact[key] as IDataObject).password;
			}
		}
	}
}

/**
 * Build a communicationPoint array from individual contact fields
 * (emailAddress, contactPhone, cellPhone, alternatePhone) and remove
 * those fields from the source object so they are not sent as-is.
 */
function buildCommunicationPoints(fields: IDataObject): IDataObject[] {
	const fieldMap: Array<{ field: string; type: string }> = [
		{ field: 'emailAddress', type: 'EMAIL' },
		{ field: 'contactPhone', type: 'PHONE' },
		{ field: 'cellPhone', type: 'CPHONE' },
		{ field: 'alternatePhone', type: 'APHONE' },
	];
	const points: IDataObject[] = [];
	for (const { field, type } of fieldMap) {
		if (fields[field] !== undefined) {
			const value = fields[field] as string;
			points.push(value ? { type, value } : { type });
			delete fields[field];
		}
	}
	return points;
}

/**
 * Extract userDetail fields (username, userRoleName, is2faEnabled) from flat
 * contact fields into a nested userDetail object.  Removes the extracted keys
 * from the source object.  Returns undefined when no userDetail fields are set.
 */
function buildUserDetail(fields: IDataObject): IDataObject | undefined {
	const userDetailKeys = ['username', 'userRoleName', 'is2faEnabled'] as const;
	const detail: IDataObject = {};
	let hasAny = false;
	for (const key of userDetailKeys) {
		if (fields[key] !== undefined) {
			detail[key] = fields[key];
			delete fields[key];
			hasAny = true;
		}
	}
	return hasAny ? detail : undefined;
}

async function handleSubscriber(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const body: IDataObject = {
			accountName: this.getNodeParameter('accountName', i) as string,
			firstName: this.getNodeParameter('firstName', i) as string,
			lastName: this.getNodeParameter('lastName', i) as string,
			email: this.getNodeParameter('email', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
		return await oneBillApiRequest.call(this, 'POST', '/rest/SubscriberService/v1/subscriber', body);
	}

	if (operation === 'get') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		const response = await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}`,
		);
		delete response.status;
		const includeHashes = this.getNodeParameter('includePasswordHashes', i, false) as boolean;
		if (!includeHashes && response.contact) {
			stripPasswordsFromContacts(response.contact as IDataObject[]);
		}
		return response;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		const qs: IDataObject = { ...filters };
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
		return await oneBillApiRequestAllItems.call(
			this,
			'GET',
			'/rest/SubscriberService/v1/subscribers',
			{},
			qs,
			'subscriber',
			limit,
		);
	}

	if (operation === 'update') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
		return await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}`,
			updateFields,
		);
	}

	if (operation === 'close') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		await oneBillApiRequest.call(
			this,
			'DELETE',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}`,
		);
		return { deleted: true };
	}

	if (operation === 'suspend') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		return await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}/suspend`,
		);
	}

	if (operation === 'resume') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		return await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}/resume`,
		);
	}

	if (operation === 'reopen') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		return await oneBillApiRequest.call(
			this,
			'POST',
			`/rest/SubscriberService/v1/subscribers/reopen/${encodeURIComponent(accountNumber)}`,
		);
	}

	if (operation === 'getBalance') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		const response = await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}/balance`,
		);
		delete response.status;
		return response;
	}

	if (operation === 'getSubscriptions') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		const response = await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}/subscriptions`,
		);
		return (response.subscriptions as IDataObject[]) || [response];
	}

	if (operation === 'getContacts') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		const response = await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}`,
		);
		const contacts = (response.contact as IDataObject[]) || [];
		const includeHashes = this.getNodeParameter('includePasswordHashes', i, false) as boolean;
		if (!includeHashes) {
			stripPasswordsFromContacts(contacts);
		}
		return contacts.map((contact, index) => ({ _contactIndex: index, ...contact }));
	}

	if (operation === 'addContact') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		const contactFields = this.getNodeParameter('contactFields', i) as IDataObject;

		// Email is a required standalone field for addContact
		contactFields.emailAddress = this.getNodeParameter('emailAddress', i) as string;

		// Build communicationPoint array from individual fields
		contactFields.communicationPoint = buildCommunicationPoints(contactFields);

		// Build nested userDetail from flat fields
		const userDetail = buildUserDetail(contactFields);
		if (userDetail) {
			contactFields.userDetail = userDetail;
		}

		// Get existing subscriber to read current contacts
		const subscriber = await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}`,
		);
		const contacts = (subscriber.contact as IDataObject[]) || [];
		contacts.push(contactFields);

		// Update subscriber with new contact array
		const response = await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}`,
			{ contact: contacts },
		);
		return response;
	}

	if (operation === 'updateContact') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		const contactIndex = this.getNodeParameter('contactIndex', i) as number;
		const updateContactFields = this.getNodeParameter('updateContactFields', i) as IDataObject;

		// Build communicationPoint array from individual fields
		const commPoints = buildCommunicationPoints(updateContactFields);
		if (commPoints.length > 0) {
			updateContactFields.communicationPoint = commPoints;
		}

		// Build nested userDetail from flat fields, merging with existing
		const userDetail = buildUserDetail(updateContactFields);
		if (userDetail) {
			updateContactFields.userDetail = userDetail;
		}

		// Get existing subscriber
		const subscriber = await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}`,
		);
		const contacts = (subscriber.contact as IDataObject[]) || [];

		if (contactIndex < 0 || contactIndex >= contacts.length) {
			throw new NodeOperationError(
				this.getNode(),
				`Contact index ${contactIndex} is out of bounds. The subscriber has ${contacts.length} contact(s) (indices 0–${contacts.length - 1}).`,
				{ itemIndex: i },
			);
		}

		// Merge update fields into the existing contact
		Object.assign(contacts[contactIndex], updateContactFields);

		// Update subscriber with modified contact array
		const response = await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}`,
			{ contact: contacts },
		);
		return response;
	}

	if (operation === 'removeContact') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		const contactIndex = this.getNodeParameter('contactIndex', i) as number;

		// Get existing subscriber
		const subscriber = await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}`,
		);
		const contacts = (subscriber.contact as IDataObject[]) || [];

		if (contactIndex < 0 || contactIndex >= contacts.length) {
			throw new NodeOperationError(
				this.getNode(),
				`Contact index ${contactIndex} is out of bounds. The subscriber has ${contacts.length} contact(s) (indices 0–${contacts.length - 1}).`,
				{ itemIndex: i },
			);
		}

		contacts.splice(contactIndex, 1);

		// Update subscriber with modified contact array
		await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}`,
			{ contact: contacts },
		);
		return { deleted: true };
	}

	throw new NodeOperationError(this.getNode(), `Unknown subscriber operation: ${operation}`);
}

async function handleOrder(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create' || operation === 'validate') {
		const body: IDataObject = {
			accountNumber: this.getNodeParameter('accountNumber', i) as string,
			orderElement: parseJsonField(this.getNode(), this.getNodeParameter('orderElements', i) as string, 'Order Elements'),
		};
		if (operation === 'create') {
			const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
			if (additionalFields.orderAttributes) {
				additionalFields.orderAttributes = parseJsonField(this.getNode(), additionalFields.orderAttributes as string, 'Order Attributes');
			}
			Object.assign(body, additionalFields);
		}
		const endpoint =
			operation === 'create'
				? '/rest/OrderService/v1/order'
				: '/rest/OrderService/v1/order/validate';
		return await oneBillApiRequest.call(this, 'POST', endpoint, body);
	}

	if (operation === 'get') {
		const orderNumber = this.getNodeParameter('orderNumber', i) as string;
		return await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/OrderService/v1/orders/${encodeURIComponent(orderNumber)}`,
		);
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		const qs: IDataObject = { ...filters };
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
		return await oneBillApiRequestAllItems.call(
			this,
			'GET',
			'/rest/OrderService/v1/orders',
			{},
			qs,
			'order',
			limit,
		);
	}

	if (operation === 'activate') {
		const orderNumber = this.getNodeParameter('orderNumber', i) as string;
		return await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/OrderService/v1/orders/${encodeURIComponent(orderNumber)}/activate`,
		);
	}

	if (operation === 'updateQuote') {
		const orderNumber = this.getNodeParameter('orderNumber', i) as string;
		const body = parseJsonField(this.getNode(), this.getNodeParameter('updateBody', i) as string, 'Update Body') as IDataObject;
		return await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/OrderService/v1/orders/${encodeURIComponent(orderNumber)}`,
			body,
		);
	}

	throw new NodeOperationError(this.getNode(), `Unknown order operation: ${operation}`);
}

async function handleInvoice(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'get') {
		const invoiceNumber = this.getNodeParameter('invoiceNumber', i) as string;
		return await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/InvoiceService/v1/invoices/${encodeURIComponent(invoiceNumber)}`,
		);
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		const qs: IDataObject = { ...filters };
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
		return await oneBillApiRequestAllItems.call(
			this,
			'GET',
			'/rest/InvoiceService/v1/invoices',
			{},
			qs,
			'invoice',
			limit,
		);
	}

	if (operation === 'modify') {
		const invoiceNumber = this.getNodeParameter('invoiceNumber', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		return await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/InvoiceService/v1/invoices/${encodeURIComponent(invoiceNumber)}/modify`,
			additionalFields,
		);
	}

	throw new NodeOperationError(this.getNode(), `Unknown invoice operation: ${operation}`);
}

async function handlePayment(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const body: IDataObject = {
			paymentMethod: this.getNodeParameter('paymentMethod', i) as string,
			paymentAmount: this.getNodeParameter('paymentAmount', i) as number,
			accountNumber: this.getNodeParameter('accountNumber', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
		return await oneBillApiRequest.call(this, 'POST', '/rest/PaymentService/v1/payment', body);
	}

	if (operation === 'getAll') {
		const qs: IDataObject = {};
		const rangeFrom = this.getNodeParameter('rangeFrom', i) as string;
		const rangeTo = this.getNodeParameter('rangeTo', i) as string;
		if (rangeFrom) {
			qs.rangeFrom = rangeFrom;
		}
		if (rangeTo) {
			qs.rangeTo = rangeTo;
		}
		// Payment endpoint does not support pagination;
		// it returns all results matching the date range in a single response
		const response = await oneBillApiRequest.call(
			this,
			'GET',
			'/rest/PaymentService/v1/payments',
			{},
			qs,
		);
		return (response.payment as IDataObject[]) || [];
	}

	if (operation === 'getForSubscriber') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		const response = await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/PaymentService/v1/payments/${encodeURIComponent(accountNumber)}`,
		);
		// API returns an array with one wrapper object; extract the payment array so each payment is a separate item
		const responseArray = (Array.isArray(response) ? response : [response]) as IDataObject[];
		const first = (responseArray[0] || {}) as IDataObject;
		return (first.payment as IDataObject[]) || [];
	}

	throw new NodeOperationError(this.getNode(), `Unknown payment operation: ${operation}`);
}

async function handleProduct(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const body: IDataObject = {
			name: this.getNodeParameter('name', i) as string,
			code: this.getNodeParameter('code', i) as string,
			type: this.getNodeParameter('type', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		if (additionalFields.pricePlanInfos) {
			additionalFields.pricePlanInfos = parseJsonField(this.getNode(), additionalFields.pricePlanInfos as string, 'Price Plan Infos');
		}
		Object.assign(body, additionalFields);
		return await oneBillApiRequest.call(this, 'POST', '/rest/ProductService/v1/product', body);
	}

	if (operation === 'get') {
		const productCode = this.getNodeParameter('productCode', i) as string;
		return await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/ProductService/v1/products/${encodeURIComponent(productCode)}`,
		);
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		const qs: IDataObject = { ...filters };
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
		return await oneBillApiRequestAllItems.call(
			this,
			'GET',
			'/rest/ProductService/v1/products',
			{},
			qs,
			'product',
			limit,
		);
	}

	if (operation === 'update') {
		const body = parseJsonField(this.getNode(), this.getNodeParameter('updateBody', i) as string, 'Update Body') as IDataObject;
		return await oneBillApiRequest.call(this, 'PUT', '/rest/ProductService/v1/product', body);
	}

	if (operation === 'delete') {
		const productCode = this.getNodeParameter('productCode', i) as string;
		await oneBillApiRequest.call(
			this,
			'DELETE',
			`/rest/ProductService/v1/products/${encodeURIComponent(productCode)}`,
		);
		return { deleted: true };
	}

	throw new NodeOperationError(this.getNode(), `Unknown product operation: ${operation}`);
}

async function handleTicket(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const body: IDataObject = {
			subject: this.getNodeParameter('subject', i) as string,
			accountNumber: this.getNodeParameter('accountNumber', i) as string,
			priority: this.getNodeParameter('priority', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
		return await oneBillApiRequest.call(
			this,
			'POST',
			'/rest/TicketManagementService/v1/ticket',
			body,
		);
	}

	if (operation === 'get') {
		const ticketNumber = this.getNodeParameter('ticketNumber', i) as string;
		return await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/TicketManagementService/v1/tickets/${encodeURIComponent(ticketNumber)}`,
		);
	}

	if (operation === 'update') {
		const ticketNumber = this.getNodeParameter('ticketNumber', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
		if (updateFields.conversation) {
			updateFields.conversation = parseJsonField(this.getNode(), updateFields.conversation as string, 'Conversation');
		}
		return await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/TicketManagementService/v1/tickets/${encodeURIComponent(ticketNumber)}`,
			updateFields,
		);
	}

	if (operation === 'getHistory') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		const qs: IDataObject = { ...filters };
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
		return await oneBillApiRequestAllItems.call(
			this,
			'GET',
			'/rest/TicketManagementService/v1/searchTicketHistory',
			{},
			qs,
			'historyInfoList',
			limit,
		);
	}

	throw new NodeOperationError(this.getNode(), `Unknown ticket operation: ${operation}`);
}

async function handleLead(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const body: IDataObject = {
			accountName: this.getNodeParameter('accountName', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		if (additionalFields.contact && typeof additionalFields.contact === 'string') {
			additionalFields.contact = parseJsonField(this.getNode(), additionalFields.contact as string, 'Contact');
		}
		if (additionalFields.customFields && typeof additionalFields.customFields === 'string') {
			additionalFields.customFields = parseJsonField(this.getNode(), additionalFields.customFields as string, 'Custom Fields');
		}
		Object.assign(body, additionalFields);
		return await oneBillApiRequest.call(this, 'POST', '/rest/SubscriberService/v1/lead', body);
	}

	if (operation === 'get') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		return await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/SubscriberService/v1/leads/${encodeURIComponent(accountNumber)}`,
		);
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		const qs: IDataObject = { ...filters };
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
		return await oneBillApiRequestAllItems.call(
			this,
			'GET',
			'/rest/SubscriberService/v1/leads',
			{},
			qs,
			'subscriber',
			limit,
		);
	}

	if (operation === 'update') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
		if (updateFields.contact && typeof updateFields.contact === 'string') {
			updateFields.contact = parseJsonField(this.getNode(), updateFields.contact as string, 'Contact');
		}
		if (updateFields.customFields && typeof updateFields.customFields === 'string') {
			updateFields.customFields = parseJsonField(this.getNode(), updateFields.customFields as string, 'Custom Fields');
		}
		return await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/SubscriberService/v1/leads/${encodeURIComponent(accountNumber)}`,
			updateFields,
		);
	}

	if (operation === 'convertToSubscriber') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		return await oneBillApiRequest.call(
			this,
			'POST',
			`/rest/SubscriberService/v1/subscribers/${encodeURIComponent(accountNumber)}/leadToSubscriber`,
		);
	}

	throw new NodeOperationError(this.getNode(), `Unknown lead operation: ${operation}`);
}

async function handleBundle(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const body: IDataObject = {
			bundleCode: this.getNodeParameter('bundleCode', i) as string,
			name: this.getNodeParameter('name', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		if (additionalFields.bundleProduct && typeof additionalFields.bundleProduct === 'string') {
			additionalFields.bundleProduct = parseJsonField(this.getNode(), additionalFields.bundleProduct as string, 'Bundle Product');
		}
		Object.assign(body, additionalFields);
		return await oneBillApiRequest.call(
			this,
			'POST',
			'/rest/ProductService/v1/products/bundle',
			body,
		);
	}

	if (operation === 'get') {
		const bundleCode = this.getNodeParameter('bundleCode', i) as string;
		return await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/ProductService/v1/bundles/${encodeURIComponent(bundleCode)}`,
		);
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		const qs: IDataObject = { ...filters };
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
		return await oneBillApiRequestAllItems.call(
			this,
			'GET',
			'/rest/ProductService/v1/bundles',
			{},
			qs,
			'bundle',
			limit,
		);
	}

	if (operation === 'update') {
		const body = parseJsonField(this.getNode(), this.getNodeParameter('updateBody', i) as string, 'Update Body') as IDataObject;
		return await oneBillApiRequest.call(
			this,
			'PUT',
			'/rest/ProductService/v1/products/bundle',
			body,
		);
	}

	throw new NodeOperationError(this.getNode(), `Unknown bundle operation: ${operation}`);
}

async function handlePartner(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const body: IDataObject = {
			accountName: this.getNodeParameter('accountName', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		if (additionalFields.contacts && typeof additionalFields.contacts === 'string') {
			additionalFields.contacts = parseJsonField(this.getNode(), additionalFields.contacts as string, 'Contacts');
		}
		if (additionalFields.customFields && typeof additionalFields.customFields === 'string') {
			additionalFields.customFields = parseJsonField(this.getNode(), additionalFields.customFields as string, 'Custom Fields');
		}
		Object.assign(body, additionalFields);
		return await oneBillApiRequest.call(
			this,
			'POST',
			'/rest/PartnerService/v1/partners',
			body,
		);
	}

	if (operation === 'get') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		const response = await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/PartnerService/v1/partners/${encodeURIComponent(accountNumber)}`,
		);
		delete response.status;

		// Flatten primary address to top-level fields
		const addresses = response.address as IDataObject[] | undefined;
		if (addresses && addresses.length > 0) {
			const primary =
				addresses.find((a) => a.defaultBilling) || addresses[0];
			response._addressLine1 = primary.addLine1 || '';
			response._addressLine2 = primary.addLine2 || '';
			response._city = primary.city || '';
			response._state = primary.state || '';
			response._country = primary.country || '';
			response._zip = primary.zip || '';
		}

		// Flatten primary contact to top-level fields and optionally strip passwords
		const includeHashes = this.getNodeParameter('includePasswordHashes', i, false) as boolean;
		const contacts = response.contact as IDataObject[] | undefined;
		if (contacts && contacts.length > 0) {
			if (!includeHashes) {
				stripPasswordsFromContacts(contacts);
			}
			const primary =
				contacts.find((c) => c.primaryContact) || contacts[0];
			response._contactFirstName = primary.firstName || '';
			response._contactLastName = primary.lastName || '';
			const comPoints = primary.communicationPoint as IDataObject[] | undefined;
			if (comPoints) {
				for (const cp of comPoints) {
					if (cp.type === 'EMAIL' && cp.value) response._contactEmail = cp.value;
					if (cp.type === 'PHONE' && cp.value) response._contactPhone = cp.value;
					if (cp.type === 'CPHONE' && cp.value) response._contactCellPhone = cp.value;
					if (cp.type === 'APHONE' && cp.value) response._contactAltPhone = cp.value;
				}
			}
		}
		return response;
	}

	if (operation === 'delete') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		await oneBillApiRequest.call(
			this,
			'DELETE',
			`/rest/PartnerService/v1/partners/${encodeURIComponent(accountNumber)}`,
		);
		return { deleted: true };
	}

	if (operation === 'deleteContacts') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		const contactIds = parseJsonField(this.getNode(), this.getNodeParameter('contactIds', i) as string, 'Contact IDs') as string[];
		return await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/PartnerService/v1/channel/deleteContacts/${encodeURIComponent(accountNumber)}`,
			{ contactIds },
		);
	}

	if (operation === 'suspend') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		return await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/PartnerService/v1/partners/${encodeURIComponent(accountNumber)}/suspend`,
		);
	}

	if (operation === 'resume') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		return await oneBillApiRequest.call(
			this,
			'PUT',
			`/rest/PartnerService/v1/partners/${encodeURIComponent(accountNumber)}/resume`,
		);
	}

	if (operation === 'update') {
		const body = parseJsonField(this.getNode(), this.getNodeParameter('updateBody', i) as string, 'Update Body') as IDataObject;
		return await oneBillApiRequest.call(
			this,
			'PUT',
			'/rest/PartnerService/v1/partners',
			body,
		);
	}

	throw new NodeOperationError(this.getNode(), `Unknown partner operation: ${operation}`);
}

async function handleVendor(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const body: IDataObject = {
			accountName: this.getNodeParameter('accountName', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		if (additionalFields.contacts && typeof additionalFields.contacts === 'string') {
			additionalFields.contacts = parseJsonField(this.getNode(), additionalFields.contacts as string, 'Contacts');
		}
		if (additionalFields.customFields && typeof additionalFields.customFields === 'string') {
			additionalFields.customFields = parseJsonField(this.getNode(), additionalFields.customFields as string, 'Custom Fields');
		}
		Object.assign(body, additionalFields);
		return await oneBillApiRequest.call(
			this,
			'POST',
			'/rest/PartnerService/v1/vendor',
			body,
		);
	}

	if (operation === 'get') {
		const accountNumber = this.getNodeParameter('accountNumber', i) as string;
		return await oneBillApiRequest.call(
			this,
			'GET',
			`/rest/PartnerService/v1/vendor/${encodeURIComponent(accountNumber)}`,
		);
	}

	if (operation === 'update') {
		const body = parseJsonField(this.getNode(), this.getNodeParameter('updateBody', i) as string, 'Update Body') as IDataObject;
		return await oneBillApiRequest.call(
			this,
			'PUT',
			'/rest/PartnerService/v1/vendor',
			body,
		);
	}

	throw new NodeOperationError(this.getNode(), `Unknown vendor operation: ${operation}`);
}
