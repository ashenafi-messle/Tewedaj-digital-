# TEWEDAJ: Ethiopian Micro & Small Business Platform

A comprehensive digital marketplace platform designed for Ethiopian micro and small businesses, enabling merchants, wholesalers, delivery partners, and customers to connect and conduct commerce efficiently.

## 🌟 Overview

TEWEDAJ (ተወዳጅ) is a modern, multi-role business platform built specifically for the Ethiopian market. It provides integrated solutions for:

- **Merchants**: Manage inventory, create orders, access credit, and track deliveries
- **Wholesalers**: Distribute products to retailers and manage bulk orders
- **Delivery Partners**: Accept jobs, track deliveries, earn commissions, and verify handovers
- **Customers**: Purchase goods, manage credit agreements, and track orders

The platform emphasizes trust through automatic identity verification, OTP-based delivery handover confirmation, and QR code scanning for secure transactions.

## 🚀 Features

### Multi-Role Authentication & Registration
- **Role-based signup** with required identity and business verification documents:
  - **Customer**: National ID, phone/email, password
  - **Merchant**: National ID, TIN, business license, business address
  - **Wholesaler**: National ID, TIN, business license, business address
  - **Delivery Partner**: National ID, driver's license, vehicle type, plate number
- **Phone or Email recovery** for forgotten passwords
- **Automatic verification** using submitted identity information

### Merchant Portal
- **Dashboard**: Sales overview, inventory status, active orders, recent transactions
- **Inventory Management**: Stock tracking, low-stock alerts, category organization
- **Order Management**: Create wholesale orders, track status, manage deliveries
- **Credit Management**: Request credit from wholesalers, view agreements, record repayments
- **Reports**: Sales analytics, inventory reports, credit history
- **Receipt Scanning**: Scan external purchase receipts for bulk stock updates

### Wholesaler Portal
- **Dashboard**: Order requests, product performance, active shipments
- **Products Marketplace**: List products, set pricing, manage inventory
- **Order Management**: Receive orders from merchants, track fulfillment
- **Credit Risk Management**: Approve/reject credit requests from merchants with mandate authorization
- **Analytics**: Sales trends, customer insights, payment tracking

### Delivery Portal (Complete Workflow)
- **Job Marketplace**: Browse available delivery jobs with real-time updates
- **Availability Control**: Toggle online/offline status, manage job intake
- **Active Delivery Tracking**:
  - Status progression: Accepted → Going to Pickup → Arrived at Pickup → Picked Up → In Transit → Arrived at Dropoff → Delivered → Completed
  - **Pickup Verification**: PIN/OTP confirmation at warehouse
  - **Delivery Verification**: PIN/OTP confirmation at merchant location
  - **QR Code Scanning**: Capture verification codes using device camera
- **Earnings Dashboard**: Real-time earnings tracking, completed delivery history, payout summary
- **Navigation**: Integrated delivery map with route planning

### Customer Portal
- **Shopping**: Browse merchant products, add to cart, create orders
- **Credit Access**: Apply for credit agreements, manage repayment schedules
- **Order Tracking**: Monitor delivery status, receive OTP for handover verification
- **Payment Management**: Track payments, view payment history
- **Notifications**: Real-time order and delivery updates

### Platform Features
- **Multi-language Support**: English & Amharic (ስዖ)
- **Dark/Light Theme**: Customizable UI theme
- **Real-time Notifications**: Order updates, delivery status, payment confirmations
- **Secure Handover**: OTP-based delivery verification at pickup and drop-off
- **QR Code Verification**: Camera-based QR scanning for delivery confirmation
- **Automatic Verification**: Uses submitted identity documents for account verification
- **Mock Data**: Pre-populated demo accounts for rapid testing

## 🛠️ Tech Stack

- **Frontend**: React 19, Next.js 15
- **Styling**: Tailwind CSS, CSS Variables
- **UI Components**: Lucide React (icons), Recharts (analytics)
- **Type Safety**: TypeScript
- **State Management**: React Context API
- **Animations**: Canvas Confetti, Motion.js
- **Camera Integration**: Browser MediaDevices API, BarcodeDetector API
- **Build Tools**: Vite, Next.js Build System

## 📁 Project Structure

```
src/
├── app/                          # Next.js app router
│   ├── api/                      # Mock API endpoints
│   │   ├── auth/
│   │   ├── credits/
│   │   ├── delivery/
│   │   ├── orders/
│   │   └── payments/
│   ├── auth/                     # Authentication pages
│   ├── customer/                 # Customer portal routes
│   ├── delivery/                 # Delivery partner portal
│   │   ├── dashboard/
│   │   ├── active/               # Active delivery tracking
│   │   ├── jobs/                 # Available jobs marketplace
│   │   ├── earnings/             # Earnings & history
│   ├── merchant/                 # Merchant portal
│   ├── wholesaler/               # Wholesaler portal
│   └── [other pages]
│
├── components/
│   ├── common/                   # Shared components
│   │   ├── Navbar.tsx
│   │   ├── RoleHeader.tsx
│   │   ├── RoleSidebar.tsx
│   │   ├── DeliveryMap.tsx
│   │   ├── CreditAgreementModal.tsx
│   │   ├── CreditRequestModal.tsx
│   │   └── [other common components]
│   ├── customer/                 # Customer-specific components
│   ├── delivery/                 # Delivery partner components
│   │   ├── DeliveryDashboard.tsx       # Dashboard with QR scanner
│   │   ├── DeliveryActive.tsx          # Active delivery with QR scanner
│   │   ├── DeliveryJobs.tsx            # Available jobs
│   │   └── DeliveryEarnings.tsx        # Earnings & history
│   ├── merchant/                 # Merchant portal components
│   ├── wholesaler/               # Wholesaler portal components
│   ├── navigation/               # Navigation components
│   └── public/                   # Public pages (Auth, Landing)
│
├── context/
│   └── AppContext.tsx            # Global app state & auth
│
├── types.ts                      # TypeScript interfaces
├── data/
│   └── mockData.ts               # Demo users and initial data
└── utils/
    ├── formatters.ts             # Format currency, dates
    ├── security.ts
    └── translations.ts           # i18n text
```

## 🔐 Authentication & Demo Accounts

### Default Demo Credentials

**Merchant**
- Phone: `+251 911 234 567`
- Name: `Almaz Wolde`
- Password: `password123`

**Wholesaler**
- Phone: `+251 912 889 900`
- Name: `Getachew Tadesse`
- Password: `password123`

**Delivery Partner**
- Phone: `+251 922 456 789`
- Name: `Dawit Mengistu`
- Password: `password123`

**Customer**
- Phone: `+251 944 567 890`
- Name: `Bethlehem Tsegaye`
- Password: `password123`

All demo accounts use the password: **`password123`**

### Signup Flow

1. Select role (Customer, Merchant, Wholesaler, Delivery)
2. Enter National ID (FIN Number) - required for all roles
3. Fill role-specific fields:
   - **Merchant/Wholesaler**: Business name, TIN, business license, address
   - **Delivery**: Driver's license, vehicle type, plate number
4. Create account with automatic verification

### Password Recovery

- **Phone Recovery**: SMS OTP sent to registered phone
- **Email Recovery**: Recovery code sent to registered email
- Both methods use 6-digit codes for verification

## 🚚 Delivery Portal Workflow

### Status Lifecycle

```
Available → Accepted → Going to Pickup → Arrived at Pickup 
→ [PIN Verification] → Picked Up → In Transit 
→ Arrived at Dropoff → [PIN Verification] → Delivered → Completed
```

### Verification Methods

**Pickup Verification (at Warehouse)**
- Enter merchant PIN code
- OR scan QR code using device camera
- Confirms package collection

**Delivery Verification (at Drop-off)**
- Enter customer PIN code
- OR scan QR code using device camera
- Confirms successful delivery

### Availability Management

- **ONLINE**: Accept new jobs
- **BUSY**: Active delivery in progress
- **OFFLINE**: No jobs offered, existing jobs blocked

### Earnings

- Calculated only from **Completed** deliveries
- Real-time payout display
- Complete delivery history with timestamps and payouts

## 🏪 Merchant & Wholesaler Credit System

### Credit Request Flow

1. **Merchant requests credit** from wholesaler
2. **Wholesaler reviews** credit request
3. **Authorization**: Telebirr mandate or CBE direct debit
4. **Credit agreement** created with repayment schedule
5. **Automatic deductions** via approved payment method
6. **Repayment tracking** with audit logs

### Supported Payment Methods

- Telebirr Mandate
- CBE Birr Direct Debit
- CoopPay
- Awash Bank
- Manual payment recording

## 🎨 UI/UX Features

### Themes
- Light theme (cream background)
- Dark theme (dark backgrounds)

### Languages
- English (en)
- Amharic (am)

### Responsive Design
- Desktop optimized
- Tablet friendly
- Mobile responsive

### Visual Indicators
- Badge system for status (Active, Transit, Completed, etc.)
- Color-coded role indicators
- Real-time notification badges

## 💻 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd tewedaj---ethiopian-micro-&-small-business-platform

# Install dependencies
npm install

# Set up environment variables (if needed)
cp .env.example .env.local
```

### Development

```bash
# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔄 State Management

The application uses **React Context API** for global state management via `AppContext`:

- User authentication & role management
- Order & delivery state
- Credit agreements & requests
- Inventory & products
- Notifications
- Language & theme preferences

All state is persisted to browser `localStorage` for session continuity.

## 📱 Key Components

### Delivery Dashboard (`DeliveryDashboard.tsx`)
- Active delivery tracking with map
- Delivery handover verification with QR scanner
- Available jobs quick picker
- Earnings summary
- Online/Offline status toggle

### Delivery Active Page (`DeliveryActive.tsx`)
- Current delivery progress display
- Status-driven workflow controls
- PIN verification inputs
- QR code scanner integration
- Camera device integration

### Delivery Jobs Marketplace (`DeliveryJobs.tsx`)
- Browse available delivery jobs
- Job details: distance, payout, locations, merchant info
- Accept/Decline actions with feedback
- Back navigation

### Credit Management Modal (`CreditAgreementModal.tsx`)
- Credit agreement creation
- Mandate authorization
- Payment method selection
- Agreement terms display

## 🔔 Notifications

The platform provides real-time notifications for:
- Order status updates
- Delivery assignments
- Payment confirmations
- Credit request approvals/rejections
- Stock alerts
- System notifications

Notifications are persisted and accessible from the header notification center.

## 🗄️ Mock Data

Pre-populated demo data includes:
- 4 demo users (one per role)
- 3 delivery jobs with different statuses
- Sample products & inventory
- Credit agreements & requests
- Order history
- Sales transactions
- Notifications

All mock data is initialized on app start and stored in browser localStorage.

## 🛡️ Security Features

- **OTP-based verification** for delivery handovers
- **PIN validation** with configurable formats
- **National ID requirement** for all account types
- **Identity verification** workflow
- **Mandate authorization** for credit deductions
- **Session-based** user context
- **Role-based access control** (RBAC)

## 🚀 Performance Optimizations

- Next.js image optimization
- Code splitting by route
- Prefetched dashboard routes
- Memoized components
- Optimized re-renders via Context

## 📊 Supported Features by Role

| Feature | Merchant | Wholesaler | Delivery | Customer |
|---------|----------|-----------|----------|----------|
| Browse Products | ✓ | ✓ | - | ✓ |
| Place Orders | ✓ | - | - | ✓ |
| Create Credit Agreement | - | ✓ | - | - |
| Request Credit | ✓ | - | - | ✓ |
| Accept Delivery Jobs | - | - | ✓ | - |
| Track Deliveries | ✓ | - | - | ✓ |
| Manage Inventory | ✓ | ✓ | - | - |
| View Analytics | ✓ | ✓ | ✓ | - |
| QR Verification | - | - | ✓ | - |
| Payment Management | ✓ | ✓ | ✓ | ✓ |

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and project structure.

## 📄 License

This project is part of the TEWEDAJ platform. All rights reserved.

## 📞 Support

For issues, feature requests, or questions, please contact the development team.

---

**TEWEDAJ**: Empowering Ethiopian micro and small businesses through digital commerce and financial inclusion.
