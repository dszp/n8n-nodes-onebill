import type { INodeProperties } from 'n8n-workflow';

export const partnerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['partner'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new partner or agent',
				action: 'Create a partner or agent',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a partner or agent',
				action: 'Delete a partner or agent',
			},
			{
				name: 'Delete Contacts',
				value: 'deleteContacts',
				description: 'Delete contacts from a partner or agent',
				action: 'Delete contacts from a partner or agent',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a partner or agent',
				action: 'Get a partner or agent',
			},
			{
				name: 'Resume',
				value: 'resume',
				description: 'Resume a suspended partner or agent account',
				action: 'Resume a partner or agent',
			},
			{
				name: 'Suspend',
				value: 'suspend',
				description: 'Suspend a partner or agent account',
				action: 'Suspend a partner or agent',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a partner or agent',
				action: 'Update a partner or agent',
			},
		],
		default: 'get',
	},
];

export const partnerFields: INodeProperties[] = [
	// ----------------------------------
	//         partner: create
	// ----------------------------------
	{
		displayName: 'Account Name',
		name: 'accountName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['partner'],
				operation: ['create'],
			},
		},
		description: 'The name of the partner or agent account',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['partner'],
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
				name: 'contacts',
				type: 'json',
				default: '[]',
				description: 'The contacts for this partner or agent as a JSON array',
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
	//         partner: get / delete / deleteContacts / suspend / resume
	// ----------------------------------
	{
		displayName: 'Account Number',
		name: 'accountNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['partner'],
				operation: ['get', 'delete', 'deleteContacts', 'suspend', 'resume'],
			},
		},
		description: 'The account number of the partner or agent',
	},
	{
		displayName: 'Include Password Hashes',
		name: 'includePasswordHashes',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['partner'],
				operation: ['get'],
			},
		},
		description:
			'Whether to include password hashes in contact user details. Disabled by default for security.',
	},

	// ----------------------------------
	//         partner: deleteContacts
	// ----------------------------------
	{
		displayName: 'Contact IDs (JSON)',
		name: 'contactIds',
		type: 'json',
		required: true,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['partner'],
				operation: ['deleteContacts'],
			},
		},
		description: 'The IDs of the contacts to delete as a JSON array',
		hint: 'e.g. ["12345", "67890"]',
	},

	// ----------------------------------
	//         partner: update
	// ----------------------------------
	{
		displayName: 'Update Body (JSON)',
		name: 'updateBody',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: {
			show: {
				resource: ['partner'],
				operation: ['update'],
			},
		},
		description:
			'The partner update payload as a JSON object. Must include the account number.',
	},
];
