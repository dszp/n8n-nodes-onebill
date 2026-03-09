import type { INodeProperties } from 'n8n-workflow';

export const bundleOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['bundle'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new bundle',
				action: 'Create a bundle',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a bundle',
				action: 'Get a bundle',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve a list of bundles',
				action: 'Get many bundles',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a bundle',
				action: 'Update a bundle',
			},
		],
		default: 'getAll',
	},
];

export const bundleFields: INodeProperties[] = [
	// ----------------------------------
	//         bundle: create
	// ----------------------------------
	{
		displayName: 'Bundle Code',
		name: 'bundleCode',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['bundle'],
				operation: ['create'],
			},
		},
		description: 'A unique code for the bundle',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['bundle'],
				operation: ['create'],
			},
		},
		description: 'The name of the bundle',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['bundle'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Available From',
				name: 'availableFrom',
				type: 'string',
				default: '',
				placeholder: 'e.g. 2025-01-01',
				description: 'The date from which the bundle is available',
			},
			{
				displayName: 'Available To',
				name: 'availableTo',
				type: 'string',
				default: '',
				placeholder: 'e.g. 2025-12-31',
				description: 'The date until which the bundle is available',
			},
			{
				displayName: 'Bundle Products (JSON)',
				name: 'bundleProduct',
				type: 'json',
				default: '[]',
				description: 'The products in this bundle as a JSON array',
				hint: 'e.g. [{"productCode": "PROD-001", "mandatory": true}]',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description of the bundle',
			},
		],
	},

	// ----------------------------------
	//         bundle: get
	// ----------------------------------
	{
		displayName: 'Bundle Code',
		name: 'bundleCode',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['bundle'],
				operation: ['get'],
			},
		},
		description: 'The code of the bundle to retrieve',
	},

	// ----------------------------------
	//         bundle: update
	// ----------------------------------
	{
		displayName: 'Update Body (JSON)',
		name: 'updateBody',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: {
			show: {
				resource: ['bundle'],
				operation: ['update'],
			},
		},
		description: 'The bundle update payload as a JSON object. Must include the bundle code.',
	},

	// ----------------------------------
	//         bundle: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['bundle'],
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
				resource: ['bundle'],
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
				resource: ['bundle'],
				operation: ['getAll'],
			},
		},
		options: [
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
		],
	},
];
