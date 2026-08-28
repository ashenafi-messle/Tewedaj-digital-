'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, ShieldCheck, CheckCircle2, Navigation, MapPin } from 'lucide-react';
import { DeliveryMap } from '../common/DeliveryMap';
import confetti from 'canvas-confetti';

export const DeliveryActive: React.FC = () => {
  const { deliveryJobs, updateDeliveryStatus, currentUser, setCurrentPath, t, language } = useApp();
  const [inputOtp, setInputOtp] = useState('');
  const [error, setError] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerMessage, setScannerMessage] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isAm = language === 'am';

  const activeJob = deliveryJobs.find(j => ['Accepted', 'Going to Pickup', 'Arrived at Pickup', 'Picked Up', 'In Transit', 'Arrived at Dropoff', 'Delivered'].includes(j.status));

  const nextStatus: Record<string, string> = {
    Accepted: 'Going to Pickup',
    'Going to Pickup': 'Arrived at Pickup',
    'Arrived at Pickup': 'Picked Up',
    'Picked Up': 'In Transit',
    'In Transit': 'Arrived at Dropoff',
    'Arrived at Dropoff': 'Delivered',
    Delivered: 'Completed'
  };

  useEffect(() => {
    let scanTimer: ReturnType<typeof setInterval> | undefined;

    const startScanner = async () => {
      const BarcodeDetectorApi = (window as any).BarcodeDetector;
      if (!BarcodeDetectorApi) {
        setScannerMessage('QR scanning is not supported in this browser. Enter the PIN manually.');
        return;
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        setScannerMessage('This device cannot access a camera. Enter the PIN manually.');
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
            setScannerMessage('QR code captured. Verify the code to continue.');
            setIsScannerOpen(false);
          }
        }, 500);
      } catch {
        setScannerMessage('Camera access was unavailable. Enter the PIN manually.');
      }
    };

    if (isScannerOpen) startScanner();
    return () => {
      if (scanTimer) clearInterval(scanTimer);
      streamRef.current?.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    };
  }, [isScannerOpen]);

  const handleVerify = () => {
    if (!activeJob) return;
    const result = updateDeliveryStatus(activeJob.id, nextStatus[activeJob.status], inputOtp || undefined);
    if (!result.success) {
      setError(result.message);
      return;
    }
    setInputOtp('');
    setError('');
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch (e) {}
  };

  if (!activeJob) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <Truck size={48} color="#D4C3A3" style={{ marginBottom: '16px' }} />
        <h3 style={{ color: '#38210F', marginBottom: '8px' }}>{t('deliveryActive.noActive')}</h3>
        <p style={{ color: '#756B5D', fontSize: '0.9rem', marginBottom: '24px' }}>
          {t('deliveryActive.readyAccept')}
        </p>
        <button onClick={() => setCurrentPath('/delivery/jobs')} className="btn btn-green">
          {t('deliveryActive.viewJobs')}
        </button>
      </div>
    );
  }

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
            <Truck size={24} color="#4F7D3A" />
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#38210F', margin: 0 }}>
              {t('deliveryActive.title')}: {activeJob.packageDescription}
            </h1>
          </div>
          <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
            Trip #{activeJob.id.slice(-4)} • Payout: ETB {activeJob.payoutAmount}
          </p>
        </div>
      </div>

      <DeliveryMap
        pickupLocation={activeJob.pickupLocation}
        dropoffLocation={activeJob.dropoffLocation}
        distanceKm={activeJob.distanceKm}
        riderName={currentUser?.name}
        status={activeJob.status}
      />

      <div className="card" style={{ maxWidth: '540px', margin: '0 auto', width: '100%' }}>
        <h3 style={{ color: '#38210F', marginBottom: '12px' }}>Delivery status: {activeJob.status}</h3>
        <p style={{ color: '#756B5D', fontSize: '0.85rem', marginBottom: '16px' }}>
          {activeJob.status === 'Arrived at Pickup'
            ? 'Enter the wholesaler pickup PIN to confirm the package was collected.'
            : activeJob.status === 'Arrived at Dropoff'
              ? t('deliveryActive.otpInstruction')
              : `Next step: ${nextStatus[activeJob.status]}.`}
        </p>

        {['Arrived at Pickup', 'Arrived at Dropoff'].includes(activeJob.status) && (
          <div className="form-group">
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
                setError('');
              }}
              placeholder="Enter 4-digit PIN"
              style={{ fontSize: '1.3rem', letterSpacing: '4px', textAlign: 'center', fontWeight: 800 }}
            />
            {error && <div style={{ color: '#C62828', fontSize: '0.78rem', marginTop: '6px' }}>{error}</div>}
          </div>
        )}

        <button
          onClick={() => {
            if (['Arrived at Pickup', 'Arrived at Dropoff'].includes(activeJob.status)) handleVerify();
            else {
              const result = updateDeliveryStatus(activeJob.id, nextStatus[activeJob.status]);
              if (!result.success) setError(result.message);
            }
          }}
          disabled={['Arrived at Pickup', 'Arrived at Dropoff'].includes(activeJob.status) && inputOtp.length < 4}
          className="btn btn-green"
          style={{ width: '100%', padding: '12px' }}
        >
          {activeJob.status === 'Arrived at Pickup' ? 'Confirm Pickup' : activeJob.status === 'Arrived at Dropoff' ? t('deliveryActive.confirmDelivered') : `Mark ${nextStatus[activeJob.status]}`}
        </button>
      </div>
    </div>
  );
};
