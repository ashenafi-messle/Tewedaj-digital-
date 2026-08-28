'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditAgreement } from '../../types';
import { formatETB } from '../../utils/formatters';
import { X, CheckCircle2, ShieldCheck, DollarSign, ArrowRight, Building2, Smartphone, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RepaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agreement: CreditAgreement | null;
}

export const RepaymentModal: React.FC<RepaymentModalProps> = ({ isOpen, onClose, agreement }) => {
  const { recordRepayment } = useApp();
  const [repayAmount, setRepayAmount] = useState<number>(() => agreement?.remainingAmount || 1000);
  const [method, setMethod] = useState<'Telebirr' | 'CBE Birr' | 'Cash' | 'Bank Transfer'>('Telebirr');
  const [refNumber, setRefNumber] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen || !agreement) return null;

  const validRepayAmount = Math.min(repayAmount, agreement.remainingAmount);
  const newRemaining = Math.max(0, agreement.remainingAmount - validRepayAmount);
  const newPaid = agreement.paidAmount + validRepayAmount;
  const newPercent = Math.round((newPaid / agreement.totalAmount) * 100);

  const copyValue = (val: string, key: string) => {
    navigator.clipboard?.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRepay = () => {
    if (validRepayAmount <= 0) {
      alert('Please enter a valid repayment amount');
      return;
    }

    setIsProcessing(true);
    const ok = recordRepayment(agreement.id, validRepayAmount, method, refNumber);
    setIsProcessing(false);
    if (ok) {
      if (newRemaining === 0) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }
      onClose();
    }
  };

  const bankAcc = agreement.bankDetails?.accountNumber || '1000293847561';
  const bankName = agreement.bankDetails?.bankName || 'Commercial Bank of Ethiopia (CBE)';
  const telebirrNum = agreement.paymentPartnerDetails?.telebirrPhone || agreement.merchantPhone || '+251 911 234 567';
  const cbeBirrNum = agreement.paymentPartnerDetails?.cbeBirrPhone || agreement.merchantPhone || '+251 911 234 567';

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '540px' }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(74, 46, 23, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFF8E7'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#38210F', fontFamily: 'Fraunces, serif' }}>
              Record Credit Repayment
            </h3>
            <p style={{ margin: '3px 0 0', fontSize: '0.78rem', color: '#756B5D' }}>
              Agreement #{agreement.agreementNumber} • {agreement.customerName}
            </p>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Visual Progress Box */}
          <div style={{
            backgroundColor: '#FAF5E8',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid rgba(74, 46, 23, 0.1)',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span style={{ color: '#756B5D' }}>Original Principal:</span>
              <strong style={{ color: '#38210F' }}>{formatETB(agreement.totalAmount)}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span style={{ color: '#756B5D' }}>Currently Settled:</span>
              <strong style={{ color: '#4F7D3A' }}>{formatETB(agreement.paidAmount)}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.95rem' }}>
              <span style={{ color: '#756B5D', fontWeight: 600 }}>Remaining Balance:</span>
              <strong style={{ color: '#D99A20', fontSize: '1.15rem' }}>{formatETB(agreement.remainingAmount)}</strong>
            </div>

            {/* Progress bar preview */}
            <div className="progress-bar-bg" style={{ height: '10px' }}>
              <div
                className="progress-bar-fill"
                style={{
                  width: `${newPercent}%`,
                  backgroundColor: newRemaining === 0 ? '#4F7D3A' : '#D99A20'
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.75rem', color: '#756B5D' }}>
              <span>Settlement Progress</span>
              <strong style={{ color: '#38210F' }}>{newPercent}% Completed</strong>
            </div>
          </div>

          {/* Amount input & Quick buttons */}
          <div className="form-group">
            <label className="form-label">Repayment Sum to Record (ETB)</label>
            <input
              type="number"
              className="form-input"
              value={repayAmount}
              onChange={(e) => setRepayAmount(Number(e.target.value))}
              max={agreement.remainingAmount}
              min={100}
            />
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => setRepayAmount(agreement.remainingAmount)}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '4px 8px' }}
              >
                Pay Full ({formatETB(agreement.remainingAmount)})
              </button>
              {agreement.remainingAmount > 2000 && (
                <button
                  type="button"
                  onClick={() => setRepayAmount(Math.round(agreement.remainingAmount / 2))}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                >
                  Pay 50% ({formatETB(Math.round(agreement.remainingAmount / 2))})
                </button>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="form-group">
            <label className="form-label">Payment Channel</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {(['Telebirr', 'CBE Birr', 'Cash', 'Bank Transfer'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: method === m ? '2px solid #D99A20' : '1px solid rgba(74, 46, 23, 0.12)',
                    backgroundColor: method === m ? '#FFF6D6' : '#FFFFFF',
                    fontWeight: method === m ? 700 : 500,
                    color: '#38210F',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Merchant Settlement Account Display */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '12px',
            border: '1px solid rgba(74,46,23,0.12)',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '0.72rem', color: '#756B5D', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Creditor Deposit Destination:
            </span>

            {method === 'Bank Transfer' ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38210F' }}>{bankName}</div>
                  <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#D99A20', fontSize: '0.9rem' }}>{bankAcc}</div>
                </div>
                <button
                  type="button"
                  onClick={() => copyValue(bankAcc, 'bank')}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                >
                  {copiedKey === 'bank' ? <Check size={12} color="#4F7D3A" /> : <Copy size={12} />}
                  {copiedKey === 'bank' ? 'Copied' : 'Copy Acc #'}
                </button>
              </div>
            ) : method === 'Telebirr' ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38210F' }}>Telebirr Merchant / Phone</div>
                  <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#4F7D3A', fontSize: '0.9rem' }}>{telebirrNum}</div>
                </div>
                <button
                  type="button"
                  onClick={() => copyValue(telebirrNum, 'telebirr')}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                >
                  {copiedKey === 'telebirr' ? <Check size={12} color="#4F7D3A" /> : <Copy size={12} />}
                  {copiedKey === 'telebirr' ? 'Copied' : 'Copy Number'}
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38210F' }}>CBE Birr Phone</div>
                  <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#D99A20', fontSize: '0.9rem' }}>{cbeBirrNum}</div>
                </div>
                <button
                  type="button"
                  onClick={() => copyValue(cbeBirrNum, 'cbebirr')}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                >
                  {copiedKey === 'cbebirr' ? <Check size={12} color="#4F7D3A" /> : <Copy size={12} />}
                  {copiedKey === 'cbebirr' ? 'Copied' : 'Copy Number'}
                </button>
              </div>
            )}
          </div>

          {/* Reference Number */}
          <div className="form-group">
            <label className="form-label">Transaction Reference # (Optional)</label>
            <input
              type="text"
              className="form-input"
              value={refNumber}
              onChange={(e) => setRefNumber(e.target.value)}
              placeholder={`e.g. ${method.slice(0, 2).toUpperCase()}-TX-998822`}
            />
          </div>

          {/* Partner Mandate Notice */}
          <div style={{
            backgroundColor: '#EEF5E5',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '0.78rem',
            color: '#2E7D32',
            border: '1px solid #C8E6C9'
          }}>
            <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
            Repayment is recorded through authorized mandate gateway. Both buyer and seller ledgers synchronize automatically.
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(74, 46, 23, 0.1)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          backgroundColor: '#FFF8E7'
        }}>
          <button onClick={onClose} className="btn btn-outline btn-sm">
            Cancel
          </button>
          <button
            onClick={handleRepay}
            disabled={isProcessing || validRepayAmount <= 0}
            className="btn btn-gold"
          >
            {isProcessing ? 'Recording...' : `Confirm Payment of ${formatETB(validRepayAmount)}`}
          </button>
        </div>
      </div>
    </div>
  );
};
