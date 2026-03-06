import type { INodeProperties } from 'n8n-workflow';

export const productOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['product'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new product',
				action: 'Create a product',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a product',
				action: 'Delete a product',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a product',
				action: 'Get a product',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve a list of products',
				action: 'Get many products',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a product',
				action: 'Update a product',
			},
		],
		default: 'getAll',
	},
];

export const productFields: INodeProperties[] = [
	// ----------------------------------
	//         product: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		description: 'The name of the product',
	},
	{
		displayName: 'Code',
		name: 'code',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		description: 'A unique code for the product',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		description: 'The type of product',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
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
				description: 'The date from which the product is available',
			},
			{
				displayName: 'Available To',
				name: 'availableTo',
				type: 'string',
				default: '',
				placeholder: 'e.g. 2025-12-31',
				description: 'The date until which the product is available',
			},
			{
				displayName: 'Category Code',
				name: 'categoryCode',
				type: 'string',
				default: '',
				description: 'The category code for the product',
			},
			{
				displayName: 'Change Plan Scope',
				name: 'changePlanScope',
				type: 'string',
				default: '',
				description: 'The scope for plan changes',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description of the product',
			},
			{
				displayName: 'Image',
				name: 'image',
				type: 'string',
				default: '',
				description: 'URL of the product image',
			},
			{
				displayName: 'Price Plan Infos (JSON)',
				name: 'pricePlanInfos',
				type: 'json',
				default: '[]',
				description: 'Price plan information as a JSON array',
			},
			{
				displayName: 'Regulatory Code',
				name: 'regulatoryCode',
				type: 'string',
				default: '',
				description: 'The regulatory code for the product',
			},
			{
				displayName: 'Resell to All Partners',
				name: 'resellToAllPartners',
				type: 'boolean',
				default: false,
				description: 'Whether to make this product available to all partners',
			},
		],
	},

	// ----------------------------------
	//         product: get / delete
	// ----------------------------------
	{
		displayName: 'Product Code',
		name: 'productCode',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['get', 'delete'],
			},
		},
	},

	// ----------------------------------
	//         product: update
	// ----------------------------------
	{
		displayName: 'Update Body (JSON)',
		name: 'updateBody',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['update'],
			},
		},
		description: 'The product update payload as a JSON object. Must include the product code.',
	},

	// ----------------------------------
	//         product: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['product'],
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
				resource: ['product'],
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
				resource: ['product'],
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
