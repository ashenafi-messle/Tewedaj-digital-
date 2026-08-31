'use client'

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../common/Navbar';
import { ShieldCheck, TrendingUp, ArrowRight, Store, Target, Users, HeartHandshake } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPath, language, theme } = useApp();
  const isAm = language === 'am';
  const isDark = theme === 'dark';

  return (
    <div style={{ backgroundColor: isDark ? '#0F0C09' : 'var(--cream-primary)', color: isDark ? '#FFF4E5' : 'var(--text-dark)', overflowX: 'hidden' }}>
      <Navbar />
      <div style={{ padding: '60px 24px 100px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
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
            {isAm ? 'ስለ ተወዳጅ (TEWEDAJ)' : 'About TEWEDAJ (ተወዳጅ)'}
          </span>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '2.8rem', color: isDark ? '#FFF4E5' : 'var(--brown-dark)', margin: '14px 0' }}>
            {isAm 
              ? 'የኢትዮጵያን የአካባቢ ኢኮኖሚ የጀርባ አጥንት ማብቃት' 
              : "Empowering the Backbone of Ethiopia's Local Economy"}
          </h1>
          <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            {isAm 
              ? '«ተወዳጅ» የሚለው ቃል ታማኝ፣ የተወደደና የተከበረ ማለት ነው። አነስተኛ ነጋዴዎች ያለ ስጋት ብድር የሚያገኙበት፣ ቀጥታ የጅምላ ዕቃ የሚገዙበት እና አስተማማኝ የባጃጅ ካርጎ ትራንስፖርት የሚያገኙበትን ዲጂታል የእምነት መሠረተ ልማት እንገነባለን።'
              : '"TEWEDAJ" means beloved, trusted, and cherished in Amharic. We are building the trust infrastructure that allows micro and small merchants to access safe credit, direct wholesale supplies, and reliable transport without friction.'}
          </p>
        </div>

        {/* 3 Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '56px' }}>
          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: isDark ? '#3A2410' : 'var(--surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#FFB94D' : 'var(--gold-primary)', marginBottom: '16px' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '10px' }}>
              {isAm ? 'እምነት እና ህጋዊ ዲጂታል ውል' : 'Trust & Digital Legality'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'ያልተደራጀ የደብተር ብድር ለተበላሸ ግንኙነት እና ለጠፋ ገንዘብ ይዳርጋል። እኛ የደብተር ብድርን በቴሌብር እና በባንክ የተደገፈ ግልጽ ዲጂታል ውል እናደርጋለን።'
                : 'Informal "Defter" notebook credit causes lost records and broken relationships. We transform informal credit into clear digital agreements with official banking mandates.'}
            </p>
          </div>

          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: isDark ? '#3A2410' : 'var(--surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#FFB94D' : '#D99A20', marginBottom: '16px' }}>
              <Store size={22} />
            </div>
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '10px' }}>
              {isAm ? 'ሱቆች ሁሌም ክፍት ሆነው ይሰራሉ' : 'Keep Shops Open'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'የሰፈር ሱቅ ነጋዴዎች ወደ የጅምላ ገበያ እቃ ለመግዛት በቀን እስከ 4 ሰዓት ያባክናሉ። ተወዳጅ ቀጥታ የጅምላ ካታሎግ እና የባጃጅ አቅርቦትን እስከ ሱቅ በር ያመጣል።'
                : 'Small shopkeepers waste up to 4 hours daily traveling to wholesale markets. TEWEDAJ brings direct catalog ordering and Bajaj delivery directly to their counters.'}
            </p>
          </div>

          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: isDark ? '#3A2410' : 'var(--surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#73B84D' : '#2E7D32', marginBottom: '16px' }}>
              <TrendingUp size={22} />
            </div>
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '10px' }}>
              {isAm ? 'አካታች የፋይናንስ ዕድል' : 'Financial Inclusion'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'ቋሚ ግብይቶችን እና የብድር መክፈያ ታሪክን በመመዝገብ፣ ነጋዴዎችና ደንበኞች ለወደፊት ከባንክ ህጋዊ ብድር የሚያገኙበትን የታማኝነት ነጥብ (Credit Score) ይገነባሉ።'
                : 'By recording consistent transactions and repayment histories, merchants and customers establish credible financial track records for future formal banking lines.'}
            </p>
          </div>
        </div>

        {/* Mission Statement Banner */}
        <div style={{
          backgroundColor: isDark ? '#211710' : '#38210F',
          color: isDark ? '#FFF4E5' : '#FFF8E7',
          borderRadius: '24px',
          padding: '40px',
          border: isDark ? '2px solid #FFAA2C' : '2px solid #D99A20',
          marginBottom: '56px'
        }}>
          <h2 style={{ fontFamily: 'Fraunces, serif', color: isDark ? '#FFB94D' : '#F4C542', fontSize: '2rem', marginBottom: '14px' }}>
            {isAm ? 'ዋነኛ ተልዕኳችን' : 'Our Foundational Mission'}
          </h2>
          <p style={{ color: isDark ? '#E2D2C1' : '#D4C3A3', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
            {isAm 
              ? '«የኢትዮጵያ አነስተኛ ንግዶችን ገንዘብ፣ ዕቃዎች፣ ጭነት እና የብድር መዝገቦችን በአንድ ግልጽ የዲጂታል ስነ-ምህዳር በማስተሳሰር — ብድርን ይበልጥ ደህንነቱ የተጠበቀ፣ ዕቃ አቅርቦትን ቀላል እና የዕለት ተዕለት ንግድን የተሳለጠ ማድረግ ነው።»'
              : '"To connect the money, goods, delivery and credit records of Ethiopian micro and small businesses in one unified, transparent digital ecosystem — making credit safer, stock easier to get, and everyday trade simpler."'}
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentPath('/auth')} className="btn btn-gold">
              {isAm ? 'አሁኑኑ ይቀላቀሉ' : 'Join Our Network'} <ArrowRight size={16} />
            </button>
            <button onClick={() => setCurrentPath('/how-it-works')} className="btn btn-outline" style={{ borderColor: isDark ? 'rgba(255, 170, 44, 0.5)' : 'rgba(255,255,255,0.3)', color: isDark ? '#FFB94D' : '#FFF8E7' }}>
              {isAm ? 'እንዴት እንደሚሰራ ይመልከቱ' : 'How It Works'}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: isDark ? '#FFB94D' : 'var(--gold-primary)', fontFamily: 'Fraunces, serif' }}>4,200+</div>
            <div style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              {isAm ? 'የተመዘገቡ የሰፈር ሱቆች' : 'Registered MSMEs'}
            </div>
          </div>
          <div className="card" style={{ padding: '24px', backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: isDark ? '#73B84D' : '#4F7D3A', fontFamily: 'Fraunces, serif' }}>ETB 45M+</div>
            <div style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              {isAm ? 'በዲጂታል ውል የተመዘገበ ብድር' : 'Digital Credit Logged'}
            </div>
          </div>
          <div className="card" style={{ padding: '24px', backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: isDark ? '#FFF4E5' : 'var(--brown-dark)', fontFamily: 'Fraunces, serif' }}>98.4%</div>
            <div style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              {isAm ? 'በወቅቱ የተከፈለ ብድር' : 'On-Time Settlement Rate'}
            </div>
          </div>
          <div className="card" style={{ padding: '24px', backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: isDark ? '#FFB94D' : '#D99A20', fontFamily: 'Fraunces, serif' }}>18,500+</div>
            <div style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              {isAm ? 'የተጠናቀቁ የባጃጅ ካርጎ ጉዞዎች' : 'Delivered Cargo Trips'}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
