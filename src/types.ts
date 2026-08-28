export type UserRole = 'merchant' | 'wholesaler' | 'delivery' | 'delivery_partner' | 'customer' | 'public';
export type AppTheme = 'light' | 'dark';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  businessName?: string;
  businessCategory?: string;
  location?: string;
  vehicleType?: string;
  serviceArea?: string;
  preferredPayment?: string;
  rating?: number;
  joinedDate: string;
  creditScore?: number;
  nationalIdNumber?: string;
  tin?: string;
  businessLicenseNumber?: string;
  driverLicenseNumber?: string;
  vehiclePlateNumber?: string;
}

export interface CreditRepayment {
  id: string;
  creditAgreementId: string;
  amount: number;
  date: string;
  paymentMethod?: 'Telebirr' | 'CBE Birr' | 'Cash' | 'Bank Transfer' | string;
  method?: string;
  referenceNumber: string;
  status: 'Completed' | 'Processing';
  recordedBy?: string;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  branchName?: string;
}

export interface PaymentPartnerDetails {
  telebirrPhone: string;
  cbeBirrPhone?: string;
  coopPayPhone?: string;
  preferredProvider?: 'Telebirr' | 'CBE Birr' | 'CoopPay' | 'Awash Bank' | string;
}

export interface CreditAgreement {
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
  status: 'Active' | 'Fully Repaid' | 'Repaid' | 'Overdue' | 'Pending Authorization' | string;
  bankDetails?: BankDetails;
  paymentPartnerDetails?: PaymentPartnerDetails;
  authorizationMandate: {
    provider: 'Telebirr Mandate' | 'CBE Direct Debit' | 'CoopPay' | 'Awash Direct' | string;
    mandateReference: string;
    authorizedAt?: string;
    isOtpVerified?: boolean;
    customerOtpPhone?: string;
    otpAuthCode?: string;
    otpVerifiedTimestamp?: string;
    mandateStatus?: 'Verified & Authorized' | 'Pending OTP' | string;
  };
  repayments: CreditRepayment[];
  auditLog?: CreditAuditEvent[];
}

export interface CreditAuditEvent {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

export interface Product {
  id: string;
  name: string;
  amharicName?: string;
  supplierId?: string;
  supplierName?: string;
  supplierLocation?: string;
  supplierRating?: number;
  category: string;
  image: string;
  wholesalePrice: number;
  suggestedRetailPrice?: number;
  availableQuantity?: number;
  unit: string;
  minOrderQuantity?: number;
  deliveryEstimate?: string;
  description: string;
  isPopular?: boolean;

  // Convenience aliases
  moq?: number;
  wholesalerName?: string;
  wholesalerLocation?: string;
  wholesalerId?: string;
  origin?: string;
  stockAvailable?: number;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice?: number;
  total?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  merchantId: string;
  merchantName: string;
  merchantPhone: string;
  deliveryAddress: string;
  supplierId?: string;
  supplierName?: string;
  supplierLocation?: string;
  items: OrderItem[];
  subtotal?: number;
  deliveryFee: number;
  totalAmount: number;
  orderDate?: string;
  date?: string;
  estimatedDeliveryDate?: string;
  status: 'Pending' | 'Confirmed' | 'Accepted' | 'Preparing' | 'Ready for Pickup' | 'Picked Up' | 'In Transit' | 'Delivered' | 'Cancelled' | string;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  deliveryPartnerPhone?: string;
  deliveryRiderName?: string;
  deliveryDistanceKm?: number;
  otpCode?: string;
  deliveryOtp?: string;
  deliveryNotes?: string;
  wholesalerName?: string;
}

export interface DeliveryJob {
  id: string;
  orderId: string;
  orderNumber: string;
  supplierName?: string;
  supplierPhone?: string;
  pickupAddress?: string;
  pickupLocation?: string;
  merchantName: string;
  merchantPhone: string;
  dropoffAddress?: string;
  dropoffLocation?: string;
  packageCount?: number;
  packageDescription: string;
  distanceKm: number;
  earningsETB?: number;
  payoutAmount?: number;
  status: 'Available' | 'Accepted' | 'Going to Pickup' | 'Arrived at Pickup' | 'Picked Up' | 'In Transit' | 'Arrived at Dropoff' | 'Delivered' | 'Completed' | 'Declined' | string;
  assignedRiderId?: string;
  assignedRiderName?: string;
  otpCode: string;
  pickupOtpCode?: string;
  proofType?: 'OTP' | 'Signature' | 'Photo';
  proofDetails?: string;
  acceptedAt?: string;
  pickupVerifiedAt?: string;
  deliveredAt?: string;
}

export interface InventoryItem {
  id: string;
  merchantId?: string;
  productName?: string;
  name?: string;
  category: string;
  quantity: number;
  unit: string;
  buyingPrice: number;
  sellingPrice: number;
  stockValue?: number;
  lastPurchaseDate?: string;
  lastSaleDate?: string;
  minStockAlert?: number;
  minThreshold?: number;
  status?: 'In Stock' | 'Low Stock' | 'Out of Stock' | string;
  supplier?: string;
}

export interface SaleTransaction {
  id: string;
  merchantId?: string;
  receiptNumber: string;
  date: string;
  items: {
    productName: string;
    quantity: number;
    unitPrice?: number;
    total?: number;
  }[];
  totalAmount: number;
  paymentType?: 'Cash' | 'Telebirr' | 'CBE Birr' | 'Credit' | string;
  paymentMethod?: string;
  customerName?: string;
  customerPhone?: string;
  creditAgreementId?: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  targetRole: UserRole;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'order' | 'credit' | 'inventory' | 'delivery' | 'system' | 'payment' | 'credit_request';
  actionUrl?: string;
}

export interface CreditRequest {
  id: string;
  requestNumber: string;
  merchantId: string;
  merchantName: string;
  merchantPhone: string;
  merchantLocation: string;
  merchantTelebirrPhone: string;
  wholesalerId: string;
  wholesalerName: string;
  wholesalerPhone: string;
  wholesalerLocation: string;
  items: OrderItem[];
  totalAmount: number;
  requestedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Converted to Agreement';
  wholesalerTelebirrPhone?: string;
  rejectionReason?: string;
  creditAgreementId?: string;
  terms?: string;
  dueDate?: string;
}
