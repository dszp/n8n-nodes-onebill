import type { INodeProperties } from 'n8n-workflow';

export const orderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['order'],
			},
		},
		options: [
			{
				name: 'Activate',
				value: 'activate',
				description: 'Activate a pending order',
				action: 'Activate an order',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new order',
				action: 'Create an order',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve an order',
				action: 'Get an order',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve a list of orders',
				action: 'Get many orders',
			},
			{
				name: 'Update Quote',
				value: 'updateQuote',
				description: 'Update a quote order',
				action: 'Update a quote',
			},
			{
				name: 'Validate',
				value: 'validate',
				description: 'Validate an order before placing it',
				action: 'Validate an order',
			},
		],
		default: 'getAll',
	},
];

export const orderFields: INodeProperties[] = [
	// ----------------------------------
	//         order: create / validate
	// ----------------------------------
	{
		displayName: 'Account Number',
		name: 'accountNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['create', 'validate'],
			},
		},
		description: 'The subscriber account number to place the order for',
	},
	{
		displayName: 'Order Elements (JSON)',
		name: 'orderElements',
		type: 'json',
		required: true,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['create', 'validate'],
			},
		},
		description:
			'The order elements as a JSON array. Each element specifies a product/bundle, quantity, and optional attributes.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Bill This Order',
				name: 'billThisOrder',
				type: 'boolean',
				default: false,
				description: 'Whether to bill this order immediately',
			},
			{
				displayName: 'Coupon Code',
				name: 'couponCode',
				type: 'string',
				default: '',
				description: 'A coupon code to apply to the order',
			},
			{
				displayName: 'Generate Invoice Immediately',
				name: 'generateInvoiceImmediately',
				type: 'boolean',
				default: false,
				description: 'Whether to generate an invoice immediately after the order is placed',
			},
			{
				displayName: 'Order Attributes (JSON)',
				name: 'orderAttributes',
				type: 'json',
				default: '{}',
				description: 'Additional order attributes as a JSON object',
			},
			{
				displayName: 'Order Name',
				name: 'orderName',
				type: 'string',
				default: '',
				description: 'A descriptive name for the order',
			},
			{
				displayName: 'Order State',
				name: 'orderState',
				type: 'options',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Quote', value: 'QUOTE' },
				],
				default: 'ACTIVE',
				description: 'Whether to place the order as active or as a quote',
			},
		],
	},

	// ----------------------------------
	//         order: get / activate / updateQuote
	// ----------------------------------
	{
		displayName: 'Order Number',
		name: 'orderNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['get', 'activate', 'updateQuote'],
			},
		},
	},

	// ----------------------------------
	//         order: updateQuote
	// ----------------------------------
	{
		displayName: 'Update Fields (JSON)',
		name: 'updateBody',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['updateQuote'],
			},
		},
		description: 'The fields to update on the quote as a JSON object',
	},

	// ----------------------------------
	//         order: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['getAll'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Account Number',
				name: 'accountNumber',
				type: 'string',
				default: '',
				description: 'Filter orders by subscriber account number',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				description: 'The field to sort results by',
			},
			{
				displayName: 'Search String',
				name: 'searchString',
				type: 'string',
				default: '',
				description: 'A search string to filter orders',
			},
		],
	},
];
