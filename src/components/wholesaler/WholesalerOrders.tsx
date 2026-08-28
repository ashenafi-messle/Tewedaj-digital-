'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatETB } from '../../utils/formatters';
import { Package, Truck, CheckCircle2, Clock, MapPin, ShieldCheck, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WholesalerOrders: React.FC = () => {
  const { orders, updateOrderStatus, t, language } = useApp();
  const [filter, setFilter] = useState<string>('All');
  const isAm = language === 'am';
  const corridorNames = ['maraki', 'arada', 'piasa', 'azezo', 'tseda'];

  const filtered = orders.filter((o) => {
    if (filter === 'All') return true;
    return o.status === filter;
  });

  const handleAction = (orderId: string, nextStatus: any) => {
    updateOrderStatus(orderId, nextStatus);
    if (nextStatus === 'Delivered') {
      try {
        confetti({ particleCount: 60, spread: 60 });
      } catch (e) {}
    }
  };

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
            <Package size={24} color="#4A2E17" />
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#38210F', margin: 0 }}>
              {t('wholesalerOrders.title')}
            </h1>
          </div>
          <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
            {t('wholesalerOrders.subtitle')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'Pending', 'Accepted', 'In Transit', 'Delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: filter === st ? '1px solid #4A2E17' : '1px solid rgba(74,46,23,0.15)',
                backgroundColor: filter === st ? '#4A2E17' : '#FFFFFF',
                color: filter === st ? '#FFF8E7' : '#756B5D',
                fontWeight: filter === st ? 700 : 500,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>{t('wholesalerOrders.orderNum')}</th>
                <th>{t('wholesalerOrders.retailMerchant')}</th>
                <th>{t('wholesalerOrders.dropoffAddress')}</th>
                <th>{t('wholesalerOrders.orderedItems')}</th>
                <th>{t('wholesalerOrders.totalValue')}</th>
                <th>{t('wholesalerOrders.assignedCourier')}</th>
                <th>{t('wholesalerOrders.status')}</th>
                <th>{t('wholesalerOrders.handoverActions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ord) => (
                <tr key={ord.id}>
                  <td>
                    <strong>#{ord.orderNumber}</strong>
                    <div style={{ fontSize: '0.72rem', color: '#756B5D' }}>{ord.date}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#38210F' }}>{ord.merchantName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#756B5D' }}>{ord.merchantPhone}</div>
                  </td>
                  <td style={{ maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {corridorNames[orders.findIndex((order) => order.id === ord.id)] || ord.deliveryAddress}
                  </td>
                  <td>
                    {ord.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                  </td>
                  <td>
                    <strong style={{ color: '#D99A20' }}>{formatETB(ord.totalAmount)}</strong>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: '#4F7D3A', fontWeight: 600 }}>
                      {ord.deliveryRiderName || t('wholesalerOrders.unassigned')}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${ord.status === 'In Transit' ? 'badge-transit' : ord.status === 'Delivered' ? 'badge-repaid' : 'badge-active'}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td>
                    {ord.status === 'Pending' && (
                      <button
                        onClick={() => handleAction(ord.id, 'Accepted')}
                        className="btn btn-gold btn-sm"
                        style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                      >
                        {t('wholesalerDashboard.acceptPack')}
                      </button>
                    )}
                    {ord.status === 'Accepted' && (
                      <button
                        onClick={() => handleAction(ord.id, 'In Transit')}
                        className="btn btn-brown btn-sm"
                        style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                      >
                        {t('wholesalerOrders.handoverRider')}
                      </button>
                    )}
                    {ord.status === 'In Transit' && (
                      <button
                        onClick={() => handleAction(ord.id, 'Delivered')}
                        className="btn btn-green btn-sm"
                        style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                      >
                        {t('wholesalerOrders.confirmDelivered')}
                      </button>
                    )}
                    {ord.status === 'Delivered' && (
                      <span style={{ color: '#4F7D3A', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={13} /> {t('wholesalerOrders.settlePaid')}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
