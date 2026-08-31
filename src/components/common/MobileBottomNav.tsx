'use client'

import React from 'react';
import { useApp } from '../../context/AppContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, CreditCard, ShoppingBag, Package, Boxes, Truck, DollarSign, Receipt, User, MoreHorizontal } from 'lucide-react';

interface MobileBottomNavProps {
  onMenuClick?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onMenuClick }) => {
  const { currentRole, creditAgreements, orders, deliveryJobs, language } = useApp();
  const pathname = usePathname();

  if (currentRole === 'public') return null;

  const activeCredits = creditAgreements.filter(c => c.status === 'Active').length;
  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const availableJobs = deliveryJobs.filter(j => j.status === 'Available').length;

  let items: Array<{ label: string; path: string; icon: React.ReactNode; badge?: number; isMore?: boolean }> = [];

  if (currentRole === 'merchant') {
    items = [
      { label: language === 'am' ? 'ዳሽቦርድ' : 'Home', path: '/merchant/dashboard', icon: <LayoutDashboard size={20} /> },
      { label: language === 'am' ? 'ብድር' : 'Credit', path: '/merchant/credit-hub', icon: <CreditCard size={20} />, badge: activeCredits },
      { label: language === 'am' ? 'ጅምላ' : 'Market', path: '/merchant/marketplace', icon: <ShoppingBag size={20} /> },
      { label: language === 'am' ? 'ጭነት' : 'Orders', path: '/merchant/orders', icon: <Package size={20} />, badge: activeOrders },
      { label: language === 'am' ? 'ተጨማህ' : 'More', path: '#', icon: <MoreHorizontal size={20} />, isMore: true },
    ];
  } else if (currentRole === 'wholesaler') {
    items = [
      { label: language === 'am' ? 'ዋና' : 'Home', path: '/wholesaler/dashboard', icon: <LayoutDashboard size={20} /> },
      { label: language === 'am' ? 'ምርቶች' : 'Products', path: '/wholesaler/products', icon: <Boxes size={20} /> },
      { label: language === 'am' ? 'ትዕዛዞች' : 'Orders', path: '/wholesaler/orders', icon: <Package size={20} />, badge: activeOrders },
      { label: language === 'am' ? 'ትንታኔ' : 'Analytics', path: '/wholesaler/analytics', icon: <DollarSign size={20} /> },
    ];
  } else if (currentRole === 'delivery' || currentRole === 'delivery_partner') {
    items = [
      { label: language === 'am' ? 'ዋና' : 'Home', path: '/delivery/dashboard', icon: <LayoutDashboard size={20} /> },
      { label: language === 'am' ? 'ስራዎች' : 'Jobs', path: '/delivery/jobs', icon: <ShoppingBag size={20} />, badge: availableJobs },
      { label: language === 'am' ? 'ጉዞ' : 'Active', path: '/delivery/active', icon: <Truck size={20} /> },
      { label: language === 'am' ? 'ገቢ' : 'Earnings', path: '/delivery/earnings', icon: <DollarSign size={20} /> },
    ];
  } else if (currentRole === 'customer') {
    items = [
      { label: language === 'am' ? 'ዋና' : 'Home', path: '/customer/dashboard', icon: <LayoutDashboard size={20} /> },
      { label: language === 'am' ? 'ብድሮች' : 'Credits', path: '/customer/credits', icon: <CreditCard size={20} />, badge: activeCredits },
      { label: language === 'am' ? 'ክፍያዎች' : 'Payments', path: '/customer/payments', icon: <Receipt size={20} /> },
    ];
  }

  return (
    <nav className="mobile-bottom-nav">
      {items.map((item) => {
        const isActive = pathname === item.path;
        
        if (item.isMore) {
          return (
            <button
              key="more"
              onClick={onMenuClick}
              className="mobile-nav-item"
              style={{ 
                position: 'relative', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                textDecoration: 'none', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '4px',
                padding: '8px 12px',
                minWidth: '60px',
                minHeight: '60px'
              }}
              aria-label={item.label}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative'
              }}>
                {item.icon}
              </div>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                textAlign: 'center',
                lineHeight: 1.1,
                maxWidth: '70px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            style={{ 
              position: 'relative', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              textDecoration: 'none', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '4px',
              padding: '8px 12px',
              minWidth: '60px',
              minHeight: '60px'
            }}
            aria-label={item.label}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative'
            }}>
              {item.icon}
              {item.badge !== undefined && item.badge > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-6px',
                  backgroundColor: '#D99A20',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '16px'
                }}>
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
            </div>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? 'var(--gold-deep)' : 'var(--text-muted)',
              textAlign: 'center',
              lineHeight: 1.1,
              maxWidth: '70px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
