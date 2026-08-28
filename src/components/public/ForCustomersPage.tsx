'use client'

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../common/Navbar';
import { CreditCard, ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';

export const ForCustomersPage: React.FC = () => {
  const { setCurrentPath, switchRole, language, theme } = useApp();
  const isAm = language === 'am';
  const isDark = theme === 'dark';

  return (
    <div style={{ backgroundColor: isDark ? '#0F0C09' : 'var(--cream-primary)', color: isDark ? '#FFF4E5' : 'var(--text-dark)', overflowX: 'hidden' }}>
      <Navbar />
      <div style={{ padding: '60px 24px 100px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-role-customer" style={{ marginBottom: '12px', fontSize: '0.8rem', backgroundColor: isDark ? '#211710' : undefined, color: isDark ? '#FFB94D' : undefined, border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : undefined }}>
            {isAm ? 'ለደንበኞች እና ቤተሰቦች' : 'FOR CUSTOMERS & HOUSEHOLDS'}
          </span>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '2.8rem', color: isDark ? '#FFF4E5' : 'var(--brown-dark)', margin: '12px 0' }}>
            {isAm 
              ? 'የዕዳዎን መጠን፣ የማን ዕዳ እንዳለብዎት እና የታማኝነት ነጥብዎን በግልጽ ይመልከቱ።'
              : 'See exactly what you owe, who you owe, and build a verified credit score.'}
          </h1>
          <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            {isAm 
              ? 'የደብተር ብድር ንትርክ እና የተረሱ ሂሳቦች ይብቁ። ግልጽ ዲጂታል መዝገብዎን በማንኛውም ሰዓት በስልክዎ ይመልከቱ፣ በቴሌብር ይክፈሉ፣ እና የታማኝነት ነጥብዎን ያሳድጉ።'
              : 'No more handwritten book confusion or forgotten grocery credits. View your transparent digital ledger anytime, verify every repayment, and grow your local financial trust.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <CreditCard size={28} color={isDark ? '#4DB6AC' : '#00695C'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? '100% ግልጽነት' : '100% Transparency'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? '«የማን ዕዳ አለብኝ?»፣ «መቼ ተወሰደ?»፣ «ምን ያህል ከፍያለሁ?» እና «ስንት ቀረኝ?» ለሚሉት ጥያቄዎች ግልጽ መልስ በስልክዎ ያግኙ።'
                : 'Clear answers to "Who do I owe?", "When was it created?", "How much have I paid?", and "How much remains?" with visual progress bars.'}
            </p>
          </div>

          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <Smartphone size={28} color={isDark ? '#FFB94D' : 'var(--gold-primary)'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? 'የቴሌብር እና የሲቢኢ ውህደት' : 'Telebirr & CBE Integration'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'ደመወዝ ወይም ገንዘብ ወደ አካውንትዎ ሲገባ በቴሌብር ወይም በሲቢኢ ብር በቀጥታ የሰፈር ሱቅ ብድርዎን በቀላሉ ይክፈሉ።'
                : 'Settle installments automatically when salary or funds land in your account, through official, regulated banking mandate channels.'}
            </p>
          </div>

          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <ShieldCheck size={28} color={isDark ? '#73B84D' : '#4F7D3A'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? 'የታማኝነት ነጥብ (Credit Score)' : 'Credit Reputation Score'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'በወቅቱ የሚፈጽሟቸው ክፍያዎች የዲጂታል ታማኝነት ነጥብዎን ይገነባሉ፤ ይህም ከሰፈር ሱቆች እና ከባንኮች ሰፋ ያለ ብድር እንዲያገኙ ያስችልዎታል።'
                : 'On-time repayments build your digital credit score, unlocking higher credit allowances with local merchants and formal financial institutions.'}
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
            {isAm ? 'የዲጂታል ብድር መዝገብዎን ይመልከቱ' : 'Check Your Digital Credit Ledger'}
          </h2>
          <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', marginBottom: '24px' }}>
            {isAm 
              ? 'የደንበኞች ዲጂታል የብድር መዝገብ ፖርታልን በተግባር ይሞክሩ።' 
              : 'Experience the customer credit transparency portal in action.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => switchRole('customer')} className="btn btn-gold btn-lg">
              {isAm ? 'የደንበኛ ፖርታልን ይክፈቱ' : 'Launch Customer Ledger Demo'} <ArrowRight size={18} />
            </button>
            <button onClick={() => setCurrentPath('/auth')} className="btn btn-outline btn-lg">
              {isAm ? 'የደንበኛ መለያ ይክፈቱ' : 'Create Customer Account'}
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
