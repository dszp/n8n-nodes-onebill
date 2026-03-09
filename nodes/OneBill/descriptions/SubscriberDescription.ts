import type { INodeProperties } from 'n8n-workflow';

export const subscriberOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['subscriber'],
			},
		},
		options: [
			{
				name: 'Add Contact',
				value: 'addContact',
				description: 'Add a new contact to a subscriber',
				action: 'Add a contact to a subscriber',
			},
			{
				name: 'Close',
				value: 'close',
				description: 'Close a subscriber account permanently',
				action: 'Close a subscriber',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new subscriber',
				action: 'Create a subscriber',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a subscriber',
				action: 'Get a subscriber',
			},
			{
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Retrieve the account balance for a subscriber',
				action: 'Get a subscriber balance',
			},
			{
				name: 'Get Contacts',
				value: 'getContacts',
				description: 'Retrieve all contacts for a subscriber',
				action: 'Get subscriber contacts',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve a list of subscribers',
				action: 'Get many subscribers',
			},
			{
				name: 'Get Subscriptions',
				value: 'getSubscriptions',
				description: 'Retrieve all subscriptions for a subscriber',
				action: 'Get subscriber subscriptions',
			},
			{
				name: 'Remove Contact',
				value: 'removeContact',
				description: 'Remove a contact from a subscriber',
				action: 'Remove a contact from a subscriber',
			},
			{
				name: 'Reopen',
				value: 'reopen',
				description: 'Reopen a previously closed subscriber account',
				action: 'Reopen a subscriber',
			},
			{
				name: 'Resume',
				value: 'resume',
				description: 'Resume a suspended subscriber account',
				action: 'Resume a subscriber',
			},
			{
				name: 'Suspend',
				value: 'suspend',
				description: 'Suspend a subscriber account',
				action: 'Suspend a subscriber',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a subscriber',
				action: 'Update a subscriber',
			},
			{
				name: 'Update Contact',
				value: 'updateContact',
				description: 'Update a contact on a subscriber',
				action: 'Update a subscriber contact',
			},
		],
		default: 'getAll',
	},
];

export const subscriberFields: INodeProperties[] = [
	// ----------------------------------
	//         subscriber: create
	// ----------------------------------
	{
		displayName: 'Account Name',
		name: 'accountName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscriber'],
				operation: ['create'],
			},
		},
		description: 'The name of the subscriber account',
	},
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscriber'],
				operation: ['create'],
			},
		},
		description: 'The first name of the primary contact',
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscriber'],
				operation: ['create'],
			},
		},
		description: 'The last name of the primary contact',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'e.g. nathan@example.com',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscriber'],
				operation: ['create'],
			},
		},
		description: 'The email address of the primary contact',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscriber'],
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
				displayName: 'Billing Day of Month',
				name: 'billingDayOfMonth',
				type: 'number',
				default: 1,
				description: 'The day of the month when billing occurs',
			},
			{
				displayName: 'Billing Frequency',
				name: 'billingFrequency',
				type: 'string',
				default: '',
				description: 'The billing frequency (e.g. Monthly, Quarterly, Annually)',
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
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'The country of the billing address',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'The currency code (e.g. USD, EUR)',
			},
			{
				displayName: 'Custom Fields (JSON)',
				name: 'customFields',
				type: 'json',
				default: '{}',
				description: 'Custom fields as a JSON object',
			},
			{
				displayName: 'Invoice Delivery Preference',
				name: 'invoiceDeliveryPreference',
				type: 'string',
				default: '',
				description: 'How invoices should be delivered (e.g. Email, Print)',
			},
			{
				displayName: 'Invoice Format',
				name: 'invoiceFormat',
				type: 'string',
				default: '',
				description: 'The format of invoices (e.g. Summary, Detailed)',
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
	//         subscriber: get
	// ----------------------------------
	{
		displayName: 'Account Number',
		name: 'accountNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['subscriber'],
				operation: ['get', 'update', 'close', 'suspend', 'resume', 'reopen', 'getBalance', 'getSubscriptions', 'getContacts', 'addContact', 'updateContact', 'removeContact'],
			},
		},
		description: 'The account number of the subscriber',
	},
	{
		displayName: 'Include Password Hashes',
		name: 'includePasswordHashes',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['subscriber'],
				operation: ['get', 'getContacts'],
			},
		},
		description:
			'Whether to include password hashes in contact user details. Disabled by default for security.',
	},

	// ----------------------------------
	//         subscriber: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['subscriber'],
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
				resource: ['subscriber'],
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
				resource: ['subscriber'],
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
	//         subscriber: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscriber'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Account Name',
				name: 'accountName',
				type: 'string',
				default: '',
				description: 'The name of the subscriber account',
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
				placeholder: 'name@email.com',
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
	//         subscriber: addContact
	// ----------------------------------
	{
		displayName: 'Contact Fields',
		name: 'contactFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscriber'],
				operation: ['addContact'],
			},
		},
		options: [
			{
				displayName: 'Alternate Phone',
				name: 'alternatePhone',
				type: 'string',
				default: '',
				placeholder: 'e.g. 5551234567',
				description: 'The alternate phone number of the contact',
			},
			{
				displayName: 'Billing Contact',
				name: 'billingContact',
				type: 'boolean',
				default: false,
				description: 'Whether this contact is the billing contact',
			},
			{
				displayName: 'Cell Phone',
				name: 'cellPhone',
				type: 'string',
				default: '',
				placeholder: 'e.g. 5559876543',
				description: 'The cell phone number of the contact',
			},
			{
				displayName: 'Contact Phone',
				name: 'contactPhone',
				type: 'string',
				default: '',
				placeholder: 'e.g. 5551234567',
				description: 'The primary phone number of the contact',
			},
			{
				displayName: 'Contact Type',
				name: 'contactType',
				type: 'number',
				default: 0,
				description: 'The numeric type identifier for this contact',
			},
			{
				displayName: 'Designation',
				name: 'designation',
				type: 'string',
				default: '',
				description: 'The designation or title of the contact',
			},
			{
				displayName: 'Email Address',
				name: 'emailAddress',
				type: 'string',
				default: '',
				placeholder: 'e.g. nathan@example.com',
				description: 'The email address of the contact',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'The first name of the contact',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'The last name of the contact',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				description: 'The locale of the contact',
			},
			{
				displayName: 'Middle Name',
				name: 'middleName',
				type: 'string',
				default: '',
				description: 'The middle name of the contact',
			},
			{
				displayName: 'Primary Contact',
				name: 'primaryContact',
				type: 'boolean',
				default: false,
				description: 'Whether this contact is the primary contact',
			},
			{
				displayName: 'Salutation',
				name: 'salutation',
				type: 'string',
				default: '',
				description: 'The salutation for the contact',
			},
		],
	},

	// ----------------------------------
	//         subscriber: updateContact / removeContact
	// ----------------------------------
	{
		displayName: 'Contact Index',
		name: 'contactIndex',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['subscriber'],
				operation: ['updateContact', 'removeContact'],
			},
		},
		description:
			"The zero-based index of the contact in the subscriber's contact array. Use 'Get Contacts' first to find the index.",
	},

	// ----------------------------------
	//         subscriber: updateContact
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateContactFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscriber'],
				operation: ['updateContact'],
			},
		},
		options: [
			{
				displayName: 'Alternate Phone',
				name: 'alternatePhone',
				type: 'string',
				default: '',
				placeholder: 'e.g. 5551234567',
				description: 'The alternate phone number of the contact',
			},
			{
				displayName: 'Billing Contact',
				name: 'billingContact',
				type: 'boolean',
				default: false,
				description: 'Whether this contact is the billing contact',
			},
			{
				displayName: 'Cell Phone',
				name: 'cellPhone',
				type: 'string',
				default: '',
				placeholder: 'e.g. 5559876543',
				description: 'The cell phone number of the contact',
			},
			{
				displayName: 'Contact Phone',
				name: 'contactPhone',
				type: 'string',
				default: '',
				placeholder: 'e.g. 5551234567',
				description: 'The primary phone number of the contact',
			},
			{
				displayName: 'Contact Type',
				name: 'contactType',
				type: 'number',
				default: 0,
				description: 'The numeric type identifier for this contact',
			},
			{
				displayName: 'Designation',
				name: 'designation',
				type: 'string',
				default: '',
				description: 'The designation or title of the contact',
			},
			{
				displayName: 'Email Address',
				name: 'emailAddress',
				type: 'string',
				default: '',
				placeholder: 'e.g. nathan@example.com',
				description: 'The email address of the contact',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'The first name of the contact',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'The last name of the contact',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				description: 'The locale of the contact',
			},
			{
				displayName: 'Middle Name',
				name: 'middleName',
				type: 'string',
				default: '',
				description: 'The middle name of the contact',
			},
			{
				displayName: 'Primary Contact',
				name: 'primaryContact',
				type: 'boolean',
				default: false,
				description: 'Whether this contact is the primary contact',
			},
			{
				displayName: 'Salutation',
				name: 'salutation',
				type: 'string',
				default: '',
				description: 'The salutation for the contact',
			},
		],
	},
];
