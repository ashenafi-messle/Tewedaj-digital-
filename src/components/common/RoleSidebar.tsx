import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CreditCard,
  ShoppingBag,
  Package,
  Boxes,
  Receipt,
  Truck,
  BarChart3,
  Bell,
  LogOut,
  ChevronRight,
  Sparkles,
  DollarSign,
  TrendingUp,
  MapPin
} from 'lucide-react';

export const RoleSidebar: React.FC = () => {
  const { currentRole, currentPath, setCurrentPath, logoutUser, cart, orders, deliveryJobs, creditAgreements } = useApp();

  const activeOrdersCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const availableJobsCount = deliveryJobs.filter(j => j.status === 'Available').length;
  const activeCreditsCount = creditAgreements.filter(c => c.status === 'Active').length;

  let menuItems: Array<{ label: string; path: string; icon: React.ReactNode; badge?: string | number; accent?: string }> = [];

  if (currentRole === 'merchant') {
    menuItems = [
      { label: 'Overview', path: '/merchant/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'Credit Agreements', path: '/merchant/credit', icon: <CreditCard size={18} />, badge: activeCreditsCount, accent: '#4F7D3A' },
      { label: 'Wholesale Market', path: '/merchant/marketplace', icon: <ShoppingBag size={18} />, badge: cart.length > 0 ? `${cart.length} in cart` : undefined },
      { label: 'Inbound Orders', path: '/merchant/orders', icon: <Package size={18} />, badge: activeOrdersCount > 0 ? activeOrdersCount : undefined },
      { label: 'Inventory & OCR', path: '/merchant/inventory', icon: <Boxes size={18} /> },
      { label: 'Quick POS & Sales', path: '/merchant/sales', icon: <Receipt size={18} /> },
      { label: 'Live Delivery Map', path: '/merchant/delivery-tracking', icon: <Truck size={18} /> },
      { label: 'Financial Reports', path: '/merchant/reports', icon: <BarChart3 size={18} /> },
    ];
  } else if (currentRole === 'wholesaler') {
    menuItems = [
      { label: 'Wholesaler Hub', path: '/wholesaler/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'Products & Stock', path: '/wholesaler/products', icon: <Boxes size={18} /> },
      { label: 'Merchant Orders', path: '/wholesaler/orders', icon: <Package size={18} />, badge: activeOrdersCount > 0 ? activeOrdersCount : undefined },
      { label: 'Demand Analytics', path: '/wholesaler/analytics', icon: <TrendingUp size={18} /> },
    ];
  } else if (currentRole === 'delivery_partner') {
    menuItems = [
      { label: 'Rider Dashboard', path: '/delivery/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'Available Jobs', path: '/delivery/jobs', icon: <ShoppingBag size={18} />, badge: availableJobsCount, accent: '#E59B3A' },
      { label: 'Active Delivery', path: '/delivery/active', icon: <Truck size={18} /> },
      { label: 'Earnings & Payouts', path: '/delivery/earnings', icon: <DollarSign size={18} /> },
    ];
  } else if (currentRole === 'customer') {
    menuItems = [
      { label: 'My Credit Hub', path: '/customer/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'Credit Agreements', path: '/customer/credits', icon: <CreditCard size={18} />, badge: activeCreditsCount },
      { label: 'Payment History', path: '/customer/payments', icon: <Receipt size={18} /> },
    ];
  }

  const roleTitleMap: Record<string, { name: string; tag: string; color: string; bg: string }> = {
    merchant: { name: 'Almaz Wolde', tag: 'Merchant Portal', color: '#4A2E17', bg: '#FBE6A2' },
    wholesaler: { name: 'Gondar Central', tag: 'Wholesaler Hub', color: '#38210F', bg: '#EFEBE9' },
    delivery_partner: { name: 'Dawit Mengistu', tag: 'Delivery Rider', color: '#375928', bg: '#DCE8C8' },
    customer: { name: 'Bethlehem Tsegaye', tag: 'Customer Account', color: '#00695C', bg: '#E0F2F1' },
  };

  const roleInfo = roleTitleMap[currentRole] || roleTitleMap.merchant;

  return (
    <aside className="dashboard-sidebar">
      {/* Brand Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid rgba(74, 46, 23, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #F4C542 0%, #D99A20 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          color: '#38210F',
          fontFamily: 'Fraunces, serif',
          boxShadow: '0 2px 8px rgba(217, 154, 32, 0.25)'
        }}>
          T
        </div>
        <div>
          <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: '1.15rem', color: '#4A2E17', lineHeight: 1 }}>
            TEWEDAJ
          </div>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: roleInfo.color,
            backgroundColor: roleInfo.bg,
            padding: '2px 6px',
            borderRadius: '4px',
            display: 'inline-block',
            marginTop: '3px'
          }}>
            {roleInfo.tag}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A39686', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '0 8px 6px' }}>
          Menu
        </div>
        {menuItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => setCurrentPath(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, #FFF6D6 0%, #FEEBB2 100%)' : 'transparent',
                color: isActive ? '#38210F' : '#756B5D',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                borderLeft: isActive ? '3px solid #D99A20' : '3px solid transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: isActive ? '#D99A20' : '#756B5D' }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '999px',
                  backgroundColor: item.accent ? item.accent : '#F4C542',
                  color: item.accent ? '#FFFFFF' : '#38210F'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom User Card & Exit */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid rgba(74, 46, 23, 0.1)',
        backgroundColor: '#FAF5E8'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: '#D99A20',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}>
            {roleInfo.name.charAt(0)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38210F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {roleInfo.name}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#756B5D', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <MapPin size={11} /> Gondar, ET
            </div>
          </div>
        </div>

        <button
          onClick={logoutUser}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '8px',
            background: '#FFFFFF',
            border: '1px solid rgba(74, 46, 23, 0.15)',
            borderRadius: '8px',
            color: '#4A2E17',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <LogOut size={13} />
          Exit to Website
        </button>
      </div>
    </aside>
  );
};
