import React from 'react';
import { MapPin, Navigation, Truck, Store, ShoppingBag, ShieldCheck } from 'lucide-react';

interface DeliveryMapProps {
  pickupLocation: string;
  dropoffLocation: string;
  distanceKm: number;
  riderName?: string;
  riderLocation?: string;
  eta?: string;
  status: string;
}

export const DeliveryMap: React.FC<DeliveryMapProps> = ({
  pickupLocation,
  dropoffLocation,
  distanceKm,
  riderName = 'Dawit Mengistu (Bajaj Cargo)',
  eta = '18 mins',
  status
}) => {
  return (
    <div style={{
      backgroundColor: '#FAF5E8',
      borderRadius: '16px',
      border: '1px solid rgba(74, 46, 23, 0.12)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Map visual canvas simulation with warm cartography */}
      <div style={{
        height: '240px',
        backgroundColor: '#EFE6D0',
        position: 'relative',
        backgroundImage: `
          radial-gradient(#D9CBB0 1.5px, transparent 1.5px),
          linear-gradient(to right, rgba(217, 154, 32, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(217, 154, 32, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px, 48px 48px, 48px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        {/* Addis Ababa Landmark labels */}
        <div style={{ position: 'absolute', top: '16px', left: '20px', fontSize: '0.72rem', fontWeight: 700, color: '#A39686' }}>
          ADDIS ABABA LOGISTICS ZONE
        </div>

        {/* Route Line SVG */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <path
            d="M 80 150 Q 200 80, 360 120 T 520 80"
            fill="none"
            stroke="#D99A20"
            strokeWidth="4"
            strokeDasharray="6 6"
          />
        </svg>

        {/* Pickup Pin */}
        <div style={{
          position: 'absolute',
          left: '15%',
          top: '55%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#4A2E17',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(74, 46, 23, 0.3)',
            border: '2px solid #FFFFFF'
          }}>
            <ShoppingBag size={16} />
          </div>
          <span style={{
            backgroundColor: '#FFFFFF',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#4A2E17',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            whiteSpace: 'nowrap'
          }}>
            Pickup: {pickupLocation}
          </span>
        </div>

        {/* Rider Icon moving along path */}
        <div style={{
          position: 'absolute',
          left: '52%',
          top: '38%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          animation: 'pulse 2s infinite ease-in-out'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#F4C542',
            color: '#38210F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(217, 154, 32, 0.4)',
            border: '3px solid #FFFFFF'
          }}>
            <Truck size={20} />
          </div>
          <span style={{
            backgroundColor: '#38210F',
            color: '#FBE6A2',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: 700,
            whiteSpace: 'nowrap'
          }}>
            {riderName} • In Transit
          </span>
        </div>

        {/* Dropoff Pin */}
        <div style={{
          position: 'absolute',
          right: '12%',
          top: '30%',
          transform: 'translate(50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#4F7D3A',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(79, 125, 58, 0.3)',
            border: '2px solid #FFFFFF'
          }}>
            <Store size={16} />
          </div>
          <span style={{
            backgroundColor: '#FFFFFF',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#4F7D3A',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            whiteSpace: 'nowrap'
          }}>
            Dropoff: {dropoffLocation}
          </span>
        </div>
      </div>

      {/* Map Footer Bar */}
      <div style={{
        padding: '14px 20px',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#756B5D' }}>Route Distance & ETA</div>
          <strong style={{ color: '#38210F', fontSize: '0.95rem' }}>
            {distanceKm} km • Approx. {eta} arrival
          </strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-transit">
            <Navigation size={12} /> Live GPS Routing
          </span>
          <span className="badge badge-active">
            <ShieldCheck size={12} /> OTP Protected Handover
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.08); }
        }
      `}</style>
    </div>
  );
};
