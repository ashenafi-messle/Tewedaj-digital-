# TEWEDAJ Frontend Architecture

## Scope

TEWEDAJ is currently a frontend prototype. The UI uses local demo state and sandbox payment behavior. Authentication, authorization, financial calculations, persistence, rate limiting, and payment settlement must become server-owned when the backend is added.

## Project structure

- `src/app/`: Next.js App Router routes, route boundaries, APIs, loading, and error states.
- `src/components/`: reusable UI and portal screens. Interactive components use client boundaries only where needed.
- `src/context/`: shared session, theme, language, and prototype data state.
- `src/features/`: feature contracts that define backend-ready application boundaries.
- `src/lib/`: provider adapters and infrastructure-facing utilities.
- `src/config/`: role permissions and navigation metadata.
- `src/types.ts`: domain-oriented prototype models.
- `src/utils/`: formatting, translation, and privacy helpers.

## Data flow

UI interaction -> feature/service contract -> temporary local implementation or sandbox adapter -> UI state update.

`AppContext` currently supplies demo state to existing screens. It should later consume authenticated tenant and API service results rather than become the database layer.

## Credit and payment boundaries

`src/features/credit/contracts.ts` defines `CreditService`, `CreateCreditInput`, and paginated query shapes. A future API implementation can satisfy this contract without changing credit screens.

`src/lib/payments/types.ts` defines `PaymentProvider`. `MockTelebirrProvider` is explicitly sandbox-only and is selected by `getPaymentProvider()`. Replace that factory with an approved provider adapter later. Production payment APIs must remain server-side.

The client must never be authoritative for outstanding balances, repayment allocation, payment confirmation, mandate state, or transaction idempotency. Those values must come from backend transactions.

## Roles, permissions, and tenancy

`src/config/permissions.ts` is a UI capability map only. It can hide or disable controls for usability, but it is not security. Server-side authorization must validate every request.

`src/config/navigation.ts` centralizes role navigation metadata. Existing portal navigation remains compatible while new roles such as admin can be added in one place.

The future authenticated session should provide `userId`, `tenantId`/merchant context, role, and server-derived permissions. Screens should not hard-code merchant IDs or assume a single merchant.

## State management

- Local component state: modal visibility, form drafts, filters, and temporary OTP input.
- Shared context: demo session, theme, language, cart, and prototype records currently shared across screens.
- Server state later: credit agreements, balances, payments, inventory, orders, and notifications should move behind API/service hooks with loading, empty, error, and pagination states.

Avoid adding a global state library until real server-state requirements justify it.

## Performance principles

- Keep route pages as server components by default.
- Add `use client` only for interactive forms, browser APIs, charts, and context consumers.
- Prefetch high-value navigation routes where appropriate.
- Use paginated API contracts for large ledgers and transaction histories.
- Do not load millions of records into the browser.
- Use optimized image delivery when public imagery is migrated to `next/image`.
- Avoid artificial UI delays; retain only security timing such as OTP expiry and resend cooldowns.

## Security principles

- Never trust client role checks or disabled controls as authorization.
- Never expose passwords, PINs, tokens, full financial account numbers, or verified OTPs.
- Keep provider credentials and payment calls on the server.
- Validate all API payloads on the server when available.
- Add server-side rate limiting, audit logging, idempotency, and tenant isolation with the backend.
- Keep logs free of secrets and sensitive financial data.

## Loading and failure states

The root App Router has `loading.tsx` and `error.tsx` boundaries. Data-driven routes should add more specific boundaries when they gain server-backed fetching. Every major data view should distinguish loading, error, empty, and success states.

## Current Architecture Assessment (Post-Audit)

### Critical Findings

1. **Hybrid Build System**: The project has both Vite (`vite.config.ts`, `src/main.tsx`) and Next.js (`next.config.js`, `src/app/`) configurations. This is a structural issue that needs resolution. The project should standardize on Next.js App Router.

2. **Monolithic Context**: `AppContext` (868 lines) contains all business logic, state management, and data persistence. This violates separation of concerns and will be difficult to migrate to backend APIs.

3. **Hardcoded User IDs**: Throughout the codebase, hardcoded IDs like `'usr-merch-1'`, `'usr-whole-1'`, `'usr-cust-1'` are used. This prevents multi-tenancy.

4. **Client-Side Financial Calculations**: Credit repayment calculations, balance updates, and status transitions happen in the client context. These must move to server-side transactions.

5. **Missing Service Layer**: While `src/features/credit/contracts.ts` defines interfaces, there's no actual service implementation. Components directly call context methods.

6. **No Form Validation Library**: Forms use basic state management without structured validation (no Zod or similar). This will need server-side validation anyway.

7. **Excessive Client Components**: Almost all components use `'use client'` directive, including pages that could be server components.

### Strengths

1. **Good Type Definitions**: `src/types.ts` has comprehensive domain types.
2. **Permission System**: `src/config/permissions.ts` provides a clean permission model.
3. **Navigation Configuration**: `src/config/navigation.ts` centralizes role-based navigation.
4. **Feature Contracts**: `src/features/credit/contracts.ts` demonstrates the right pattern for service boundaries.
5. **Utility Functions**: `src/utils/formatters.ts` and `src/utils/security.ts` provide helpful helpers.
6. **Bilingual Support**: Translation system is well-implemented.

### Recommended Improvements

1. **Remove Vite Configuration**: Standardize on Next.js App Router entirely.
2. **Extract Service Layer**: Create actual service implementations that match the feature contracts.
3. **Implement API Routes**: Convert Next.js API routes from mock to service-backed implementations.
4. **Add Data Fetching Hooks**: Create React Query or SWR hooks for server state management.
5. **Separate UI from Logic**: Move business logic from components to services.
6. **Add Form Validation**: Implement Zod schemas for all forms.
7. **Reduce Client Components**: Convert static pages to server components where possible.
8. **Add Loading/Error States**: Implement proper loading skeletons and error boundaries.
9. **Remove Hardcoded IDs**: Use context-derived user/tenant IDs throughout.
10. **Add Pagination**: Implement pagination for all list views.

## Future backend integration

1. Add authenticated server session and tenant context.
2. Implement API-backed `CreditService` and other feature contracts.
3. Move financial calculations and repayment transactions to database transactions.
4. Replace `MockTelebirrProvider` with an approved server-side adapter.
5. Add server authorization, validation schemas, rate limiting, audit events, and idempotency keys.
6. Keep existing screens consuming domain/application models rather than raw database records.
7. Resolve Vite vs Next.js build system conflict.
8. Extract business logic from `AppContext` into dedicated services.
9. Implement proper data fetching with loading/error states.
10. Add pagination to all data-heavy views.
