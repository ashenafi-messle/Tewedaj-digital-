export type Permission =
  | 'credit:view'
  | 'credit:create'
  | 'credit:approve'
  | 'payment:view'
  | 'inventory:view'
  | 'inventory:manage'
  | 'orders:view'
  | 'orders:manage'
  | 'reports:view';

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  merchant: [
    'credit:view', 'credit:create', 'credit:approve',
    'payment:view', 'inventory:view', 'inventory:manage',
    'orders:view', 'orders:manage', 'reports:view'
  ],
  wholesaler: ['orders:view', 'orders:manage', 'inventory:view', 'inventory:manage', 'reports:view'],
  delivery: ['orders:view', 'orders:manage', 'payment:view'],
  delivery_partner: ['orders:view', 'orders:manage', 'payment:view'],
  customer: ['credit:view', 'payment:view']
};

// This is a UI capability hint only. Server-side authorization remains authoritative.
export const can = (role: string | undefined, permission: Permission): boolean =>
  Boolean(role && ROLE_PERMISSIONS[role]?.includes(permission));
