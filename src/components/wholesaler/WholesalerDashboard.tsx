'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import { formatETB } from '../../utils/formatters';
import {
  Boxes,
  Package,
  TrendingUp,
  DollarSign,
  Plus,
  Truck,
  CheckCircle2,
  Users,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { CreditRequestManager } from './CreditRequestManager';

export const WholesalerDashboard: React.FC = () => {
  const { currentUser, products, orders, setCurrentPath, updateOrderStatus, creditRequests, t, language } = useApp();
  const router = useRouter();
  const isAm = language === 'am';

  const wholesalerProducts = products.filter(p => p.wholesalerId === currentUser?.id || true);
  const wholesalerOrders = orders; // For demo view all relevant

  const totalWholesaleSales = wholesalerOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const pendingOrders = wholesalerOrders.filter(o => o.status === 'Pending' || o.status === 'Accepted');
  const pendingCreditRequests = creditRequests.filter(r => r.wholesalerId === currentUser?.id && r.status === 'Pending');

  const chartData = [
    { day: 'Mon', volume: 45000, quintals: 12 },
    { day: 'Tue', volume: 62000, quintals: 16 },
    { day: 'Wed', volume: 58000, quintals: 15 },
    { day: 'Thu', volume: 81000, quintals: 21 },
    { day: 'Fri', volume: 95000, quintals: 25 },
    { day: 'Sat', volume: 112000, quintals: 30 },
    { day: 'Today', volume: 74000, quintals: 19 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
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
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#38210F', margin: 0 }}>
              {t('wholesalerDashboard.title')}: {currentUser?.businessName}
            </h1>
            <span className="badge badge-active" style={{ fontSize: '0.72rem' }}>{t('wholesalerDashboard.tier')}</span>
          </div>
          <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
            {currentUser?.location} • {t('wholesalerDashboard.location')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => router.push('/wholesaler/products')}
            className="btn btn-brown btn-sm"
          >
            <Plus size={15} /> {t('wholesalerDashboard.addProduct')}
          </button>
          <button
            onClick={() => router.push('/wholesaler/orders')}
            className="btn btn-gold btn-sm"
          >
            <Package size={15} /> {t('wholesalerDashboard.incomingOrders')} ({pendingOrders.length})
          </button>
          {pendingCreditRequests.length > 0 && (
            <button
              onClick={() => document.getElementById('credit-requests-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-sm"
              style={{
                backgroundColor: '#FFB94D',
                color: '#160D06',
                border: 'none'
              }}
            >
              <ShieldCheck size={15} /> {t('wholesalerDashboard.creditRequests')} ({pendingCreditRequests.length})
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
        <div className="card">
          <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>{t('wholesalerDashboard.monthlyVolume')}</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38210F', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {formatETB(totalWholesaleSales)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4F7D3A', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} /> {t('wholesalerDashboard.demandGrowth')}
          </div>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>{t('wholesalerDashboard.activeClients')}</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D99A20', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {isAm ? '142 ሱቆች' : '142 Shops'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#756B5D', marginTop: '6px' }}>
            Bole, Kazanchis, Piazza, Akaki
          </div>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>{t('wholesalerDashboard.stockVarieties')}</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4A2E17', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {products.length} {isAm ? 'የተዘረዙ SKUs' : 'Listed SKUs'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4F7D3A', marginTop: '6px' }}>
            {isAm ? 'ሁሉም የምንጣፍ ማረጋገጫ የተረጋገጡ' : 'All verified origin certificates'}
          </div>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>{t('wholesalerDashboard.handoverRate')}</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4F7D3A', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            99.2%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4F7D3A', marginTop: '6px' }}>
            {isAm ? 'አማካይ የአጓጓዥ ጭነት: 14 ደቂቃ' : 'Average courier loading: 14 mins'}
          </div>
        </div>
      </div>

      {/* Chart and Pending Orders */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Demand Chart */}
        <div className="card">
          <h3 style={{ color: '#38210F', fontSize: '1.1rem', marginBottom: '16px' }}>
            {t('wholesalerDashboard.weeklyOutflow')}
          </h3>
          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(74,46,23,0.08)" />
                <XAxis dataKey="day" stroke="#756B5D" fontSize={12} />
                <YAxis stroke="#756B5D" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#FFF8E7', borderColor: '#D99A20', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="volume" name="Dispatched Volume (ETB)" stroke="#4A2E17" fill="#F4C542" fillOpacity={0.4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incoming Merchant Orders */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ color: '#38210F', fontSize: '1.1rem', margin: 0 }}>
                {t('wholesalerDashboard.incomingRetailOrders')}
              </h3>
              <span className="badge badge-active">{pendingOrders.length} {t('wholesalerDashboard.pendingDispatch')}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pendingOrders.map((ord) => (
                <div key={ord.id} style={{ backgroundColor: '#FAF5E8', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(74,46,23,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ color: '#38210F', fontSize: '0.9rem' }}>{ord.merchantName}</strong>
                    <strong style={{ color: '#D99A20' }}>{formatETB(ord.totalAmount)}</strong>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#756B5D', marginBottom: '8px' }}>
                    {ord.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#4F7D3A' }}>{t('wholesalerDashboard.courier')}: {ord.deliveryRiderName || t('wholesalerDashboard.assigningCourier')}</span>
                    {ord.status === 'Pending' ? (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'Accepted')}
                        className="btn btn-gold btn-sm"
                        style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                      >
                        {t('wholesalerDashboard.acceptPack')}
                      </button>
                    ) : (
                      <span className="badge badge-transit" style={{ fontSize: '0.7rem' }}>{t('wholesalerDashboard.readyPickup')}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentPath('/wholesaler/orders')}
            className="btn btn-outline btn-sm"
            style={{ width: '100%', marginTop: '16px' }}
          >
            {t('wholesalerDashboard.manageAllOrders')} <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Credit Requests Section */}
      {pendingCreditRequests.length > 0 && (
        <div id="credit-requests-section" style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '24px 28px',
          border: '1px solid rgba(74, 46, 23, 0.1)'
        }}>
          <CreditRequestManager />
        </div>
      )}
    </div>
  );
};
