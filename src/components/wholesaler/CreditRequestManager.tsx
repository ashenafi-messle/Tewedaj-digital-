'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditRequest } from '../../types';
import { formatETB } from '../../utils/formatters';
import {
  ShieldCheck,
  X,
  CheckCircle2,
  XCircle,
  Smartphone,
  Clock,
  FileText,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

export const CreditRequestManager: React.FC = () => {
  const { creditRequests, approveCreditRequest, rejectCreditRequest, t, language, isDark } = useApp();
  const [selectedRequest, setSelectedRequest] = useState<CreditRequest | null>(null);
  const [telebirrPhone, setTelebirrPhone] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const isAm = language === 'am';

  const pendingRequests = creditRequests.filter(r => r.status === 'Pending');

  const handleApprove = async () => {
    if (!selectedRequest || !telebirrPhone || telebirrPhone.length < 10) {
      alert(isAm ? 'እባክዎ ትክክለኛ የቴሌቢር ስልክ ቁጥር ያስገቡ' : 'Please enter a valid Telebirr phone number');
      return;
    }

    setIsProcessing(true);
    const success = approveCreditRequest(selectedRequest.id, telebirrPhone);
    setIsProcessing(false);

    if (success) {
      alert(isAm ? 'የብድር ጥያቄ ተፈቅዷል! የብድር ስምምነት ተፈጥሯል።' : 'Credit request approved! Credit agreement created.');
      setSelectedRequest(null);
      setTelebirrPhone('');
      setShowApprovalForm(false);
    } else {
      alert(isAm ? 'የብድር ጥያቄውን ማፈቅ አልተቻለም።' : 'Failed to approve credit request.');
    }
  };

  const handleReject = async () => {
    if (!selectedRequest || !rejectionReason || rejectionReason.length < 5) {
      alert(isAm ? 'እባክዎ የተካትትኩትን ምክንያት ያስገቡ' : 'Please provide a rejection reason');
      return;
    }

    setIsProcessing(true);
    const success = rejectCreditRequest(selectedRequest.id, rejectionReason);
    setIsProcessing(false);

    if (success) {
      alert(isAm ? 'የብድር ጥያቄ ተከል኷ል።' : 'Credit request rejected.');
      setSelectedRequest(null);
      setRejectionReason('');
      setShowRejectionForm(false);
    } else {
      alert(isAm ? 'የብድር ጥያቄውን መከልን አልተቻለም።' : 'Failed to reject credit request.');
    }
  };

  if (pendingRequests.length === 0) {
    return (
      <div style={{
        backgroundColor: isDark ? '#211710' : '#FFFFFF',
        borderRadius: '16px',
        padding: '24px',
        border: isDark ? '1px solid rgba(255, 170, 44, 0.15)' : '1px solid rgba(74, 46, 23, 0.1)',
        textAlign: 'center'
      }}>
        <ShieldCheck size={48} color={isDark ? '#FFB94D' : '#D99A20'} style={{ marginBottom: '12px', opacity: 0.5 }} />
        <h4 style={{ color: isDark ? '#FFF4E5' : '#38210F', marginBottom: '8px' }}>
          {isAm ? 'ምንም የብድር ጥያቄ የለም' : 'No Pending Credit Requests'}
        </h4>
        <p style={{ color: isDark ? '#F0DFCD' : '#756B5D', fontSize: '0.875rem' }}>
          {isAm ? 'የነበረውን ሲያዩ እዚህ ይታያል' : 'Credit requests from merchants will appear here'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {!selectedRequest ? (
        <>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ color: isDark ? '#FFF4E5' : '#38210F', fontSize: '1.1rem', margin: 0 }}>
              {t('creditRequestManager.title')}
            </h3>
            <span style={{
              backgroundColor: isDark ? 'rgba(255, 170, 44, 0.2)' : 'rgba(255, 185, 77, 0.2)',
              color: isDark ? '#FFB94D' : '#D99A20',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              {pendingRequests.length} {t('creditRequestManager.pending')}
            </span>
          </div>

          {/* Request List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                style={{
                  backgroundColor: isDark ? 'rgba(255, 170, 44, 0.05)' : '#FAF5E8',
                  borderRadius: '12px',
                  padding: '16px',
                  border: isDark ? '1px solid rgba(255, 170, 44, 0.15)' : '1px solid rgba(74, 46, 23, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFB94D'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = isDark ? 'rgba(255, 170, 44, 0.15)' : 'rgba(74, 46, 23, 0.08)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: isDark ? '#FFF4E5' : '#38210F', fontSize: '0.95rem' }}>
                      {request.merchantName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: isDark ? '#F0DFCD' : '#756B5D', marginTop: '2px' }}>
                      {request.merchantLocation}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: isDark ? '#FFB94D' : '#D99A20', fontSize: '1rem' }}>
                      {formatETB(request.totalAmount)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: isDark ? '#F0DFCD' : '#756B5D' }}>
                      {new Date(request.requestedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.8rem', color: isDark ? '#F0DFCD' : '#756B5D' }}>
                    {request.items.length} {isAm ? 'እቃዎች' : 'items'}
                  </div>
                  <ChevronRight size={16} color={isDark ? '#FFB94D' : '#D99A20'} />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Request Detail */}
          <div style={{
            backgroundColor: isDark ? '#211710' : '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            border: isDark ? '1px solid rgba(255, 170, 44, 0.15)' : '1px solid rgba(74, 46, 23, 0.1)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setSelectedRequest(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    color: isDark ? '#F0DFCD' : '#756B5D'
                  }}
                >
                  <X size={20} />
                </button>
                <h3 style={{ color: isDark ? '#FFF4E5' : '#38210F', fontSize: '1.1rem', margin: 0 }}>
                  {t('creditRequestManager.viewDetails')}
                </h3>
              </div>
              <span style={{
                backgroundColor: isDark ? 'rgba(255, 170, 44, 0.2)' : 'rgba(255, 185, 77, 0.2)',
                color: isDark ? '#FFB94D' : '#D99A20',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                {selectedRequest.requestNumber}
              </span>
            </div>

            {/* Merchant Info */}
            <div style={{
              backgroundColor: isDark ? 'rgba(255, 170, 44, 0.05)' : '#FFF8E7',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '0.8rem', color: isDark ? '#F0DFCD' : '#756B5D', marginBottom: '4px' }}>
                {t('creditRequestManager.merchant')}
              </div>
              <div style={{ fontWeight: 700, color: isDark ? '#FFF4E5' : '#38210F', fontSize: '1rem' }}>
                {selectedRequest.merchantName}
              </div>
              <div style={{ fontSize: '0.85rem', color: isDark ? '#F0DFCD' : '#756B5D', marginTop: '2px' }}>
                {selectedRequest.merchantLocation} • {selectedRequest.merchantPhone}
              </div>
            </div>

            {/* Items */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: isDark ? '#F0DFCD' : '#756B5D', marginBottom: '8px', fontWeight: 600 }}>
                {t('wholesalerOrders.orderedItems')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedRequest.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      backgroundColor: isDark ? '#0F0C09' : '#FAF5E8',
                      borderRadius: '8px',
                      fontSize: '0.875rem'
                    }}
                  >
                    <span style={{ color: isDark ? '#FFF4E5' : '#38210F' }}>
                      {item.quantity}x {item.productName}
                    </span>
                    <span style={{ fontWeight: 600, color: isDark ? '#FFB94D' : '#D99A20' }}>
                      {formatETB(item.totalPrice || item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms */}
            {selectedRequest.terms && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <FileText size={16} color={isDark ? '#FFB94D' : '#D99A20'} />
                  <span style={{ fontSize: '0.8rem', color: isDark ? '#F0DFCD' : '#756B5D', fontWeight: 600 }}>
                    {t('creditRequestManager.purpose')}
                  </span>
                </div>
                <div style={{
                  padding: '10px 12px',
                  backgroundColor: isDark ? '#0F0C09' : '#FAF5E8',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: isDark ? '#FFF4E5' : '#38210F',
                  lineHeight: 1.5
                }}>
                  {selectedRequest.terms}
                </div>
              </div>
            )}

            {/* Due Date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
              <Clock size={16} color={isDark ? '#FFB94D' : '#D99A20'} />
              <span style={{ fontSize: '0.85rem', color: isDark ? '#F0DFCD' : '#756B5D' }}>
                {t('creditRequestManager.dueDate')}:{' '}
                <strong style={{ color: isDark ? '#FFF4E5' : '#38210F' }}>
                  {selectedRequest.dueDate ? new Date(selectedRequest.dueDate).toLocaleDateString() : 'N/A'}
                </strong>
              </span>
            </div>

            {/* Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: isDark ? 'rgba(255, 170, 44, 0.1)' : 'rgba(255, 185, 77, 0.1)',
              borderRadius: '10px',
              marginBottom: '16px',
              border: isDark ? '1px solid rgba(255, 170, 44, 0.2)' : '1px solid rgba(255, 185, 77, 0.2)'
            }}>
              <span style={{ fontSize: '0.9rem', color: isDark ? '#F0DFCD' : '#756B5D', fontWeight: 600 }}>
                {t('creditRequestManager.requestedAmount')}
              </span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#FFB94D' : '#D99A20' }}>
                {formatETB(selectedRequest.totalAmount)}
              </span>
            </div>

            {/* Merchant Telebirr */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Smartphone size={16} color={isDark ? '#FFB94D' : '#D99A20'} />
                <span style={{ fontSize: '0.8rem', color: isDark ? '#F0DFCD' : '#756B5D', fontWeight: 600 }}>
                  {t('creditRequestManager.telebirrPhone')}
                </span>
              </div>
              <div style={{
                padding: '10px 12px',
                backgroundColor: isDark ? '#0F0C09' : '#FAF5E8',
                borderRadius: '8px',
                fontSize: '0.875rem',
                color: isDark ? '#FFF4E5' : '#38210F'
              }}>
                {selectedRequest.merchantTelebirrPhone}
              </div>
            </div>

            {/* Info Box */}
            <div style={{
              display: 'flex',
              gap: '10px',
              padding: '10px',
              backgroundColor: isDark ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.1)',
              borderRadius: '8px',
              border: isDark ? '1px solid rgba(76, 175, 80, 0.2)' : '1px solid rgba(76, 175, 80, 0.2)',
              marginBottom: '16px'
            }}>
              <AlertCircle size={16} color={isDark ? '#81C784' : '#4CAF50'} style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{
                margin: 0,
                fontSize: '0.8125rem',
                color: isDark ? '#A5D6A7' : '#2E7D32',
                lineHeight: 1.5
              }}>
                {isAm
                  ? 'ይህ ጥያቄ ተፈቅዷ ከተረጋገጠ፣ የፕላትፎርም የብድር ስምምነት በራስትዎ ይፈጠርልዎታል።'
                  : 'If approved, a platform credit agreement will be automatically created in your name.'}
              </p>
            </div>

            {/* Wholesaler Telebirr Input */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Smartphone size={16} color={isDark ? '#FFB94D' : '#D99A20'} />
                <span style={{ fontSize: '0.8rem', color: isDark ? '#F0DFCD' : '#756B5D', fontWeight: 600 }}>
                  {t('creditRequestManager.enterTelebirr')}
                </span>
              </div>
              <input
                type="tel"
                value={telebirrPhone}
                onChange={(e) => setTelebirrPhone(e.target.value)}
                placeholder="+251 9XX XXX XXX"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : '1px solid rgba(74, 46, 23, 0.2)',
                  backgroundColor: isDark ? '#0F0C09' : '#FFFFFF',
                  color: isDark ? '#FFF4E5' : '#38210F',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#FFB94D'}
                onBlur={(e) => e.currentTarget.style.borderColor = isDark ? 'rgba(255, 170, 44, 0.3)' : 'rgba(74, 46, 23, 0.2)'}
              />
            </div>

            {/* Rejection Reason Input */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <XCircle size={16} color={isDark ? '#EF9A9A' : '#EF5350'} />
                <span style={{ fontSize: '0.8rem', color: isDark ? '#F0DFCD' : '#756B5D', fontWeight: 600 }}>
                  {t('creditRequestManager.rejectionReason')}
                </span>
              </div>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder={t('creditRequestManager.enterReason')}
                rows={2}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: isDark ? '1px solid rgba(239, 83, 80, 0.3)' : '1px solid rgba(239, 83, 80, 0.2)',
                  backgroundColor: isDark ? '#0F0C09' : '#FFFFFF',
                  color: isDark ? '#FFF4E5' : '#38210F',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#EF5350'}
                onBlur={(e) => e.currentTarget.style.borderColor = isDark ? 'rgba(239, 83, 80, 0.3)' : 'rgba(239, 83, 80, 0.2)'}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleReject}
                disabled={isProcessing}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: isDark ? '1px solid rgba(239, 83, 80, 0.3)' : '1px solid rgba(239, 83, 80, 0.3)',
                  backgroundColor: 'transparent',
                  color: isDark ? '#EF9A9A' : '#EF5350',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: isProcessing ? 0.6 : 1
                }}
              >
                <XCircle size={18} />
                {isProcessing ? (isAm ? 'በማስገባት ላይ...' : 'Processing...') : t('creditRequestManager.reject')}
              </button>
              <button
                onClick={handleApprove}
                disabled={isProcessing}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: isProcessing ? 'rgba(255, 170, 44, 0.5)' : '#FFB94D',
                  color: '#160D06',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: isProcessing ? 0.6 : 1
                }}
              >
                <CheckCircle2 size={18} />
                {isProcessing ? (isAm ? 'በማስገባት ላይ...' : 'Processing...') : t('creditRequestManager.approve')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
