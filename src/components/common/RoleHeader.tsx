import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, ShoppingCart, Search, ShieldCheck, CheckCheck, Menu, X, ArrowRight } from 'lucide-react';

interface RoleHeaderProps {
  onOpenCart?: () => void;
}

export const RoleHeader: React.FC<RoleHeaderProps> = ({ onOpenCart }) => {
  const { currentUser, currentRole, notifications, markNotificationRead, cart, setCurrentPath } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const roleNotifs = notifications.filter(n => n.targetRole === currentRole);
  const unreadCount = roleNotifs.filter(n => !n.read).length;

  const roleLabels: Record<string, { label: string; color: string; badge: string }> = {
    merchant: { label: 'Merchant Console', color: '#D99A20', badge: 'Verified Shop' },
    wholesaler: { label: 'Wholesaler Portal', color: '#4A2E17', badge: 'Certified Supplier' },
    delivery_partner: { label: 'Delivery Express', color: '#4F7D3A', badge: 'Active Courier' },
    customer: { label: 'Customer Digital Ledger', color: '#00695C', badge: 'Verified Citizen' },
  };

  const currentInfo = roleLabels[currentRole] || roleLabels.merchant;

  return (
    <header style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid rgba(74, 46, 23, 0.1)',
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 35,
      boxShadow: '0 2px 8px rgba(74, 46, 23, 0.03)'
    }}>
      {/* Left: Role Info & Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38210F', margin: 0, fontFamily: 'Fraunces, serif' }}>
              {currentInfo.label}
            </h2>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#EEF5E5',
              color: '#375928',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '999px',
              border: '1px solid #DCE8C8'
            }}>
              <ShieldCheck size={12} />
              {currentInfo.badge}
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#756B5D', margin: '2px 0 0' }}>
            {currentUser?.businessName || currentUser?.name} • Gondar
          </p>
        </div>
      </div>

      {/* Right Controls: Cart (if merchant), Notifications, User profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {currentRole === 'merchant' && onOpenCart && (
          <button
            onClick={onOpenCart}
            className="btn btn-outline btn-sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderColor: cart.length > 0 ? '#D99A20' : 'rgba(74, 46, 23, 0.15)',
              backgroundColor: cart.length > 0 ? '#FFF6D6' : 'transparent'
            }}
          >
            <ShoppingCart size={16} color={cart.length > 0 ? '#D99A20' : '#4A2E17'} />
            <span style={{ fontWeight: 600 }}>Cart</span>
            {cart.length > 0 && (
              <span style={{
                backgroundColor: '#D99A20',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: 800,
                borderRadius: '999px',
                padding: '1px 6px'
              }}>
                {cart.length}
              </span>
            )}
          </button>
        )}

        {/* Notifications dropdown trigger */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="btn-icon"
            style={{
              position: 'relative',
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid rgba(74, 46, 23, 0.12)',
              backgroundColor: notifOpen ? '#F8EFD8' : '#FFFFFF'
            }}
            aria-label="Notifications"
          >
            <Bell size={18} color="#4A2E17" />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#D9534F',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.68rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #FFFFFF'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Flyout */}
          {notifOpen && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '42px',
              width: '320px',
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              boxShadow: '0 10px 30px rgba(74, 46, 23, 0.15)',
              border: '1px solid rgba(74, 46, 23, 0.12)',
              zIndex: 100,
              padding: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#38210F' }}>
                  Notifications ({unreadCount} new)
                </span>
                <button
                  onClick={() => setNotifOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#756B5D' }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {roleNotifs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#756B5D', fontSize: '0.85rem' }}>
                    No notifications yet.
                  </div>
                ) : (
                  roleNotifs.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.actionUrl) {
                          setCurrentPath(n.actionUrl);
                          setNotifOpen(false);
                        }
                      }}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        backgroundColor: n.read ? '#FAF5E8' : '#FFF3D1',
                        cursor: 'pointer',
                        borderLeft: n.read ? '3px solid transparent' : '3px solid #D99A20',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#38210F' }}>
                          {n.title}
                        </span>
                        <span style={{ fontSize: '0.68rem', color: '#A39686' }}>
                          {n.date.split(' ')[1] || n.date}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.76rem', color: '#4A2E17', margin: '4px 0 0', lineHeight: 1.35 }}>
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User avatar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 10px',
          borderRadius: '20px',
          backgroundColor: '#FAF5E8',
          border: '1px solid rgba(74, 46, 23, 0.08)'
        }}>
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
            alt="User"
            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#38210F' }}>
            {currentUser?.name.split(' ')[0]}
          </span>
        </div>
      </div>
    </header>
  );
};
