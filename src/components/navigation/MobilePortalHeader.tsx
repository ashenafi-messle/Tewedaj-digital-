'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, Bell, User, ShoppingBag } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageToggle } from '../common/LanguageToggle';

interface MobilePortalHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export const MobilePortalHeader: React.FC<MobilePortalHeaderProps> = ({ onMenuClick, title }) => {
  const { currentUser, currentRole, cart, t, language } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

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
  ];

  return (
    <header className="mobile-portal-header">
      {/* Left: Menu button + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
        <button
          onClick={onMenuClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-dark)',
            flexShrink: 0
          }}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            color: 'var(--gold-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '2px'
          }}>
            {roleNameDisplay}
          </div>
          <div style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: 'var(--brown-dark)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {title || currentUser?.businessName || currentUser?.location || 'Dashboard'}
          </div>
        </div>
      </div>

      {/* Right: Essential controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
        {/* Theme Toggle */}
        <ThemeToggle compact={true} />

        {/* Language Toggle */}
        <LanguageToggle compact={true} />

        {/* Merchant Cart Shortcut */}
        {currentRole === 'merchant' && (
          <button
            className="btn btn-gold btn-sm"
            style={{ 
              position: 'relative',
              padding: '8px 12px',
              fontSize: '0.75rem',
              minWidth: 'auto'
            }}
          >
            <ShoppingBag size={16} />
            {cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#C62828',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '0.6rem',
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

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'var(--cream-secondary)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-dark)',
              position: 'relative',
              padding: '8px'
            }}
            aria-label="Notifications"
          >
            <Bell size={18} />
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
              backgroundColor: 'var(--white)',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              border: '1px solid var(--border-subtle)',
              padding: '12px',
              zIndex: 1000,
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--brown-dark)', marginBottom: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px' }}>
                {t('nav.notifications')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map((n) => (
                  <div key={n.id} style={{ fontSize: '0.75rem', color: 'var(--text-dark)', borderBottom: '1px solid rgba(74,46,23,0.05)', paddingBottom: '6px' }}>
                    <div>{n.text}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: 'var(--brown-dark)',
          color: 'var(--gold-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.85rem',
          fontWeight: 700,
          flexShrink: 0
        }}>
          {currentUser?.name.charAt(0)}
        </div>
      </div>
    </header>
  );
};