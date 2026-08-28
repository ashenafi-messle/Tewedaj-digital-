'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, ShieldCheck, CheckCircle2, DollarSign, Smartphone, Building2, Lock } from 'lucide-react';
import { RepaymentModal } from '../common/RepaymentModal';
import { CreditAgreement } from '../../types';
import { formatETB } from '../../utils/formatters';

export const CustomerCredits: React.FC = () => {
  const { creditAgreements } = useApp();
  const [selectedAgreement, setSelectedAgreement] = useState<CreditAgreement | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
            <CreditCard size={24} color="#00695C" />
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#38210F', margin: 0 }}>
              All Credit Agreements & Balances
            </h1>
          </div>
          <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
            Complete audit trail of all grocery store credit agreements backed by bank accounts and verified mobile mandates.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Agreement #</th>
                <th>Merchant Store</th>
                <th>Purchased Items</th>
                <th>Bank & Telebirr Payment</th>
                <th>Total Credit</th>
                <th>Paid Amount</th>
                <th>Remaining</th>
                <th>Due Date</th>
                <th>Authorization</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {creditAgreements.map((ag) => (
                <tr key={ag.id}>
                  <td>
                    <strong>#{ag.agreementNumber}</strong>
                    <div style={{ fontSize: '0.7rem', color: '#756B5D' }}>{ag.creationDate}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#38210F' }}>{ag.merchantName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#756B5D' }}>{ag.merchantPhone}</div>
                  </td>
                  <td style={{ maxWidth: '160px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ag.goodsDescription}
                  </td>
                  <td>
                    <div style={{ fontSize: '0.75rem', color: '#38210F' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <Building2 size={12} color="#D99A20" />
                        <span>{ag.bankDetails?.bankName?.split(' ')[0] || 'CBE'}: {ag.bankDetails?.accountNumber || '1000293847561'}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#4F7D3A', fontSize: '0.72rem', marginTop: '2px' }}>
                        <Smartphone size={11} />
                        <span>Telebirr: {ag.paymentPartnerDetails?.telebirrPhone || ag.merchantPhone}</span>
                      </div>
                    </div>
                  </td>
                  <td>{formatETB(ag.totalAmount)}</td>
                  <td style={{ color: '#4F7D3A', fontWeight: 600 }}>{formatETB(ag.paidAmount)}</td>
                  <td>
                    <strong style={{ color: (Number(ag.remainingAmount) || 0) > 0 ? '#D99A20' : '#4F7D3A' }}>
                      {formatETB(ag.remainingAmount)}
                    </strong>
                  </td>
                  <td>{ag.dueDate}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span className={`badge ${ag.status === 'Active' ? 'badge-active' : 'badge-repaid'}`}>
                        {ag.status}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#2E7D32', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Lock size={10} /> OTP Signed
                      </span>
                    </div>
                  </td>
                  <td>
                    {ag.remainingAmount > 0 ? (
                      <button
                        onClick={() => setSelectedAgreement(ag)}
                        className="btn btn-gold btn-sm"
                        style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                      >
                        Make Payment
                      </button>
                    ) : (
                      <span style={{ color: '#4F7D3A', fontSize: '0.75rem', fontWeight: 700 }}>Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RepaymentModal
        isOpen={!!selectedAgreement}
        onClose={() => setSelectedAgreement(null)}
        agreement={selectedAgreement}
      />
    </div>
  );
};
