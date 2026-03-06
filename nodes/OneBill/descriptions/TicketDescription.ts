import type { INodeProperties } from 'n8n-workflow';

export const ticketOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new support ticket',
				action: 'Create a ticket',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a support ticket',
				action: 'Get a ticket',
			},
			{
				name: 'Get History',
				value: 'getHistory',
				description: 'Retrieve the history of a support ticket',
				action: 'Get ticket history',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a support ticket',
				action: 'Update a ticket',
			},
		],
		default: 'get',
	},
];

export const ticketFields: INodeProperties[] = [
	// ----------------------------------
	//         ticket: create
	// ----------------------------------
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['create'],
			},
		},
		description: 'The subject of the ticket',
	},
	{
		displayName: 'Account Number',
		name: 'accountNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['create'],
			},
		},
		description: 'The subscriber account number associated with the ticket',
	},
	{
		displayName: 'Priority',
		name: 'priority',
		type: 'options',
		required: true,
		default: 'MEDIUM',
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Critical', value: 'CRITICAL' },
			{ name: 'High', value: 'HIGH' },
			{ name: 'Low', value: 'LOW' },
			{ name: 'Medium', value: 'MEDIUM' },
		],
		description: 'The priority level of the ticket',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Assignee Username',
				name: 'assigneeUsername',
				type: 'string',
				default: '',
				description: 'The username of the person to assign the ticket to',
			},
			{
				displayName: 'Classification ID',
				name: 'classificationId',
				type: 'string',
				default: '',
				description: 'The ticket classification ID',
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				description: 'The contact ID associated with the ticket',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'A detailed description of the ticket',
			},
			{
				displayName: 'Remarks',
				name: 'remarks',
				type: 'string',
				default: '',
				description: 'Additional remarks for the ticket',
			},
			{
				displayName: 'Template Name',
				name: 'templateName',
				type: 'string',
				default: '',
				description: 'The name of a ticket template to use',
			},
			{
				displayName: 'Ticket Source',
				name: 'ticketSource',
				type: 'string',
				default: '',
				description: 'The source of the ticket (e.g. API, Email, Phone)',
			},
			{
				displayName: 'Ticket Type',
				name: 'ticketType',
				type: 'string',
				default: '',
				description: 'The type of ticket',
			},
		],
	},

	// ----------------------------------
	//         ticket: get / update
	// ----------------------------------
	{
		displayName: 'Ticket Number',
		name: 'ticketNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['get', 'update'],
			},
		},
	},

	// ----------------------------------
	//         ticket: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Assignee Username',
				name: 'assigneeUsername',
				type: 'string',
				default: '',
				description: 'The username of the person to assign the ticket to',
			},
			{
				displayName: 'Conversation (JSON)',
				name: 'conversation',
				type: 'json',
				default: '{}',
				description: 'A conversation entry (comment or note) as a JSON object',
			},
			{
				displayName: 'Notify Logged-In User',
				name: 'isNotifyLoggedInUser',
				type: 'boolean',
				default: false,
				description: 'Whether to notify the logged-in user about the update',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'Critical', value: 'CRITICAL' },
					{ name: 'High', value: 'HIGH' },
					{ name: 'Low', value: 'LOW' },
					{ name: 'Medium', value: 'MEDIUM' },
				],
				default: 'MEDIUM',
				description: 'The priority level of the ticket',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'The new status of the ticket',
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'The subject of the ticket',
			},
		],
	},

	// ----------------------------------
	//         ticket: getHistory
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['getHistory'],
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
				resource: ['ticket'],
				operation: ['getHistory'],
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
				resource: ['ticket'],
				operation: ['getHistory'],
			},
		},
		options: [
			{
				displayName: 'Ticket Number',
				name: 'ticketNumber',
				type: 'string',
				default: '',
				description: 'Filter history by ticket number',
			},
		],
	},
];
