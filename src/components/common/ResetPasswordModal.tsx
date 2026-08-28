'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Lock,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  RefreshCw,
  KeyRound,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, currentRole, resetPassword, addNotification } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [phone, setPhone] = useState(currentUser?.phone || '+251 911 234 567');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [simulatedSmsOtp, setSimulatedSmsOtp] = useState('849201');
  const [resendTimer, setResendTimer] = useState(45);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 9) {
      setErrorMessage('Please enter a valid Ethiopian mobile phone number.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    // Simulate OTP generation
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedSmsOtp(generated);

    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setResendTimer(45);
    }, 600);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      // Handle paste
      const pasted = val.slice(0, 6).split('');
      const newOtp = [...otp];
      pasted.forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      return;
    }

    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`modal-otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`modal-otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setErrorMessage('Please enter all 6 digits of the verification code.');
      return;
    }

    if (enteredOtp !== simulatedSmsOtp && enteredOtp !== '849201' && enteredOtp !== '123456') {
      setErrorMessage(`Invalid verification code. (Hint: Use simulated OTP ${simulatedSmsOtp})`);
      return;
    }

    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 500);
  };

  const handleQuickFillOtp = () => {
    setOtp(simulatedSmsOtp.split(''));
    setErrorMessage('');
  };

  const calculateStrength = (pass: string): { score: number; label: string; color: string } => {
    if (!pass) return { score: 0, label: 'None', color: '#D9D9D9' };
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;

    if (score <= 25) return { score, label: 'Weak', color: '#E53935' };
    if (score <= 50) return { score, label: 'Moderate', color: '#FB8C00' };
    if (score <= 75) return { score, label: 'Good', color: '#43A047' };
    return { score: 100, label: 'Strong & Secure', color: '#1E88E5' };
  };

  const strength = calculateStrength(newPassword);

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify and retry.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      resetPassword(phone, newPassword, currentRole);
      setIsLoading(false);
      setStep(4);
      try {
        confetti({ particleCount: 90, spread: 70 });
      } catch (err) {}
    }, 600);
  };

  const handleCloseAndReset = () => {
    setStep(1);
    setOtp(['', '', '', '', '', '']);
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(56, 33, 15, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCloseAndReset();
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '32px',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          border: '2px solid #F3CF72',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseAndReset}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#756B5D',
            cursor: 'pointer',
            padding: '4px'
          }}
          title="Close Modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#FFF6D6',
              color: '#D99A20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}
          >
            <KeyRound size={24} />
          </div>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.45rem', fontWeight: 800, color: '#38210F', margin: 0 }}>
            {step === 4 ? 'Password Updated!' : 'Account Security & Password Reset'}
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#756B5D', marginTop: '4px', marginBottom: 0 }}>
            {step === 1 && 'Verify your Ethiopian mobile phone number to receive a secure SMS OTP.'}
            {step === 2 && `Enter the 6-digit verification code sent via SMS to ${phone}.`}
            {step === 3 && 'Create a new strong password for your TEWEDAJ account.'}
            {step === 4 && 'Your credentials have been updated and secured successfully.'}
          </p>
        </div>

        {/* Progress Step Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: step > s || step === 4 ? '#4F7D3A' : step === s ? '#D99A20' : '#EFEBE9',
                  color: step >= s || step === 4 ? '#FFFFFF' : '#756B5D',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {step > s || step === 4 ? '✓' : s}
              </div>
              {s < 3 && (
                <div
                  style={{
                    width: '32px',
                    height: '2px',
                    backgroundColor: step > s || step === 4 ? '#4F7D3A' : '#EFEBE9'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {errorMessage && (
          <div
            style={{
              backgroundColor: '#FFEBEE',
              color: '#C62828',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(198, 40, 40, 0.2)'
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: PHONE NUMBER */}
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label className="form-label">Ethiopian Mobile Phone Number</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  required
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+251 911 234 567"
                />
                <Smartphone
                  size={18}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#756B5D'
                  }}
                />
              </div>
              <span style={{ fontSize: '0.72rem', color: '#756B5D', marginTop: '4px', display: 'block' }}>
                Supports Ethio Telecom & Safaricom Ethiopia networks.
              </span>
            </div>

            <div
              style={{
                backgroundColor: '#FAF5E8',
                borderRadius: '12px',
                padding: '12px',
                border: '1px solid rgba(74,46,23,0.08)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <ShieldCheck size={20} color="#4F7D3A" />
              <div style={{ fontSize: '0.75rem', color: '#4A2E17' }}>
                <strong>Two-Factor SMS Verification:</strong> An instant 6-digit OTP will be dispatched to authenticate your ownership.
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-gold"
              style={{ width: '100%', padding: '12px' }}
            >
              {isLoading ? 'Sending SMS OTP...' : 'Send 6-Digit Verification Code'}
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* STEP 2: ENTER OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            {/* Simulated SMS Toast Preview */}
            <div
              style={{
                backgroundColor: '#FFF6D6',
                border: '1px dashed #D99A20',
                borderRadius: '10px',
                padding: '10px 12px',
                marginBottom: '18px',
                fontSize: '0.78rem',
                color: '#38210F',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontWeight: 700, display: 'block' }}>📩 Simulated SMS Incoming:</span>
                <span>TEWEDAJ OTP code is <strong>{simulatedSmsOtp}</strong></span>
              </div>
              <button
                type="button"
                onClick={handleQuickFillOtp}
                className="btn btn-gold btn-sm"
                style={{ fontSize: '0.7rem', padding: '4px 8px' }}
              >
                Auto-fill
              </button>
            </div>

            <label className="form-label" style={{ textAlign: 'center', display: 'block', marginBottom: '10px' }}>
              Enter 6-Digit OTP
            </label>

            {/* 6 Digit Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', marginBottom: '18px' }}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`modal-otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  style={{
                    height: '48px',
                    textAlign: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    borderRadius: '10px',
                    border: '2px solid rgba(74, 46, 23, 0.15)',
                    backgroundColor: '#FAF5E8',
                    color: '#38210F'
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', marginBottom: '20px', color: '#756B5D' }}>
              <span>Didn't receive SMS?</span>
              <button
                type="button"
                onClick={() => {
                  const newCode = Math.floor(100000 + Math.random() * 900000).toString();
                  setSimulatedSmsOtp(newCode);
                  setResendTimer(45);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D99A20',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RefreshCw size={13} /> Resend OTP
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-outline"
                style={{ flex: 1, padding: '10px' }}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-gold"
                style={{ flex: 2, padding: '10px' }}
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: SET NEW PASSWORD */}
        {step === 3 && (
          <form onSubmit={handleSaveNewPassword}>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="form-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter at least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#756B5D',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {newPassword && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#756B5D', marginBottom: '3px' }}>
                    <span>Security Strength:</span>
                    <strong style={{ color: strength.color }}>{strength.label}</strong>
                  </div>
                  <div style={{ height: '5px', backgroundColor: '#EFEBE9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${strength.score}%`,
                        backgroundColor: strength.color,
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Confirm New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#756B5D',
                    cursor: 'pointer'
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirmPassword && newPassword === confirmPassword && (
                <span style={{ fontSize: '0.72rem', color: '#4F7D3A', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: 600 }}>
                  <CheckCircle2 size={13} /> Passwords match!
                </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-outline"
                style={{ flex: 1, padding: '10px' }}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-gold"
                style={{ flex: 2, padding: '10px' }}
              >
                {isLoading ? 'Updating...' : 'Save New Password'}
                <Lock size={16} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#E8F5E9',
                color: '#2E7D32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h4 style={{ fontSize: '1.2rem', color: '#38210F', fontWeight: 800, marginBottom: '8px' }}>
              Password Reset Complete!
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#756B5D', marginBottom: '20px' }}>
              Your password for <strong>{phone}</strong> has been updated. You can now use your new password to sign into TEWEDAJ across all devices.
            </p>

            <div
              style={{
                backgroundColor: '#FAF5E8',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '0.78rem',
                color: '#4A2E17',
                marginBottom: '20px',
                textAlign: 'left'
              }}
            >
              <div>🔒 <strong>Security Record:</strong> OTP verified via Ethio Telecom network.</div>
              <div style={{ marginTop: '4px', color: '#756B5D' }}>Timestamp: {new Date().toLocaleString()}</div>
            </div>

            <button
              onClick={handleCloseAndReset}
              className="btn btn-gold"
              style={{ width: '100%', padding: '12px' }}
            >
              Continue to Dashboard
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
