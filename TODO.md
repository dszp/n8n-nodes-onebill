# TODO - OneBill n8n Node API Coverage

## Currently Implemented (v0.1.0)

58 operations across 10 resources covering core billing, partner, and product workflows.

### Subscriber (14 operations)
- [x] Create — `POST /rest/SubscriberService/v1/subscriber`
- [x] Get — `GET /rest/SubscriberService/v1/subscribers/{accountNumber}`
- [x] Get Many — `GET /rest/SubscriberService/v1/subscribers`
- [x] Update — `PUT /rest/SubscriberService/v1/subscribers/{accountNumber}`
- [x] Close — `DELETE /rest/SubscriberService/v1/subscribers/{accountNumber}`
- [x] Suspend — `PUT /rest/SubscriberService/v1/subscribers/{accountNumber}/suspend`
- [x] Resume — `PUT /rest/SubscriberService/v1/subscribers/{accountNumber}/resume`
- [x] Reopen — `POST /rest/SubscriberService/v1/subscribers/reopen/{accountNumber}`
- [x] Get Balance — `GET /rest/SubscriberService/v1/subscribers/{accountNumber}/balance`
- [x] Get Subscriptions — `GET /rest/SubscriberService/v1/subscribers/{accountNumber}/subscriptions`
- [x] Add Contact — GET-then-PUT on `/rest/SubscriberService/v1/subscribers/{accountNumber}`
- [x] Get Contacts — `GET /rest/SubscriberService/v1/subscribers/{accountNumber}` (extracts contact array)
- [x] Update Contact — GET-then-PUT on `/rest/SubscriberService/v1/subscribers/{accountNumber}`
- [x] Remove Contact — GET-then-PUT on `/rest/SubscriberService/v1/subscribers/{accountNumber}`

### Lead (5 operations)
- [x] Create — `POST /rest/SubscriberService/v1/lead`
- [x] Get — `GET /rest/SubscriberService/v1/leads/{accountNumber}`
- [x] Get Many — `GET /rest/SubscriberService/v1/leads`
- [x] Update — `PUT /rest/SubscriberService/v1/leads/{accountNumber}`
- [x] Convert to Subscriber — `POST /rest/SubscriberService/v1/subscribers/{accountNumber}/leadToSubscriber`

### Order (6 operations)
- [x] Create — `POST /rest/OrderService/v1/order`
- [x] Get — `GET /rest/OrderService/v1/orders/{orderNumber}`
- [x] Get Many — `GET /rest/OrderService/v1/orders`
- [x] Validate — `POST /rest/OrderService/v1/order/validate`
- [x] Activate — `PUT /rest/OrderService/v1/orders/{orderNumber}/activate`
- [x] Update Quote — `PUT /rest/OrderService/v1/orders/{orderNumber}`

### Invoice (3 operations)
- [x] Get — `GET /rest/InvoiceService/v1/invoices/{invoiceNumber}`
- [x] Get Many — `GET /rest/InvoiceService/v1/invoices`
- [x] Modify — `PUT /rest/InvoiceService/v1/invoices/{invoiceNumber}/modify`

### Payment (3 operations)
- [x] Create — `POST /rest/PaymentService/v1/payment`
- [x] Get Many — `GET /rest/PaymentService/v1/payments` (no API pagination; date range filters only, defaults to last month start; clearing Range From returns all payments)
- [x] Get for Subscriber — `GET /rest/PaymentService/v1/payments/{accountNumber}`

### Product (5 operations)
- [x] Create — `POST /rest/ProductService/v1/product`
- [x] Get — `GET /rest/ProductService/v1/products/{productCode}`
- [x] Get Many — `GET /rest/ProductService/v1/products`
- [x] Update — `PUT /rest/ProductService/v1/product`
- [x] Delete — `DELETE /rest/ProductService/v1/products/{productCode}`

### Bundle (4 operations)
- [x] Create — `POST /rest/ProductService/v1/products/bundle`
- [x] Get — `GET /rest/ProductService/v1/bundles/{bundleCode}`
- [x] Get Many — `GET /rest/ProductService/v1/bundles`
- [x] Update — `PUT /rest/ProductService/v1/products/bundle`

### Partner (7 operations)
- [x] Create — `POST /rest/PartnerService/v1/partners`
- [x] Get — `GET /rest/PartnerService/v1/partners/{accountNumber}`
- [x] Update — `PUT /rest/PartnerService/v1/partners`
- [x] Delete — `DELETE /rest/PartnerService/v1/partners/{accountNumber}`
- [x] Suspend — `PUT /rest/PartnerService/v1/partners/{accountNumber}/suspend`
- [x] Resume — `PUT /rest/PartnerService/v1/partners/{accountNumber}/resume`
- [x] Delete Contacts — `PUT /rest/PartnerService/v1/channel/deleteContacts/{accountNumber}`

### Vendor (3 operations)
- [x] Create — `POST /rest/PartnerService/v1/vendor`
- [x] Get — `GET /rest/PartnerService/v1/vendor/{accountNumber}`
- [x] Update — `PUT /rest/PartnerService/v1/vendor`

### Ticket (4 operations)
- [x] Create — `POST /rest/TicketManagementService/v1/ticket`
- [x] Get — `GET /rest/TicketManagementService/v1/tickets/{ticketNumber}`
- [x] Update — `PUT /rest/TicketManagementService/v1/tickets/{ticketNumber}`
- [x] Get History — `GET /rest/TicketManagementService/v1/searchTicketHistory`

---

## Not Yet Implemented

### Existing Resource Gaps

#### SubscriberService — Additional Operations
- [ ] Generate Bill — `POST /rest/SubscriberService/v1/subscribers/{accountNumber}/bill`
- [ ] Delete Bill Transactions — `DELETE /rest/SubscriberService/v1/subscribers/{accountNumber}/bills/{billNumber}/transactions`
- [ ] Swap Provisioning Attributes — `PUT /rest/SubscriberService/v1/subscribers/subscriptions/swapProvisioningAttributes`
- [ ] Modify Provisioning Attributes — `PUT /rest/SubscriberService/v1/subscribers/{accountNumber}/subscriptions/modifyProvisioningAttributes`

#### OrderService — Additional Operations
- [ ] Re-Rate Orders — `PUT /rest/OrderService/v1/orders/reRate`

#### PaymentService — Additional Operations
- [ ] Delete Payment Profile — `DELETE /rest/PaymentService/v1/payment/{accountNumber}/payinfo/{paymentProfileId}`

#### ProductService — Additional Operations
- [ ] Delete Bundle — `DELETE /rest/ProductService/v1/bundles/{bundleCode}` (if supported)
- [ ] Delete Price Plan — `DELETE /rest/ProductService/v1/products/priceplan/{pricePlanId}`
- [ ] Create Resell Template — `POST /rest/ProductService/v1/products/resellTemplate`
- [ ] Get Resell Template — `GET /rest/ProductService/v1/products/resellTemplate/{templateName}`
- [ ] Update Resell Template — `PUT /rest/ProductService/v1/products/resellTemplate`
- [ ] Resell Product — `POST /rest/ProductService/v1/resell`

#### PartnerService — Additional Operations
- [ ] Get Many Partners — `GET /rest/PartnerService/v1/partners` (if list endpoint exists)
- [ ] Get Many Vendors — `GET /rest/PartnerService/v1/vendors` (if list endpoint exists)

#### TicketManagementService — Additional Operations
- [ ] Bulk Update Tickets — `PUT /rest/TicketManagementService/v1/tickets`
- [ ] Get Incident Types — `GET /rest/TicketManagementService/v1/getIncidentTypes`
- [ ] Get Incident Sub-Types — `GET /rest/TicketManagementService/v1/getIncidentSubTypes/{incidentTypeId}`
- [ ] Search Departments — `GET /rest/TicketManagementService/v1/searchDepartments`
- [ ] Create Department — `POST /rest/TicketManagementService/v1/department`
- [ ] Update Department — `PUT /rest/TicketManagementService/v1/departments`
- [ ] Delete Department — `DELETE /rest/TicketManagementService/v1/departments/{departmentId}`
- [ ] Search Ticket Classifications — `GET /rest/TicketManagementService/v1/searchTicketClassifications`
- [ ] Create/Update Ticket Classification — `POST /rest/TicketManagementService/v1/ticketClassifications`
- [ ] Update Ticket Classification — `PUT /rest/TicketManagementService/v1/ticketClassifications`
- [ ] Search Ticket Tags — `GET /rest/TicketManagementService/v1/searchTicketTags`
- [ ] Get Ticket Template Names — `GET /rest/TicketManagementService/v1/ticketTemplateNames`
- [ ] Create Ticket Template — `POST /rest/TicketManagementService/v1/ticketTemplate`
- [ ] Update Ticket Template — `PUT /rest/TicketManagementService/v1/ticketTemplates`
- [ ] Delete Ticket Template — `DELETE /rest/TicketManagementService/v1/ticketTemplates/{templateName}`
- [ ] Get Ticket Response Templates — `GET /rest/TicketManagementService/v1/ticketResponseTemplates`
- [ ] Create Ticket Response Template — `POST /rest/TicketManagementService/v1/ticketResponseTemplate`
- [ ] Update Ticket Response Template — `PUT /rest/TicketManagementService/v1/ticketResponseTemplates/{responseId}`
- [ ] Delete Ticket Response Template — `DELETE /rest/TicketManagementService/v1/ticketResponseTemplates/{responseId}`

---

### New Resources (Not Yet Implemented)

#### PromotionService (new resource)
- [ ] Create Counter — `POST /rest/PromotionService/v1/promotions/counter`
- [ ] Get Many Counters — `GET /rest/PromotionService/v1/promotions/counters`
- [ ] Get Counter — `GET /rest/PromotionService/v1/promotions/counters/{counterCode}`
- [ ] Update Counter — `PUT /rest/PromotionService/v1/promotions/counter`
- [ ] Create Coupon — `POST /rest/PromotionService/v1/promotions/coupon`
- [ ] Get Many Coupons — `GET /rest/PromotionService/v1/promotions/coupons`
- [ ] Get Coupon — `GET /rest/PromotionService/v1/promotions/coupons/{couponCode}`
- [ ] Update Coupon — `PUT /rest/PromotionService/v1/promotions/coupons/{couponCode}`
- [ ] Delete Coupon — `DELETE /rest/PromotionService/v1/promotions/coupons/{couponCode}`
- [ ] Create Discount — `POST /rest/PromotionService/v1/promotions/discount`
- [ ] Get Many Discounts — `GET /rest/PromotionService/v1/promotions/discounts`
- [ ] Get Discount — `GET /rest/PromotionService/v1/promotions/discounts/{discountCode}`
- [ ] Create Grant — `POST /rest/PromotionService/v1/promotions/grant`
- [ ] Get Many Grants — `GET /rest/PromotionService/v1/promotions/grants`
- [ ] Get Grant — `GET /rest/PromotionService/v1/promotions/grants/{grantCode}`
- [ ] Update Grant — `PUT /rest/PromotionService/v1/promotions/grant`
- [ ] Create Trial — `POST /rest/PromotionService/v1/promotions/trial`
- [ ] Get Many Trials — `GET /rest/PromotionService/v1/promotions/trials`
- [ ] Get Trial — `GET /rest/PromotionService/v1/promotions/trials/{trialCode}`
- [ ] Update Trial — `PUT /rest/PromotionService/v1/promotions/trials/{trialCode}`
- [ ] Get Resource Types — `GET /rest/PromotionService/v1/promotions/resourcetypes`

#### RuleService (new resource)
The Rule Service has a generic CRUD pattern with context-specific rule types.
- [ ] Create Rule — `POST /rest/RuleService/v1/rules` (with context-specific body)
- [ ] Get Rule — `GET /RuleService/v1/rules/{contextName}/{ruleName}`
- [ ] Update Rule — `PUT /rest/RuleService/v1/rules`
- [ ] Delete Rule — `DELETE /RuleService/v1/rules/{contextName}/{ruleName}`

Rule contexts: Bill, BillCharge, ChangePlanValidation, Collection, CollectionExit, Discount, LateFee, OrderValidation, PartnerBillCharge, PartnerBillDiscount, PartnerLateFee, Payment

Note: The OpenAPI spec lists many context-specific endpoints (e.g. `POST /rest/RuleService/v1/rules/Bill`), but these appear to be the same generic endpoint with different context values. A single set of CRUD operations with a "Rule Context" dropdown would cover all of them.

#### UserService (new resource)
- [ ] Create User — `POST /rest/UserService/v1/user`
- [ ] Get User — `GET /rest/UserService/v1/users/{userName}`
- [ ] Get Many Users — `GET /rest/UserService/v1/users`
- [ ] Update User — `PUT /rest/UserService/v1/user`
- [ ] Get Roles — `GET /rest/UserService/v1/users/roles`

#### BillingService (new resource)
- [ ] Transaction-Level Bill Now — `POST /rest/BillingService/v1/transactionLevelBillNow`

#### UtilityService (new resource)
- [ ] Create Custom Transactions — `POST /rest/UtilityService/v1/custom/transactions`
- [ ] Create Transactions — `POST /rest/UtilityService/v1/transactions`
- [ ] Export Usage — `POST /rest/UtilityService/v1/export/usage`

#### CommonService (new resource)
- [ ] Get Custom Lists with Hierarchy — `POST /rest/CommonService/v1/customListsWithHierarchy`

---

## Implementation Priority Suggestions

### High Priority (commonly needed in billing workflows)
1. Generate Bill (SubscriberService) — on-demand billing
2. UserService — user/role management
3. Delete Payment Profile (PaymentService)

### Medium Priority (useful for advanced billing)
4. PromotionService — discounts, coupons, trials
5. Re-Rate Orders (OrderService)
6. Product resell templates and bundles

### Lower Priority (admin/configuration)
7. RuleService — business rule management
8. TicketManagementService admin operations (departments, templates, classifications)
9. BillingService / UtilityService / CommonService

### Additional Notes
- The Subscriber resource has an "address" array with multiple addresses. Separate direct review/editing of these would be beneficial, similar to the Contact operations added in v0.1.0.
- Partner and Vendor resources may benefit from Get Many operations if OneBill supports list endpoints for them (not documented in OpenAPI spec).
- The OneBill API does not provide a way to filter subscribers by associated agent (`agentAccId`). Getting agent associations requires individual Get calls per subscriber.
