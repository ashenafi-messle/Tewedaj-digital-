'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import { Truck, MapPin, DollarSign, Package, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export const DeliveryJobs: React.FC = () => {
  const { deliveryJobs, deliveryAvailability, acceptDeliveryJob, declineDeliveryJob, setCurrentPath, t, language } = useApp();
  const router = useRouter();
  const [actionMessage, setActionMessage] = useState('');
  const isAm = language === 'am';

  const available = deliveryAvailability === 'ONLINE' ? deliveryJobs.filter(j => j.status === 'Available') : [];

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
            <Package size={24} color="#4F7D3A" />
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#38210F', margin: 0 }}>
              {t('deliveryJobs.title')}
            </h1>
          </div>
          <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
            {t('deliveryJobs.subtitle')}
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-outline btn-sm"
        >
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      {/* Jobs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {deliveryAvailability === 'OFFLINE' && (
          <div className="card" style={{ gridColumn: '1 / -1', color: '#756B5D' }}>
            You are offline. Go online from the delivery dashboard to receive new jobs.
          </div>
        )}
        {available.map((job) => (
          <div key={job.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span className="badge badge-active">{job.distanceKm} {t('deliveryJobs.kmTrip')}</span>
                <strong style={{ color: '#4F7D3A', fontSize: '1.2rem' }}>ETB {job.payoutAmount}</strong>
              </div>

              <h3 style={{ fontSize: '1.1rem', color: '#38210F', marginBottom: '8px' }}>
                {job.packageDescription}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.825rem', color: '#4A2E17', backgroundColor: '#FAF5E8', padding: '12px', borderRadius: '10px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <MapPin size={14} color="#D99A20" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ color: '#756B5D', fontSize: '0.72rem' }}>{t('deliveryJobs.pickupWholesaler')}:</span>
                    <div>{job.pickupLocation || job.pickupAddress}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <MapPin size={14} color="#4F7D3A" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ color: '#756B5D', fontSize: '0.72rem' }}>{t('deliveryJobs.dropoffMerchant')}:</span>
                    <div>{job.dropoffLocation || job.dropoffAddress} ({job.merchantName})</div>
                  </div>
                </div>
              </div>
            </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        const result = acceptDeliveryJob(job.id);
                        setActionMessage(result.message);
                        if (result.success) router.push('/delivery/dashboard');
                      }}
                      className="btn btn-green"
                      style={{ flex: 1 }}
                    >
                      {t('deliveryJobs.acceptTrip')}
                      <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={() => setActionMessage(declineDeliveryJob(job.id).message)}
                      className="btn btn-outline"
                      style={{ flex: 1 }}
                    >
                      Decline
                    </button>
                  </div>
                  {actionMessage && (
                    <div style={{ color: '#756B5D', fontSize: '0.78rem', marginTop: '8px' }} role="status">
                      {actionMessage}
                    </div>
                  )}
          </div>
        ))}

        {available.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
            <Package size={48} color="#D4C3A3" style={{ marginBottom: '12px' }} />
            <h4 style={{ color: '#38210F' }}>{t('deliveryJobs.noJobs')}</h4>
            <p style={{ color: '#756B5D', fontSize: '0.85rem' }}>{t('deliveryJobs.newOrders')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
