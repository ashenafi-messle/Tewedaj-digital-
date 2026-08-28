'use client'

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../common/Navbar';
import { CheckCircle2, ArrowRight, ShieldCheck, CreditCard, ShoppingBag, Truck, Smartphone, Lock, Store } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setCurrentPath, switchRole, language, theme } = useApp();
  const isAm = language === 'am';
  const isDark = theme === 'dark';

  const steps = [
    {
      num: '01',
      title: isAm ? 'የነጋዴ ምዝገባ እና የሱቅ ፕሮፋይል ማዘጋጀት' : 'Merchant Onboarding & Shop Profile',
      desc: isAm 
        ? 'ነጋዴዎች በሱቅ ስም፣ የንግድ ፈቃድ ወይም የቀበሌ መታወቂያ እና ተመራጭ የሞባይል ዋሌት (ቴሌብር ወይም ሲቢኢ ብር) ይመዘገባሉ። የዲጂታል ሂሳባቸው ወዲያውኑ ገቢር ይሆናል።'
        : 'Merchants sign up with their shop name, trade license / Kebele ID, and preferred mobile wallet (Telebirr or CBE Birr). Their digital account activates instantly.',
      role: isAm ? 'የሱቅ ነጋዴ' : 'Merchant',
      icon: Store,
      badgeColor: '#D99A20'
    },
    {
      num: '02',
      title: isAm ? 'የቀጥታ የጅምላ ካታሎግ ማሰስ' : 'Wholesale Catalog Discovery',
      desc: isAm 
        ? 'የአዳ ማኛ ጤፍ፣ የፉርኖ ዱቄት፣ የሱፍ የምግብ ዘይት እና የቅመማ ቅመም የጅምላ መጋዘን ዋጋዎችን ከመስሪያ ሰሌዳዎ በቀጥታ ይመልከቱ።'
        : 'Browse current market prices for quintals of Magna Teff, wheat flour, sunflower cooking oils, and spices from verified Merkato distributors.',
      role: isAm ? 'ነጋዴ እና ጅምላ አቅራቢ' : 'Merchant & Wholesaler',
      icon: ShoppingBag,
      badgeColor: '#4F7D3A'
    },
    {
      num: '03',
      title: isAm ? 'በአንድ ጠቅታ የጅምላ ትዕዛዝ እና የማጓጓዣ ጥያቄ' : '1-Tap Wholesale Ordering & Delivery Request',
      desc: isAm 
        ? 'ነጋዴዎች የሚፈልጉትን ዕቃ ወደ ቅርጫት ጨምረው ያዛሉ። የማጓጓዣ ጥያቄ በራስ-ሰር በአካባቢው ላሉ ንቁ የባጃጅ አጓጓዦች ይደርሳል።'
        : 'Merchant adds stock to cart and checks out. An automated delivery request is created and broadcast to active couriers in the pickup zone.',
      role: isAm ? 'የሱቅ ነጋዴ' : 'Merchant',
      icon: Truck,
      badgeColor: '#00695C'
    },
    {
      num: '04',
      title: isAm ? 'የባጃጅ ካርጎ አጓጓዥ መረከብ እና ማድረስ' : 'Courier Pickup & Express Bajaj Transport',
      desc: isAm 
        ? 'የተረጋገጠ አጓጓዥ ስራውን ተቀብሎ፣ ዕቃውን ከጅምላ መጋዘን በማንሳት በጥንቃቄ እስከ ቸርቻሪው ሱቅ ድረስ ያጓጉዛል።'
        : 'A verified delivery partner accepts the job, collects packaged sacks from the supplier warehouse, and transports them safely to the retail shop.',
      role: isAm ? 'የባጃጅ አጓጓዥ' : 'Delivery Partner',
      icon: ShieldCheck,
      badgeColor: '#1E88E5'
    },
    {
      num: '05',
      title: isAm ? 'የደንበኛ ግዢ እና የዲጂታል ብድር ውል ማመንጨት' : 'Customer Purchase & Digital Credit Agreement',
      desc: isAm 
        ? 'የሰፈር ደንበኞች በብድር ሸቀጣ ሸቀጥ ሲገዙ፣ ነጋዴው የዕቃዎችን ዝርዝር እና የመክፈያ ቀነ-ገደብ የያዘ ግልጽ ዲጂታል ውል ያዘጋጃል።'
        : 'When neighborhood customers purchase groceries on credit, the merchant generates a digital credit agreement with itemized goods and repayment terms.',
      role: isAm ? 'ነጋዴ እና ደንበኛ' : 'Merchant & Customer',
      icon: CreditCard,
      badgeColor: '#E65100'
    },
    {
      num: '06',
      title: isAm ? 'የደንበኛ ፈቃድ እና የሞባይል ክፍያ ትዕዛዝ' : 'Customer Authorization Mandate',
      desc: isAm 
        ? 'ደንበኛው በስልካቸው በሚደርሳቸው ባለ 6-አሃዝ የኤስኤምኤስ OTP አማካኝነት ውሉን ያጸድቃል። ተወዳጅ የባንክ ሚስጥር ቁጥር ሳይጠይቅ በቀጥታ ከቴሌብር ጋር ይተሳሰራል።'
        : 'Customer approves the installment mandate via their mobile banking app. TEWEDAJ securely connects through partner mandate capabilities without storing bank PINs.',
      role: isAm ? 'ደንበኛ እና ባንክ' : 'Customer & Partner Banks',
      icon: Smartphone,
      badgeColor: '#5E35B1'
    },
    {
      num: '07',
      title: isAm ? 'ቀጣይ ክፍያዎች እና የእምነት ነጥብ ግንባታ' : 'Scheduled Repayment & Synchronized Balance',
      desc: isAm 
        ? 'ክፍያዎች ሲፈጸሙ የሁለቱም ወገኖች ሂሳብ ወዲያውኑ ይስተካከላል፤ ይህም ለደንበኛውም ሆነ ለነጋዴው ከባንክ ብድር የሚያገኙበትን የታማኝነት ነጥብ ይገነባል።'
        : 'As installments are paid, both buyer and merchant balances update live with zero confusion, building verifiable credit scores for both parties.',
      role: isAm ? 'መላው ስነ-ምህዳር' : 'Full Ecosystem',
      icon: Lock,
      badgeColor: '#2E7D32'
    }
  ];

  return (
    <div style={{ backgroundColor: isDark ? '#0F0C09' : 'var(--cream-primary)', color: isDark ? '#FFF4E5' : 'var(--text-dark)', overflowX: 'hidden' }}>
      <Navbar />
      <div style={{ padding: '60px 24px 100px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            backgroundColor: isDark ? '#211710' : 'var(--surface-elevated)',
            color: isDark ? '#FFB94D' : 'var(--gold-primary)',
            border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : '1px solid var(--border-subtle)',
            padding: '4px 14px',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            {isAm ? 'የስርዓቱ አሰራር መመሪያ' : 'Complete Walkthrough'}
          </span>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '2.8rem', color: isDark ? '#FFF4E5' : 'var(--brown-dark)', margin: '14px 0' }}>
            {isAm ? 'ተወዳጅ (TEWEDAJ) እንዴት ይሰራል?' : 'How the TEWEDAJ Ecosystem Works'}
          </h1>
          <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto' }}>
            {isAm 
              ? 'አቅራቢዎችን፣ ቸርቻሪዎችን፣ የባጃጅ አጓጓዦችን እና ደንበኞችን በአንድ ግልጽ የዲጂታል አሰራር የሚያስተሳስር ስርዓት።' 
              : 'A structured, transparent pipeline connecting suppliers, retailers, riders, and buyers into one seamless flow.'}
          </p>
        </div>

        {/* Steps List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '56px' }}>
          {steps.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <div
                key={idx}
                className="card card-interactive"
                style={{
                  padding: '24px 28px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '20px',
                  backgroundColor: isDark ? '#211710' : '#FFFFFF'
                }}
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: isDark ? '#3A2410' : 'var(--surface-elevated)',
                  color: isDark ? '#FFB94D' : 'var(--gold-primary)',
                  fontFamily: 'Fraunces, serif',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : '1px solid var(--border-subtle)'
                }}>
                  {s.num}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                    <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', fontSize: '1.15rem', margin: 0 }}>
                      {s.title}
                    </h3>
                    <span style={{
                      backgroundColor: isDark ? '#3A2410' : 'var(--surface-elevated)',
                      color: isDark ? '#F0DFCD' : 'var(--text-dark)',
                      border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : '1px solid var(--border-subtle)',
                      padding: '3px 10px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 700
                    }}>
                      {s.role}
                    </span>
                  </div>
                  <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Role Pathways CTA */}
        <div style={{
          backgroundColor: isDark ? '#211710' : 'var(--surface-elevated)',
          borderRadius: '24px',
          padding: '40px',
          border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontFamily: 'Fraunces, serif', color: isDark ? '#FFF4E5' : 'var(--brown-dark)', fontSize: '2rem', marginBottom: '12px' }}>
            {isAm ? 'የእርስዎን ሚና ይምረጡና ይጀምሩ' : 'Choose Your Role and Start'}
          </h2>
          <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', marginBottom: '28px', maxWidth: '600px', margin: '0 auto 28px' }}>
            {isAm 
              ? 'በቀጥታ ወደ ዲጂታል ፖርታል በመግባት የዲጂታል ብድር ውሎችን፣ የጅምላ ዕቃ ግዢን እና የባጃጅ ካርጎን በተግባር ይሞክሩ።' 
              : 'Jump straight into the live interactive portals to experience digital agreements, bulk wholesale, and Bajaj logistics.'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <button onClick={() => switchRole('merchant')} className="btn btn-gold" style={{ justifyContent: 'center' }}>
              <Store size={18} /> {isAm ? 'የነጋዴ ፖርታል' : 'Merchant Portal'}
            </button>
            <button onClick={() => switchRole('wholesaler')} className="btn btn-secondary" style={{ justifyContent: 'center' }}>
              <ShoppingBag size={18} /> {isAm ? 'የጅምላ አቅራቢ' : 'Wholesaler Hub'}
            </button>
            <button onClick={() => switchRole('delivery_partner')} className="btn btn-green" style={{ justifyContent: 'center' }}>
              <Truck size={18} /> {isAm ? 'የባጃጅ አጓጓዥ' : 'Delivery Fleet'}
            </button>
            <button onClick={() => switchRole('customer')} className="btn btn-outline" style={{ justifyContent: 'center' }}>
              <CreditCard size={18} /> {isAm ? 'የደንበኛ መዝገት' : 'Customer Ledger'}
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
