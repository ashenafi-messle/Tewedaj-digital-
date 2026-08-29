'use client'

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../../context/AppContext';
import { CreditRequest, OrderItem } from '../../types';
import { formatETB } from '../../utils/formatters';
import {
  X,
  CreditCard,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Clock,
  FileText
} from 'lucide-react';

interface CreditRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  wholesalerId: string;
  wholesalerName: string;
  wholesalerPhone: string;
  wholesalerLocation: string;
  items: OrderItem[];
  totalAmount: number;
  onDirectOrder: () => void;
}

export const CreditRequestModal: React.FC<CreditRequestModalProps> = ({
  isOpen,
  onClose,
  wholesalerId,
  wholesalerName,
  wholesalerPhone,
  wholesalerLocation,
  items,
  totalAmount,
  onDirectOrder
}) => {
  const { currentUser, createCreditRequest, addNotification, language, t, theme } = useApp();
  const isDark = theme === 'dark';

  const [telebirrPhone, setTelebirrPhone] = useState('');
  const [terms, setTerms] = useState('');
  const [dueDate, setDueDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'direct' | 'credit' | null>(null);
  const [isCreditDetailsOpen, setIsCreditDetailsOpen] = useState(false);

  if (!isOpen) return null;

  const isAm = language === 'am';

  const handleDirectOrder = () => {
    setSelectedOption('direct');
    onDirectOrder();
    onClose();
  };

  const handleCreditRequest = async () => {
    if (!telebirrPhone || telebirrPhone.length < 10) {
      alert(isAm ? 'እባክዎ ትክክለኛ የቴሌቢር ስልክ ቁጥር ያስገቡ' : 'Please enter a valid Telebirr phone number');
      return;
    }

    if (!terms || terms.length < 10) {
      alert(isAm ? 'እባክዎ የብድር ውል ይስጡ' : 'Please provide credit terms');
      return;
    }

    setIsSubmitting(true);

    try {
      const request: CreditRequest = {
        id: `cr-req-${Date.now()}`,
        requestNumber: `TW-CR-REQ-${Date.now()}`,
        merchantId: currentUser?.id || '',
        merchantName: currentUser?.name || '',
        merchantPhone: currentUser?.phone || '',
        merchantLocation: currentUser?.location || '',
        merchantTelebirrPhone: telebirrPhone,
        wholesalerId,
        wholesalerName,
        wholesalerPhone,
        wholesalerLocation,
        items,
        totalAmount,
        requestedDate: new Date().toISOString(),
        status: 'Pending',
        terms,
        dueDate
      };

      const success = createCreditRequest(request);

      if (success) {
        // Notify wholesaler
        addNotification({
          userId: wholesalerId,
          targetRole: 'wholesaler',
          title: isAm ? 'አዲስ የብድር ጥያቄ' : 'New Credit Request',
          message: isAm 
            ? `${currentUser?.name} ከ${wholesalerName} የብድር ጥያቄ ላክተዋል - ${formatETB(totalAmount)}`
            : `${currentUser?.name} has sent a credit request to ${wholesalerName} - ${formatETB(totalAmount)}`,
          type: 'credit_request',
          actionUrl: '/wholesaler/dashboard'
        });

        alert(isAm ? 'የብድር ጥያቄዎ ተልኳል! የገበያው አስተዳዳሪ ምላሽ ይሰጣል።' : 'Credit request sent! The wholesaler will review your request.');
        onClose();
      } else {
        alert(isAm ? 'የብድር ጥያቄውን መስጠት አልተቻለም። እባክዎ እንደገና ይሞክሩ።' : 'Failed to send credit request. Please try again.');
      }
    } catch (error) {
      alert(isAm ? 'ስህተት ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።' : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2147483647,
      padding: '20px',
      margin: 0,
      overflow: 'hidden',
      isolation: 'isolate'
    }}>
      <div style={{
        backgroundColor: isDark ? '#1A1512' : '#FFFFFF',
        borderRadius: '16px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.5)' : '0 8px 32px rgba(61, 40, 23, 0.15)',
        border: isDark ? '1px solid rgba(255, 170, 44, 0.2)' : '1px solid rgba(61, 40, 23, 0.1)',
        position: 'relative',
        isolation: 'isolate'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: isDark ? '1px solid rgba(255, 170, 44, 0.15)' : '1px solid rgba(61, 40, 23, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: isDark ? 'rgba(255, 170, 44, 0.15)' : 'rgba(255, 185, 77, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CreditCard size={24} color={isDark ? '#FFB94D' : '#D99A20'} />
            </div>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: 700,
                color: isDark ? '#FFF4E5' : '#38210F',
                fontFamily: 'Fraunces, serif'
              }}>
                {isAm ? 'የትዕግስት ውል' : 'Payment Options'}
              </h2>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '0.875rem',
                color: isDark ? '#F0DFCD' : '#6B4423'
              }}>
                {isAm ? 'የእቃዎች ጠቅላላ ዋጋ' : 'Total Order Value'}: {formatETB(totalAmount)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              color: isDark ? '#F0DFCD' : '#6B4423',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 170, 44, 0.1)' : 'rgba(61, 40, 23, 0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Credit Request Details */}
          <div>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: isDark ? '#FFF4E5' : '#38210F'
            }}>
              {isAm ? 'የብድር ጥያቄ ዝርዝሮች' : 'Credit Request Details'}
            </h3>

            {/* Telebirr Phone */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: isDark ? '#F0DFCD' : '#4A2E17',
                marginBottom: '8px'
              }}>
                {isAm ? 'የቴሌቢር ስልክ ቁጥር' : 'Telebirr Phone Number'}
              </label>
              <div style={{ position: 'relative' }}>
                <Smartphone size={16} color={isDark ? '#FFB94D' : '#D99A20'} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  opacity: 0.6
                }} />
                <input
                  type="tel"
                  value={telebirrPhone}
                  onChange={(e) => setTelebirrPhone(e.target.value)}
                  placeholder="+251 9XX XXX XXX"
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    borderRadius: '10px',
                    border: isDark ? '1px solid rgba(255, 170, 44, 0.2)' : '1px solid rgba(61, 40, 23, 0.15)',
                    backgroundColor: isDark ? '#211710' : '#FFF8E7',
                    color: isDark ? '#FFF4E5' : '#38210F',
                    fontSize: '0.925rem',
                    outline: 'none',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#FFB94D' : '#D99A20';
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${isDark ? 'rgba(255, 170, 44, 0.15)' : 'rgba(217, 154, 32, 0.15)'}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 170, 44, 0.2)' : 'rgba(61, 40, 23, 0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Payment Due Date */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: isDark ? '#F0DFCD' : '#4A2E17',
                marginBottom: '8px'
              }}>
                {isAm ? 'የክፍያ የሚደርረው ቀን' : 'Payment Due Date'}
              </label>
              <div style={{ position: 'relative' }}>
                <Clock size={16} color={isDark ? '#FFB94D' : '#D99A20'} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  opacity: 0.6
                }} />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    borderRadius: '10px',
                    border: isDark ? '1px solid rgba(255, 170, 44, 0.2)' : '1px solid rgba(61, 40, 23, 0.15)',
                    backgroundColor: isDark ? '#211710' : '#FFF8E7',
                    color: isDark ? '#FFF4E5' : '#38210F',
                    fontSize: '0.925rem',
                    outline: 'none',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#FFB94D' : '#D99A20';
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${isDark ? 'rgba(255, 170, 44, 0.15)' : 'rgba(217, 154, 32, 0.15)'}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 170, 44, 0.2)' : 'rgba(61, 40, 23, 0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Credit Terms */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: isDark ? '#F0DFCD' : '#4A2E17',
                marginBottom: '8px'
              }}>
                {isAm ? 'የብድር ውል' : 'Credit Terms'}
              </label>
              <textarea
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                placeholder={isAm ? 'የብድር ውል ያስገቡ...' : 'Enter credit terms...'}
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: isDark ? '1px solid rgba(255, 170, 44, 0.2)' : '1px solid rgba(61, 40, 23, 0.15)',
                  backgroundColor: isDark ? '#211710' : '#FFF8E7',
                  color: isDark ? '#FFF4E5' : '#38210F',
                  fontSize: '0.925rem',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = isDark ? '#FFB94D' : '#D99A20';
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${isDark ? 'rgba(255, 170, 44, 0.15)' : 'rgba(217, 154, 32, 0.15)'}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255, 170, 44, 0.2)' : 'rgba(61, 40, 23, 0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleCreditRequest}
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: isDark ? '#FFB94D' : '#D99A20',
                color: isDark ? '#160D06' : '#FFFFFF',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: isSubmitting ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = isDark ? '#FFD080' : '#E68A00';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = isDark ? '#FFB94D' : '#D99A20';
                }
              }}
            >
              {isSubmitting ? (
                <>
                  {isAm ? 'በማስገባት ላይ...' : 'Submitting...'}
                </>
              ) : (
                <>
                  {isAm ? 'የብድር ጥያቄ ላክ' : 'Send Credit Request'}
                  <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
                </>
              )}
            </button>

            {/* Info Text */}
            <p style={{
              marginTop: '16px',
              fontSize: '0.8rem',
              color: isDark ? '#B5A495' : '#756B5D',
              textAlign: 'center',
              lineHeight: 1.5
            }}>
              {isAm
                ? 'የፕላትፎርም የብድር ጥበቃ ይጠይቁ። የገበያው አስተዳዳሪ ምላሽ ይሰጣል።'
                : 'Request platform credit guarantee. The wholesaler may approve or decline your request.'}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
