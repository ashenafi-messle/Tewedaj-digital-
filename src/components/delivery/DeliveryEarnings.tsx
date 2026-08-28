'use client'

import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatETB } from '../../utils/formatters';
import { DollarSign, TrendingUp, CheckCircle2, Calendar, Smartphone } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const DeliveryEarnings: React.FC = () => {
  const { deliveryJobs, t, language } = useApp();
  const isAm = language === 'am';

  const completed = deliveryJobs.filter(j => j.status === 'Completed');
  const totalEarned = completed.reduce((sum, j) => sum + (Number(j.payoutAmount) || 0), 0);
  const completedCount = completed.length;

  const weeklyData = [
    { day: 'Mon', earnings: 1350, trips: 3 },
    { day: 'Tue', earnings: 1800, trips: 4 },
    { day: 'Wed', earnings: 2250, trips: 5 },
    { day: 'Thu', earnings: 1900, trips: 4 },
    { day: 'Fri', earnings: 2700, trips: 6 },
    { day: 'Sat', earnings: 3150, trips: 7 },
    { day: 'Sun', earnings: 1400, trips: 3 },
  ];

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
            <DollarSign size={24} color="#4F7D3A" />
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#38210F', margin: 0 }}>
              {t('deliveryEarnings.title')}
            </h1>
          </div>
          <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
            {t('deliveryEarnings.subtitle')}
          </p>
        </div>

        <button
          onClick={() => alert('Payout of ETB 2,450 initiated to Telebirr (+251 911 456 789).')}
          className="btn btn-green"
        >
          <Smartphone size={16} /> {t('deliveryEarnings.cashout')}
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="card">
          <span style={{ fontSize: '0.78rem', color: '#756B5D', fontWeight: 600 }}>{t('deliveryEarnings.monthlyPayout')}</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4F7D3A', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {formatETB(totalEarned)}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#4F7D3A' }}>{t('deliveryEarnings.confirmedTrips')}</span>
          <div style={{ fontSize: '0.78rem', color: '#756B5D', marginTop: '8px' }}>{completedCount} completed deliveries</div>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.78rem', color: '#756B5D', fontWeight: 600 }}>{t('deliveryEarnings.walletBalance')}</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D99A20', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            ETB 2,450
          </div>
          <span style={{ fontSize: '0.72rem', color: '#756B5D' }}>{t('deliveryEarnings.readyWithdrawal')}</span>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.78rem', color: '#756B5D', fontWeight: 600 }}>{t('deliveryEarnings.avgEarning')}</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38210F', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            ETB 450
          </div>
          <span style={{ fontSize: '0.72rem', color: '#4F7D3A' }}>{t('deliveryEarnings.basedOn')}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="card">
        <h3 style={{ color: '#38210F', fontSize: '1.1rem', marginBottom: '16px' }}>
          {t('deliveryEarnings.weeklyEarnings')}
        </h3>
        <div style={{ width: '100%', height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(74,46,23,0.08)" />
              <XAxis dataKey="day" stroke="#756B5D" fontSize={12} />
              <YAxis stroke="#756B5D" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#FFF8E7', borderColor: '#4F7D3A', borderRadius: '8px' }} />
              <Bar dataKey="earnings" name={t('deliveryEarnings.dailyEarnings')} fill="#4F7D3A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 style={{ color: '#38210F', fontSize: '1.1rem', marginBottom: '16px' }}>Delivery History</h3>
        {completed.length === 0 ? (
          <p style={{ color: '#756B5D', fontSize: '0.85rem' }}>Completed deliveries will appear here.</p>
        ) : completed.map((job) => (
          <div key={job.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: '12px', padding: '12px 0', borderTop: '1px solid rgba(74,46,23,0.1)', alignItems: 'center', fontSize: '0.82rem' }}>
            <strong>#{job.orderNumber}</strong>
            <span>{job.pickupLocation || job.pickupAddress} -&gt; {job.dropoffLocation || job.dropoffAddress}</span>
            <span>{job.deliveredAt ? new Date(job.deliveredAt).toLocaleString() : 'Completed'}</span>
            <strong style={{ color: '#4F7D3A' }}>{formatETB(job.payoutAmount || job.earningsETB || 0)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};
