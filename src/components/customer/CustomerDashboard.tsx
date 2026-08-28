'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, ShieldCheck, CheckCircle2, DollarSign, ArrowRight, UserCheck, Smartphone, AlertCircle, FileText } from 'lucide-react';
import { RepaymentModal } from '../common/RepaymentModal';
import { CreditAgreement } from '../../types';
import { formatETB } from '../../utils/formatters';

export const CustomerDashboard: React.FC = () => {
  const { currentUser, creditAgreements, setCurrentPath, t } = useApp();
  const [selectedAgreement, setSelectedAgreement] = useState<CreditAgreement | null>(null);

  // Filter agreements for current customer
  const customerAgreements = creditAgreements.filter(a => a.customerId === currentUser?.id || true);
  const activeAgreements = customerAgreements.filter(a => a.status === 'Active' || a.status === 'Overdue');
  const totalDue = activeAgreements.reduce((sum, a) => sum + (Number(a.remainingAmount) || 0), 0);
  const totalSettled = customerAgreements.reduce((sum, a) => sum + (Number(a.paidAmount) || 0), 0);

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
              {t('customer.title', 'Customer Credit Transparency Portal')}
            </h1>
            <span className="badge badge-active" style={{ fontSize: '0.72rem' }}>{t('customer.verified')}</span>
          </div>
          <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
            Buyer: {currentUser?.name} ({currentUser?.phone}) • National ID: {currentUser?.nationalIdNumber || 'ETH-ID-772901'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            backgroundColor: '#EEF5E5',
            padding: '8px 16px',
            borderRadius: '12px',
            border: '1px solid #C8E6C9',
            textAlign: 'right'
          }}>
            <span style={{ fontSize: '0.7rem', color: '#2E7D32', display: 'block', fontWeight: 700 }}>REPUTATION CREDIT SCORE</span>
            <strong style={{ fontSize: '1.25rem', color: '#2E7D32' }}>{currentUser?.creditScore || 740} / 850</strong>
          </div>
        </div>
      </div>

      {/* Transparency Core Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
        <div className="card">
          <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>{t('customer.currentBalance')}</span>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: totalDue > 0 ? '#D99A20' : '#4F7D3A', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {formatETB(totalDue)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#756B5D', marginTop: '6px' }}>
            Across {activeAgreements.length} merchant credit agreements
          </div>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>{t('customer.historicalRepaid')}</span>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#4F7D3A', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {formatETB(totalSettled)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4F7D3A', marginTop: '6px' }}>
            100% on-time settlement record
          </div>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>{t('customer.mandate')}</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38210F', fontFamily: 'Fraunces, serif', marginTop: '6px' }}>
            Telebirr Active Mandate
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4F7D3A', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> Ref: TB-MND-449012
          </div>
        </div>
      </div>

      {/* Credit Transparency Explainer */}
      <div style={{
        backgroundColor: '#FAF5E8',
        borderRadius: '16px',
        padding: '16px 20px',
        border: '1px solid rgba(74, 46, 23, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <ShieldCheck size={24} color="#4F7D3A" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.85rem', color: '#4A2E17' }}>
          <strong>Zero Confusion Guarantee:</strong> You can clearly see who you owe, what items were purchased, original amount, how much has been settled, and what remains. Settle anytime using your linked mobile wallet.
        </div>
      </div>

      {/* Active Credit Agreements */}
      <div className="card">
        <h3 style={{ color: '#38210F', fontSize: '1.2rem', marginBottom: '16px' }}>
          {t('customer.activeAgreements')}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {customerAgreements.map((ag) => {
            const total = Number(ag.totalAmount) || 0;
            const paid = Number(ag.paidAmount) || 0;
            const remaining = Number(ag.remainingAmount) || 0;
            const percent = total > 0 ? Math.round((paid / total) * 100) : 100;
            return (
              <div
                key={ag.id}
                style={{
                  backgroundColor: '#FAF5E8',
                  borderRadius: '14px',
                  padding: '18px 20px',
                  border: '1px solid rgba(74, 46, 23, 0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ color: '#38210F', fontSize: '1.05rem' }}>{ag.merchantName}</strong>
                      <span className={`badge ${ag.status === 'Active' ? 'badge-active' : 'badge-repaid'}`}>{ag.status}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#756B5D', marginTop: '2px' }}>
                      Agreement #{ag.agreementNumber} • Created: {ag.creationDate} • Due: {ag.dueDate}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', color: '#756B5D', display: 'block' }}>Remaining Balance</span>
                    <strong style={{ fontSize: '1.25rem', color: remaining > 0 ? '#D99A20' : '#4F7D3A' }}>
                      {formatETB(remaining)}
                    </strong>
                  </div>
                </div>

                {/* Goods description */}
                <div style={{ backgroundColor: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', marginBottom: '12px', fontSize: '0.85rem', color: '#38210F', border: '1px solid rgba(74,46,23,0.06)' }}>
                  <strong>Goods Credited:</strong> {ag.goodsDescription}
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#756B5D', marginBottom: '4px' }}>
                    <span>Paid: {formatETB(paid)} of {formatETB(total)}</span>
                    <strong>{percent}% Repaid</strong>
                  </div>
                  <div className="progress-bar-bg" style={{ height: '8px' }}>
                    <div className="progress-bar-fill" style={{ width: `${percent}%`, backgroundColor: remaining === 0 ? '#4F7D3A' : '#D99A20' }} />
                  </div>
                </div>

                {/* Action button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  {ag.remainingAmount > 0 ? (
                    <button
                      onClick={() => setSelectedAgreement(ag)}
                      className="btn btn-gold btn-sm"
                    >
                      <Smartphone size={14} /> Pay via Telebirr / CBE Mandate
                    </button>
                  ) : (
                    <span style={{ color: '#4F7D3A', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={16} /> Fully Settled & Archived
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Repayment Modal */}
      <RepaymentModal
        isOpen={!!selectedAgreement}
        onClose={() => setSelectedAgreement(null)}
        agreement={selectedAgreement}
      />
    </div>
  );
};
