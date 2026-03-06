# CLAUDE.md - n8n-nodes-onebill

## Project Overview

n8n community node for the OneBill billing and subscription management REST API. Published to npm as `@dszp/n8n-nodes-onebill`. Licensed MIT. Author: David Szpunar.

- **Type**: Programmatic n8n node (not declarative) — chosen for custom OAuth2 password grant with SHA256 password hashing and mandatory X-OB-Tenant-Identifier header
- **Node API Version**: 1 (stable)
- **Package manager**: npm
- **TypeScript target**: ES2019, strict mode enabled
- **Current version**: Check `package.json` for latest

## Repository Structure

```
credentials/
  OneBillApi.credentials.ts    # Base URL, Tenant ID, Client Secret, Username, Password, Scope
  oneBill.svg                  # Icon for credential dialog
nodes/OneBill/
  OneBill.node.ts              # Main node entry (resource/operation routing)
  OneBill.node.json            # Codex metadata (category: Finance & Accounting)
  oneBill.svg                  # Node icon
  GenericFunctions.ts          # Token mgmt, HTTP helpers, pagination
  descriptions/                # One file per resource (6 total)
    SubscriberDescription.ts
    OrderDescription.ts
    InvoiceDescription.ts
    PaymentDescription.ts
    ProductDescription.ts
    TicketDescription.ts
openapi/                       # API reference (not shipped in npm package)
  OneBill.OpenAPI3.0.json
```

## Key Commands

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript (n8n-node build)
npm run dev          # Launch n8n locally with this node loaded
npm run lint         # Run n8n node linter
npm run lint:fix     # Auto-fix lint issues
npm run release      # Publish release via release-it
```

## Architecture & Key Patterns

### Authentication (OAuth2 Password Grant)
- POST `{baseUrl}/oauth/token` with query params: `grant_type=password`, `client_id={tenantId}`, `client_secret`, `username`, `password={sha256hex}`, `scope=trust`
- Password is SHA256-hashed (Node.js `crypto.createHash('sha256')`) before sending
- Returns `access_token` with `expires_in` (3600s = 1h)
- Token cached in module-level `Map<tenantId:username, {token, expiresAt}>` with 5-min safety margin
- Auto-refresh on 401 response (clear cache, re-authenticate once)

### Required Headers (every API request)
- `Authorization: Bearer {access_token}`
- `Content-Type: application/json`
- `Accept: application/json`
- `X-OB-Tenant-Identifier: {tenantId}` (mandatory since January 2025)

### Base URL
- Default: `https://app.onebillsoftware.com` (configurable in credentials)

### GenericFunctions.ts
- `hashPassword(password)` — SHA256 hex digest
- `getAccessToken(context, credentials)` — token acquisition with caching
- `clearTokenCache(cacheKey)` — removes cached token
- `oneBillApiRequest(method, endpoint, body, qs)` — authenticated request with Bearer token + tenant header
- `oneBillApiRequestAllItems(method, endpoint, body, qs, dataKey, limit)` — GET-based pagination (startCount/resultCount)

### API Patterns
- **List endpoints use GET** with query params for pagination (`startCount`, `resultCount`, `countRequired`)
- **API path pattern**: `/rest/{ServiceName}/v1/{resource}`
- **Services**: ProductService, PromotionService, OrderService, SubscriberService, PartnerService, PaymentService, InvoiceService, BillingService, TicketManagementService, RuleService, UserService, UtilityService, CommonService

### Resources (6 in v0.0.1)
Subscriber, Order, Invoice, Payment, Product, Ticket

### Future Resources (planned)
Bundle, Lead, Partner, Vendor, Promotions (Coupon, Discount, Grant, Trial, Counter), Rules, User, Utility

### Node Features
- `usableAsTool: true` for AI agent compatibility
- `continueOnFail()` error handling on every item
- `constructExecutionMetaData` for proper item linking
- Delete/Close operations return `{ deleted: true }`
- `returnAll`/`limit` pattern on all list operations

## Code Style & Conventions

### Formatting (`.prettierrc.js`)
- Tabs (width 2), semicolons, single quotes, trailing commas (all)
- Print width: 100, LF line endings
- Arrow parens: always

### Linting
- ESLint flat config (`eslint.config.mjs`) with n8n node linter rules via `@n8n/node-cli`
- Must pass lint before publishing: `npm run lint`
- One suppression: `no-deprecated-workflow-functions` for credential test (ICredentialTestFunctions only exposes `helpers.request`)

### TypeScript
- Strict mode with all checks enabled
- `useUnknownInCatchVariables: false` (exception)
- Incremental compilation, declaration files, source maps

## n8n Node Development Rules

Detailed n8n development standards are in `.claude/rules/` (auto-loaded when editing relevant files):

- @.claude/rules/n8n-ui-standards.md — UI text case, terminology, field layout, progressive disclosure
- @.claude/rules/n8n-code-standards.md — data handling, file structure, verification guidelines
- @.claude/rules/n8n-operations-naming.md — CRUD vocabulary, operation naming, error messages
- @.claude/rules/n8n-credentials.md — credential file structure, auth types
- @.claude/rules/n8n-http-helpers.md — HTTP request helpers, request options, body types

## CI/CD

- **No automated tests** — testing is manual via `npm run dev` against OneBill instances
- CI workflow TBD

## Key Documentation Links

- n8n Node Development: https://docs.n8n.io/integrations/creating-nodes/overview/
- OneBill Developer Guide: https://dev.onebillsoftware.com/
- OpenAPI spec: `openapi/OneBill.OpenAPI3.0.json` (in project, not shipped)

## Development Notes

- OneBill API version: 1.0.0
- The full API has 182 operations across 13 services; v0.0.1 implements the 6 most common resources
- Complex nested structures (order elements, price plans) are exposed as JSON input fields
- Partner proxy header (`proxy_accountNumber`) support planned for future versions
- See `CHANGELOG.md` for version history
