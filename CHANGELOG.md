# Changelog

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
