# n8n-nodes-onebill

This is an n8n community node for the [OneBill](https://www.onebillsoftware.com/) billing and subscription management API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation) |
[Operations](#operations) |
[Credentials](#credentials) |
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Subscriber
- Create, Get, Get Many, Update, Close, Suspend, Resume, Reopen
- Get Balance, Get Subscriptions

### Order
- Create, Get, Get Many, Validate, Activate, Update Quote

### Invoice
- Get, Get Many, Modify

### Payment
- Create, Get Many, Get for Subscriber

### Product
- Create, Get, Get Many, Update, Delete

### Ticket
- Create, Get, Update, Get History

## Credentials

To use this node, you need the following credentials from your OneBill account:

| Field | Description |
|-------|-------------|
| **Base URL** | Your OneBill instance URL (default: `https://app.onebillsoftware.com`) |
| **Tenant ID** | Found in Config > Settings > Business Profile > Tenant ID |
| **Client Secret** | Found in the Business Profile section |
| **Username** | Your OneBill account username |
| **Password** | Your OneBill account password (SHA256-hashed automatically) |
| **Scope** | OAuth scope (default: `trust`) |

## Resources

- [OneBill Developer Guide](https://dev.onebillsoftware.com/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE)
