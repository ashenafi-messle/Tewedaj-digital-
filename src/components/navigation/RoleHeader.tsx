'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Search,
  User,
  ShoppingBag,
  Globe,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  KeyRound,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { CartDrawer } from '../common/CartDrawer';
import { ResetPasswordModal } from '../common/ResetPasswordModal';
import { LanguageToggle } from '../common/LanguageToggle';
import { ThemeToggle } from '../common/ThemeToggle';

export const RoleHeader: React.FC = () => {
  const { currentUser, currentRole, cart, logoutUser, t, language } = useApp();
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  const roleNameDisplay = {
    merchant: t('portal.merchant'),
    wholesaler: t('portal.wholesaler'),
    delivery: t('portal.delivery'),
    customer: t('portal.customer'),
    delivery_partner: t('portal.delivery'),
    public: language === 'am' ? 'የተወዳጅ መድረክ' : 'Public Platform'
  }[currentRole] || `${currentRole} Portal`;

  const notifications = [
    {
      id: 1,
      text: language === 'am' ? 'የቴሌብር አውቶማቲክ ክፍያ 2,500 ብር ተፈጽሟል።' : 'Telebirr mandate auto-deduction of ETB 2,500 settled.',
      time: language === 'am' ? 'ከ10 ደቂቃ በፊት' : '10m ago'
    },
    {
      id: 2,
      text: language === 'am' ? 'ትዕዛዝ #ORD-7729 በዳዊት (ባጃጅ ካርጎ) ተረክቧል።' : 'Order #ORD-7729 picked up by Dawit (Bajaj Cargo).',
      time: language === 'am' ? 'ከ25 ደቂቃ በፊት' : '25m ago'
    },
    {
      id: 3,
      text: language === 'am' ? 'አዲስ የጅምላ አዳ ማኛ ጤፍ በ5,200 ብር ቀርቧል።' : 'New wholesale Adaa Magna Teff listed at ETB 5,200.',
      time: language === 'am' ? 'ከ1 ሰዓት በፊት' : '1h ago'
    },
  ];

  return (
    <header className="dashboard-header">
      {/* Role Title & Breadcrumb */}
      <div className="portal-identity">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            backgroundColor: currentRole === 'merchant' ? '#FFF6D6' : currentRole === 'wholesaler' ? '#EFEBE9' : currentRole === 'delivery' ? '#EEF5E5' : '#E0F2F1',
            color: currentRole === 'merchant' ? '#D99A20' : currentRole === 'wholesaler' ? '#4A2E17' : currentRole === 'delivery' ? '#4F7D3A' : '#00695C',
            fontWeight: 800,
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '6px',
            textTransform: 'uppercase'
          }}>
            {roleNameDisplay}
          </span>
          <span style={{ color: '#756B5D', fontSize: '0.8rem' }}>• {currentUser?.location}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="portal-header-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Theme Switcher */}
        <ThemeToggle compact={true} />

        {/* Language Switcher */}
        <LanguageToggle compact={true} />

        {/* Merchant Cart Shortcut */}
        {currentRole === 'merchant' && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn-gold btn-sm"
            style={{ position: 'relative' }}
          >
            <ShoppingBag size={15} />
            <span>{t('nav.wholesaleCart')}</span>
            {cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                backgroundColor: '#C62828',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.68rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800
              }}>
                {cart.length}
              </span>
            )}
          </button>
        )}

        {/* Notifications Popup */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#FAF5E8',
              border: '1px solid rgba(74,46,23,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#38210F',
              position: 'relative'
            }}
          >
            <Bell size={16} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#D99A20'
            }} />
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '44px',
              right: 0,
              width: '280px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              border: '1px solid rgba(74,46,23,0.1)',
              padding: '12px',
              zIndex: 1000
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#38210F', marginBottom: '8px', borderBottom: '1px solid rgba(74,46,23,0.08)', paddingBottom: '6px' }}>
                {t('nav.notifications')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map((n) => (
                  <div key={n.id} style={{ fontSize: '0.75rem', color: '#4A2E17', borderBottom: '1px solid rgba(74,46,23,0.05)', paddingBottom: '6px' }}>
                    <div>{n.text}</div>
                    <div style={{ fontSize: '0.68rem', color: '#756B5D', marginTop: '2px' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Security Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#FAF5E8',
              padding: '4px 10px 4px 6px',
              borderRadius: '20px',
              border: '1px solid rgba(74,46,23,0.15)',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#38210F',
              color: '#F4C542',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              {currentUser?.name.charAt(0)}
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#38210F' }}>
              {currentUser?.name.split(' ')[0]}
            </span>
            <ChevronDown size={14} color="#756B5D" />
          </button>

          {showUserMenu && (
            <div style={{
              position: 'absolute',
              top: '44px',
              right: 0,
              width: '240px',
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              border: '1px solid rgba(74,46,23,0.1)',
              padding: '12px',
              zIndex: 1000
            }}>
              <div style={{ borderBottom: '1px solid rgba(74,46,23,0.08)', paddingBottom: '8px', marginBottom: '8px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#38210F' }}>
                  {currentUser?.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#D99A20', fontWeight: 600 }}>
                  {currentUser?.phone}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#756B5D' }}>
                  {currentUser?.businessName || currentUser?.location}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    setIsResetPasswordOpen(true);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#FAF5E8',
                    color: '#38210F',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <KeyRound size={15} color="#D99A20" />
                  <span>{t('nav.changePassword')}</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logoutUser();
                    router.replace('/login');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#C62828',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <LogOut size={15} />
                  <span>{t('nav.signOut')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* In-App Password Reset / Security Modal */}
      <ResetPasswordModal
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
      />
    </header>
  );
};

