# Changelog

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
