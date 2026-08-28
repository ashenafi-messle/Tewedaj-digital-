'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { formatETB } from '../../utils/formatters';
import {
  Package,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  ShoppingBag,
  ArrowRight,
  Plus
} from 'lucide-react';
import { DeliveryMap } from '../common/DeliveryMap';

export const MerchantOrders: React.FC = () => {
  const { orders, setCurrentPath, t, language } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const isAm = language === 'am';

  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const pastOrders = orders.filter(o => o.status === 'Delivered' || o.status === 'Cancelled');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '24px 28px',
        border: '1px solid rgba(74, 46, 23, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package size={24} color="#D99A20" />
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#38210F', margin: 0 }}>
              {t('merchantOrders.title')}
            </h1>
            <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
              {t('merchantOrders.subtitle')}
            </p>
          </div>

          <button
            onClick={() => setCurrentPath('/merchant/marketplace')}
            className="btn btn-gold"
          >
            <Plus size={16} /> {t('merchantOrders.orderStock')}
          </button>
        </div>
      </div>

      {/* Main Grid: Orders List vs Live Map View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Left Column: Orders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ color: '#38210F', fontSize: '1.15rem', margin: 0 }}>
            {t('merchantOrders.activeShipments')} ({activeOrders.length})
          </h3>

          {activeOrders.map((ord) => {
            const isSelected = selectedOrder?.id === ord.id;
            return (
              <div
                key={ord.id}
                onClick={() => setSelectedOrder(ord)}
                className="card card-interactive"
                style={{
                  border: isSelected ? '2px solid #D99A20' : '1px solid rgba(74, 46, 23, 0.1)',
                  backgroundColor: isSelected ? '#FFFDF9' : '#FFFFFF',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <strong style={{ fontSize: '1rem', color: '#38210F' }}>Order #{ord.orderNumber}</strong>
                    <div style={{ fontSize: '0.78rem', color: '#756B5D' }}>{ord.wholesalerName} • {ord.date}</div>
                  </div>
                  <span className={`badge ${ord.status === 'In Transit' ? 'badge-transit' : ord.status === 'Delivered' ? 'badge-repaid' : 'badge-active'}`}>
                    {ord.status}
                  </span>
                </div>

                {/* Items preview */}
                <div style={{ backgroundColor: '#FAF5E8', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px', fontSize: '0.8rem' }}>
                  {ord.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: '#4A2E17' }}>
                      <span>{item.quantity}x {item.productName}</span>
                      <strong>{formatETB(item.total || (item.quantity * item.unitPrice))}</strong>
                    </div>
                  ))}
                </div>

                {/* Footer details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: '#756B5D', fontSize: '0.75rem' }}>{t('merchantOrders.totalCost')}</span>
                    <strong style={{ color: '#D99A20', display: 'block' }}>{formatETB(ord.totalAmount)}</strong>
                  </div>

                  <div style={{
                    backgroundColor: '#FFF6D6',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #D99A20',
                    textAlign: 'right'
                  }}>
                    <span style={{ fontSize: '0.68rem', color: '#756B5D', display: 'block', fontWeight: 600 }}>{t('merchantOrders.handoverOtp')}</span>
                    <strong style={{ fontSize: '0.95rem', color: '#38210F', letterSpacing: '1px' }}>{ord.deliveryOtp || ord.otpCode || '5821'}</strong>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Past Orders Accordion / List */}
          <h3 style={{ color: '#38210F', fontSize: '1.15rem', margin: '16px 0 0' }}>
            {t('merchantOrders.pastOrders')} ({pastOrders.length})
          </h3>
          {pastOrders.map((ord) => (
            <div
              key={ord.id}
              onClick={() => setSelectedOrder(ord)}
              className="card card-interactive"
              style={{ padding: '16px', opacity: 0.9 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#38210F' }}>Order #{ord.orderNumber}</strong>
                  <div style={{ fontSize: '0.75rem', color: '#756B5D' }}>{ord.wholesalerName} • {ord.date}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: '#4F7D3A', fontSize: '0.9rem' }}>{formatETB(ord.totalAmount)}</strong>
                  <span className="badge badge-repaid" style={{ display: 'block', marginTop: '2px', fontSize: '0.68rem' }}>Delivered</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Live Tracking Map & Inspector */}
        <div>
          {selectedOrder ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ color: '#38210F', fontSize: '1.15rem', margin: 0 }}>
                {t('merchantOrders.liveTracking')} (#{selectedOrder.orderNumber})
              </h3>

              {/* Delivery Map Component */}
              <DeliveryMap
                pickupLocation={selectedOrder.wholesalerName}
                dropoffLocation={selectedOrder.deliveryAddress}
                distanceKm={selectedOrder.deliveryDistanceKm || 6.2}
                riderName={selectedOrder.deliveryRiderName || 'Dawit Mengistu (Bajaj Cargo)'}
                status={selectedOrder.status}
              />

              {/* Order Info Card */}
              <div className="card">
                <h4 style={{ color: '#38210F', marginBottom: '12px' }}>{t('merchantOrders.shipmentDetails')}</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#4A2E17' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#756B5D' }}>{t('merchantOrders.wholesalerSupplier')}</span>
                    <strong>{selectedOrder.wholesalerName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#756B5D' }}>{t('merchantOrders.dropoffAddress')}</span>
                    <strong>{selectedOrder.deliveryAddress}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#756B5D' }}>{t('merchantOrders.deliveryFee')}</span>
                    <strong>ETB {selectedOrder.deliveryFee}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#756B5D' }}>{t('merchantOrders.assignedCourier')}</span>
                    <strong style={{ color: '#4F7D3A' }}>{selectedOrder.deliveryRiderName || 'Dawit Mengistu'}</strong>
                  </div>
                  {selectedOrder.deliveryNotes && (
                    <div style={{ backgroundColor: '#FAF5E8', padding: '10px', borderRadius: '8px', marginTop: '6px' }}>
                      <span style={{ color: '#756B5D', fontSize: '0.75rem', display: 'block' }}>{t('merchantOrders.deliveryInstructions')}</span>
                      {selectedOrder.deliveryNotes}
                    </div>
                  )}
                </div>

                {/* Handover OTP Box */}
                <div style={{
                  marginTop: '16px',
                  backgroundColor: '#EEF5E5',
                  borderRadius: '12px',
                  padding: '14px',
                  border: '1px solid #C8E6C9'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2E7D32', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
                    <ShieldCheck size={16} /> {t('merchantOrders.handoverSecurity')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.78rem', color: '#375928' }}>{t('merchantOrders.handoverInstruction')}</span>
                    <strong style={{ fontSize: '1.2rem', color: '#38210F', backgroundColor: '#FFFFFF', padding: '4px 12px', borderRadius: '6px', border: '1px solid #4F7D3A' }}>
                      {selectedOrder.deliveryOtp}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <Package size={48} color="#D4C3A3" style={{ marginBottom: '12px' }} />
              <h4 style={{ color: '#38210F' }}>{t('merchantOrders.selectOrder')}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
