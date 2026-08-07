# Changelog

## Unreleased

Orders, quotes and documents. Everything below was verified against a live tenant; OneBill's
published OpenAPI declares `application/json` for all 152 of its responses, never mentions PDFs,
and carries the quote operations as empty stubs.

### New Features

- **Order > Get Quote Document** downloads the rendered quote PDF as a binary output item, the
  same document the OneBill interface produces, including its acceptance and signature section.
  The endpoint is entirely undocumented. An optional **Version** retrieves a superseded revision —
  a full audit trail of what a customer was shown at each revision — and **Ignore If Missing**
  turns the common "this order never had a quote" case into a flag instead of stopping the run.
- **Order > Get Many gained a State filter and an Include Quotes toggle.** OneBill returns every
  order *except* quotes and reports a total for that narrowed set, so a tenant's quotes were
  simply missing with nothing in the response to show it. Include Quotes issues the second search
  and merges on order number.
- **Subscriber > Get Documents** returns the files uploaded against an account — signed contracts
  and similar — one binary item per document, with a **Metadata Only** option since the files are
  sent inline and make the response large. Nothing generated lives here, not even invoices.

### Fixed

- **A missing quote document is no longer reported as an authentication failure.** OneBill returns
  `USER_AUTHENTICATION_FAILED` at HTTP 200 for an order that simply has no document, with a valid
  token whose next request succeeds. Reacting by refreshing the token was measured firing on ~85%
  of orders and minting a token per miss; the node keys on error code `11ORDWS0049` instead and
  treats absence as an ordinary outcome.

### Notes

Only `version` selects a quote document revision. `quoteVersion`, `docVersion`, `revision` and
`quoteDocName` are each accepted and **silently ignored, returning the current document** — so a
wrong parameter name hands over the wrong file and looks successful. The node sends `version`.

Of the order-list filter parameters, only `searchBy`/`searchString` does anything. `orderType`,
`orderStatus`, `status`, `state`, `orderState`, `orderCategory`, `includeQuote(s)`, `isQuote`,
`quote` and `showQuote` are all accepted and ignored, returning the full unfiltered set.

## 0.2.3 (2026-08-01)

Corrects a regression introduced in 0.2.1. Every filter change below is now verified against a
live tenant rather than inferred from a neighbouring endpoint — the mistake that caused the
regression.

### Fixed

- **Invoice > Get Many: the Account Number filter is working again.** 0.2.1 changed it to send
  `searchBy`/`searchString`, on the assumption that the invoice endpoint searched the same way
  the order endpoint does. It does not: invoices take named parameters directly, and a
  `searchBy` pair is ignored, so every account's invoices came back. Reverted to the bare
  parameter, which is what the endpoint honours. Anyone on 0.2.1 or 0.2.2 filtering invoices by
  account was receiving unfiltered results.

### New Features

- **Invoice > Get Many gained `Invoice Number` and `Status` filters.** Both are honoured by the
  API and neither was previously available.

### Improvements

- **`Search By` is now a dropdown on Subscriber, Lead and Product**, listing only values
  confirmed to work: account number, company name and external ID for subscribers and leads;
  category name for products, where product name and code are rejected outright. Expression
  mode still accepts any value. Order and Invoice were done in 0.2.2 and 0.2.1 respectively.
- **`Search By`/`Search String` removed from Invoice > Get Many**, where they had no effect.

### Notes

The six list endpoints do not share one search convention. Subscriber, Lead, Order and Product
select a field with `searchBy` and match it with `searchString`; Invoice takes named parameters.
An unrecognised `searchBy` returns no rows on Subscriber, Lead and Product, but is silently
ignored on Order, which returns everything — so a mistyped search there fails invisibly.

## 0.2.2 (2026-07-31)

### Fixed

- **A search string with no field to search on now raises an error** instead of quietly
  returning everything. OneBill's list endpoints choose the field to match with `searchBy`
  and the value with `searchString`, and ignore a search string that arrives on its own — so
  the filter read as applied when it was not. Affects Get Many on Subscriber, Lead, Product,
  Bundle, Order and Invoice. The message names the filter to add.

### Improvements

- **Order > Get Many and Invoice > Get Many: 'Search By' is now a dropdown** rather than a
  free-text field, offering Account Number and Order Number (Invoice Number for invoices).
  Expression mode still accepts any value the API takes, so nothing is locked out. Guessing
  the exact spelling of an API field name was never a reasonable thing to ask.

## 0.2.1 (2026-07-31)

### Fixed

- **Account Number filters were silently ignored** on Order > Get Many and Invoice > Get Many,
  returning every account's records up to the limit rather than the one asked for. The account
  number was sent as a plain query parameter, which those endpoints do not read — the search
  selects its field with `searchBy` and matches it with `searchString`. Account Number is now a
  shortcut that sets both.
- **Search String had no effect** on the same two operations, because there was no `Search By`
  beside it and a search string with no field to search on is ignored. `Search By` has been
  added to both.

### Improvements

- **Subscriber > Get Many: Status is now shown on the form** rather than hidden among the
  optional filters, and accepts more than one value. OneBill returns active accounts only and
  does not say so, so the default is visible as `Active` rather than being an unset field whose
  effect is invisible. The API takes one status per search and has no "all" value, so selecting
  several runs one search per status and merges the results on account number. Existing
  workflows are unaffected: the default returns what an unset filter returned.

## 0.2.0 (2026-07-31)

Data-integrity release. Several operations were silently losing data against a live OneBill
tenant — truncating lists, and clearing fields nobody asked to change. All of the behaviour
described below was verified against a live tenant rather than inferred from the OpenAPI
spec, which is a Postman export and is wrong in places.

### Breaking Changes

- **Removed the `Custom Fields (JSON)` input** from Subscriber, Lead, Partner and Vendor. The
  `customFields` key does not exist in the OneBill API, so anything entered there was silently
  discarded — on Subscriber the value was not even parsed, so the literal string `"{}"` was
  posted. The real custom-field surface is `accountAttribute`, now exposed properly (see below).
  Workflows using this field were never writing data and should move to `Custom Fields`.

### Fixed

- **"Return All" stopped after the first page** on any endpoint that does not report a
  `totalCount` — Lead and Invoice list operations returned at most 50 records and looked
  successful. Pagination now terminates on a short page, treats `totalCount` as an optimisation
  where the endpoint supplies it, and advances by the number of rows actually received rather
  than the requested page size (the Product endpoint ignores `resultCount` entirely). If an
  endpoint ignores the `startCount` offset the node now raises an error instead of returning a
  silently truncated list.
- **Updates cleared fields that were not being edited.** OneBill applies a PUT as a whole-record
  replace, so sending only the changed keys wiped unrelated data — a partial update was observed
  clearing `quoteTemplateName`, populating `accountOwnerId` and moving `nextCycleDate`.
  Subscriber Update, Lead Update, and the Add/Update/Remove Contact operations now read the full
  record and write it back with only the requested change applied. Contact password hashes and
  custom field values survive the round-trip.
- **Failed requests were reported as empty results.** OneBill returns some failures in-band as
  HTTP 200 with no data, so a rejected query was indistinguishable from a genuinely empty list.
  List operations now raise the error instead of returning `[]`.
- **Blank custom-field placeholders are stripped before writing.** OneBill returns an empty
  instance of every declared custom-field group on every record; echoing those back writes
  meaningless rows, and fails outright if any field in the group is marked Mandatory.

### New Features

- **Custom Fields** on Subscriber and Lead, create and update. Add a row, choose the group and
  field from live dropdowns read from the tenant's own declarations, set a value, and pick which
  repeat of the group it belongs to. Instance numbering is positional and the node assigns the
  underlying identifiers, which OneBill requires the caller to supply. Existing values that are
  not listed are left untouched.
- **Account Attributes (JSON)** on Subscriber and Lead, create and update — the raw
  `accountAttribute` array, for cases the structured input does not cover, such as deleting an
  instance.
- **External ID** on Subscriber and Lead (create and update), and Partner and Vendor (create).
  Maximum 64 characters; OneBill rejects the whole update if the value is longer.
- **Status filter** on Subscriber → Get Many. OneBill returns only active accounts when no
  status is given, without indicating it, so closed accounts were simply missing. Accepts
  `Active`, `Closed` and `Inactive`; the other statuses shown in the OneBill interface are
  rejected by the API.

### Improvements

- Added warnings to the operations that still send only the fields you set — Ticket Update,
  Invoice Modify, and the raw-JSON update bodies on Product, Bundle, Partner, Vendor and Order.
  These may clear values that are left out, which is not yet verified for those endpoints.

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
