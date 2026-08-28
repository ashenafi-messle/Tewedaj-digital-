'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSidebar } from '../dashboard/DashboardLayout';
import {
  LayoutDashboard,
  CreditCard,
  ShoppingBag,
  Boxes,
  Package,
  BarChart3,
  TrendingUp,
  Truck,
  DollarSign,
  UserCheck,
  Receipt,
  FileText,
  LogOut,
  ChevronRight,
  ShieldCheck,
  KeyRound,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { ResetPasswordModal } from '../common/ResetPasswordModal';

export const RoleSidebar: React.FC = () => {
  const { currentRole, currentUser, switchUserRole, language, t, logoutUser } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const renderNavItems = () => {
    switch (currentRole) {
      case 'merchant':
        return (
          <>
            <div className="sidebar-section-title">
              {language === 'am' ? 'የነጋዴ ስራዎች' : 'MERCHANT OPERATIONS'}
            </div>
            <Link href="/merchant/dashboard" className={`sidebar-link ${pathname === '/merchant/dashboard' ? 'active' : ''}`}>
              <LayoutDashboard size={18} />
              <span>{language === 'am' ? 'አጠቃላይ ዳሽቦርድ' : 'Overview Dashboard'}</span>
            </Link>
            <Link href="/merchant/credit" className={`sidebar-link ${pathname === '/merchant/credit' || pathname === '/merchant/credit-hub' ? 'active' : ''}`}>
              <CreditCard size={18} />
              <span>{language === 'am' ? 'የዲጂታል ብድር መዝገብ' : 'Credit Ledger (ዲጂታል ብድር)'}</span>
            </Link>
            <Link href="/merchant/marketplace" className={`sidebar-link ${pathname === '/merchant/marketplace' ? 'active' : ''}`}>
              <ShoppingBag size={18} />
              <span>{language === 'am' ? 'የጅምላ ግዢ ገበያ' : 'Wholesale Market (ግዢ)'}</span>
            </Link>
            <Link href="/merchant/inventory" className={`sidebar-link ${pathname === '/merchant/inventory' ? 'active' : ''}`}>
              <Boxes size={18} />
              <span>{language === 'am' ? 'የዕቃ ክምችትና AI OCR' : 'Inventory & AI OCR'}</span>
            </Link>
            <Link href="/merchant/orders" className={`sidebar-link ${pathname === '/merchant/orders' ? 'active' : ''}`}>
              <Package size={18} />
              <span>{language === 'am' ? 'የገቢ ጭነትና OTP' : 'Inbound Cargo & OTP'}</span>
            </Link>
            <Link href="/merchant/reports" className={`sidebar-link ${pathname === '/merchant/reports' ? 'active' : ''}`}>
              <BarChart3 size={18} />
              <span>{language === 'am' ? 'የፋይናንስ ሪፖርቶች' : 'Financial Reports'}</span>
            </Link>
          </>
        );

      case 'wholesaler':
        return (
          <>
            <div className="sidebar-section-title">
              {language === 'am' ? 'የጅምላ አቅራቢ' : 'WHOLESALER SUPPLIER'}
            </div>
            <Link href="/wholesaler/dashboard" className={`sidebar-link ${pathname === '/wholesaler/dashboard' ? 'active' : ''}`}>
              <LayoutDashboard size={18} />
              <span>{language === 'am' ? 'የጅምላ ማዕከል' : 'Wholesale Hub'}</span>
            </Link>
            <Link href="/wholesaler/products" className={`sidebar-link ${pathname === '/wholesaler/products' ? 'active' : ''}`}>
              <Boxes size={18} />
              <span>{language === 'am' ? 'የጅምላ ምርቶችና MOQ' : 'Bulk Commodities & MOQs'}</span>
            </Link>
            <Link href="/wholesaler/orders" className={`sidebar-link ${pathname === '/wholesaler/orders' ? 'active' : ''}`}>
              <Package size={18} />
              <span>{language === 'am' ? 'የትዕዛዞች ማስተናገጃ' : 'Retailer Orders Dispatch'}</span>
            </Link>
            <Link href="/wholesaler/analytics" className={`sidebar-link ${pathname === '/wholesaler/analytics' ? 'active' : ''}`}>
              <TrendingUp size={18} />
              <span>{language === 'am' ? 'የንግድ ትንታኔ' : 'Trade Corridor Analytics'}</span>
            </Link>
          </>
        );

      case 'delivery':
        return (
          <>
            <div className="sidebar-section-title">
              {language === 'am' ? 'የአጓጓዥ መቆጣጠሪያ' : 'DELIVERY FLEET PILOT'}
            </div>
            <Link href="/delivery/dashboard" className={`sidebar-link ${pathname === '/delivery/dashboard' ? 'active' : ''}`}>
              <LayoutDashboard size={18} />
              <span>{language === 'am' ? 'የአጓጓዥ ዳሽቦርድ' : 'Pilot Dashboard'}</span>
            </Link>
            <Link href="/delivery/jobs" className={`sidebar-link ${pathname === '/delivery/jobs' ? 'active' : ''}`}>
              <Package size={18} />
              <span>{language === 'am' ? 'የማጓጓዣ ስራዎች ገበያ' : 'Cargo Jobs Marketplace'}</span>
            </Link>
            <Link href="/delivery/active" className={`sidebar-link ${pathname === '/delivery/active' ? 'active' : ''}`}>
              <Truck size={18} />
              <span>{language === 'am' ? 'የቀጥታ ጉዞና ካርታ' : 'Active Route & OTP Map'}</span>
            </Link>
            <Link href="/delivery/earnings" className={`sidebar-link ${pathname === '/delivery/earnings' ? 'active' : ''}`}>
              <DollarSign size={18} />
              <span>{language === 'am' ? 'የቴሌብር ቦርሳና ገቢ' : 'Telebirr Wallet & Earnings'}</span>
            </Link>
          </>
        );

      case 'customer':
        return (
          <>
            <div className="sidebar-section-title">
              {language === 'am' ? 'የደንበኛ ማዕከል' : 'CUSTOMER TRANSPARENCY'}
            </div>
            <Link href="/customer/dashboard" className={`sidebar-link ${pathname === '/customer/dashboard' ? 'active' : ''}`}>
              <LayoutDashboard size={18} />
              <span>{language === 'am' ? 'የብድር ማጠቃለያ' : 'Credit Transparency'}</span>
            </Link>
            <Link href="/customer/credits" className={`sidebar-link ${pathname === '/customer/credits' ? 'active' : ''}`}>
              <CreditCard size={18} />
              <span>{language === 'am' ? 'የብድር ውሎች ዝርዝር' : 'All Credit Agreements'}</span>
            </Link>
            <Link href="/customer/payments" className={`sidebar-link ${pathname === '/customer/payments' ? 'active' : ''}`}>
              <Receipt size={18} />
              <span>{language === 'am' ? 'የክፍያ ደረሰኞችና ፈቃዶች' : 'Payment Receipts & Mandates'}</span>
            </Link>
          </>
        );
    }
  };

  return (
    <aside className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '24px',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 0,
          width: 'fit-content'
        }}
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          backgroundColor: '#F5A623',
          color: '#26160A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Fraunces, serif',
          fontWeight: 800,
          fontSize: '1.3rem',
          boxShadow: '0 2px 8px rgba(245, 166, 35, 0.3)',
          flexShrink: 0
        }}>
          ተ
        </div>
        {!isCollapsed && (
          <div style={{ transition: 'opacity 0.2s ease' }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: '1.25rem', color: 'var(--brown-dark)', lineHeight: 1 }}>
              TEWEDAJ
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--gold-primary)', fontWeight: 700 }}>
              ተወዳጅ ቢዝነስ
            </div>
          </div>
        )}
      </button>

      {/* User Badge Profile */}
      {!isCollapsed && (
        <div style={{
          backgroundColor: 'var(--surface-elevated)',
          borderRadius: '12px',
          padding: '12px',
          border: '1px solid var(--border-subtle)',
          marginBottom: '20px',
          transition: 'opacity 0.2s ease'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            {t('nav.currentSession')}
          </div>
          <div style={{ fontWeight: 700, color: 'var(--brown-dark)', fontSize: '0.9rem', marginTop: '2px' }}>
            {currentUser?.name}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
            {currentUser?.businessName || currentUser?.vehicleType || t('nav.verifiedCustomer')}
          </div>
        </div>
      )}

      {/* Dynamic Nav Menu */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {renderNavItems()}
      </nav>

      {/* Bottom Switcher / Sign Out */}
      <div style={{ borderTop: '1px solid rgba(74,46,23,0.1)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <button
          onClick={() => setIsResetPasswordOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#4A2E17',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '6px 8px',
            borderRadius: '6px',
            justifyContent: isCollapsed ? 'center' : 'flex-start'
          }}
        >
          <KeyRound size={15} color="#D99A20" />
          {!isCollapsed && <span>{t('nav.changePassword')}</span>}
        </button>

        <button onClick={() => {
          logoutUser();
          router.replace('/login');
        }} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#756B5D',
            fontSize: '0.8rem',
            cursor: 'pointer',
            padding: '6px 8px',
            borderRadius: '6px',
            textDecoration: 'none',
            justifyContent: isCollapsed ? 'center' : 'flex-start'
          }}
        >
          <LogOut size={15} />
          {!isCollapsed && <span>{language === 'am' ? 'ውጣ' : 'Sign Out'}</span>}
        </button>
      </div>

      <ResetPasswordModal
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
      />
    </aside>
  );
};
