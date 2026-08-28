'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { formatETB } from '../../utils/formatters';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Building2,
  Smartphone,
  KeyRound,
  Send,
  RefreshCw,
  Lock,
  FileCheck
} from 'lucide-react';
import { INITIAL_USERS } from '../../data/mockData';
import confetti from 'canvas-confetti';

interface CreditAgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ETHIOPIAN_BANKS: string[] = [];

export const CreditAgreementModal: React.FC<CreditAgreementModalProps> = ({ isOpen, onClose }) => {
  const { createCreditAgreement, currentUser, addNotification, language, t } = useApp();
  const [step, setStep] = useState<number>(1);

  // Form State - Customer
  const customers = INITIAL_USERS.filter(u => u.role === 'customer');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(customers[0]?.id || 'usr-cust-1');
  const [customCustomerName, setCustomCustomerName] = useState<string>('');
  const [customCustomerPhone, setCustomCustomerPhone] = useState<string>('');
  const [customCustomerIdNumber, setCustomCustomerIdNumber] = useState<string>(
    'ETH-ID-' + Math.floor(100000 + Math.random() * 900000)
  );

  // Form State - Goods & Terms
  const [goodsDescription, setGoodsDescription] = useState<string>(
    '1 Quintal Adaa Magna Teff + 5L Selam Cooking Oil + 2kg Berbere + 24-pk Biftu Soap'
  );
  const [totalAmount, setTotalAmount] = useState<number>(11500);
  const [dueDate, setDueDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [terms, setTerms] = useState<string>(
    '3 equal monthly installments backed by verified mobile banking mandate upon salary disbursement.'
  );

  // Retained only for compatibility with the legacy non-rendered step.
  const [selectedBank, setSelectedBank] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankAccountHolder, setBankAccountHolder] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [cbeBirrPhone, setCbeBirrPhone] = useState('');

  const [telebirrPhone, setTelebirrPhone] = useState<string>(currentUser?.phone || '+251 911 234 567');
  const [mandateProvider, setMandateProvider] = useState('TELEBIRR_SANDBOX');

  // Form State - Customer OTP Authorization Phase
  const [otpCode, setOtpCode] = useState<string[]>(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [verificationId, setVerificationId] = useState<string>('');
  const [mandateId, setMandateId] = useState<string>('');
  const [otpCountdown, setOtpCountdown] = useState<number>(0);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>('');
  const [copiedBank, setCopiedBank] = useState<boolean>(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const currentCustomer = customers.find(c => c.id === selectedCustomerId) || {
    id: 'usr-cust-custom',
    name: customCustomerName || 'Walk-in Customer',
    phone: customCustomerPhone || '+251 911 000 111',
    creditScore: 740,
  };

  const customerTargetPhone = selectedCustomerId === 'custom'
    ? (customCustomerPhone || '+251 911 000 111')
    : currentCustomer.phone;

  const customerTargetName = selectedCustomerId === 'custom'
    ? (customCustomerName || 'Walk-in Customer')
    : currentCustomer.name;

  const visibleStep = step <= 1 ? 1 : step === 2 ? 2 : step < 5 ? 3 : 4;

  // Handle countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  if (!isOpen) return null;

  // Send OTP trigger
  const handleSendOtp = async () => {
    setOtpError('');
    const response = await fetch('/api/payments/mock/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerPhone: customerTargetPhone,
        telebirrAccount: telebirrPhone,
        agreementId: `draft-${currentUser?.id || 'merchant'}-${customerTargetPhone}`
      })
    });
    const result = await response.json();
    if (!result.success) {
      setOtpError(result.message || 'Unable to send the verification code.');
      return;
    }
    setVerificationId(result.verificationId);
    setIsOtpSent(true);
    setOtpCountdown(45);
    setIsOtpVerified(false);
    setOtpCode(['', '', '', '', '', '']);
    setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
  };

  const handleOtpDigitChange = async (index: number, val: string) => {
    const clean = val.replace(/\D/g, '');
    if (!clean && val !== '') return;

    const newCode = [...otpCode];
    newCode[index] = clean ? clean.slice(-1) : '';
    setOtpCode(newCode);
    setOtpError('');

    if (clean && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    const fullCode = newCode.join('');
    if (fullCode.length === 6 && verificationId) {
      const response = await fetch('/api/payments/mock/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationId, otp: fullCode })
      });
      const result = await response.json();
      if (result.success) {
        setMandateId(result.mandateId || '');
        setIsOtpVerified(true);
        setOtpError('');
      } else {
        setIsOtpVerified(false);
        setOtpError(result.message || 'Incorrect verification code. Please try again.');
      }
    } else {
      setIsOtpVerified(false);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (selectedCustomerId === 'custom' && (!customCustomerName || !customCustomerPhone)) {
        alert('Please fill in customer full name and phone number.');
        return;
      }
    }
    if (step === 2) {
      if (!goodsDescription || totalAmount <= 0) {
        alert('Please enter a valid goods description and credit amount.');
        return;
      }
    }
    if (step === 3) {
      if (!telebirrPhone) {
        alert('Please provide the Telebirr Mobile Number.');
        return;
      }
      // Automatically send OTP when transitioning to Step 4 if not sent yet
      if (!isOtpSent) {
        handleSendOtp();
      }
    }
    if (step === 4) {
      if (!isOtpVerified) {
        setOtpError('Please complete the Customer OTP authorization before proceeding.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleFinish = () => {
    if (!isOtpVerified) {
      alert('The customer must authorize this agreement via OTP verification.');
      setStep(4);
      return;
    }

    const mandateRef = `${mandateProvider.slice(0, 2).toUpperCase()}-MND-${Math.floor(100000 + Math.random() * 900000)}`;

    createCreditAgreement({
      merchantId: currentUser?.id || 'usr-merch-1',
      merchantName: currentUser?.businessName || 'Almaz Family Grocery & Kiosk',
      merchantPhone: currentUser?.phone || '+251 911 234 567',
      merchantLocation: currentUser?.location || 'Bole Sub-City, Addis Ababa',
      customerId: selectedCustomerId === 'custom' ? `usr-cust-${Date.now()}` : currentCustomer.id,
      customerName: customerTargetName,
      customerPhone: customerTargetPhone,
      customerIdNumber: customCustomerIdNumber,
      goodsDescription,
      totalAmount: Number(totalAmount),
      paidAmount: 0,
      remainingAmount: Number(totalAmount),
      creationDate: new Date().toISOString().split('T')[0],
      dueDate,
      terms,
      paymentPartnerDetails: {
        telebirrPhone,
        preferredProvider: 'Telebirr'
      },
      authorizationMandate: {
        provider: 'TELEBIRR_SANDBOX',
        mandateReference: mandateId || mandateRef,
        authorizedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
        isOtpVerified: true,
        customerOtpPhone: customerTargetPhone,
        otpAuthCode: undefined,
        otpVerifiedTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        mandateStatus: 'Verified & Authorized'
      }
    });

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    onClose();
    // Reset modal state
    setStep(1);
    setIsOtpSent(false);
    setIsOtpVerified(false);
    setOtpCode(['', '', '', '', '', '']);
    setVerificationId('');
    setMandateId('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '660px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={20} color="#D99A20" />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#38210F', fontFamily: 'Fraunces, serif' }}>
                  {language === 'am' ? 'አዲስ የዲጂታል ብድር ውል' : 'Create New Credit Agreement'}
                </h3>
                <span className="sandbox-label">TEWEDAJ DEMO — Telebirr Sandbox Simulation</span>
              </div>
            </div>
            <p style={{ margin: '3px 0 0', fontSize: '0.78rem', color: '#756B5D' }}>
              {language === 'am'
                ? `ደረጃ ${visibleStep} ከ 4 • የደንበኛ፣ የብድር እና የፈቃድ ሂደት`
                : `Step ${visibleStep} of 4 • Customer, credit and sandbox authorization`}
            </p>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(74, 46, 23, 0.08)', backgroundColor: '#FAF5E8', overflowX: 'auto' }}>
          {[
            { num: 1, label: language === 'am' ? 'ደንበኛ' : 'Customer' },
            { num: 2, label: language === 'am' ? 'ብድር' : 'Credit' },
            { num: 3, label: language === 'am' ? 'ፈቃድ' : 'Authorization' },
            { num: 4, label: language === 'am' ? 'ተጠናቋል' : 'Complete' },
          ].map((s) => (
            <div
              key={s.num}
              style={{
                flex: 1,
                minWidth: '100px',
                padding: '10px 6px',
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: visibleStep >= s.num ? 700 : 500,
                color: visibleStep === s.num ? '#D99A20' : visibleStep > s.num ? '#4F7D3A' : '#A39686',
                borderBottom: visibleStep === s.num ? '3px solid #D99A20' : '3px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              {visibleStep > s.num ? <CheckCircle2 size={12} color="#4F7D3A" /> : <span>{s.num}.</span>}
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step Body */}
        <div style={{ padding: '24px', maxHeight: '68vh', overflowY: 'auto' }}>
          {/* STEP 1: Select Customer */}
          {step === 1 && (
            <div>
              <h4 style={{ color: '#38210F', marginBottom: '6px', fontSize: '1.05rem' }}>
                {language === 'am' ? 'ደንበኛ ይምረጡ ወይም ይመዝግቡ' : 'Select or Register Customer'}
              </h4>
              <p style={{ color: '#756B5D', fontSize: '0.82rem', marginBottom: '16px' }}>
                {language === 'am'
                  ? 'የብድር ታሪክ ያለው የተረጋገጠ ደንበኛ ይምረጡ ወይም በብሔራዊ መታወቂያ አዲስ ደንበኛ ይመዝግቡ።'
                  : 'Choose a verified local buyer with credit history or register a new customer with their Ethiopian National ID.'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {customers.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCustomerId(c.id)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: selectedCustomerId === c.id ? '2px solid #D99A20' : '1px solid rgba(74, 46, 23, 0.12)',
                      backgroundColor: selectedCustomerId === c.id ? '#FFF6D6' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={c.avatar}
                        alt={c.name}
                        style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: '#38210F', fontSize: '0.9rem' }}>{c.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#756B5D' }}>
                          {c.phone} • {c.location || 'Addis Ababa'}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-active" style={{ fontSize: '0.7rem' }}>
                        <ShieldCheck size={11} /> {language === 'am' ? 'የእምነት ደረጃ: ' : 'Trust Score: '}{c.creditScore || 750}
                      </span>
                    </div>
                  </div>
                ))}

                <div
                  onClick={() => setSelectedCustomerId('custom')}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: selectedCustomerId === 'custom' ? '2px solid #D99A20' : '1px dashed rgba(74, 46, 23, 0.2)',
                    backgroundColor: selectedCustomerId === 'custom' ? '#FFF6D6' : '#FAF5E8',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#38210F', marginBottom: '4px', fontSize: '0.9rem' }}>
                    {language === 'am' ? '+ አዲስ ደንበኛ ይመዝግቡ' : '+ Register New Walk-in Customer'}
                  </div>
                  {selectedCustomerId === 'custom' && (
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>
                          {language === 'am' ? 'የደንበኛ ሙሉ ስም' : 'Customer Full Name'}
                        </label>
                        <input
                          type="text"
                          placeholder={language === 'am' ? 'ምሳሌ፡ ሰለሞን ኃይሉ ገብሬ' : 'e.g. Solomon Hailu Gebre'}
                          className="form-input"
                          value={customCustomerName}
                          onChange={(e) => setCustomCustomerName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>
                          {language === 'am' ? 'የደንበኛ ስልክ ቁጥር (ለOTP ማረጋገጫ)' : 'Customer Phone Number (For OTP Verification)'}
                        </label>
                        <input
                          type="tel"
                          placeholder="+251 911 000 000"
                          className="form-input"
                          value={customCustomerPhone}
                          onChange={(e) => setCustomCustomerPhone(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>
                          {language === 'am' ? 'ብሔራዊ መታወቂያ / የቀበሌ መታወቂያ' : 'National ID / Kebele Identification'}
                        </label>
                        <input
                          type="text"
                          placeholder="ETH-ID-XXXXXX"
                          className="form-input"
                          value={customCustomerIdNumber}
                          onChange={(e) => setCustomCustomerIdNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Goods & Principal */}
          {step === 2 && (
            <div>
              <h4 style={{ color: '#38210F', marginBottom: '6px', fontSize: '1.05rem' }}>
                {language === 'am' ? 'የብድር ዕቃዎች እና የዋና ብድር መጠን' : 'Credit Goods & Principal Amount'}
              </h4>
              <p style={{ color: '#756B5D', fontSize: '0.82rem', marginBottom: '16px' }}>
                {language === 'am'
                  ? 'በብድር የተወሰዱትን ዕቃዎች ዘርዝረው የክፍያ ጊዜ ገደብ ይወስኑ።'
                  : 'Itemize goods taken on credit and specify payment due schedule.'}
              </p>

              <div className="form-group">
                <label className="form-label">{language === 'am' ? 'የዕቃዎች ዝርዝር እና መጠን' : 'Goods Description & Quantities'}</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  value={goodsDescription}
                  onChange={(e) => setGoodsDescription(e.target.value)}
                  placeholder={language === 'am' ? 'ምሳሌ፡ 1 ኩንታል የአዳማ ማኛ ጤፍ፣ 5 ሊትር ሰላም ዘይት፣ 2 ኪሎ በርበሬ...' : 'e.g. 1 Quintal Adaa Magna Teff, 5L Cooking Oil, 2kg Berbere...'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">{language === 'am' ? 'አጠቃላይ የብድር መጠን (ብር)' : 'Total Credit Principal (ETB)'}</label>
                  <input
                    type="number"
                    className="form-input"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    min={100}
                    step={100}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{language === 'am' ? 'የመክፈያ የመጨረሻ ቀን' : 'Target Due Settlement Date'}</label>
                  <input
                    type="date"
                    className="form-input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{language === 'am' ? 'የክፍያ ሁኔታዎች እና የጊዜ ሰሌዳ' : 'Repayment Terms & Schedule'}</label>
                <input
                  type="text"
                  className="form-input"
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  placeholder={language === 'am' ? 'ምሳሌ፡ በ3 እኩል ክፍያዎች በቴሌብር አውቶማቲክ ክፍያ' : 'e.g. 3 equal installments via Telebirr automated mandate'}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Bank Accounts & Payment Partner Phone Numbers */}
          {false && step === 3 && (
            <div>
              <h4 style={{ color: '#38210F', marginBottom: '6px', fontSize: '1.05rem' }}>
                {language === 'am' ? 'የባንክ ሂሳብ እና የክፍያ አጋሮች ዝርዝር' : 'Bank Account & Payment Partner Details'}
              </h4>
              <p style={{ color: '#756B5D', fontSize: '0.82rem', marginBottom: '16px' }}>
                {language === 'am'
                  ? 'የደንበኛው የብድር ክፍያ የሚገባበትን የባንክ ሂሳብ ቁጥር እና የክፍያ አጋሮች የስልክ መስመሮችን (ቴሌብር፣ ሲቢኢ ብር) ይግለጹ።'
                  : 'Specify the bank account number and payment partner mobile lines (Telebirr, CBE Birr) where customer credit settlements will be deposited.'}
              </p>

              {/* Bank Account Section */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(74, 46, 23, 0.12)',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Building2 size={18} color="#D99A20" />
                  <strong style={{ color: '#38210F', fontSize: '0.9rem' }}>
                    {language === 'am' ? 'የአበዳሪው የባንክ ሂሳብ መረጃ' : 'Creditor Bank Account Details'}
                  </strong>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>{language === 'am' ? 'የባንክ ስም' : 'Bank Name'}</label>
                    <select
                      className="form-select"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                    >
                      {ETHIOPIAN_BANKS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>{language === 'am' ? 'የባንክ ሂሳብ ቁጥር' : 'Bank Account Number'}</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 1000293847561"
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>{language === 'am' ? 'የሂሳብ ባለቤት / የንግድ ስም' : 'Account Holder / Business Name'}</label>
                    <input
                      type="text"
                      className="form-input"
                      value={bankAccountHolder}
                      onChange={(e) => setBankAccountHolder(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>{language === 'am' ? 'ቅርንጫፍ / አድራሻ' : 'Branch / Location'}</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Bole Medhanialem Branch"
                      value={bankBranch}
                      onChange={(e) => setBankBranch(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Partner Phone Numbers Section */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(74, 46, 23, 0.12)',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Smartphone size={18} color="#4F7D3A" />
                  <strong style={{ color: '#38210F', fontSize: '0.9rem' }}>
                    {language === 'am' ? 'የክፍያ አጋሮች ስልክ ቁጥሮች (ቴሌብር እና ሲቢኢ ብር)' : 'Payment Partner Phone Numbers (Telebirr & CBE Birr)'}
                  </strong>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>
                      {language === 'am' ? 'የቴሌብር ነጋዴ / የክፍያ ስልክ #' : 'Telebirr Merchant / Settlement Phone #'}
                    </label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+251 911 234 567"
                      value={telebirrPhone}
                      onChange={(e) => setTelebirrPhone(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>
                      {language === 'am' ? 'ሲቢኢ ብር / ኢ-ብር ስልክ ቁጥር' : 'CBE Birr / E-Birr Phone Number'}
                    </label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+251 911 234 567"
                      value={cbeBirrPhone}
                      onChange={(e) => setCbeBirrPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '8px' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>
                    {language === 'am' ? 'አውቶማቲክ የክፍያ ፍቃድ ፕሮቶኮል' : 'Automated Mandate Protocol'}
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[
                      { id: 'Telebirr Mandate', name: language === 'am' ? 'የቴሌብር ሱፐርአፕ ፍቃድ' : 'Telebirr SuperApp Mandate' },
                      { id: 'CBE Direct Debit', name: language === 'am' ? 'የሲቢኢ ቀጥታ ክፍያ' : 'CBE Direct Debit' },
                      { id: 'CoopPay', name: language === 'am' ? 'ኮኦፕፔይ / ኢ-ብር' : 'CoopPay / E-Birr' }
                    ].map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setMandateProvider(p.id)}
                        style={{
                          flex: 1,
                          padding: '8px 10px',
                          borderRadius: '8px',
                          border: mandateProvider === p.id ? '2px solid #D99A20' : '1px solid rgba(74,46,23,0.15)',
                          backgroundColor: mandateProvider === p.id ? '#FFF6D6' : '#FAF5E8',
                          color: mandateProvider === p.id ? '#38210F' : '#756B5D',
                          fontSize: '0.75rem',
                          fontWeight: mandateProvider === p.id ? 700 : 500,
                          cursor: 'pointer'
                        }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h4 style={{ color: '#38210F', marginBottom: '6px', fontSize: '1.05rem' }}>
                {language === 'am' ? 'የቴሌብር ፈቃድ' : 'Telebirr Authorization'}
              </h4>
              <p style={{ color: '#756B5D', fontSize: '0.82rem', marginBottom: '16px' }}>
                {language === 'am' ? 'የደንበኛውን የቴሌብር መለያ ብቻ በመጠቀም ለዚህ ብድር የመክፈያ ፈቃድ ይጠይቁ።' : 'Use the customer Telebirr account to request repayment authorization for this credit agreement.'}
              </p>
              <div style={{ backgroundColor: '#FFF6D6', border: '1px solid #D99A20', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                <strong style={{ color: '#38210F', display: 'block', marginBottom: '8px' }}>TEWEDAJ DEMO — Telebirr Sandbox Simulation</strong>
                <div style={{ color: '#4A2E17', fontSize: '0.85rem' }}>
                  <div>{language === 'am' ? 'ደንበኛ: ' : 'Customer: '}<strong>{customerTargetName}</strong></div>
                  <div>{language === 'am' ? 'የቴሌብር መለያ: ' : 'Telebirr account: '}<strong>{customerTargetPhone}</strong></div>
                  <div>{language === 'am' ? 'የፈቃድ መጠን: ' : 'Authorization limit: '}<strong>{formatETB(totalAmount)}</strong></div>
                </div>
              </div>
              <button type="button" onClick={handleSendOtp} disabled={otpCountdown > 0} className="btn btn-gold">
                <Send size={15} /> {otpCountdown > 0 ? `${language === 'am' ? 'ድጋሚ ለመላክ ' : 'Resend in '}${otpCountdown}s` : language === 'am' ? 'የማረጋገጫ ኮድ ላክ' : 'Send Verification Code'}
              </button>
            </div>
          )}

          {/* STEP 4: Customer OTP Authorization Phase */}
          {step === 4 && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px'
              }}>
                <h4 style={{ color: '#38210F', margin: 0, fontSize: '1.05rem' }}>
                  {language === 'am' ? 'የደንበኛ ፈቃድ እና የOTP ማረጋገጫ ደረጃ' : 'Customer Consent & OTP Authorization Phase'}
                </h4>
                {isOtpVerified && (
                  <span className="badge badge-active" style={{ fontSize: '0.75rem' }}>
                    <ShieldCheck size={13} /> {language === 'am' ? 'የተረጋገጠ እና የፀደቀ' : 'Verified & Authorized'}
                  </span>
                )}
              </div>

              <p style={{ color: '#756B5D', fontSize: '0.82rem', marginBottom: '16px' }}>
                {language === 'am'
                  ? 'የብድር ውሉ በህግ አስገዳጅ እንዲሆን እና የደንበኛውን የሞባይል ክፍያ ፈቃድ ለማገናኘት የOTP ኮድ ወደ ደንበኛው የተመዘገበ ስልክ ይላካል።'
                  : 'To make the credit agreement legally enforceable and link the customer’s mobile mandate, an authorization OTP code is sent to the customer’s registered phone.'}
              </p>

              {/* Customer Phone Confirmation Box */}
              <div style={{
                backgroundColor: '#FAF5E8',
                borderRadius: '12px',
                padding: '14px 18px',
                border: '1px solid rgba(74, 46, 23, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#756B5D', display: 'block' }}>
                    {language === 'am' ? 'ፍቃድ የሚሰጠው ደንበኛ:' : 'Customer Being Authorized:'}
                  </span>
                  <strong style={{ color: '#38210F', fontSize: '0.95rem' }}>{customerTargetName}</strong>
                  <div style={{ color: '#D99A20', fontWeight: 700, fontSize: '0.85rem' }}>{customerTargetPhone}</div>
                </div>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpCountdown > 0}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', gap: '6px' }}
                >
                  {otpCountdown > 0 ? (
                    <>
                      <RefreshCw size={13} className="spin-slow" /> {language === 'am' ? `በ ${otpCountdown} ሰከንድ ውስጥ ድጋሚ ይላኩ` : `Resend in ${otpCountdown}s`}
                    </>
                  ) : (
                    <>
                      <Send size={13} /> {isOtpSent ? (language === 'am' ? 'OTP ድጋሚ ላክ' : 'Resend OTP') : (language === 'am' ? 'SMS OTP ላክ' : 'Send SMS OTP')}
                    </>
                  )}
                </button>
              </div>

              {isOtpSent && (
                <div style={{ backgroundColor: '#FFF4E5', color: '#7A4308', border: '1px solid #F5A623', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px', fontSize: '0.78rem', fontWeight: 700 }}>
                  TEWEDAJ DEMO — Telebirr Sandbox Simulation. {language === 'am' ? `የማረጋገጫ ኮድ ወደ ${customerTargetPhone} ተልኳል።` : `A verification code was sent to ${customerTargetPhone}.`}
                </div>
              )}

              {/* 6-Digit OTP Input Grid */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '20px',
                border: '1px solid rgba(74, 46, 23, 0.12)',
                textAlign: 'center'
              }}>
                <label className="form-label" style={{ marginBottom: '12px', display: 'block', fontSize: '0.85rem' }}>
                  {language === 'am' ? 'የደንበኛውን ባለ 6 አሃዝ የSMS ማረጋገጫ OTP ያስገቡ' : 'Enter Customer 6-Digit SMS Verification OTP'}
                </label>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { otpInputRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      style={{
                        width: '44px',
                        height: '52px',
                        textAlign: 'center',
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        color: isOtpVerified ? '#4F7D3A' : '#38210F',
                        borderRadius: '10px',
                        border: isOtpVerified
                          ? '2px solid #4F7D3A'
                          : digit
                          ? '2px solid #D99A20'
                          : '1px solid rgba(74,46,23,0.2)',
                        backgroundColor: isOtpVerified ? '#E8F5E9' : '#FAF5E8',
                        outline: 'none'
                      }}
                    />
                  ))}
                </div>

                {otpError && (
                  <div style={{ color: '#C62828', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '6px' }}>
                    <AlertCircle size={13} /> {otpError}
                  </div>
                )}

                {isOtpVerified && (
                  <div style={{
                    backgroundColor: '#E8F5E9',
                    border: '1px solid #A5D6A7',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    marginTop: '12px',
                    color: '#2E7D32',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontWeight: 700
                  }}>
                    <Lock size={15} /> {language === 'am' ? 'የደንበኛ ፈቃድ ተረጋግጦ በዲጂታል ታትሟል' : 'Customer Authorization Verified & Digitally Sealed'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: Final Review & Seal */}
          {step === 5 && (
            <div>
              <h4 style={{ color: '#38210F', marginBottom: '6px', fontSize: '1.05rem' }}>
                {language === 'am' ? 'የብድር ውሉን ይገምግሙ እና ያጽድቁ' : 'Review & Seal Credit Agreement'}
              </h4>
              <p style={{ color: '#756B5D', fontSize: '0.82rem', marginBottom: '16px' }}>
                {language === 'am'
                  ? 'ውሉ ወደ ዲጂታል መዝገብ ከመመዝገቡ በፊት ሁሉንም የውል፣ የባንክ እና የፍቃድ ሁኔታዎች ያረጋግጡ።'
                  : 'Verify all contractual, banking, and authorization terms before recording to the digital ledger.'}
              </p>

              <div style={{
                backgroundColor: '#FAF5E8',
                borderRadius: '14px',
                padding: '20px',
                border: '1px solid rgba(74, 46, 23, 0.15)',
                marginBottom: '16px'
              }}>
                {/* Header Banner */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(74,46,23,0.1)',
                  paddingBottom: '10px',
                  marginBottom: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileCheck size={18} color="#D99A20" />
                    <span style={{ fontWeight: 800, color: '#38210F', fontSize: '0.9rem' }}>
                      {language === 'am' ? 'ተወዳጅ ህጋዊ የብድር ማስታወሻ' : 'TEWEDAJ LEGAL CREDIT NOTE'}
                    </span>
                  </div>
                  <span className="badge badge-active" style={{ fontSize: '0.72rem' }}>
                    <ShieldCheck size={12} /> {language === 'am' ? 'የደንበኛ OTP ተረጋግጧል' : 'Customer OTP Verified'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: '#756B5D', fontSize: '0.72rem', display: 'block' }}>{language === 'am' ? 'ተበዳሪ (ደንበኛ)' : 'Borrower (Customer)'}</span>
                    <strong style={{ color: '#38210F' }}>{customerTargetName}</strong>
                    <div style={{ fontSize: '0.75rem', color: '#756B5D' }}>{customerTargetPhone}</div>
                    <div style={{ fontSize: '0.72rem', color: '#756B5D' }}>{language === 'am' ? 'መታወቂያ: ' : 'ID: '}{customCustomerIdNumber}</div>
                  </div>

                  <div>
                    <span style={{ color: '#756B5D', fontSize: '0.72rem', display: 'block' }}>{language === 'am' ? 'አበዳሪ (ነጋዴ)' : 'Creditor (Merchant)'}</span>
                    <strong style={{ color: '#38210F' }}>{currentUser?.businessName || 'Almaz Grocery'}</strong>
                    <div style={{ fontSize: '0.75rem', color: '#756B5D' }}>{currentUser?.phone || '+251 911 234 567'}</div>
                    <div style={{ fontSize: '0.72rem', color: '#756B5D' }}>{currentUser?.location || 'Addis Ababa'}</div>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ color: '#756B5D', fontSize: '0.72rem', display: 'block' }}>{language === 'am' ? 'በብድር የተወሰዱ ዕቃዎች' : 'Goods Purchased on Credit'}</span>
                    <div style={{ color: '#38210F', fontWeight: 600, fontSize: '0.85rem' }}>{goodsDescription}</div>
                  </div>

                  <div style={{ gridColumn: 'span 2', backgroundColor: '#FFF6D6', padding: '12px', borderRadius: '10px', border: '1px solid #D99A20' }}>
                    <span style={{ color: '#756B5D', fontSize: '0.72rem', display: 'block' }}>{language === 'am' ? 'የቴሌብር ፈቃድ' : 'Telebirr Authorization'}</span>
                    <strong style={{ color: '#38210F' }}>Telebirr Sandbox</strong>
                    <div style={{ color: '#4F7D3A', fontWeight: 600, marginTop: '4px' }}>
                      {language === 'am' ? 'የቴሌብር መለያ: ' : 'Telebirr account: '} {telebirrPhone}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#756B5D', marginTop: '3px' }}>Maximum authorized repayment: {formatETB(totalAmount)}</div>
                  </div>

                  <div>
                    <span style={{ color: '#756B5D', fontSize: '0.72rem', display: 'block' }}>{language === 'am' ? 'አጠቃላይ ዋና ብድር' : 'Total Principal'}</span>
                    <div style={{ color: '#D99A20', fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Fraunces, serif' }}>
                      {formatETB(totalAmount)}
                    </div>
                  </div>

                  <div>
                    <span style={{ color: '#756B5D', fontSize: '0.72rem', display: 'block' }}>{language === 'am' ? 'የክፍያ ማብቂያ ቀን' : 'Settlement Due Date'}</span>
                    <div style={{ color: '#38210F', fontWeight: 700, fontSize: '0.95rem' }}>{dueDate}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(74, 46, 23, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFF8E7'
        }}>
          {step > 1 ? (
            <button onClick={() => setStep(prev => prev - 1)} className="btn btn-outline btn-sm">
              <ArrowLeft size={14} /> {language === 'am' ? 'ወደ ኋላ' : 'Back'}
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button onClick={handleNext} className="btn btn-gold btn-sm">
              {language === 'am' ? 'ቀጣይ ደረጃ' : 'Next Step'} <ArrowRight size={14} />
            </button>
          ) : (
            <button onClick={handleFinish} className="btn btn-gold">
              {language === 'am' ? 'ውሉን አጽድቅ እና መዝግብ' : 'Activate & Seal Agreement'}
              <CheckCircle2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
