import type { INodeProperties } from 'n8n-workflow';

export const invoiceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['invoice'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve an invoice',
				action: 'Get an invoice',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve a list of invoices',
				action: 'Get many invoices',
			},
			{
				name: 'Modify',
				value: 'modify',
				description: 'Rectify or regenerate an invoice',
				action: 'Modify an invoice',
			},
		],
		default: 'getAll',
	},
];

export const invoiceFields: INodeProperties[] = [
	// ----------------------------------
	//         invoice: get / modify
	// ----------------------------------
	{
		displayName: 'Invoice Number',
		name: 'invoiceNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['get', 'modify'],
			},
		},
	},

	// ----------------------------------
	//         invoice: modify
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['modify'],
			},
		},
		options: [
			{
				displayName: 'Retain Auto Pay Date',
				name: 'retainAutoPayDate',
				type: 'boolean',
				default: false,
				description: 'Whether to retain the original auto pay date',
			},
			{
				displayName: 'Retain Due Date',
				name: 'retainDueDate',
				type: 'boolean',
				default: false,
				description: 'Whether to retain the original due date',
			},
			{
				displayName: 'Retain Invoice Date',
				name: 'retainInvoiceDate',
				type: 'boolean',
				default: false,
				description: 'Whether to retain the original invoice date',
			},
			{
				displayName: 'Retain Invoice Number',
				name: 'retainInvoiceNumber',
				type: 'boolean',
				default: false,
				description: 'Whether to retain the original invoice number',
			},
			{
				displayName: 'Retain Previous Due',
				name: 'retainPreviousDue',
				type: 'boolean',
				default: false,
				description: 'Whether to retain the previous due amount',
			},
			{
				displayName: 'Retain Without New Transaction',
				name: 'retainWithoutNewTransaction',
				type: 'boolean',
				default: false,
				description: 'Whether to regenerate without adding new transactions',
			},
		],
	},

	// ----------------------------------
	//         invoice: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['invoice'],
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
				resource: ['invoice'],
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
				resource: ['invoice'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Account Number',
				name: 'accountNumber',
				type: 'string',
				default: '',
				description: 'Filter invoices by subscriber account number',
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
				description: 'A search string to filter invoices',
			},
		],
	},
];
