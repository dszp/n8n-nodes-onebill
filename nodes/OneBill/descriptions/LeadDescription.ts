import type { INodeProperties } from 'n8n-workflow';

export const leadOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['lead'],
			},
		},
		options: [
			{
				name: 'Convert to Subscriber',
				value: 'convertToSubscriber',
				description: 'Convert a lead to a subscriber',
				action: 'Convert a lead to a subscriber',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new lead',
				action: 'Create a lead',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a lead',
				action: 'Get a lead',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve a list of leads',
				action: 'Get many leads',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a lead',
				action: 'Update a lead',
			},
		],
		default: 'getAll',
	},
];

export const leadFields: INodeProperties[] = [
	// ----------------------------------
	//         lead: create
	// ----------------------------------
	{
		displayName: 'Account Name',
		name: 'accountName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		description: 'The name of the lead account',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Account Type',
				name: 'accountType',
				type: 'string',
				default: '',
				description: 'The type of account (e.g. Residential, Business)',
			},
			{
				displayName: 'Address Line 1',
				name: 'addressLine1',
				type: 'string',
				default: '',
				description: 'The first line of the billing address',
			},
			{
				displayName: 'Address Line 2',
				name: 'addressLine2',
				type: 'string',
				default: '',
				description: 'The second line of the billing address',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'The city of the billing address',
			},
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				default: '',
				description: 'The company name',
			},
			{
				displayName: 'Contacts (JSON)',
				name: 'contact',
				type: 'json',
				default: '[]',
				description: 'The contacts for this lead as a JSON array',
				hint: 'e.g. [{"firstName": "Nathan", "lastName": "Smith", "communicationPoint": [{"type": "EMAIL", "value": "nathan@example.com"}]}]',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'The country of the billing address',
			},
			{
				displayName: 'Custom Fields (JSON)',
				name: 'customFields',
				type: 'json',
				default: '{}',
				description: 'Custom fields as a JSON object',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'e.g. nathan@example.com',
				default: '',
				description: 'The email address of the primary contact',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'The first name of the primary contact',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'The last name of the primary contact',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'The phone number of the primary contact',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'The state or province of the billing address',
			},
			{
				displayName: 'ZIP Code',
				name: 'zipCode',
				type: 'string',
				default: '',
				description: 'The postal or ZIP code of the billing address',
			},
		],
	},

	// ----------------------------------
	//         lead: get / update / convertToSubscriber
	// ----------------------------------
	{
		displayName: 'Account Number',
		name: 'accountNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['get', 'update', 'convertToSubscriber'],
			},
		},
		description: 'The account number of the lead',
	},

	// ----------------------------------
	//         lead: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				description: 'The field to sort results by',
			},
			{
				displayName: 'Search By',
				name: 'searchBy',
				type: 'string',
				default: '',
				description: 'The field name to search by',
			},
			{
				displayName: 'Search String',
				name: 'searchString',
				type: 'string',
				default: '',
				description: 'The value to search for',
			},
			{
				displayName: 'Sort Ascending',
				name: 'ascending',
				type: 'boolean',
				default: true,
				description: 'Whether to sort results in ascending order',
			},
		],
	},

	// ----------------------------------
	//         lead: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Account Name',
				name: 'accountName',
				type: 'string',
				default: '',
				description: 'The name of the lead account',
			},
			{
				displayName: 'Address Line 1',
				name: 'addressLine1',
				type: 'string',
				default: '',
				description: 'The first line of the billing address',
			},
			{
				displayName: 'Address Line 2',
				name: 'addressLine2',
				type: 'string',
				default: '',
				description: 'The second line of the billing address',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'The city of the billing address',
			},
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				default: '',
				description: 'The company name',
			},
			{
				displayName: 'Contacts (JSON)',
				name: 'contact',
				type: 'json',
				default: '[]',
				description: 'The contacts for this lead as a JSON array',
				hint: 'e.g. [{"firstName": "Nathan", "lastName": "Smith", "communicationPoint": [{"type": "EMAIL", "value": "nathan@example.com"}]}]',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'The country of the billing address',
			},
			{
				displayName: 'Custom Fields (JSON)',
				name: 'customFields',
				type: 'json',
				default: '{}',
				description: 'Custom fields as a JSON object',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'e.g. nathan@example.com',
				default: '',
				description: 'The email address of the primary contact',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'The first name of the primary contact',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'The last name of the primary contact',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'The phone number of the primary contact',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'The state or province of the billing address',
			},
			{
				displayName: 'ZIP Code',
				name: 'zipCode',
				type: 'string',
				default: '',
				description: 'The postal or ZIP code of the billing address',
			},
		],
	},
];
