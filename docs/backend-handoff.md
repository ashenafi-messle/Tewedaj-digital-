# TEWEDAJ Backend Handoff Requirements

## Overview

This document outlines the backend requirements derived from the current Tewdaj frontend implementation. The frontend is a complete UI prototype with mock data and client-side business logic. The backend must provide authoritative data persistence, authentication, authorization, financial calculations, and payment integrations.

## Critical Architecture Decision Required

**Build System Conflict**: The project currently has both Vite (`vite.config.ts`, `src/main.tsx`) and Next.js (`next.config.js`, `src/app/`) configurations. This must be resolved before backend integration. The project should standardize on **Next.js App Router** as the primary framework.

## Domain Entities Required

### User & Authentication
- **User**: id, name, email, phone, role, avatar, businessName, businessCategory, location, vehicleType, serviceArea, preferredPayment, rating, joinedDate, creditScore, nationalIdNumber
- **Roles**: merchant, wholesaler, delivery, delivery_partner, customer, admin
- **Session Management**: JWT tokens, refresh tokens, session expiration

### Credit System
- **CreditAgreement**: id, agreementNumber, merchantId, merchantName, merchantPhone, merchantLocation, customerId, customerName, customerPhone, customerIdNumber, goodsDescription, totalAmount, paidAmount, remainingAmount, creationDate, dueDate, terms, status
- **CreditRepayment**: id, creditAgreementId, amount, date, paymentMethod, referenceNumber, status, recordedBy
- **CreditAuditEvent**: id, type, message, timestamp
- **CreditStatus**: pending, active, partially_paid, paid, overdue, cancelled

### Payment & Authorization
- **BankDetails**: bankName, accountNumber, accountHolderName, branchName
- **PaymentPartnerDetails**: telebirrPhone, cbeBirrPhone, coopPayPhone, preferredProvider
- **AuthorizationMandate**: provider, mandateReference, authorizedAt, isOtpVerified, customerOtpPhone, otpAuthCode, otpVerifiedTimestamp, mandateStatus

### Products & Inventory
- **Product**: id, name, amharicName, supplierId, supplierName, supplierLocation, supplierRating, category, image, wholesalePrice, suggestedRetailPrice, availableQuantity, unit, minOrderQuantity, deliveryEstimate, description, isPopular
- **InventoryItem**: id, merchantId, productName, name, category, quantity, unit, buyingPrice, sellingPrice, stockValue, lastPurchaseDate, lastSaleDate, minStockAlert, minThreshold, status, supplier

### Orders & Delivery
- **Order**: id, orderNumber, merchantId, merchantName, merchantPhone, deliveryAddress, supplierId, supplierName, supplierLocation, items, subtotal, deliveryFee, totalAmount, orderDate, estimatedDeliveryDate, status, deliveryPartnerId, deliveryPartnerName, deliveryPartnerPhone, otpCode, deliveryNotes
- **OrderItem**: productId, productName, quantity, unit, unitPrice, totalPrice
- **DeliveryJob**: id, orderId, orderNumber, supplierName, supplierPhone, pickupAddress, pickupLocation, merchantName, merchantPhone, dropoffAddress, dropoffLocation, packageCount, packageDescription, distanceKm, earningsETB, payoutAmount, status, assignedRiderId, assignedRiderName, otpCode, proofType, proofDetails, acceptedAt, deliveredAt

### Sales & Transactions
- **SaleTransaction**: id, merchantId, receiptNumber, date, items, totalAmount, paymentType, paymentMethod, customerName, customerPhone, creditAgreementId

### Notifications
- **AppNotification**: id, userId, targetRole, title, message, date, read, type, actionUrl

## API Endpoints Required

### Authentication
- `POST /api/auth/login` - Login with email/phone and password
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/logout` - Logout and invalidate session
- `POST /api/auth/reset-password` - Request password reset
- `POST /api/auth/confirm-reset` - Confirm password reset with token
- `GET /api/auth/me` - Get current user session

### Credit Agreements
- `GET /api/credits` - List credit agreements (paginated, filterable by status, date range)
- `GET /api/credits/:id` - Get single credit agreement
- `POST /api/credits` - Create new credit agreement
- `PUT /api/credits/:id` - Update credit agreement
- `POST /api/credits/:id/repayments` - Record repayment
- `GET /api/credits/:id/repayments` - List repayments for agreement
- `GET /api/credits/:id/audit-log` - Get audit log for agreement

### Products & Marketplace
- `GET /api/products` - List products (paginated, filterable by category, supplier)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (wholesaler only)
- `PUT /api/products/:id` - Update product (wholesaler only)
- `DELETE /api/products/:id` - Delete product (wholesaler only)

### Orders
- `GET /api/orders` - List orders (paginated, filterable by status, date range)
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/merchant/:merchantId` - Get orders for merchant
- `GET /api/orders/wholesaler/:wholesalerId` - Get orders for wholesaler

### Delivery
- `GET /api/delivery/jobs` - List delivery jobs (paginated, filterable by status)
- `GET /api/delivery/jobs/:id` - Get single delivery job
- `POST /api/delivery/jobs/:id/accept` - Accept delivery job
- `PUT /api/delivery/jobs/:id/status` - Update delivery status
- `POST /api/delivery/jobs/:id/complete` - Complete delivery with OTP verification
- `GET /api/delivery/jobs/rider/:riderId` - Get jobs for rider

### Inventory
- `GET /api/inventory` - List inventory items (paginated, filterable by category)
- `GET /api/inventory/:id` - Get single inventory item
- `POST /api/inventory` - Add inventory item
- `PUT /api/inventory/:id` - Update inventory item
- `POST /api/inventory/:id/adjust` - Adjust stock quantity
- `POST /api/inventory/receipt` - Process external receipt

### Sales
- `GET /api/sales` - List sales transactions (paginated, filterable by date range)
- `POST /api/sales` - Record new sale transaction
- `GET /api/sales/merchant/:merchantId` - Get sales for merchant

### Notifications
- `GET /api/notifications` - List notifications for current user
- `PUT /api/notifications/:id/read` - Mark notification as read
- `POST /api/notifications` - Create notification (system use)

### Payments
- `POST /api/payments/telebirr/send-otp` - Initiate Telebirr OTP
- `POST /api/payments/telebirr/verify-otp` - Verify Telebirr OTP
- `POST /api/payments/cbe/send-otp` - Initiate CBE OTP
- `POST /api/payments/cbe/verify-otp` - Verify CBE OTP

## Request Payloads

### Create Credit Agreement
```typescript
{
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerIdNumber?: string;
  goodsDescription: string;
  totalAmount: number;
  dueDate?: string;
  terms?: string;
  bankDetails?: BankDetails;
  paymentPartnerDetails?: PaymentPartnerDetails;
}
```

### Record Repayment
```typescript
{
  amount: number;
  paymentMethod: 'Telebirr' | 'CBE Birr' | 'Cash' | 'Bank Transfer';
  referenceNumber?: string;
}
```

### Create Order
```typescript
{
  merchantId: string;
  deliveryAddress: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  deliveryNotes?: string;
}
```

### Record Sale
```typescript
{
  items: Array<{
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
  totalAmount: number;
  paymentType: 'Cash' | 'Telebirr' | 'CBE Birr' | 'Credit';
  customerName?: string;
  customerPhone?: string;
  creditAgreementId?: string;
}
```

## Response Shapes

### Paginated Response
```typescript
{
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

### Credit Agreement Response
```typescript
{
  id: string;
  agreementNumber: string;
  merchantId: string;
  merchantName: string;
  merchantPhone: string;
  merchantLocation: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerIdNumber?: string;
  goodsDescription: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  creationDate: string;
  dueDate: string;
  terms?: string;
  status: CreditStatus;
  bankDetails?: BankDetails;
  paymentPartnerDetails?: PaymentPartnerDetails;
  authorizationMandate: AuthorizationMandate;
  repayments: CreditRepayment[];
  auditLog: CreditAuditEvent[];
}
```

## Authentication Requirements

### JWT Token Structure
```typescript
{
  sub: string; // userId
  tenantId?: string; // merchantId for multi-tenancy
  role: UserRole;
  permissions: Permission[];
  iat: number;
  exp: number;
}
```

### Session Management
- Access token expiration: 15 minutes
- Refresh token expiration: 7 days
- Refresh token rotation on use
- Session invalidation on password change
- Support multiple concurrent sessions per user

## Authorization Requirements

### Permission System
- `credit:view` - View credit agreements
- `credit:create` - Create credit agreements
- `credit:approve` - Approve credit agreements
- `payment:view` - View payment information
- `inventory:view` - View inventory
- `inventory:manage` - Manage inventory
- `orders:view` - View orders
- `orders:manage` - Manage orders
- `reports:view` - View reports

### Role Permissions Mapping
- **merchant**: credit:view, credit:create, credit:approve, payment:view, inventory:view, inventory:manage, orders:view, orders:manage, reports:view
- **wholesaler**: orders:view, orders:manage, inventory:view, inventory:manage, reports:view
- **delivery/delivery_partner**: orders:view, orders:manage, payment:view
- **customer**: credit:view, payment:view
- **admin**: All permissions

### Multi-Tenancy Requirements
- Every request must include tenant context (merchantId)
- Data isolation: users can only access their tenant's data
- Wholesalers see their own products and orders
- Merchants see their own credits, inventory, and orders
- Delivery partners see assigned jobs only
- Customers see their own credits and payments

## Validation Rules

### Credit Agreement Validation
- totalAmount must be positive
- dueDate must be after creationDate
- customerPhone must be valid Ethiopian phone format
- customerIdNumber must be valid Ethiopian ID format if provided
- goodsDescription cannot be empty

### Order Validation
- deliveryAddress cannot be empty
- items array cannot be empty
- all productIds must exist
- all quantities must be positive integers
- totalAmount must equal sum of item totals + deliveryFee

### Repayment Validation
- amount must be positive
- amount cannot exceed remainingAmount
- referenceNumber must be unique for the agreement
- paymentMethod must be supported

### Inventory Validation
- quantity must be non-negative
- buyingPrice and sellingPrice must be positive
- category cannot be empty
- unit cannot be empty

## Financial Operations

### Credit Repayment Calculation
- Must be calculated server-side in database transaction
- Update paidAmount, remainingAmount atomically
- Update status based on remainingAmount:
  - remainingAmount === totalAmount: pending
  - remainingAmount > 0 && remainingAmount < totalAmount: partially_paid
  - remainingAmount === 0: paid
  - dueDate < now && remainingAmount > 0: overdue

### Payment Settlement
- All payment calculations must happen server-side
- OTP verification must be idempotent
- Payment confirmation must be atomic with credit update
- Audit log must record all financial state changes

### Inventory Stock Adjustment
- Stock adjustmentsmust be atomic
- Low stock alerts when quantity <= minThreshold
- Out of stock when quantity === 0
- Sales must decrease stock atomically

## Payment Integration Requirements

### Telebirr Integration
- Server-to-server API calls only
- OTP generation and verification
- Mandate authorization for recurring payments
- Webhook callbacks for payment status
- Idempotency keys for all payment requests

### CBE Birr Integration
- Server-to-server API calls only
- Direct debit authorization
- OTP verification for one-time payments
- Account verification before mandate setup
- Transaction status callbacks

### Payment Security
- Never expose payment credentials to client
- All payment API calls must be server-side
- Store only masked account numbers
- Encrypt sensitive payment data at rest
- PCI DSS compliance for card payments (if added later)

## Pagination Requirements

### Default Pagination
- Default page size: 20
- Maximum page size: 100
- Page numbering starts at 1
- Include total count in response

### Supported Filters
- Credit agreements: status, date range, merchantId, customerId
- Orders: status, date range, merchantId, wholesalerId
- Products: category, supplierId, price range
- Inventory: category, status, stock level
- Sales: date range, paymentType

### Sorting
- Default sort: date descending
- Supported sort fields: date, amount, status, name
- Sort direction: asc, desc

## Audit Requirements

### Audit Log Events
- credit.agreement.created
- credit.agreement.updated
- credit.repayment.applied
- credit.balance.updated
- credit.status.changed
- order.created
- order.status.changed
- payment.otp.initiated
- payment.otp.verified
- payment.mandate.authorized
- inventory.adjusted
- inventory.added
- sale.recorded
- user.login
- user.logout
- user.password.changed

### Audit Log Fields
- id
- eventType
- userId
- tenantId
- entityId
- entityType
- changes (JSON diff)
- ipAddress
- userAgent
- timestamp

### Audit Retention
- Minimum retention: 7 years
- Immutable audit logs
- Queryable by user, tenant, entity, date range

## Rate Limiting Requirements

### Per-User Rate Limits
- Authentication endpoints: 5 requests per minute
- Credit creation: 10 requests per hour
- Order creation: 20 requests per hour
- Payment operations: 10 requests per minute
- General API: 100 requests per minute

### Per-Tenant Rate Limits
- Credit agreements: 100 per day
- Orders: 500 per day
- API calls: 10,000 per day

## Error Handling

### Standard Error Response
```typescript
{
  error: string;
  message: string;
  code: string;
  details?: any;
  requestId: string;
}
```

### Error Codes
- AUTH_INVALID_CREDENTIALS
- AUTH_TOKEN_EXPIRED
- AUTH_INSUFFICIENT_PERMISSIONS
- VALIDATION_ERROR
- RESOURCE_NOT_FOUND
- RESOURCE_CONFLICT
- RATE_LIMIT_EXCEEDED
- PAYMENT_FAILED
- PAYMENT_OTP_INVALID
- PAYMENT_MANDATE_INVALID
- INSUFFICIENT_STOCK
- CREDIT_LIMIT_EXCEEDED

## Database Schema Considerations

### Required Tables
- users
- roles
- permissions
- user_permissions
- credit_agreements
- credit_repayments
- credit_audit_log
- products
- inventory
- orders
- order_items
- delivery_jobs
- sales_transactions
- notifications
- payment_mandates
- audit_logs

### Indexing Requirements
- All foreign keys
- credit_agreements: (merchantId, status, creationDate)
- credit_agreements: (customerId, status)
- orders: (merchantId, status, orderDate)
- orders: (wholesalerId, status, orderDate)
- delivery_jobs: (assignedRiderId, status)
- inventory: (merchantId, category)
- audit_logs: (userId, timestamp)
- audit_logs: (tenantId, timestamp)

### Data Integrity
- Foreign key constraints
- Unique constraints on agreement numbers, order numbers
- Check constraints on amounts (must be positive)
- Transaction isolation for financial operations

## Security Requirements

### Data Protection
- Encrypt sensitive fields at rest (phone numbers, IDs)
- Hash passwords with bcrypt/argon2
- Use TLS for all API communications
- Implement CSRF protection
- Set appropriate CORS headers

### Input Validation
- Validate all input against schemas
- Sanitize all user input
- Parameterized queries only
- Length limits on all string fields
- File upload restrictions (if added)

### Session Security
- HttpOnly, Secure cookies for refresh tokens
- SameSite=Strict for all cookies
- Short-lived access tokens
- Token binding to IP/user agent (optional)

## Performance Requirements

### Response Time Targets
- p50: < 200ms
- p95: < 500ms
- p99: < 1000ms
- Authentication: < 100ms

### Database Performance
- Connection pooling
- Query optimization
- Read replicas for reporting queries
- Caching layer for frequently accessed data

### Caching Strategy
- Cache user sessions (Redis)
- Cache product catalog (5-minute TTL)
- Cache permission checks (1-hour TTL)
- Cache rate limit counters (Redis)

## Monitoring & Observability

### Required Metrics
- Request latency (p50, p95, p99)
- Request rate by endpoint
- Error rate by endpoint
- Database query performance
- Cache hit/miss ratio
- Active user count
- Financial transaction volume

### Logging
- Structured JSON logging
- Log level: info, warn, error
- Include requestId in all logs
- Mask sensitive data in logs
- Centralized log aggregation

### Health Checks
- `/health` - Basic health check
- `/health/ready` - Readiness check (dependencies)
- `/health/live` - Liveness check

## Deployment Considerations

### Environment Variables
```
DATABASE_URL
JWT_SECRET
JWT_REFRESH_SECRET
TELEBIRR_API_KEY
TELEBIRR_API_SECRET
CBE_API_KEY
CBE_API_SECRET
REDIS_URL
APP_URL
NODE_ENV
```

### Database Migrations
- Version-controlled migrations
- Rollback capability
- Zero-downtime deployments
- Data seeding for initial setup

## Testing Requirements

### Unit Tests
- Business logic functions
- Validation schemas
- Permission checks
- Financial calculations

### Integration Tests
- API endpoints
- Database operations
- Payment provider integrations
- Authentication flows

### Load Tests
- Peak traffic simulation
- Database performance under load
- Rate limiting effectiveness

## Future Infrastructure (Not Yet Required)

The following infrastructure should NOT be implemented now but may become necessary as the platform scales:

- Redis for caching (can start with in-memory)
- RabbitMQ/BullMQ for background jobs (can start with direct processing)
- PgBouncer for connection pooling (can start with direct connections)
- Prisma Accelerate (can start with direct database)
- Microservices architecture (can start with monolithic backend)
- Kubernetes (can start with containerized deployment)
- CDN for static assets (can start with Next.js static serving)
- Advanced monitoring (can start with basic logging/metrics)

## Priority Implementation Order

1. **Phase 1: Core Infrastructure**
   - Database schema and migrations
   - Authentication system
   - Basic API framework
   - User management

2. **Phase 2: Credit System**
   - Credit agreement CRUD
   - Repayment processing
   - Audit logging
   - Financial calculations

3. **Phase 3: Marketplace**
   - Product management
   - Order processing
   - Inventory management
   - Sales recording

4. **Phase 4: Delivery**
   - Delivery job management
   - Rider assignment
   - Status tracking
   - OTP verification

5. **Phase 5: Payment Integration**
   - Telebirr integration
   - CBE Birr integration
   - Mandate authorization
   - Webhook handling

6. **Phase 6: Advanced Features**
   - Notifications system
   - Reporting and analytics
   - Advanced search and filtering
   - Performance optimization

## Frontend Integration Points

### Service Layer
The frontend expects service implementations matching these contracts:
- `src/features/credit/contracts.ts` - CreditService interface
- `src/lib/payments/types.ts` - PaymentProvider interface

### Data Fetching
Consider implementing React Query or SWR for:
- Credit agreements list and detail
- Orders list and detail
- Inventory list
- Sales transactions
- Notifications

### State Management
The current `AppContext` should be refactored to:
- Keep only UI state (theme, language, modals)
- Move data state to service layer hooks
- Remove business logic from context

## Success Criteria Checklist

- [ ] All API endpoints implemented and tested
- [ ] Authentication and authorization working
- [ ] Financial calculations server-side and accurate
- [ ] Payment integrations functional
- [ ] Multi-tenancy enforced
- [ ] Audit logging complete
- [ ] Rate limiting active
- [ ] Pagination implemented
- [ ] Error handling consistent
- [ ] Security requirements met
- [ ] Performance targets achieved
- [ ] Monitoring and logging in place
- [ ] Frontend can successfully connect and operate
