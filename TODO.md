# TODO - OneBill n8n Node API Coverage

## Currently Implemented (v0.0.1)

31 operations across 6 resources covering the core billing workflow.

### Subscriber (10 operations)
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
- [x] Get Many — `GET /rest/PaymentService/v1/payments`
- [x] Get for Subscriber — `GET /rest/PaymentService/v1/payments/{accountNumber}`

### Product (5 operations)
- [x] Create — `POST /rest/ProductService/v1/product`
- [x] Get — `GET /rest/ProductService/v1/products/{productCode}`
- [x] Get Many — `GET /rest/ProductService/v1/products`
- [x] Update — `PUT /rest/ProductService/v1/product`
- [x] Delete — `DELETE /rest/ProductService/v1/products/{productCode}`

### Ticket (4 operations)
- [x] Create — `POST /rest/TicketManagementService/v1/ticket`
- [x] Get — `GET /rest/TicketManagementService/v1/tickets/{ticketNumber}`
- [x] Update — `PUT /rest/TicketManagementService/v1/tickets/{ticketNumber}`
- [x] Get History — `GET /rest/TicketManagementService/v1/searchTicketHistory`

---

## Not Yet Implemented

### Existing Resource Gaps

#### SubscriberService — Additional Operations
- [ ] Create Lead — `POST /rest/SubscriberService/v1/lead`
- [ ] Get Lead — `GET /rest/SubscriberService/v1/leads/{accountNumber}`
- [ ] Get Many Leads — `GET /rest/SubscriberService/v1/leads`
- [ ] Update Lead — `PUT /rest/SubscriberService/v1/leads/{accountNumber}`
- [ ] Convert Lead to Subscriber — `POST /rest/SubscriberService/v1/subscribers/{accountNumber}/leadToSubscriber`
- [ ] Generate Bill — `POST /rest/SubscriberService/v1/subscribers/{accountNumber}/bill`
- [ ] Delete Bill Transactions — `DELETE /rest/SubscriberService/v1/subscribers/{accountNumber}/bills/{billNumber}/transactions`
- [ ] Swap Provisioning Attributes — `PUT /rest/SubscriberService/v1/subscribers/subscriptions/swapProvisioningAttributes`
- [ ] Modify Provisioning Attributes — `PUT /rest/SubscriberService/v1/subscribers/{accountNumber}/subscriptions/modifyProvisioningAttributes`

#### OrderService — Additional Operations
- [ ] Re-Rate Orders — `PUT /rest/OrderService/v1/orders/reRate`

#### PaymentService — Additional Operations
- [ ] Delete Payment Profile — `DELETE /rest/PaymentService/v1/payment/{accountNumber}/payinfo/{paymentProfileId}`

#### ProductService — Additional Operations
- [ ] Create Bundle — `POST /rest/ProductService/v1/products/bundle`
- [ ] Get Bundle — `GET /rest/ProductService/v1/bundles/{bundleCode}`
- [ ] Get Many Bundles — `GET /rest/ProductService/v1/bundles`
- [ ] Update Bundle — `PUT /rest/ProductService/v1/products/bundle`
- [ ] Delete Price Plan — `DELETE /rest/ProductService/v1/products/priceplan/{pricePlanId}`
- [ ] Create Resell Template — `POST /rest/ProductService/v1/products/resellTemplate`
- [ ] Get Resell Template — `GET /rest/ProductService/v1/products/resellTemplate/{templateName}`
- [ ] Update Resell Template — `PUT /rest/ProductService/v1/products/resellTemplate`
- [ ] Resell Product — `POST /rest/ProductService/v1/resell`

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

#### PartnerService (new resource)
- [ ] Create Partner — `POST /rest/PartnerService/v1/partners`
- [ ] Get Partner — `GET /rest/PartnerService/v1/partners/{accountNumber}`
- [ ] Update Partner — `PUT /rest/PartnerService/v1/partners`
- [ ] Delete Partner — `DELETE /rest/PartnerService/v1/partners/{accountNumber}`
- [ ] Suspend Partner — `PUT /rest/PartnerService/v1/partners/{accountNumber}/suspend`
- [ ] Resume Partner — `PUT /rest/PartnerService/v1/partners/{accountNumber}/resume`
- [ ] Delete Partner Contacts — `PUT /rest/PartnerService/v1/channel/deleteContacts/{accountNumber}`
- [ ] Create Vendor — `POST /rest/PartnerService/v1/vendor`
- [ ] Get Vendor — `GET /rest/PartnerService/v1/vendor/{accountNumber}`
- [ ] Update Vendor — `PUT /rest/PartnerService/v1/vendor`

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
1. Lead management (SubscriberService) — lead-to-subscriber conversion is a core sales workflow
2. Generate Bill (SubscriberService) — on-demand billing
3. PartnerService — channel partner management
4. UserService — user/role management

### Medium Priority (useful for advanced billing)
5. Product Bundles (ProductService)
6. PromotionService — discounts, coupons, trials
7. Delete Payment Profile (PaymentService)
8. Re-Rate Orders (OrderService)

### Lower Priority (admin/configuration)
9. RuleService — business rule management
10. TicketManagementService admin operations (departments, templates, classifications)
11. BillingService / UtilityService / CommonService
