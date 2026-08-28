'use client'

import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { useRouter } from 'next/navigation';
import {
  Store,
  Boxes,
  Truck,
  Users,
  ArrowRight,
  CheckCircle2,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  KeyRound,
  ArrowLeft
} from 'lucide-react';
import { INITIAL_USERS } from '../../data/mockData';
import confetti from 'canvas-confetti';

interface AuthPageProps {
  initialMode?: 'login' | 'signup' | 'reset_password';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { login, signup, resetPassword, setCurrentPath, language } = useApp();
  const router = useRouter();
  const isAm = language === 'am';

  useEffect(() => {
    ['/merchant/dashboard', '/wholesaler/dashboard', '/delivery/dashboard', '/customer/dashboard']
      .forEach(path => router.prefetch(path));
  }, [router]);

  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset_password'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>('merchant');

  // Form State
  const [phone, setPhone] = useState('+251 911 234 567');
  const [email, setEmail] = useState('almaz.wolde@tewedaj.et');
  const [nationalIdNumber, setNationalIdNumber] = useState('');
  const [tin, setTin] = useState('');
  const [businessLicenseNumber, setBusinessLicenseNumber] = useState('');
  const [driverLicenseNumber, setDriverLicenseNumber] = useState('');
  const [vehiclePlateNumber, setVehiclePlateNumber] = useState('');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState(isAm ? 'አልማዝ ወልዴ' : 'Almaz Wolde');
  const [businessName, setBusinessName] = useState(isAm ? 'የአልማዝ ቤተሰብ የሰፈር ሱቅ' : 'Almaz Family Grocery & Kiosk');
  const [location, setLocation] = useState(isAm ? 'ቦሌ ክፍለ ከተማ፣ አዲስ አበባ' : 'Bole Sub-City, Addis Ababa');
  const [vehicleType, setVehicleType] = useState('TVS King Bajaj Cargo');

  // Reset Password Flow State
  const [resetStep, setResetStep] = useState<1 | 2 | 3 | 4>(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [simulatedSmsOtp, setSimulatedSmsOtp] = useState('849201');
  const [resetMethod, setResetMethod] = useState<'phone' | 'email'>('phone');
  const [resetError, setResetError] = useState('');
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  const handleRoleTabChange = (role: UserRole) => {
    setSelectedRole(role);
    setSignupError('');
    const demoUser = INITIAL_USERS.find(u => u.role === role);
    if (demoUser) {
      setPhone(demoUser.phone);
      setEmail(demoUser.email);
      setName(demoUser.name);
      setBusinessName(demoUser.businessName || '');
      setLocation(demoUser.location || (isAm ? 'አዲስ አበባ' : 'Addis Ababa'));
      if (demoUser.vehicleType) setVehicleType(demoUser.vehicleType);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(selectedRole, phone);
      // Navigate to appropriate dashboard
      if (selectedRole === 'merchant') router.replace('/merchant/dashboard');
      else if (selectedRole === 'wholesaler') router.replace('/wholesaler/dashboard');
      else if (selectedRole === 'delivery_partner') router.replace('/delivery/dashboard');
      else if (selectedRole === 'customer') router.replace('/customer/dashboard');
    } else if (authMode === 'signup') {
      const isBusinessRole = selectedRole === 'merchant' || selectedRole === 'wholesaler';
      const isDeliveryRole = selectedRole === 'delivery_partner';
      const phoneIsValid = /^\+2519\d{8}$/.test(phone.replace(/[\s-]/g, ''));
      if (!nationalIdNumber.trim()) return setSignupError('National ID Number is required.');
      if ((selectedRole !== 'customer' || phone.trim()) && !phoneIsValid) return setSignupError('Enter a valid Ethiopian phone number.');
      if (selectedRole === 'customer' && !phone.trim() && !email.trim()) return setSignupError('Enter a phone number or email address.');
      if (email && !/^\S+@\S+\.\S+$/.test(email)) return setSignupError('Enter a valid email address.');
      if (password.length < 6) return setSignupError('Password must contain at least 6 characters.');
      if (password !== confirmPassword) return setSignupError('Passwords do not match.');
      if (isBusinessRole && (!businessName.trim() || !tin.trim() || !businessLicenseNumber.trim() || !location.trim())) return setSignupError('Complete all required business and legal fields.');
      if (isDeliveryRole && (!driverLicenseNumber.trim() || !vehicleType.trim() || !vehiclePlateNumber.trim() || !location.trim())) return setSignupError('Complete all required driver and vehicle fields.');
      setSignupError('');
      signup(selectedRole, {
        name,
        email,
        phone,
        role: selectedRole,
        nationalIdNumber,
        businessName: selectedRole === 'merchant' || selectedRole === 'wholesaler' ? businessName : undefined,
        location,
        vehicleType: selectedRole === 'delivery_partner' ? vehicleType : undefined,
        tin: isBusinessRole ? tin : undefined,
        businessLicenseNumber: isBusinessRole ? businessLicenseNumber : undefined,
        driverLicenseNumber: isDeliveryRole ? driverLicenseNumber : undefined,
        vehiclePlateNumber: isDeliveryRole ? vehiclePlateNumber : undefined,
      });
      try {
        confetti({ particleCount: 80, spread: 70 });
      } catch (e) {}
      // Navigate to the dashboard immediately after signup.
      if (selectedRole === 'merchant') router.replace('/merchant/dashboard');
      else if (selectedRole === 'wholesaler') router.replace('/wholesaler/dashboard');
      else if (selectedRole === 'delivery_partner') router.replace('/delivery/dashboard');
      else if (selectedRole === 'customer') router.replace('/customer/dashboard');
    }
  };

  // Reset Password Handlers
  const handleSendResetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const recoveryIdentifier = resetMethod === 'phone' ? phone : email;
    const isValidIdentifier = resetMethod === 'phone'
      ? /^\+2519\d{8}$/.test(phone.replace(/[\s-]/g, ''))
      : /^\S+@\S+\.\S+$/.test(email);
    if (!recoveryIdentifier.trim() || !isValidIdentifier) {
      setResetError(resetMethod === 'phone'
        ? (isAm ? 'እባክዎ ትክክለኛ የኢትዮጵያ ስልክ ቁጥር ያስገቡ።' : 'Please enter a valid Ethiopian mobile number.')
        : (isAm ? 'እባክዎ ትክክለኛ ኢሜይል ያስገቡ።' : 'Please enter a valid email address.'));
      return;
    }
    setResetError('');
    setIsResetLoading(true);

    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedSmsOtp(generated);

    setIsResetLoading(false);
    setResetStep(2);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
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

    if (val && index < 5) {
      const nextInput = document.getElementById(`auth-otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`auth-otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyResetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered.length < 6) {
      setResetError(isAm ? 'እባክዎ ባለ 6-አሃዝ ኮዱን ሙሉ በሙሉ ያስገቡ።' : 'Please enter the full 6-digit code.');
      return;
    }
    if (entered !== simulatedSmsOtp && entered !== '849201' && entered !== '123456') {
      setResetError(isAm ? `የተሳሳተ ኮድ ነው። እባክዎ ይህን የሙከራ OTP ይጠቀሙ: ${simulatedSmsOtp}` : `Incorrect code. Please use the simulated OTP: ${simulatedSmsOtp}`);
      return;
    }

    setResetError('');
    setIsResetLoading(true);
    setIsResetLoading(false);
    setResetStep(3);
  };

  const calculateStrength = (pass: string): { score: number; label: string; color: string } => {
    if (!pass) return { score: 0, label: isAm ? 'የለም' : 'None', color: '#D9D9D9' };
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;

    if (score <= 25) return { score, label: isAm ? 'ደካማ' : 'Weak', color: '#E53935' };
    if (score <= 50) return { score, label: isAm ? 'መካከለኛ' : 'Moderate', color: '#FB8C00' };
    if (score <= 75) return { score, label: isAm ? 'ጥሩ' : 'Good', color: '#43A047' };
    return { score: 100, label: isAm ? 'በጣም ጠንካራ' : 'Strong', color: '#1E88E5' };
  };

  const strength = calculateStrength(newPassword);

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setResetError(isAm ? 'የይለፍ ቃል ቢያንስ 6 ፊደላት ወይም ቁጥሮች መያዝ አለበት።' : 'Password must contain at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError(isAm ? 'የይለፍ ቃሎቹ አይመሳሰሉም።' : 'Passwords do not match.');
      return;
    }

    setResetError('');
    setIsResetLoading(true);

    resetPassword(resetMethod === 'phone' ? phone : email, newPassword, selectedRole);
    setIsResetLoading(false);
    setResetStep(4);
    try {
      confetti({ particleCount: 100, spread: 80 });
    } catch (err) {}
  };

  const handleFinishResetAndLogin = () => {
    login(selectedRole, phone);
  };

  const getRoleLabel = (r: UserRole) => {
    switch (r) {
      case 'merchant': return isAm ? 'የሱቅ ነጋዴ' : 'Merchant';
      case 'wholesaler': return isAm ? 'ጅምላ አቅራቢ' : 'Wholesale';
      case 'delivery_partner': return isAm ? 'የባጃጅ አጓጓዥ' : 'Courier';
      case 'customer': return isAm ? 'ደንበኛ / ገዢ' : 'Customer';
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--cream-primary)',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        backgroundColor: 'var(--surface-elevated)',
        borderRadius: '28px',
        padding: '36px',
        maxWidth: '520px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
        border: '1px solid var(--border-subtle)'
      }}>
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '16px',
            padding: '4px 0'
          }}
        >
          <ArrowLeft size={18} />
          {isAm ? 'ወደ መነሻ' : 'Back to Home'}
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.8rem', fontWeight: 800, color: 'var(--brown-dark)', marginBottom: '4px' }}>
            {isAm ? 'ተወዳጅ (TEWEDAJ)' : 'TEWEDAJ'}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            {authMode === 'login' && (isAm ? 'ወደ ንግድ መዝገብዎ ለመግባት ይግቡ' : 'Sign in to access your business ledger')}
            {authMode === 'signup' && (isAm ? 'አዲስ የተረጋገጠ የተወዳጅ መለያ ይክፈቱ' : 'Create your verified TEWEDAJ account')}
            {authMode === 'reset_password' && (isAm ? 'የመለያዎን የይለፍ ቃል በኤስኤምኤስ ይቀይሩ' : 'Reset and secure your account password')}
          </p>
        </div>

        {/* Role Selector Buttons */}
        <div style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ textAlign: 'center', display: 'block', marginBottom: '8px' }}>
            {isAm ? 'የስራ ሚናዎን ይምረጡ' : 'Choose Your Role'}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            {[
              { role: 'merchant' as UserRole, label: isAm ? 'ሱቅ' : 'Merchant', icon: <Store size={16} /> },
              { role: 'wholesaler' as UserRole, label: isAm ? 'ጅምላ' : 'Wholesale', icon: <Boxes size={16} /> },
              { role: 'delivery_partner' as UserRole, label: isAm ? 'አጓጓዥ' : 'Courier', icon: <Truck size={16} /> },
              { role: 'customer' as UserRole, label: isAm ? 'ደንበኛ' : 'Customer', icon: <Users size={16} /> },
            ].map((item) => (
              <button
                key={item.role}
                type="button"
                onClick={() => handleRoleTabChange(item.role)}
                style={{
                  padding: '10px 4px',
                  borderRadius: '10px',
                  border: selectedRole === item.role ? '2px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: selectedRole === item.role ? 'var(--gold-light)' : 'var(--surface-elevated)',
                  color: selectedRole === item.role ? 'var(--brown-dark)' : 'var(--text-muted)',
                  fontWeight: selectedRole === item.role ? 700 : 500,
                  fontSize: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ===================== RESET PASSWORD VIEW ===================== */}
        {authMode === 'reset_password' ? (
          <div>
            {/* Step indicators */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
              {[1, 2, 3].map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: resetStep > s || resetStep === 4 ? '#4F7D3A' : resetStep === s ? 'var(--gold-primary)' : 'var(--border-subtle)',
                      color: resetStep >= s || resetStep === 4 ? '#FFFFFF' : 'var(--text-muted)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {resetStep > s || resetStep === 4 ? '✓' : s}
                  </div>
                  {s < 3 && (
                    <div
                      style={{
                        width: '32px',
                        height: '2px',
                        backgroundColor: resetStep > s || resetStep === 4 ? '#4F7D3A' : 'var(--border-subtle)'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {resetError && (
              <div
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#D32F2F',
                  fontSize: '0.8rem',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                <AlertCircle size={16} />
                <span>{resetError}</span>
              </div>
            )}

            {/* RESET STEP 1: Phone Entry */}
            {resetStep === 1 && (
              <form onSubmit={handleSendResetOtp}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                  {(['phone', 'email'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => {
                        setResetMethod(method);
                        setResetError('');
                      }}
                      className="btn btn-sm"
                      style={{
                        border: resetMethod === method ? '2px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                        backgroundColor: resetMethod === method ? 'var(--gold-light)' : 'var(--surface-elevated)',
                        color: 'var(--brown-dark)'
                      }}
                    >
                      {method === 'phone' ? <Smartphone size={15} /> : <span aria-hidden="true">@</span>}
                      {method === 'phone' ? 'Phone' : 'Email'}
                    </button>
                  ))}
                </div>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">{resetMethod === 'phone' ? (isAm ? 'የተመዘገበ የስልክ ቁጥር' : 'Registered Ethiopian Phone Number') : 'Registered Email Address'}</label>
                  {resetMethod === 'phone' ? (
                    <input type="tel" required className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+251 911 234 567" />
                  ) : (
                    <input type="email" required className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                  )}
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                    {resetMethod === 'phone' ? (isAm ? 'ባለ 6-አሃዝ የማረጋገጫ ኮድ በኤስኤምኤስ ይላክልዎታል።' : 'A 6-digit SMS verification code will be sent to this number.') : 'A 6-digit recovery code will be sent to this email address.'}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isResetLoading}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
                >
                  {isResetLoading ? (isAm ? 'በመላክ ላይ...' : 'Sending recovery code...') : resetMethod === 'phone' ? (isAm ? 'የማረጋገጫ SMS ላክ' : 'Send SMS Verification Code') : 'Send Email Recovery Code'}
                  <Smartphone size={16} />
                </button>
              </form>
            )}

            {/* RESET STEP 2: OTP Verification */}
            {resetStep === 2 && (
              <form onSubmit={handleVerifyResetOtp}>
                <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {resetMethod === 'phone'
                      ? (isAm ? 'ወደዚህ ስልክ የተላከውን ኮድ ያስገቡ:' : 'Code sent via SMS to:')
                      : 'Code sent via email to:'} <strong>{resetMethod === 'phone' ? phone : email}</strong>
                  </span>
                  
                  {/* Simulation Helper Tag */}
                  <div style={{
                    marginTop: '8px',
                    padding: '6px 10px',
                    backgroundColor: 'var(--surface-elevated)',
                    borderRadius: '8px',
                    border: '1px dashed var(--gold-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    color: 'var(--gold-primary)'
                  }}>
                    <Sparkles size={14} />
                    <span>{isAm ? 'የሙከራ OTP ኮድ:' : 'Simulated SMS Code:'} <strong>{simulatedSmsOtp}</strong></span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`auth-otp-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      style={{
                        width: '42px',
                        height: '48px',
                        borderRadius: '10px',
                        border: digit ? '2px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--surface-elevated)',
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: 'var(--brown-dark)',
                        outline: 'none'
                      }}
                    />
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setResetStep(1)}
                    className="btn btn-outline"
                    style={{ flex: 1, padding: '10px' }}
                  >
                    {isAm ? 'ተመለስ' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    disabled={isResetLoading}
                    className="btn btn-gold"
                    style={{ flex: 2, padding: '10px' }}
                  >
                    {isResetLoading ? (isAm ? 'በማረጋገጥ ላይ...' : 'Verifying...') : (isAm ? 'ኮዱን አረጋግጥ' : 'Verify Code')}
                  </button>
                </div>
              </form>
            )}

            {/* RESET STEP 3: Enter New Password */}
            {resetStep === 3 && (
              <form onSubmit={handleSaveNewPassword}>
                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label className="form-label">{isAm ? 'አዲስ የይለፍ ቃል' : 'New Password'}</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="form-input"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder={isAm ? 'አዲስ ጠንካራ የይለፍ ቃል' : 'Enter new strong password'}
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
                        color: 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  {newPassword && (
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
                        <span>{isAm ? 'የይለፍ ቃል ጥንካሬ:' : 'Password Strength:'}</span>
                        <strong style={{ color: strength.color }}>{strength.label}</strong>
                      </div>
                      <div style={{ height: '5px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
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
                  <label className="form-label">{isAm ? 'የይለፍ ቃሉን ደግመው ያረጋግጡ' : 'Confirm New Password'}</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      className="form-input"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={isAm ? 'የይለፍ ቃሉን በድጋሚ ያስገቡ' : 'Re-enter new password'}
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
                        color: 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {confirmPassword && newPassword === confirmPassword && (
                    <span style={{ fontSize: '0.72rem', color: '#4F7D3A', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: 600 }}>
                      <CheckCircle2 size={13} /> {isAm ? 'የይለፍ ቃሎቹ ተመሳስለዋል!' : 'Passwords match!'}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setResetStep(2)}
                    className="btn btn-outline"
                    style={{ flex: 1, padding: '10px' }}
                  >
                    {isAm ? 'ተመለስ' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    disabled={isResetLoading}
                    className="btn btn-gold"
                    style={{ flex: 2, padding: '10px' }}
                  >
                    {isResetLoading ? (isAm ? 'በማስተካከል ላይ...' : 'Updating...') : (isAm ? 'አዲስ የይለፍ ቃል መዝግብ' : 'Save New Password')}
                    <Lock size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* RESET STEP 4: Success */}
            {resetStep === 4 && (
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

                <h4 style={{ fontSize: '1.25rem', color: 'var(--brown-dark)', fontWeight: 800, marginBottom: '6px' }}>
                  {isAm ? 'የይለፍ ቃል በትክክል ተቀይሯል!' : 'Password Reset Succeeded!'}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  {isAm 
                    ? 'አዲሱ የይለፍ ቃልዎ በትክክል ተመዝግቧል። አሁኑኑ በቀጥታ ወደ መለያዎ መግባት ይችላሉ።' 
                    : 'Your password has been securely updated. You can now enter your account ledger immediately.'}
                </p>

                <button
                  type="button"
                  onClick={handleFinishResetAndLogin}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
                >
                  {isAm ? `ወደ ${getRoleLabel(selectedRole)} ፖርታል ግባ` : `Sign In to ${selectedRole.toUpperCase()} Dashboard`}
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* Return to Sign In link */}
            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem' }}>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setResetStep(1);
                }}
                style={{
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                ← {isAm ? 'ወደ መግቢያ ገጽ ተመለስ' : 'Back to Sign In'}
              </button>
            </div>
          </div>
        ) : (
          /* ===================== LOGIN / SIGNUP VIEW ===================== */
          <>
            {authMode === 'signup' && signupError && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#D32F2F', fontSize: '0.8rem', border: '1px solid rgba(239, 68, 68, 0.3)' }} role="alert">
                <AlertCircle size={16} />
                <span>{signupError}</span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {authMode === 'signup' && (
                <>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label">National ID Number (FIN Number)</label>
                    <input type="text" required className="form-input" value={nationalIdNumber} onChange={(e) => setNationalIdNumber(e.target.value)} placeholder="Enter National ID Number (FIN Number)" />
                  </div>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label">{isAm ? 'ሙሉ ስም' : 'Full Name'}</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isAm ? 'ለምሳሌ: አልማዝ ወልዴ' : 'e.g. Almaz Wolde'}
                    />
                  </div>

                  {(selectedRole === 'merchant' || selectedRole === 'wholesaler') && (
                    <>
                      <div className="form-group" style={{ marginBottom: '12px' }}>
                        <label className="form-label">{isAm ? 'የንግድ / የሱቅ ስም' : 'Business Name'}</label>
                        <input type="text" required className="form-input" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. Almaz Family Grocery" />
                      </div>
                      <div className="form-group" style={{ marginBottom: '12px' }}>
                        <label className="form-label">TIN</label>
                        <input type="text" required className="form-input" value={tin} onChange={(e) => setTin(e.target.value)} placeholder="Enter TIN" />
                      </div>
                      <div className="form-group" style={{ marginBottom: '12px' }}>
                        <label className="form-label">Business License Number</label>
                        <input type="text" required className="form-input" value={businessLicenseNumber} onChange={(e) => setBusinessLicenseNumber(e.target.value)} placeholder="Enter business license number" />
                      </div>
                    </>
                  )}

                  {selectedRole === 'delivery_partner' && (
                    <>
                      <div className="form-group" style={{ marginBottom: '12px' }}>
                        <label className="form-label">Driver's License Number</label>
                        <input type="text" required className="form-input" value={driverLicenseNumber} onChange={(e) => setDriverLicenseNumber(e.target.value)} placeholder="Enter driver's license number" />
                      </div>
                      <div className="form-group" style={{ marginBottom: '12px' }}>
                        <label className="form-label">Vehicle Type</label>
                        <input type="text" required className="form-input" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} placeholder="e.g. Bajaj Cargo" />
                      </div>
                      <div className="form-group" style={{ marginBottom: '12px' }}>
                        <label className="form-label">Vehicle Plate Number</label>
                        <input type="text" required className="form-input" value={vehiclePlateNumber} onChange={(e) => setVehiclePlateNumber(e.target.value)} placeholder="e.g. 3-AA-9988" />
                      </div>
                    </>
                  )}

                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label">{isAm ? 'አካባቢ / ክፍለ ከተማ' : 'Location / Sub-City'}</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={isAm ? 'ለምሳሌ: ቦሌ ክፍለ ከተማ፣ አዲስ አበባ' : 'e.g. Bole Sub-City, Addis Ababa'}
                    />
                  </div>
                </>
              )}

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">{isAm ? 'የኢትዮጵያ ስልክ ቁጥር' : 'Ethiopian Mobile Phone Number'} {authMode === 'signup' && selectedRole === 'customer' ? '(optional if email is provided)' : ''}</label>
                <input
                  type="tel"
                  required={authMode !== 'signup' || selectedRole !== 'customer'}
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+251 911 234 567"
                />
              </div>

              {authMode === 'signup' && (
                <>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label">Email Address (optional)</label>
                    <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                  </div>
                  <div style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '10px 12px', color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '14px' }}>
                    Your submitted identity and business information will be used for automatic verification.
                  </div>
                </>
              )}

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label" style={{ margin: 0 }}>{isAm ? 'የይለፍ ቃል' : 'Password'}</label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('reset_password');
                        setResetStep(1);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--gold-primary)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      {isAm ? 'የይለፍ ቃል ረሱ?' : 'Forgot password?'}
                    </button>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ paddingRight: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? (isAm ? 'ይለፍ ቃሉን ደብቅ' : 'Hide password') : (isAm ? 'ይለፍ ቃሉን አሳይ' : 'Show password')}
                    aria-label={showPassword ? (isAm ? 'ይለፍ ቃሉን ደብቅ' : 'Hide password') : (isAm ? 'ይለፍ ቃሉን አሳይ' : 'Show password')}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {authMode === 'signup' && (
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Confirm Password</label>
                  <input type={showConfirmPassword ? 'text' : 'password'} required className="form-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password" />
                </div>
              )}

              <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '12px', fontSize: '1rem', marginTop: '12px' }}>
                {authMode === 'login' 
                  ? (isAm ? `እንደ ${getRoleLabel(selectedRole)} ግባ` : `Sign In as ${selectedRole.replace('_', ' ').toUpperCase()}`) 
                  : (isAm ? `የ${getRoleLabel(selectedRole)} መለያ ፍጠር` : `Create ${selectedRole.toUpperCase()} Account`)}
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Switch Login/Signup */}
            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {authMode === 'login' ? (
                <>
                  {isAm ? 'መለያ የለዎትም?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    style={{ color: 'var(--gold-primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    {isAm ? 'ተመዝገቡ' : 'Sign Up'}
                  </button>
                </>
              ) : (
                <>
                  {isAm ? 'መለያ አለዎት?' : 'Already have an account?'}{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    style={{ color: 'var(--gold-primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    {isAm ? 'ግባ' : 'Sign In'}
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {/* Quick Demo Switcher Note */}
        <div style={{
          marginTop: '24px',
          padding: '12px',
          backgroundColor: 'var(--surface-elevated)',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          textAlign: 'center'
        }}>
          💡 <strong>{isAm ? 'የሙከራ መመሪያ:' : 'Demo Quick Tip:'}</strong>{' '}
          {isAm 
            ? 'ከላይ ያሉትን የሱቅ፣ የጅምላ፣ የአጓጓዥ ወይም የደንበኛ ቁልፎች በመጫን የናሙና መለያዎችን በቀላሉ ይሞክሩ።'
            : 'Click any role button above to auto-load sample Ethiopian merchant, wholesaler, courier, or customer credentials.'}
        </div>
      </div>
    </div>
  );
};
