'use client'

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
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
  X,
  KeyRound
} from 'lucide-react';
import { ResetPasswordModal } from '../common/ResetPasswordModal';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { currentRole, currentUser, language, t, logoutUser } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname, isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleNavClick = () => {
    onClose();
  };

  const handleLogout = () => {
    logoutUser();
    router.replace('/login');
    onClose();
  };

  const renderNavItems = () => {
    switch (currentRole) {
      case 'merchant':
        return (
          <>
            <div className="sidebar-section-title">
              {language === 'am' ? 'የነጋዴ ስራዎች' : 'MERCHANT OPERATIONS'}
            </div>
            <Link 
              href="/merchant/dashboard" 
              className={`sidebar-link ${pathname === '/merchant/dashboard' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <LayoutDashboard size={18} />
              <span>{language === 'am' ? 'አጠቃላይ ዳሽቦርድ' : 'Overview Dashboard'}</span>
            </Link>
            <Link 
              href="/merchant/credit" 
              className={`sidebar-link ${pathname === '/merchant/credit' || pathname === '/merchant/credit-hub' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <CreditCard size={18} />
              <span>{language === 'am' ? 'የዲጂታል ብድር መዝገብ' : 'Credit Ledger (ዲጂታል ብድር)'}</span>
            </Link>
            <Link 
              href="/merchant/marketplace" 
              className={`sidebar-link ${pathname === '/merchant/marketplace' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <ShoppingBag size={18} />
              <span>{language === 'am' ? 'የጅምላ ግዢ ገበያ' : 'Wholesale Market (ግዢ)'}</span>
            </Link>
            <Link 
              href="/merchant/inventory" 
              className={`sidebar-link ${pathname === '/merchant/inventory' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <Boxes size={18} />
              <span>{language === 'am' ? 'የዕቃ ክምችትና AI OCR' : 'Inventory & AI OCR'}</span>
            </Link>
            <Link 
              href="/merchant/orders" 
              className={`sidebar-link ${pathname === '/merchant/orders' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <Package size={18} />
              <span>{language === 'am' ? 'የገቢ ጭነትና OTP' : 'Inbound Cargo & OTP'}</span>
            </Link>
            <Link 
              href="/merchant/reports" 
              className={`sidebar-link ${pathname === '/merchant/reports' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
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
            <Link 
              href="/wholesaler/dashboard" 
              className={`sidebar-link ${pathname === '/wholesaler/dashboard' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <LayoutDashboard size={18} />
              <span>{language === 'am' ? 'የጅምላ ማዕከል' : 'Wholesale Hub'}</span>
            </Link>
            <Link 
              href="/wholesaler/products" 
              className={`sidebar-link ${pathname === '/wholesaler/products' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <Boxes size={18} />
              <span>{language === 'am' ? 'የጅምላ ምርቶችና MOQ' : 'Bulk Commodities & MOQs'}</span>
            </Link>
            <Link 
              href="/wholesaler/orders" 
              className={`sidebar-link ${pathname === '/wholesaler/orders' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <Package size={18} />
              <span>{language === 'am' ? 'የትዕዛዞች ማስተናገጃ' : 'Retailer Orders Dispatch'}</span>
            </Link>
            <Link 
              href="/wholesaler/analytics" 
              className={`sidebar-link ${pathname === '/wholesaler/analytics' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
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
            <Link 
              href="/delivery/dashboard" 
              className={`sidebar-link ${pathname === '/delivery/dashboard' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <LayoutDashboard size={18} />
              <span>{language === 'am' ? 'የአጓጓዥ ዳሽቦርድ' : 'Pilot Dashboard'}</span>
            </Link>
            <Link 
              href="/delivery/jobs" 
              className={`sidebar-link ${pathname === '/delivery/jobs' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <Package size={18} />
              <span>{language === 'am' ? 'የማጓጓዣ ስራዎች ገበያ' : 'Cargo Jobs Marketplace'}</span>
            </Link>
            <Link 
              href="/delivery/active" 
              className={`sidebar-link ${pathname === '/delivery/active' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <Truck size={18} />
              <span>{language === 'am' ? 'የቀጥታ ጉዞና ካርታ' : 'Active Route & OTP Map'}</span>
            </Link>
            <Link 
              href="/delivery/earnings" 
              className={`sidebar-link ${pathname === '/delivery/earnings' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
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
            <Link 
              href="/customer/dashboard" 
              className={`sidebar-link ${pathname === '/customer/dashboard' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <LayoutDashboard size={18} />
              <span>{language === 'am' ? 'የብድር ማጠቃለያ' : 'Credit Transparency'}</span>
            </Link>
            <Link 
              href="/customer/credits" 
              className={`sidebar-link ${pathname === '/customer/credits' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <CreditCard size={18} />
              <span>{language === 'am' ? 'የብድር ውሎች ዝርዝር' : 'All Credit Agreements'}</span>
            </Link>
            <Link 
              href="/customer/payments" 
              className={`sidebar-link ${pathname === '/customer/payments' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <Receipt size={18} />
              <span>{language === 'am' ? 'የክፍያ ደረሰኞችና ፈቃዶች' : 'Payment Receipts & Mandates'}</span>
            </Link>
          </>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="mobile-drawer-overlay" 
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        {/* Header with close button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          borderBottom: '1px solid rgba(74,46,23,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
              boxShadow: '0 2px 8px rgba(245, 166, 35, 0.3)'
            }}>
              ተ
            </div>
            <div>
              <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: '1.25rem', color: 'var(--brown-dark)', lineHeight: 1 }}>
                TEWEDAJ
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--gold-primary)', fontWeight: 700 }}>
                ተወዳጅ ቢዝነስ
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-dark)'
            }}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Badge Profile */}
        <div style={{
          backgroundColor: 'var(--surface-elevated)',
          borderRadius: '12px',
          padding: '12px',
          margin: '16px',
          border: '1px solid var(--border-subtle)'
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

        {/* Dynamic Nav Menu */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 16px', flex: 1, overflowY: 'auto' }}>
          {renderNavItems()}
        </nav>

        {/* Bottom Switcher / Sign Out */}
        <div style={{ 
          borderTop: '1px solid rgba(74,46,23,0.1)', 
          paddingTop: '16px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '6px',
          padding: '16px'
        }}>
          <button
            onClick={() => {
              setIsResetPasswordOpen(true);
              onClose();
            }}
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
              padding: '12px',
              borderRadius: '8px',
              textAlign: 'left'
            }}
          >
            <KeyRound size={18} color="#D99A20" />
            <span>{t('nav.changePassword')}</span>
          </button>

          <button 
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#756B5D',
              fontSize: '0.8rem',
              cursor: 'pointer',
              padding: '12px',
              borderRadius: '8px',
              textAlign: 'left'
            }}
          >
            <LogOut size={18} />
            <span>{language === 'am' ? 'ውጣ' : 'Sign Out'}</span>
          </button>
        </div>

        <ResetPasswordModal
          isOpen={isResetPasswordOpen}
          onClose={() => setIsResetPasswordOpen(false)}
        />
      </aside>
    </>
  );
};