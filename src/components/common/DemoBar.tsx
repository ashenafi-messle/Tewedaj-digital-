import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, UserCheck, Store, Truck, ShoppingBag, Globe, RotateCcw } from 'lucide-react';
import { UserRole } from '../../types';

export const DemoBar: React.FC = () => {
  const { currentRole, switchRole, resetAllData, setCurrentPath } = useApp();

  return (
    <div style={{
      backgroundColor: '#38210F',
      color: '#FFF8E7',
      padding: '6px 16px',
      fontSize: '0.825rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '8px',
      zIndex: 60,
      borderBottom: '1px solid rgba(244, 197, 66, 0.25)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          backgroundColor: '#D99A20',
          color: '#2F241C',
          padding: '2px 8px',
          borderRadius: '4px',
          fontWeight: 700,
          fontSize: '0.72rem',
          letterSpacing: '0.5px'
        }}>
          DEMO MODE
        </span>
        <span style={{ color: '#FBE6A2', fontWeight: 500 }}>
          Switch Live Persona:
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <button
          onClick={() => switchRole('public')}
          style={{
            background: currentRole === 'public' ? '#F4C542' : 'rgba(255,255,255,0.1)',
            color: currentRole === 'public' ? '#38210F' : '#FFF8E7',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Globe size={13} />
          Public Website
        </button>

        <button
          onClick={() => switchRole('merchant')}
          style={{
            background: currentRole === 'merchant' ? '#F4C542' : 'rgba(255,255,255,0.1)',
            color: currentRole === 'merchant' ? '#38210F' : '#FFF8E7',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Store size={13} />
          Merchant (Almaz Shop)
        </button>

        <button
          onClick={() => switchRole('wholesaler')}
          style={{
            background: currentRole === 'wholesaler' ? '#F4C542' : 'rgba(255,255,255,0.1)',
            color: currentRole === 'wholesaler' ? '#38210F' : '#FFF8E7',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <ShoppingBag size={13} />
          Wholesaler (Merkato)
        </button>

        <button
          onClick={() => switchRole('delivery_partner')}
          style={{
            background: currentRole === 'delivery_partner' ? '#F4C542' : 'rgba(255,255,255,0.1)',
            color: currentRole === 'delivery_partner' ? '#38210F' : '#FFF8E7',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Truck size={13} />
          Delivery (Dawit Rider)
        </button>

        <button
          onClick={() => switchRole('customer')}
          style={{
            background: currentRole === 'customer' ? '#F4C542' : 'rgba(255,255,255,0.1)',
            color: currentRole === 'customer' ? '#38210F' : '#FFF8E7',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <UserCheck size={13} />
          Customer (Bethlehem)
        </button>

        <button
          onClick={() => {
            if (window.confirm('Reset all demo data (credits, orders, inventory) to original sample state?')) {
              resetAllData();
            }
          }}
          title="Reset sample data"
          style={{
            background: 'transparent',
            color: '#D4C3A3',
            border: '1px solid rgba(212, 195, 163, 0.3)',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginLeft: '4px'
          }}
        >
          <RotateCcw size={12} />
          Reset Demo
        </button>
      </div>
    </div>
  );
};
