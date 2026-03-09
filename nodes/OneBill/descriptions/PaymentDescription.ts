import type { INodeProperties } from 'n8n-workflow';

export const paymentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['payment'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Record a payment',
				action: 'Create a payment',
			},
			{
				name: 'Get for Subscriber',
				value: 'getForSubscriber',
				description: 'Retrieve payment receipts for a subscriber',
				action: 'Get payments for a subscriber',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve a list of payments',
				action: 'Get many payments',
			},
		],
		default: 'getAll',
	},
];

export const paymentFields: INodeProperties[] = [
	// ----------------------------------
	//         payment: create
	// ----------------------------------
	{
		displayName: 'Payment Method',
		name: 'paymentMethod',
		type: 'options',
		required: true,
		default: 'CASH',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Cash', value: 'CASH' },
			{ name: 'Check', value: 'CHECK' },
			{ name: 'Credit Card', value: 'CC' },
			{ name: 'Direct Debit', value: 'DIRECT DEBIT' },
			{ name: 'E-Check', value: 'ECHECK' },
		],
	},
	{
		displayName: 'Payment Amount',
		name: 'paymentAmount',
		type: 'number',
		required: true,
		default: 0,
		typeOptions: {
			numberPrecision: 2,
		},
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Account Number',
		name: 'accountNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create'],
			},
		},
		description: 'The subscriber account number to apply the payment to',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description for the payment',
			},
			{
				displayName: 'Invoice Number',
				name: 'invoiceNumber',
				type: 'string',
				default: '',
				description: 'Apply payment to a specific invoice',
			},
			{
				displayName: 'Payment Date',
				name: 'paymentDate',
				type: 'string',
				default: '',
				placeholder: 'e.g. 2025-01-15',
				description: 'The date of the payment in ISO format',
			},
			{
				displayName: 'Reference Number',
				name: 'referenceNumber',
				type: 'string',
				default: '',
				description: 'An external reference number for the payment',
			},
		],
	},

	// ----------------------------------
	//         payment: getForSubscriber
	// ----------------------------------
	{
		displayName: 'Account Number',
		name: 'accountNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['getForSubscriber'],
			},
		},
		description: 'The subscriber account number',
	},

	// ----------------------------------
	//         payment: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['payment'],
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
				resource: ['payment'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Range From',
		name: 'rangeFrom',
		type: 'string',
		default: '={{ DateTime.now().minus({ months: 1 }).startOf("month").toFormat("yyyy-MM-dd") }}',
		placeholder: 'e.g. 2025-01-01',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['getAll'],
			},
		},
		description:
			'Start date for the search range (YYYY-MM-DD). Defaults to the first day of last month. Clear to retrieve all payments.',
	},
	{
		displayName: 'Range To',
		name: 'rangeTo',
		type: 'string',
		default: '',
		placeholder: 'e.g. 2025-12-31',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['getAll'],
			},
		},
		description:
			'End date for the search range (YYYY-MM-DD). Leave empty to include all payments from the start date to now.',
	},
];
