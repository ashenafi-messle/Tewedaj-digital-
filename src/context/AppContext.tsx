'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  User,
  UserRole,
  AppTheme,
  CreditAgreement,
  CreditRepayment,
  Product,
  CartItem,
  Order,
  DeliveryJob,
  InventoryItem,
  SaleTransaction,
  AppNotification,
  CreditRequest
} from '../types';
import { Language, t as translateHelper } from '../utils/translations';
import {
  INITIAL_USERS,
  INITIAL_PRODUCTS,
  INITIAL_CREDIT_AGREEMENTS,
  INITIAL_CREDIT_REQUESTS,
  INITIAL_ORDERS,
  INITIAL_DELIVERY_JOBS,
  INITIAL_INVENTORY,
  INITIAL_SALES,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
  t: (key: string, fallback?: string) => string;
  currentUser: User | null;
  currentRole: UserRole;
  currentPath: string;
  selectedCreditId: string | null;
  setCurrentPath: (path: string) => void;
  switchRole: (role: UserRole) => void;
  switchUserRole: (role: UserRole) => void;
  loginUser: (role: UserRole, customUser?: Partial<User>) => void;
  login: (role: UserRole, emailOrPhone: string) => void;
  signup: (role: UserRole, userData: Partial<User>) => void;
  resetPassword: (phoneOrEmail: string, newPassword: string, role?: UserRole) => { success: boolean; message: string };
  logoutUser: () => void;
  
  // Credit agreements
  creditAgreements: CreditAgreement[];
  createCreditAgreement: (data: any) => CreditAgreement;
  recordRepayment: (agreementId: string, amount: number, method: any, refNo?: string) => boolean;
  selectCreditForDetail: (creditId: string) => void;

  // Credit requests (merchant-wholesaler credit guarantee)
  creditRequests: CreditRequest[];
  createCreditRequest: (request: CreditRequest) => boolean;
  approveCreditRequest: (requestId: string, wholesalerTelebirrPhone: string) => boolean;
  rejectCreditRequest: (requestId: string, reason: string) => boolean;
  getCreditRequestsForWholesaler: (wholesalerId: string) => CreditRequest[];
  getCreditRequestsForMerchant: (merchantId: string) => CreditRequest[];

  // Products & Marketplace
  products: Product[];
  addProduct: (product: any) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkoutCart: (deliveryAddress: string, notes?: string) => Order | null;

  // Orders
  orders: Order[];
  updateOrderStatus: (orderId: string, status: any) => void;

  // Delivery
  deliveryJobs: DeliveryJob[];
  deliveryAvailability: 'OFFLINE' | 'ONLINE' | 'BUSY';
  setDeliveryAvailability: (availability: 'OFFLINE' | 'ONLINE') => void;
  acceptDeliveryJob: (jobId: string) => { success: boolean; message: string };
  declineDeliveryJob: (jobId: string) => { success: boolean; message: string };
  updateDeliveryStatus: (jobId: string, status: any, otp?: string) => { success: boolean; message: string };
  completeDeliveryJob: (jobId: string, otp?: string) => { success: boolean; message: string };

  // Inventory & POS
  inventory: InventoryItem[];
  addInventoryItem: (item: any) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  adjustStock: (id: string, delta: number) => void;
  recordExternalReceipt: (items: Array<{ name: string; quantity: number; unit: string; buyingPrice: number; sellingPrice: number; category: string }>, supplier: string) => void;

  // Sales
  sales: SaleTransaction[];
  salesTransactions: SaleTransaction[];
  recordSale: (sale: any) => SaleTransaction;

  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'date' | 'read'>) => void;

  // Reset demo
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('tewedaj_lang');
    if (saved === 'am' || saved === 'en') {
      setLanguageState(saved);
    }
    if (typeof window !== 'undefined') {
      document.documentElement.lang = saved === 'am' ? 'am' : 'en';
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tewedaj_lang', lang);
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'am' : 'en';
    setLanguage(nextLang);
  };

  const t = (key: string, fallback?: string): string => {
    return translateHelper(key, language, fallback);
  };

  const [theme, setThemeState] = useState<AppTheme>('light');

  useEffect(() => {
    const saved = localStorage.getItem('tewedaj_theme');
    if (saved === 'dark' || saved === 'light') {
      setThemeState(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tewedaj_theme', theme);
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        document.body.classList.remove('dark');
      }
    }
  }, [theme]);

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]); // default to merchant
  const [currentRole, setCurrentRole] = useState<UserRole>('merchant');
  const [selectedCreditId, setSelectedCreditId] = useState<string | null>(null);

  const setCurrentPath = (path: string) => {
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  // Persistence State
  const [creditAgreements, setCreditAgreements] = useState<CreditAgreement[]>(INITIAL_CREDIT_AGREEMENTS);
  const [creditRequests, setCreditRequests] = useState<CreditRequest[]>(INITIAL_CREDIT_REQUESTS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [deliveryJobs, setDeliveryJobs] = useState<DeliveryJob[]>(INITIAL_DELIVERY_JOBS);
  const [deliveryAvailability, setDeliveryAvailabilityState] = useState<'OFFLINE' | 'ONLINE' | 'BUSY'>('ONLINE');
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [sales, setSales] = useState<SaleTransaction[]>(INITIAL_SALES);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCredits = localStorage.getItem('tewedaj_credits');
      if (savedCredits) {
        try {
          setCreditAgreements(JSON.parse(savedCredits));
        } catch (e) {
          console.error('Failed to parse credits from localStorage', e);
        }
      }

      const savedCreditRequests = localStorage.getItem('tewedaj_credit_requests');
      if (savedCreditRequests) {
        try {
          setCreditRequests(JSON.parse(savedCreditRequests));
        } catch (e) {
          console.error('Failed to parse credit requests from localStorage', e);
        }
      }

      const savedProducts = localStorage.getItem('tewedaj_products');
      if (savedProducts) {
        try {
          setProducts(JSON.parse(savedProducts));
        } catch (e) {
          console.error('Failed to parse products from localStorage', e);
        }
      }

      const savedOrders = localStorage.getItem('tewedaj_orders');
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (e) {
          console.error('Failed to parse orders from localStorage', e);
        }
      }

      const savedDeliveries = localStorage.getItem('tewedaj_deliveries');
      if (savedDeliveries) {
        try {
          const savedJobs = JSON.parse(savedDeliveries);
          setDeliveryJobs(savedJobs.map((job: DeliveryJob) => {
            if (job.id === 'job-501') return { ...job, status: 'Completed', dropoffAddress: 'maraki, Gondar City', dropoffLocation: 'maraki, Gondar City', deliveredAt: job.deliveredAt || new Date().toISOString() };
            if (job.id === 'job-502') return { ...job, dropoffAddress: 'arada, Gondar City', dropoffLocation: 'arada, Gondar City' };
            if (job.id === 'job-503') return { ...job, dropoffAddress: 'piasa, Gondar City', dropoffLocation: 'piasa, Gondar City' };
            return job;
          }));
        } catch (e) {
          console.error('Failed to parse deliveries from localStorage', e);
        }
      }

      const savedInventory = localStorage.getItem('tewedaj_inventory');
      if (savedInventory) {
        try {
          const raw = JSON.parse(savedInventory);
          setInventory((raw || []).map((item: any) => ({
            ...item,
            name: item.name || item.productName || 'Unnamed Product',
            productName: item.productName || item.name || 'Unnamed Product',
            supplier: item.supplier || 'Merkato Central Grain',
            minThreshold: item.minThreshold || item.minStockAlert || 3,
            minStockAlert: item.minStockAlert || item.minThreshold || 3
          })));
        } catch (e) {
          console.error('Failed to parse inventory from localStorage', e);
        }
      }

      const savedSales = localStorage.getItem('tewedaj_sales');
      if (savedSales) {
        try {
          setSales(JSON.parse(savedSales));
        } catch (e) {
          console.error('Failed to parse sales from localStorage', e);
        }
      }

      const savedNotifs = localStorage.getItem('tewedaj_notifs');
      if (savedNotifs) {
        try {
          setNotifications(JSON.parse(savedNotifs));
        } catch (e) {
          console.error('Failed to parse notifications from localStorage', e);
        }
      }
    }
  }, []);

  const [cart, setCart] = useState<CartItem[]>([]);

  // Sync to local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tewedaj_credits', JSON.stringify(creditAgreements));
    }
  }, [creditAgreements]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tewedaj_products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tewedaj_orders', JSON.stringify(orders));
    }
  }, [orders]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tewedaj_deliveries', JSON.stringify(deliveryJobs));
    }
  }, [deliveryJobs]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tewedaj_inventory', JSON.stringify(inventory));
    }
  }, [inventory]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tewedaj_sales', JSON.stringify(sales));
    }
  }, [sales]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tewedaj_notifs', JSON.stringify(notifications));
    }
  }, [notifications]);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'public') {
      setCurrentUser(null);
      router.push('/');
      return;
    }

    const matchedUser = INITIAL_USERS.find(u => u.role === role || (role === 'delivery' && u.role === 'delivery_partner')) || INITIAL_USERS[0];
    setCurrentUser(matchedUser);

    if (role === 'merchant') router.push('/merchant/dashboard');
    else if (role === 'wholesaler') router.push('/wholesaler/dashboard');
    else if (role === 'delivery' || role === 'delivery_partner') router.push('/delivery/dashboard');
    else if (role === 'customer') router.push('/customer/dashboard');
  };

  const switchUserRole = (role: UserRole) => switchRole(role);

  const loginUser = (role: UserRole, customUser?: Partial<User>) => {
    const base = INITIAL_USERS.find(u => u.role === role || (role === 'delivery' && u.role === 'delivery_partner')) || INITIAL_USERS[0];
    const userToSet: User = {
      ...base,
      ...customUser,
      role
    };
    setCurrentUser(userToSet);
    setCurrentRole(role);

    if (role === 'merchant') router.push('/merchant/dashboard');
    else if (role === 'wholesaler') router.push('/wholesaler/dashboard');
    else if (role === 'delivery' || role === 'delivery_partner') router.push('/delivery/dashboard');
    else if (role === 'customer') router.push('/customer/dashboard');
  };

  const login = (role: UserRole, emailOrPhone: string) => {
    loginUser(role, { email: emailOrPhone, phone: emailOrPhone });
  };

  const signup = (role: UserRole, userData: Partial<User>) => {
    loginUser(role, userData);
  };

  const resetPassword = (phoneOrEmail: string, newPassword: string, role?: UserRole): { success: boolean; message: string } => {
    const targetRole = role || currentRole !== 'public' ? currentRole : 'merchant';
    
    // Check if user matches or update currentUser if authenticated
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev } : null);
    }
    
    // Save to localStorage for simulated mock persistence
    localStorage.setItem(`tewedaj_pwd_${phoneOrEmail.replace(/\s+/g, '')}`, newPassword);

    // Log security notification
    addNotification({
      userId: currentUser?.id || 'usr-guest',
      targetRole: (targetRole as UserRole) || 'merchant',
      title: 'Security Alert: Password Updated',
      message: `Your password for account ${phoneOrEmail} was successfully reset and secured.`,
      type: 'system',
    });

    return {
      success: true,
      message: `Password has been reset successfully for ${phoneOrEmail}.`
    };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setCurrentRole('public');
    router.push('/');
  };

  const selectCreditForDetail = (creditId: string) => {
    setSelectedCreditId(creditId);
    if (currentRole === 'customer') {
      router.push('/customer/dashboard');
    } else {
      router.push('/merchant/credit-hub');
    }
  };

  // Add Notification
  const addNotification = (notif: Omit<AppNotification, 'id' | 'date' | 'read'>) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      date: dateStr,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Credit Agreement Workflow
  const createCreditAgreement = (data: any): CreditAgreement => {
    const serial = Math.floor(1000 + Math.random() * 9000);
    const createdAt = new Date().toISOString();
    const newAgreement: CreditAgreement = {
      ...data,
      id: `crd-${Date.now()}`,
      agreementNumber: data.agreementNumber || `TW-CR-2026-${serial}`,
      paidAmount: data.paidAmount || 0,
      remainingAmount: data.remainingAmount !== undefined ? data.remainingAmount : data.totalAmount,
      status: data.status || 'Active',
      repayments: data.repayments || [],
      auditLog: [
        ...(data.auditLog || []),
        { id: `audit-${Date.now()}`, type: 'agreement.created', message: 'Credit agreement created', timestamp: createdAt },
        { id: `audit-${Date.now()}-authorization`, type: 'authorization.completed', message: 'Sandbox customer authorization completed', timestamp: createdAt }
      ]
    };

    setCreditAgreements(prev => [newAgreement, ...prev]);

    // Send notifications to both merchant and customer
    addNotification({
      userId: newAgreement.merchantId,
      targetRole: 'merchant',
      title: 'New Credit Agreement Active',
      message: `Agreement ${newAgreement.agreementNumber} created for ${newAgreement.customerName} (ETB ${newAgreement.totalAmount.toLocaleString()}).`,
      type: 'credit',
      actionUrl: '/merchant/credit'
    });

    return newAgreement;
  };

  // Repayment Workflow
  const recordRepayment = (agreementId: string, amount: number, method: any, refNo?: string): boolean => {
    const agreement = creditAgreements.find(c => c.id === agreementId);
    if (!agreement) return false;

    if (refNo && agreement.repayments.some(repayment => repayment.referenceNumber === refNo)) {
      return false;
    }

    const actualAmount = Math.min(amount, agreement.remainingAmount);
    if (actualAmount <= 0) return false;

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const newRepayment: CreditRepayment = {
      id: `rep-${Date.now()}`,
      creditAgreementId: agreementId,
      amount: actualAmount,
      date: dateStr,
      paymentMethod: method,
      method: method,
      referenceNumber: refNo || `${String(method).slice(0, 2).toUpperCase()}-TX-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Completed',
      recordedBy: `${method} Authorization Gateway`
    };

    const newPaid = agreement.paidAmount + actualAmount;
    const newRemaining = Math.max(0, agreement.totalAmount - newPaid);
    const newStatus = newRemaining === 0 ? 'Repaid' : 'Active';

    setCreditAgreements(prev => prev.map(item => {
      if (item.id === agreementId) {
        return {
          ...item,
          paidAmount: newPaid,
          remainingAmount: newRemaining,
          status: newStatus,
          repayments: [...item.repayments, newRepayment],
          auditLog: [
            ...(item.auditLog || []),
            { id: `audit-${Date.now()}`, type: 'repayment.applied', message: `ETB ${actualAmount.toLocaleString()} applied to credit`, timestamp: now.toISOString() },
            { id: `audit-${Date.now()}-balance`, type: 'balance.updated', message: `Outstanding balance = ETB ${newRemaining.toLocaleString()}`, timestamp: now.toISOString() }
          ]
        };
      }
      return item;
    }));

    return true;
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    const moq = product.minOrderQuantity || product.moq || 1;
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity: Math.max(moq, quantity) }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  // Checkout Cart
  const checkoutCart = (deliveryAddress: string, notes?: string): Order | null => {
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((acc, curr) => acc + curr.product.wholesalePrice * curr.quantity, 0);
    const deliveryFee = 450;
    const totalAmount = subtotal + deliveryFee;
    const serial = Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const otpCode = String(Math.floor(1000 + Math.random() * 9000));

    const supplierId = cart[0].product.supplierId || cart[0].product.wholesalerId || 'usr-wholesaler-1';
    const supplierName = cart[0].product.supplierName || cart[0].product.wholesalerName || 'Gondar Central Agro Wholesalers';
    const supplierLocation = cart[0].product.supplierLocation || cart[0].product.wholesalerLocation || 'Central Market, Gondar';

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `TW-ORD-${serial}`,
      merchantId: currentUser?.id || 'usr-merch-1',
      merchantName: currentUser?.businessName || currentUser?.name || 'Almaz Family Grocery',
      merchantPhone: currentUser?.phone || '+251 911 234 567',
      deliveryAddress,
      supplierId,
      supplierName,
      supplierLocation,
      wholesalerName: supplierName,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unit: item.product.unit,
        unitPrice: item.product.wholesalePrice,
        totalPrice: item.product.wholesalePrice * item.quantity,
        total: item.product.wholesalePrice * item.quantity,
      })),
      subtotal,
      deliveryFee,
      totalAmount,
      orderDate: dateStr,
      date: dateStr,
      estimatedDeliveryDate: 'Within 4-6 Hours',
      status: 'Pending',
      otpCode,
      deliveryOtp: otpCode,
      deliveryNotes: notes
    };

    // Also create a DeliveryJob
    const newJob: DeliveryJob = {
      id: `job-${Date.now()}`,
      orderId: newOrder.id,
      orderNumber: newOrder.orderNumber,
      supplierName: supplierName,
      supplierPhone: '+251 912 889 900',
      pickupAddress: supplierLocation,
      pickupLocation: supplierLocation,
      merchantName: newOrder.merchantName,
      merchantPhone: newOrder.merchantPhone,
      dropoffAddress: deliveryAddress,
      dropoffLocation: deliveryAddress,
      packageCount: cart.reduce((a, c) => a + c.quantity, 0),
      packageDescription: cart.map(c => `${c.quantity}x ${c.product.name}`).join(', '),
      distanceKm: 7.5,
      earningsETB: deliveryFee,
      payoutAmount: deliveryFee,
      status: 'Available',
      otpCode,
    };

    setOrders(prev => [newOrder, ...prev]);
    setDeliveryJobs(prev => [newJob, ...prev]);
    clearCart();

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: any) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  // Delivery Partner Actions
  const acceptDeliveryJob = (jobId: string): { success: boolean; message: string } => {
    if (deliveryAvailability === 'OFFLINE') return { success: false, message: 'Go online before accepting delivery jobs.' };
    if (deliveryJobs.some(j => ['Accepted', 'Going to Pickup', 'Arrived at Pickup', 'Picked Up', 'In Transit', 'Arrived at Dropoff'].includes(j.status))) {
      return { success: false, message: 'Complete your active delivery before accepting another job.' };
    }
    const selectedJob = deliveryJobs.find(j => j.id === jobId);
    if (!selectedJob || selectedJob.status !== 'Available') return { success: false, message: 'This delivery is no longer available.' };

    setDeliveryJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          status: 'Accepted',
          assignedRiderId: currentUser?.id || 'usr-deliv-1',
          assignedRiderName: currentUser?.name || 'Dawit Mengistu (Bajaj Cargo)',
          acceptedAt: new Date().toISOString()
        };
      }
      return j;
    }));

    // Update related order
    setDeliveryAvailabilityState('BUSY');
    setOrders(prev => prev.map(o => o.id === selectedJob.orderId ? {
        ...o,
        status: 'Accepted',
        deliveryPartnerId: currentUser?.id || 'usr-deliv-1',
        deliveryPartnerName: currentUser?.name || 'Dawit Mengistu (Bajaj Cargo)',
        deliveryRiderName: currentUser?.name || 'Dawit Mengistu (Bajaj Cargo)'
      } : o));
    return { success: true, message: 'Delivery accepted.' };
  };

  const declineDeliveryJob = (jobId: string): { success: boolean; message: string } => {
    const job = deliveryJobs.find(j => j.id === jobId);
    if (!job || job.status !== 'Available') return { success: false, message: 'This delivery is no longer available.' };
    setDeliveryJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'Declined' } : j));
    return { success: true, message: 'Delivery declined.' };
  };

  const setDeliveryAvailability = (availability: 'OFFLINE' | 'ONLINE') => {
    if (deliveryAvailability === 'BUSY') return;
    setDeliveryAvailabilityState(availability);
  };

  const updateDeliveryStatus = (jobId: string, status: any, otp?: string): { success: boolean; message: string } => {
    const job = deliveryJobs.find(j => j.id === jobId);
    if (!job) return { success: false, message: 'Job not found' };

    const nextStatuses: Record<string, string[]> = {
      Accepted: ['Going to Pickup'],
      'Going to Pickup': ['Arrived at Pickup'],
      'Arrived at Pickup': ['Picked Up'],
      'Picked Up': ['In Transit'],
      'In Transit': ['Arrived at Dropoff'],
      'Arrived at Dropoff': ['Delivered'],
      Delivered: ['Completed']
    };
    if (!nextStatuses[job.status]?.includes(status)) {
      return { success: false, message: `Cannot move delivery from ${job.status} to ${status}.` };
    }
    const pickupOtp = job.pickupOtpCode || job.otpCode;
    if (status === 'Picked Up' && otp?.trim() !== pickupOtp.trim()) {
      return { success: false, message: 'Invalid pickup PIN. Ask the wholesaler to confirm the code.' };
    }
    if (status === 'Delivered' && otp?.trim() !== job.otpCode.trim()) {
      return { success: false, message: 'Invalid delivery PIN. Ask the merchant to confirm the code.' };
    }

    setDeliveryJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          status,
          pickupVerifiedAt: status === 'Picked Up' ? new Date().toISOString() : j.pickupVerifiedAt,
          deliveredAt: status === 'Delivered' || status === 'Completed' ? new Date().toISOString() : j.deliveredAt,
          proofType: otp ? 'OTP' : j.proofType,
          proofDetails: otp ? `Verified by driver ${currentUser?.id || 'usr-deliv-1'}` : j.proofDetails
        };
      }
      return j;
    }));

    setOrders(prev => prev.map(o => o.id === job.orderId ? { ...o, status: status === 'Completed' || status === 'Delivered' ? 'Delivered' : status } : o));

    if (status === 'Completed' || status === 'Delivered') setDeliveryAvailabilityState('ONLINE');

    return { success: true, message: `Delivery status updated to ${status}` };
  };

  const completeDeliveryJob = (jobId: string, otp?: string) => {
    return updateDeliveryStatus(jobId, 'Completed', otp);
  };

  // Inventory & Products
  const addProduct = (productData: any) => {
    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      moq: productData.moq || productData.minOrderQuantity || 1,
      minOrderQuantity: productData.minOrderQuantity || productData.moq || 1,
      origin: productData.origin || 'Ethiopia',
      wholesalerName: productData.wholesalerName || productData.supplierName || 'Gondar Agro',
      supplierName: productData.supplierName || productData.wholesalerName || 'Gondar Agro',
      wholesalerLocation: productData.wholesalerLocation || productData.supplierLocation || 'Central Market, Gondar',
      supplierLocation: productData.supplierLocation || productData.wholesalerLocation || 'Central Market, Gondar'
    };
    setProducts(prev => [newProd, ...prev]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p));
  };

  const addInventoryItem = (itemData: any) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: `inv-${Date.now()}`,
      name: itemData.name || itemData.productName,
      productName: itemData.productName || itemData.name,
      minThreshold: itemData.minThreshold || itemData.minStockAlert || 5,
      minStockAlert: itemData.minStockAlert || itemData.minThreshold || 5,
      stockValue: itemData.quantity * itemData.buyingPrice
    };
    setInventory(prev => [newItem, ...prev]);
  };

  const updateInventoryItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const adjustStock = (id: string, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        const threshold = item.minThreshold || item.minStockAlert || 5;
        const status: InventoryItem['status'] = newQty === 0 ? 'Out of Stock' : newQty <= threshold ? 'Low Stock' : 'In Stock';
        return {
          ...item,
          quantity: newQty,
          stockValue: newQty * item.buyingPrice,
          status,
          lastPurchaseDate: delta > 0 ? new Date().toISOString().split('T')[0] : item.lastPurchaseDate,
          lastSaleDate: delta < 0 ? new Date().toISOString().split('T')[0] : item.lastSaleDate
        };
      }
      return item;
    }));
  };

  const recordExternalReceipt = (items: Array<{ name: string; quantity: number; unit: string; buyingPrice: number; sellingPrice: number; category: string }>, supplier: string) => {
    const now = new Date().toISOString().split('T')[0];
    items.forEach(newItem => {
      // Check if item already exists
      const targetName = (newItem.name || (newItem as any).productName || '').toLowerCase();
      const existing = inventory.find(i => (i.productName || i.name || '').toLowerCase() === targetName);
      if (existing) {
        adjustStock(existing.id, newItem.quantity);
      } else {
        addInventoryItem({
          merchantId: currentUser?.id || 'usr-merch-1',
          name: newItem.name,
          productName: newItem.name,
          category: newItem.category || 'General FMCG',
          quantity: newItem.quantity,
          unit: newItem.unit,
          buyingPrice: newItem.buyingPrice,
          sellingPrice: newItem.sellingPrice,
          lastPurchaseDate: now,
          lastSaleDate: now,
          minThreshold: 3,
          minStockAlert: 3,
          status: 'In Stock',
          supplier: supplier || 'External Wholesale Store'
        });
      }
    });

    addNotification({
      userId: currentUser?.id || 'usr-merch-1',
      targetRole: 'merchant',
      title: 'Receipt Scanned & Stock Updated',
      message: `Added ${items.length} items from external receipt (${supplier}). Inventory records updated.`,
      type: 'inventory',
      actionUrl: '/merchant/inventory'
    });
  };

  // Sales recording
  const recordSale = (saleData: any): SaleTransaction => {
    const serial = Math.floor(1000 + Math.random() * 9000);
    const newSale: SaleTransaction = {
      ...saleData,
      id: `sale-${Date.now()}`,
      receiptNumber: `REC-2026-${serial}`,
      paymentType: saleData.paymentType || saleData.paymentMethod || 'Cash',
      paymentMethod: saleData.paymentMethod || saleData.paymentType || 'Cash',
      date: saleData.date || new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setSales(prev => [newSale, ...prev]);

    // Decrease corresponding inventory if found
    saleData.items.forEach((soldItem: any) => {
      const match = inventory.find(i => {
        const iName = (i.productName || i.name || '').toLowerCase();
        const sName = (soldItem.productName || soldItem.name || '').toLowerCase();
        return iName.includes(sName) || sName.includes(iName);
      });
      if (match) {
        adjustStock(match.id, -soldItem.quantity);
      }
    });

    return newSale;
  };

  const resetAllData = () => {
    localStorage.removeItem('tewedaj_credits');
    localStorage.removeItem('tewedaj_credit_requests');
    localStorage.removeItem('tewedaj_products');
    localStorage.removeItem('tewedaj_orders');
    localStorage.removeItem('tewedaj_deliveries');
    localStorage.removeItem('tewedaj_inventory');
    localStorage.removeItem('tewedaj_sales');
    localStorage.removeItem('tewedaj_notifs');

    setCreditAgreements(INITIAL_CREDIT_AGREEMENTS);
    setCreditRequests([]);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setDeliveryJobs(INITIAL_DELIVERY_JOBS);
    setInventory(INITIAL_INVENTORY);
    setSales(INITIAL_SALES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCart([]);
  };

  // Credit Request Functions (Merchant-Wholesaler Credit Guarantee)
  const createCreditRequest = (request: CreditRequest): boolean => {
    setCreditRequests(prev => [request, ...prev]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tewedaj_credit_requests', JSON.stringify([request, ...creditRequests]));
    }
    return true;
  };

  const approveCreditRequest = (requestId: string, wholesalerTelebirrPhone: string): boolean => {
    const request = creditRequests.find(r => r.id === requestId);
    if (!request) return false;

    // Update request status
    const updatedRequest: CreditRequest = {
      ...request,
      status: 'Approved',
      wholesalerTelebirrPhone
    };
    setCreditRequests(prev => prev.map(r => r.id === requestId ? updatedRequest : r));

    // Create credit agreement from approved request
    const newAgreement: CreditAgreement = {
      id: `crd-${Date.now()}`,
      agreementNumber: `TW-CR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      merchantId: request.merchantId,
      merchantName: request.merchantName,
      merchantPhone: request.merchantPhone,
      merchantLocation: request.merchantLocation,
      customerId: request.wholesalerId, // Wholesaler is the "customer" in this context
      customerName: request.wholesalerName,
      customerPhone: request.wholesalerPhone,
      customerIdNumber: undefined,
      goodsDescription: request.items.map(item => `${item.productName} (${item.quantity} ${item.unit})`).join(', '),
      totalAmount: request.totalAmount,
      paidAmount: 0,
      remainingAmount: request.totalAmount,
      creationDate: new Date().toISOString(),
      dueDate: request.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      terms: request.terms,
      status: 'Active',
      paymentPartnerDetails: {
        telebirrPhone: request.merchantTelebirrPhone,
        preferredProvider: 'Telebirr'
      },
      authorizationMandate: {
        provider: 'Telebirr Mandate',
        mandateReference: `MANDATE-${Date.now()}`,
        mandateStatus: 'Pending OTP',
        customerOtpPhone: request.merchantTelebirrPhone
      },
      repayments: [],
      auditLog: [{
        id: `audit-${Date.now()}`,
        type: 'credit.agreement.created',
        message: `Credit agreement created from approved credit request ${request.requestNumber}`,
        timestamp: new Date().toISOString()
      }]
    };

    setCreditAgreements(prev => [newAgreement, ...prev]);

    // Update request with agreement ID
    setCreditRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status: 'Converted to Agreement', creditAgreementId: newAgreement.id } : r
    ));

    // Notify merchant
    addNotification({
      userId: request.merchantId,
      targetRole: 'merchant',
      title: 'Credit Request Approved',
      message: `Your credit request to ${request.wholesalerName} has been approved. Credit agreement ${newAgreement.agreementNumber} created.`,
      type: 'credit',
      actionUrl: '/merchant/credit'
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('tewedaj_credit_requests', JSON.stringify(creditRequests.map(r => r.id === requestId ? updatedRequest : r)));
      localStorage.setItem('tewedaj_credits', JSON.stringify([newAgreement, ...creditAgreements]));
    }

    return true;
  };

  const rejectCreditRequest = (requestId: string, reason: string): boolean => {
    const request = creditRequests.find(r => r.id === requestId);
    if (!request) return false;

    const updatedRequest: CreditRequest = {
      ...request,
      status: 'Rejected',
      rejectionReason: reason
    };
    setCreditRequests(prev => prev.map(r => r.id === requestId ? updatedRequest : r));

    // Notify merchant
    addNotification({
      userId: request.merchantId,
      targetRole: 'merchant',
      title: 'Credit Request Declined',
      message: `Your credit request to ${request.wholesalerName} was declined. Reason: ${reason}`,
      type: 'credit'
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('tewedaj_credit_requests', JSON.stringify(creditRequests.map(r => r.id === requestId ? updatedRequest : r)));
    }

    return true;
  };

  const getCreditRequestsForWholesaler = (wholesalerId: string): CreditRequest[] => {
    return creditRequests.filter(r => r.wholesalerId === wholesalerId);
  };

  const getCreditRequestsForMerchant = (merchantId: string): CreditRequest[] => {
    return creditRequests.filter(r => r.merchantId === merchantId);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        t,
        currentUser,
        currentRole,
        currentPath: pathname,
        selectedCreditId,
        setCurrentPath,
        switchRole,
        switchUserRole,
        loginUser,
        login,
        signup,
        resetPassword,
        logoutUser,
        creditAgreements,
        createCreditAgreement,
        recordRepayment,
        selectCreditForDetail,
        creditRequests,
        createCreditRequest,
        approveCreditRequest,
        rejectCreditRequest,
        getCreditRequestsForWholesaler,
        getCreditRequestsForMerchant,
        products,
        addProduct,
        updateProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        checkoutCart,
        orders,
        updateOrderStatus,
        deliveryJobs,
        deliveryAvailability,
        setDeliveryAvailability,
        acceptDeliveryJob,
        declineDeliveryJob,
        updateDeliveryStatus,
        completeDeliveryJob,
        inventory,
        addInventoryItem,
        updateInventoryItem,
        adjustStock,
        recordExternalReceipt,
        sales,
        salesTransactions: sales,
        recordSale,
        notifications,
        markNotificationRead,
        addNotification,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
