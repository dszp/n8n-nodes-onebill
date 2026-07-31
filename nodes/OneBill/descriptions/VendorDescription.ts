import type { INodeProperties } from 'n8n-workflow';

export const vendorOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['vendor'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new vendor',
				action: 'Create a vendor',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a vendor',
				action: 'Get a vendor',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a vendor',
				action: 'Update a vendor',
			},
		],
		default: 'get',
	},
];

export const vendorFields: INodeProperties[] = [
	{
		displayName:
			'OneBill applies an update as a whole-record replace. Send the complete record, not only the fields you are changing — anything omitted may be cleared, including custom field values. Read the record first and edit the result.',
		name: 'vendorUpdateNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['vendor'],
				operation: ['update'],
			},
		},
	},
	// ----------------------------------
	//         vendor: create
	// ----------------------------------
	{
		displayName: 'Account Name',
		name: 'accountName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['vendor'],
				operation: ['create'],
			},
		},
		description: 'The name of the vendor account',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['vendor'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Account Type',
				name: 'accountType',
				type: 'string',
				default: '',
				description: 'The type of account',
			},
			{
				displayName: 'Address Line 1',
				name: 'addressLine1',
				type: 'string',
				default: '',
				description: 'The first line of the billing address',
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
				name: 'contacts',
				type: 'json',
				default: '[]',
				description: 'The contacts for this vendor as a JSON array',
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
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'e.g. nathan@example.com',
				default: '',
				description: 'The email address of the primary contact',
			},
			{
				displayName: 'External ID',
				name: 'externalId',
				type: 'string',
				default: '',
				description: 'An identifier for this account in an external system. Maximum 64 characters — OneBill rejects the whole update if the value is longer, leaving the previous value in place.',
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
	//         vendor: get
	// ----------------------------------
	{
		displayName: 'Account Number',
		name: 'accountNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['vendor'],
				operation: ['get'],
			},
		},
		description: 'The account number of the vendor',
	},

	// ----------------------------------
	//         vendor: update
	// ----------------------------------
	{
		displayName: 'Update Body (JSON)',
		name: 'updateBody',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: {
			show: {
				resource: ['vendor'],
				operation: ['update'],
			},
		},
		description:
			'The vendor update payload as a JSON object. Must include the account number.',
	},
];
