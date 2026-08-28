export interface NavigationItem {
  label: string;
  path: string;
  permission?: import('./permissions').Permission;
}

export const ROLE_NAVIGATION: Record<string, NavigationItem[]> = {
  merchant: [
    { label: 'Overview', path: '/merchant/dashboard' },
    { label: 'Credit Ledger', path: '/merchant/credit', permission: 'credit:view' },
    { label: 'Wholesale Market', path: '/merchant/marketplace' },
    { label: 'Orders', path: '/merchant/orders', permission: 'orders:view' },
    { label: 'Inventory', path: '/merchant/inventory', permission: 'inventory:view' },
    { label: 'Reports', path: '/merchant/reports', permission: 'reports:view' }
  ],
  wholesaler: [
    { label: 'Dashboard', path: '/wholesaler/dashboard' },
    { label: 'Products', path: '/wholesaler/products', permission: 'inventory:view' },
    { label: 'Orders', path: '/wholesaler/orders', permission: 'orders:view' },
    { label: 'Analytics', path: '/wholesaler/analytics', permission: 'reports:view' }
  ],
  delivery: [
    { label: 'Dashboard', path: '/delivery/dashboard' },
    { label: 'Jobs', path: '/delivery/jobs', permission: 'orders:view' },
    { label: 'Active', path: '/delivery/active', permission: 'orders:manage' },
    { label: 'Earnings', path: '/delivery/earnings', permission: 'payment:view' }
  ],
  customer: [
    { label: 'Dashboard', path: '/customer/dashboard', permission: 'credit:view' },
    { label: 'Credits', path: '/customer/credits', permission: 'credit:view' },
    { label: 'Payments', path: '/customer/payments', permission: 'payment:view' }
  ]
};
