'use client'

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../common/Navbar';
import { Truck, MapPin, DollarSign, ShieldCheck, ArrowRight } from 'lucide-react';

export const ForDeliveryPage: React.FC = () => {
  const { setCurrentPath, switchRole, language, theme } = useApp();
  const isAm = language === 'am';
  const isDark = theme === 'dark';

  return (
    <div style={{ backgroundColor: isDark ? '#0F0C09' : 'var(--cream-primary)', color: isDark ? '#FFF4E5' : 'var(--text-dark)', overflowX: 'hidden' }}>
      <Navbar />
      <div style={{ padding: '60px 24px 100px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-role-delivery" style={{ marginBottom: '12px', fontSize: '0.8rem', backgroundColor: isDark ? '#211710' : undefined, color: isDark ? '#FFB94D' : undefined, border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : undefined }}>
            {isAm ? 'ለባጃጅ እና ካርጎ አጓጓዦች' : 'FOR COURIERS & RIDERS'}
          </span>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '2.8rem', color: isDark ? '#FFF4E5' : 'var(--brown-dark)', margin: '12px 0' }}>
            {isAm 
              ? 'የአካባቢዎን ጭነት ስራዎች ይቀበሉ፣ ዕቃዎችን ያጓጉዙ እና ገቢዎን ያሳድጉ።'
              : 'Receive nearby delivery jobs, manage pickups and track your earnings.'}
          </h1>
          <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            {isAm 
              ? 'ባለሶስት እግር ባጃጅ፣ የጭነት ሞተርሳይክል ወይም ፒክአፕ ቫን ቢኖርዎትም፣ ተወዳጅ የጅምላ እህልና ዘይቶችን ወደ ሰፈር ሱቆች በማጓጓዝ ቋሚ ዕለታዊ ገቢ እንዲያገኙ ያግዝዎታል።'
              : 'Whether you operate a three-wheeler Bajaj, cargo motorcycle, or delivery van, TEWEDAJ keeps you earning consistently by transporting wholesale stock across town.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <MapPin size={28} color={isDark ? '#73B84D' : '#4F7D3A'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? 'የተቀላጠፈ የከተማ መስመር' : 'Optimized City Routes'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'ስራዎች የሚመደቡት ለመርካቶ፣ ቃሊቲ ወይም ለአካባቢዎ መጋዘኖች ባሉዎት ቅርበት መሰረት ነው።'
                : 'Jobs are assigned based on your current sub-city proximity to Merkato, Kality, or local warehouse clusters.'}
            </p>
          </div>

          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <DollarSign size={28} color={isDark ? '#FFB94D' : 'var(--gold-primary)'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? 'ፈጣን የጉዞ ክፍያ' : 'Guaranteed Instant Payouts'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'በእያንዳንዱ ጉዞ ተወዳዳሪ ዋጋ (300 – 650+ ብር) ያግኙ፤ ዕቃው እንደተረከበ ገንዘብዎ ወደ ዋሌትዎ ይገባል።'
                : 'Earn competitive rates per trip (ETB 300 - 650+) with instant wallet settlement right after OTP confirmation.'}
            </p>
          </div>

          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <ShieldCheck size={28} color={isDark ? '#FFB94D' : 'var(--gold-primary)'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? 'አስተማማኝ የOTP ማስረከቢያ' : 'Protected OTP Handover'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'ምንም አይነት የጠፋ ዕቃ ንትርክ የለም። ነጋዴው ባለ 4-ዲጂት ሚስጥር ቁጥር ሲሰጥዎት ብቻ ስራው ተጠናቆ ክፍያዎ ይለቀቃል።'
                : 'No lost package disputes. Merchants must provide a secure 4-digit code to finalize delivery and release your earnings.'}
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: isDark ? '#211710' : 'var(--surface-elevated)',
          borderRadius: '24px',
          padding: '36px',
          border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontFamily: 'Fraunces, serif', color: isDark ? '#FFF4E5' : 'var(--brown-dark)', fontSize: '2rem', marginBottom: '12px' }}>
            {isAm ? 'ከተወዳጅ ጋር ያጓጉዙ እና ገቢ ያግኙ' : 'Drive and Earn with TEWEDAJ'}
          </h2>
          <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', marginBottom: '24px' }}>
            {isAm 
              ? 'በአዲስ አበባ የታመነውን የካርጎና የባጃጅ ትራንስፖርት አውታረ መረብ ይቀላቀሉ።'
              : 'Join the trusted freight and last-mile logistics partner network in Addis Ababa.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => switchRole('delivery_partner')} className="btn btn-green btn-lg">
              {isAm ? 'የአጓጓዥ ፖርታልን ይሞክሩ' : 'Launch Delivery Courier Demo'} <ArrowRight size={18} />
            </button>
            <button onClick={() => setCurrentPath('/auth')} className="btn btn-outline btn-lg">
              {isAm ? 'አጓጓዥ ሆነው ይመዝገቡ' : 'Register as Driver'}
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
