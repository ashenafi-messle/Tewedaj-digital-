'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import { Truck, DollarSign, MapPin, CheckCircle2, ShieldCheck, ArrowRight, Navigation, Clock, Package } from 'lucide-react';
import { DeliveryMap } from '../common/DeliveryMap';
import { formatETB } from '../../utils/formatters';
import confetti from 'canvas-confetti';

export const DeliveryDashboard: React.FC = () => {
  const { currentUser, deliveryJobs, acceptDeliveryJob, updateDeliveryStatus, setCurrentPath, t, language, deliveryAvailability, setDeliveryAvailability } = useApp();
  const router = useRouter();
  const [inputOtp, setInputOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerMessage, setScannerMessage] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isAm = language === 'am';

  const activeJob = deliveryJobs.find(j => ['Accepted', 'Going to Pickup', 'Arrived at Pickup', 'Picked Up', 'In Transit', 'Arrived at Dropoff', 'Delivered'].includes(j.status));
  const availableJobs = deliveryAvailability === 'ONLINE' ? deliveryJobs.filter(j => j.status === 'Available') : [];
  const completedJobs = deliveryJobs.filter(j => j.status === 'Completed');

  const nextStatus: Record<string, string> = {
    Accepted: 'Going to Pickup',
    'Going to Pickup': 'Arrived at Pickup',
    'Arrived at Pickup': 'Picked Up',
    'Picked Up': 'In Transit',
    'In Transit': 'Arrived at Dropoff',
    'Arrived at Dropoff': 'Delivered',
    Delivered: 'Completed'
  };

  const todayEarnings = completedJobs.reduce((sum, j) => sum + (Number(j.payoutAmount) || 0), 0);

  useEffect(() => {
    let scanTimer: ReturnType<typeof setInterval> | undefined;

    const startScanner = async () => {
      const BarcodeDetectorApi = (window as any).BarcodeDetector;
      if (!BarcodeDetectorApi) {
        setScannerMessage('QR scanning is not supported in this browser. Enter the OTP manually.');
        return;
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        setScannerMessage('This device cannot access a camera. Enter the OTP manually.');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        const detector = new BarcodeDetectorApi({ formats: ['qr_code'] });
        scanTimer = setInterval(async () => {
          if (!videoRef.current || videoRef.current.readyState < 2) return;
          const codes = await detector.detect(videoRef.current);
          if (codes.length > 0 && codes[0].rawValue) {
            setInputOtp(codes[0].rawValue);
            setScannerMessage('QR code captured. Verify the OTP to continue.');
            setIsScannerOpen(false);
          }
        }, 500);
      } catch {
        setScannerMessage('Camera access was unavailable. Enter the OTP manually.');
      }
    };

    if (isScannerOpen) startScanner();
    return () => {
      if (scanTimer) clearInterval(scanTimer);
      streamRef.current?.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    };
  }, [isScannerOpen]);

  const handleVerifyOtp = (jobId: string, expectedOtp: string) => {
    if (inputOtp.trim() !== expectedOtp.trim()) {
      setOtpError('Invalid OTP code. Please ask the merchant for the 4-digit code shown on their screen.');
      return;
    }

    setOtpError('');
    const result = updateDeliveryStatus(jobId, nextStatus[activeJob?.status || ''], inputOtp || undefined);
    if (!result.success) {
      setOtpError(result.message);
      return;
    }
    setInputOtp('');
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch (e) {}
  };

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
              {t('deliveryDashboard.title')}: {currentUser?.name}
            </h1>
            <span className={`badge ${deliveryAvailability === 'BUSY' ? 'badge-transit' : 'badge-active'}`} style={{ fontSize: '0.72rem' }}>{deliveryAvailability}</span>
          </div>
          <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
            {t('deliveryDashboard.vehicle')}: {currentUser?.vehicleType || 'TVS King Bajaj Cargo'} • {t('deliveryDashboard.zone')}: {currentUser?.location}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => setDeliveryAvailability(deliveryAvailability === 'ONLINE' ? 'OFFLINE' : 'ONLINE')}
                      className="btn btn-outline btn-sm"
                    >
                      {deliveryAvailability === 'ONLINE' ? 'Go Offline' : 'Go Online'}
                    </button>
          <button
            onClick={() => router.push('/delivery/jobs')}
            className="btn btn-green btn-sm"
          >
            <Package size={15} /> {t('deliveryDashboard.availableJobs')} ({availableJobs.length})
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="card">
          <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>{t('deliveryDashboard.todayEarnings')}</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4F7D3A', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {formatETB(todayEarnings)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4F7D3A', marginTop: '6px' }}>
            {t('deliveryDashboard.instantPayout')}
          </div>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>{t('deliveryDashboard.completedTrips')}</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38210F', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {completedJobs.length} {t('deliveryDashboard.deliveries')}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#756B5D', marginTop: '6px' }}>
            {t('deliveryDashboard.zeroDispute')}
          </div>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>{t('deliveryDashboard.reputationScore')}</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D99A20', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            4.95 ★
          </div>
          <div style={{ fontSize: '0.75rem', color: '#4F7D3A', marginTop: '6px' }}>
            {t('deliveryDashboard.topRider')}
          </div>
        </div>
      </div>

      {/* Active Trip Inspector with OTP */}
      {activeJob ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ color: '#38210F', fontSize: '1.2rem', margin: 0 }}>
                {t('deliveryDashboard.activeDelivery')} (Job #{activeJob.id.slice(-4)})
              </h3>
              <span className="badge badge-transit">{t('deliveryDashboard.liveEnRoute')}</span>
            </div>

            <DeliveryMap
              pickupLocation={activeJob.pickupLocation}
              dropoffLocation={activeJob.dropoffLocation}
              distanceKm={activeJob.distanceKm}
              riderName={currentUser?.name}
              status={activeJob.status}
            />
          </div>

          {/* OTP Handover Box */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ color: '#38210F', marginBottom: '14px' }}>{t('deliveryDashboard.handoverVerification')}</h4>
              
              <div style={{ backgroundColor: '#FAF5E8', padding: '14px', borderRadius: '12px', marginBottom: '16px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#756B5D' }}>{t('deliveryDashboard.pickupWarehouse')}:</span>
                  <strong>{activeJob.pickupLocation}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#756B5D' }}>{t('deliveryDashboard.dropoffShop')}:</span>
                  <strong>{activeJob.dropoffLocation}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#756B5D' }}>{t('deliveryDashboard.merchantContact')}:</span>
                  <strong>{activeJob.merchantName} ({activeJob.merchantPhone})</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(74,46,23,0.1)', paddingTop: '8px' }}>
                  <span style={{ color: '#756B5D' }}>{t('deliveryDashboard.tripPayout')}:</span>
                  <strong style={{ color: '#4F7D3A', fontSize: '1.05rem' }}>{formatETB(activeJob.payoutAmount)}</strong>
                </div>
              </div>

              {/* OTP Form */}
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="#4F7D3A" /> {t('deliveryDashboard.enterOtp')}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setScannerMessage('Point your camera at the delivery QR code.');
                    setIsScannerOpen(true);
                  }}
                  className="btn btn-outline"
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <ShieldCheck size={16} /> Scan QR Code
                </button>
                {isScannerOpen && (
                  <div style={{ marginBottom: '10px' }}>
                    <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', borderRadius: '10px', backgroundColor: '#160D06' }} />
                    <button
                      type="button"
                      onClick={() => setIsScannerOpen(false)}
                      className="btn btn-outline"
                      style={{ width: '100%', marginTop: '8px' }}
                    >
                      Close Scanner
                    </button>
                  </div>
                )}
                {scannerMessage && <div style={{ color: '#756B5D', fontSize: '0.78rem', marginBottom: '8px' }}>{scannerMessage}</div>}
                <input
                  type="text"
                  maxLength={4}
                  className="form-input"
                  value={inputOtp}
                  onChange={(e) => {
                    setInputOtp(e.target.value);
                    setOtpError('');
                  }}
                  placeholder={t('deliveryDashboard.otpPlaceholder')}
                  style={{ fontSize: '1.2rem', letterSpacing: '4px', textAlign: 'center', fontWeight: 800 }}
                />
                {otpError && (
                  <div style={{ color: '#C62828', fontSize: '0.78rem', marginTop: '6px' }}>{otpError}</div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                if (['Arrived at Pickup', 'Arrived at Dropoff'].includes(activeJob.status)) {
                  handleVerifyOtp(activeJob.id, activeJob.otpCode);
                  return;
                }
                const result = updateDeliveryStatus(activeJob.id, nextStatus[activeJob.status]);
                if (!result.success) setOtpError(result.message);
              }}
              disabled={['Arrived at Pickup', 'Arrived at Dropoff'].includes(activeJob.status) && inputOtp.length < 4}
              className="btn btn-green"
              style={{ width: '100%', padding: '12px' }}
            >
              {['Arrived at Pickup', 'Arrived at Dropoff'].includes(activeJob.status) ? t('deliveryDashboard.verifyOtp') : `Mark ${nextStatus[activeJob.status]}`}
              <CheckCircle2 size={18} />
            </button>
          </div>
        </div>
      ) : (
        /* Available Jobs Quick Pick */
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: '#38210F', fontSize: '1.2rem', margin: 0 }}>
              {t('deliveryDashboard.availableDeliveries')}
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#756B5D' }}>{t('deliveryDashboard.tradeCorridor')}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {availableJobs.map((job) => (
              <div
                key={job.id}
                style={{
                  backgroundColor: '#FAF5E8',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(74,46,23,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <strong style={{ color: '#38210F' }}>{job.packageDescription}</strong>
                    <span className="badge badge-active" style={{ fontSize: '0.68rem' }}>{job.distanceKm} km</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#756B5D' }}>
                    Pickup: {job.pickupLocation || job.pickupAddress} ➔ Dropoff: {job.dropoffLocation || job.dropoffAddress} ({job.merchantName})
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', color: '#756B5D', display: 'block' }}>{t('deliveryDashboard.tripPayoutLabel')}</span>
                    <strong style={{ color: '#4F7D3A', fontSize: '1.15rem' }}>{formatETB(job.payoutAmount)}</strong>
                  </div>
                  <button
                    onClick={() => acceptDeliveryJob(job.id)}
                    className="btn btn-green btn-sm"
                  >
                    {t('deliveryDashboard.acceptJob')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
