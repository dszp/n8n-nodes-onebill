# n8n-nodes-onebill

This is an n8n community node for the [OneBill](https://www.onebillsoftware.com/) billing and subscription management API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation) |
[Operations](#operations) |
[Credentials](#credentials) |
[API Coverage](#api-coverage) |
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Subscriber
- Create, Get, Get Many, Update, Close, Suspend, Resume, Reopen
- Get Balance, Get Subscriptions
- Get Contacts, Add Contact, Update Contact, Remove Contact

### Lead
- Create, Get, Get Many, Update, Convert to Subscriber

### Order
- Create, Get, Get Many, Validate, Activate, Update Quote

### Invoice
- Get, Get Many, Modify

### Payment
- Create, Get Many, Get for Subscriber

### Product
- Create, Get, Get Many, Update, Delete

### Bundle
- Create, Get, Get Many, Update

### Ticket
- Create, Get, Update, Get History

### Partner
- Create, Get, Update, Delete, Delete Contacts, Suspend, Resume

### Vendor
- Create, Get, Update

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

## API Coverage

The OneBill API has approximately 135 endpoints across 13 services. This node currently implements 54 operations across 10 resources (~40% coverage), focusing on the most common billing and subscription management tasks.

### Implemented Endpoints

| Resource | Service | Operations |
|----------|---------|------------|
| **Subscriber** | SubscriberService | Create, Get, Get Many, Update, Close, Suspend, Resume, Reopen, Get Balance, Get Subscriptions, Get Contacts, Add Contact, Update Contact, Remove Contact |
| **Lead** | SubscriberService | Create, Get, Get Many, Update, Convert to Subscriber |
| **Order** | OrderService | Create, Get, Get Many, Validate, Activate, Update Quote |
| **Invoice** | InvoiceService | Get, Get Many, Modify |
| **Payment** | PaymentService | Create, Get Many, Get for Subscriber |
| **Product** | ProductService | Create, Get, Get Many, Update, Delete |
| **Bundle** | ProductService | Create, Get, Get Many, Update |
| **Ticket** | TicketManagementService | Create, Get, Update, Get History |
| **Partner** | PartnerService | Create, Get, Update, Delete, Delete Contacts, Suspend, Resume |
| **Vendor** | PartnerService | Create, Get, Update |

### Not Yet Implemented

| Service | Endpoints | Description |
|---------|-----------|-------------|
| **PromotionService** | ~13 | Coupon, Discount, Grant, Trial, Counter CRUD |
| **RuleService** | ~48 | Rules for billing, collections, late fees, order validation, etc. |
| **UserService** | 5 | User CRUD and roles listing |
| **UtilityService** | 3 | Transaction and usage exports |
| **BillingService** | 1 | Transaction-level bill now |
| **CommonService** | 1 | Custom lists with hierarchy |

Additional missing operations on implemented services:

| Service | Missing Operations |
|---------|-------------------|
| **SubscriberService** | Bill, Get Documents, Swap/Modify Provisioning Attributes |
| **OrderService** | Re-rate |
| **ProductService** | Delete Price Plan, Resell Templates |
| **TicketManagementService** | Templates, Classifications, Response Templates, Departments, Incident Types, Tags |

## Resources

- [OneBill Developer Guide](https://dev.onebillsoftware.com/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE)
