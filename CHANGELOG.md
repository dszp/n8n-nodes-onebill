# Changelog

## Unreleased

### Security

- **HTTPS enforcement**: Base URL is now validated to require HTTPS before any API requests, preventing accidental credential transmission over unencrypted HTTP
- **JSON input validation**: All JSON.parse() calls now provide user-friendly error messages naming the specific field with invalid JSON, instead of raw SyntaxError messages
- **GitHub Actions**: Upgraded actions/checkout and actions/setup-node from v5 to v6, pinned to full commit SHAs for supply chain hardening

## 0.1.0 (2026-03-08)

### New Features

- **Subscriber**: Added 4 contact management operations:
  - **Add Contact**: Add a new contact to a subscriber (GET-then-PUT pattern)
  - **Get Contacts**: Retrieve all contacts for a subscriber
  - **Update Contact**: Update a specific contact by index on a subscriber
  - **Remove Contact**: Remove a specific contact by index from a subscriber
- **Lead**: New resource with 5 operations:
  - Create, Get, Get Many, Update, Convert to Subscriber
- **Bundle**: New resource with 4 operations:
  - Create, Get, Get Many, Update
- **Partner**: New resource with 7 operations:
  - Create, Delete, Delete Contacts, Get, Resume, Suspend, Update
- **Vendor**: New resource with 3 operations:
  - Create, Get, Update
- Now 10 resources with 58 operations (up from 6 resources with 35 operations)

### Improvements

- **Contact fields**: Replaced Communication Points JSON blob with individual fields (Email Address, Contact Phone, Cell Phone, Alternate Phone) for Add Contact and Update Contact
- **Contact fields**: Added user detail fields (Enable Two-Step Verification, Username, User Role Name) to Add Contact and Update Contact
- **Contact fields**: Added Contact Type dropdown (Primary, Other, System) for Add Contact and Update Contact
- **Contact fields**: Renamed Designation to Title (Designation) to match OneBill UI terminology
- **Contact fields**: Default contact fields (First Name, Last Name, Primary Contact, Billing Contact, Contact Phone, Locale, User Role Name) now display by default on Add Contact and Update Contact
- **Contact fields**: Default Locale to en_US for new contacts
- **Contact fields**: Email is now a required standalone field for Add Contact
- **Subscriber**: Added Include Password Hashes toggle for contact responses
- **Subscriber**: Improved response cleanup for subscriber and partner/agent data
- **Get Contacts**: Contact index (`_contactIndex`) now appears as first field in output

### Bug Fixes

- **Payment → Get Many**: Fixed pagination and removed unnecessary Return All/Limit controls
- **Payment → Get Many**: Improved date range handling
- **Lead → Get Many**: Fixed `dataKey` for correct response extraction
- **Pagination**: Return empty array instead of error when paginated endpoint has no results

### Documentation

- **README**: Updated with full endpoint coverage tables (implemented and not-yet-implemented)

## 0.0.3 (2026-03-06)

### Bug Fixes

- **Payment → Get for Subscriber**: Fixed response unwrapping so each payment record is returned as a separate n8n item instead of being nested inside a wrapper object

## 0.0.2 (2026-03-06)

No functional changes. Released to test the automated npm publish workflow via GitHub Actions OIDC trusted publishing.

## 0.0.1 (2026-03-06)

### Initial Release

- Programmatic n8n community node for the OneBill billing and subscription management API
- OAuth2 password grant authentication with SHA256 password hashing
- Token caching with automatic refresh on 401
- 6 resources with 35 operations:
  - **Subscriber**: Create, Get, Get Many, Update, Close, Suspend, Resume, Reopen, Get Balance, Get Subscriptions
  - **Order**: Create, Get, Get Many, Validate, Activate, Update Quote
  - **Invoice**: Get, Get Many, Modify
  - **Payment**: Create, Get Many, Get for Subscriber
  - **Product**: Create, Get, Get Many, Update, Delete
  - **Ticket**: Create, Get, Update, Get History
- Pagination support via startCount/resultCount query params
- AI agent tool compatibility (`usableAsTool: true`)
- Credential test with OAuth token validation
