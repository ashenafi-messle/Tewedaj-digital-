'use client'

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../common/Navbar';
import { ShoppingBag, TrendingUp, Users, Truck, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ForWholesalersPage: React.FC = () => {
  const { setCurrentPath, switchRole, language, theme } = useApp();
  const isAm = language === 'am';
  const isDark = theme === 'dark';

  return (
    <div style={{ backgroundColor: isDark ? '#0F0C09' : 'var(--cream-primary)', color: isDark ? '#FFF4E5' : 'var(--text-dark)', overflowX: 'hidden' }}>
      <Navbar />
      <div style={{ padding: '60px 24px 100px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-role-wholesaler" style={{ marginBottom: '12px', fontSize: '0.8rem', backgroundColor: isDark ? '#211710' : undefined, color: isDark ? '#FFB94D' : undefined, border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : undefined }}>
            {isAm ? 'ለጅምላ ሻጮች እና አምራቾች' : 'FOR WHOLESALERS & PRODUCERS'}
          </span>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '2.8rem', color: isDark ? '#FFF4E5' : 'var(--brown-dark)', margin: '12px 0' }}>
            {isAm 
              ? 'ተጨማሪ የሰፈር ሱቆችን ያግኙ፤ የዕቃ ክምችትዎን ወደ ዲጂታል ትዕዛዝ ይቀይሩ።'
              : 'Reach more small merchants and turn your inventory into digital orders.'}
          </h1>
          <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            {isAm 
              ? 'የስርጭት አድማስዎን በመላው አዲስ አበባ እና ክልሎች ያስፉ። ከተረጋገጡ ቸርቻሪዎች አስተማማኝ ትዕዛዞችን በራስ-ሰር ይቀበሉ።'
              : 'Expand your distribution footprint across Gondar and beyond. Receive guaranteed orders from verified retailers with scheduled pickup couriers.'}
          </p>
        </div>

        {/* 4 Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <Users size={28} color={isDark ? '#FFB94D' : 'var(--gold-primary)'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? 'ቀጥታ የነጋዴዎች ተደራሽነት' : 'Direct Merchant Reach'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'የደላላ ኮሚሽን ሳያባክኑ ከ10,000+ በላይ የሰፈር ሱቆችና ኪዮስኮች ጋር በቀጥታ ይገናኙ።'
                : 'Connect with 10,000+ neighborhood retail shops without paying heavy broker commissions or relying solely on foot traffic.'}
            </p>
          </div>

          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <TrendingUp size={28} color={isDark ? '#FFB94D' : 'var(--gold-primary)'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? 'የገበያ ፍላጎት ትንተና' : 'Market Demand Analytics'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'በቦሌ፣ ካዛንቺስ፣ መገናኛ እና ሌሎች ክፍለ ከተሞች የትኞቹ የእህልና የዘይት አይነቶች ከፍተኛ ፍላጎት እንዳላቸው በቀጥታ ይወቁ።'
                : 'See which grain varieties, cooking oils, and spices are in highest demand across Bole, Kazanchis, and Megenagna sub-cities.'}
            </p>
          </div>

          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <Truck size={28} color={isDark ? '#73B84D' : '#4F7D3A'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? 'የተደራጀ የመጋዘን ጭነት' : 'Organized Pickup Logistics'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'የተወዳጅ የትራንስፖርት አውታረ መረብ ዕቃውን ከመጋዘንዎ በር ተረክቦ ያጓጉዛል። እርስዎ ዕቃውን አዘጋጅተው በOTP ብቻ ያስረክባሉ።'
                : 'Our delivery network handles the transportation from your warehouse loading dock. Simply prepare the packages and confirm via OTP.'}
            </p>
          </div>

          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <ShieldCheck size={28} color={isDark ? '#4DB6AC' : '#00695C'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? 'አስተማማኝ የክፍያ ዝውውር' : 'Secure Payment Settlements'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'ዕቃው ለቸርቻሪው እንደተረከበ ክፍያዎ በቀጥታ ወደ ባንክ ወይም ቴሌብር ሂሳብዎ ይገባል።'
                : 'Get prompt payments directly to your commercial bank or Telebirr merchant account upon delivery handover confirmation.'}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          backgroundColor: isDark ? '#211710' : '#38210F',
          color: isDark ? '#FFF4E5' : '#FFF8E7',
          borderRadius: '24px',
          padding: '36px',
          border: isDark ? '2px solid #FFAA2C' : '2px solid #D99A20',
          textAlign: 'center'
        }}>
          <h2 style={{ fontFamily: 'Fraunces, serif', color: isDark ? '#FFB94D' : '#F4C542', fontSize: '2rem', marginBottom: '12px' }}>
            {isAm ? 'የተረጋገጠ የጅምላ አቅራቢ ይሁኑ' : 'Become a Verified Supplier on TEWEDAJ'}
          </h2>
          <p style={{ color: isDark ? '#E2D2C1' : '#D4C3A3', marginBottom: '24px' }}>
            {isAm 
              ? 'የጅምላ ዕቃዎችዎን ዛሬውኑ ይመዝግቡ እና ዲጂታል ትዕዛዞችን መቀበል ይጀምሩ።'
              : 'List your wholesale inventory today and start receiving digital orders.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => switchRole('wholesaler')} className="btn btn-gold btn-lg">
              {isAm ? 'የጅምላ አቅራቢ ፖርታልን ይሞክሩ' : 'Launch Wholesaler Demo Portal'} <ArrowRight size={18} />
            </button>
            <button onClick={() => setCurrentPath('/auth')} className="btn btn-outline btn-lg" style={{ borderColor: isDark ? 'rgba(255, 170, 44, 0.5)' : 'rgba(255,255,255,0.3)', color: isDark ? '#FFB94D' : '#FFF8E7' }}>
              {isAm ? 'አቅራቢ ሆነው ይመዝገቡ' : 'Register as Wholesaler'}
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
