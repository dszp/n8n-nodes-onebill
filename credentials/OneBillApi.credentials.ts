import type { ICredentialType, INodeProperties, Icon } from 'n8n-workflow';

export class OneBillApi implements ICredentialType {
	name = 'oneBillApi';
	displayName = 'OneBill API';
	documentationUrl = 'https://dev.onebillsoftware.com/';
	icon: Icon = 'file:oneBill.svg';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://app.onebillsoftware.com',
			placeholder: 'e.g. https://app.onebillsoftware.com',
			description: 'The base URL of your OneBill instance. Do not include a trailing slash.',
		},
		{
			displayName: 'Tenant ID',
			name: 'tenantId',
			type: 'string',
			default: '',
			description:
				'Your OneBill Tenant ID. Found in Config > Settings > Business Profile > Tenant ID. Also used as the OAuth client_id.',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'The OAuth client secret. Found in the Business Profile section of the application.',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			description: 'The username for your OneBill account',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'The password for your OneBill account. It will be SHA256-hashed automatically before authenticating.',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			default: 'trust',
			description: 'OAuth scope. Defaults to "trust" and rarely needs to be changed.',
		},
	];
}
