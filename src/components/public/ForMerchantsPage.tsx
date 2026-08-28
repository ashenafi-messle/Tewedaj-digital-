'use client'

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../common/Navbar';
import { Store, ArrowRight, CreditCard, Boxes, Receipt, Sparkles, ShieldCheck } from 'lucide-react';

export const ForMerchantsPage: React.FC = () => {
  const { setCurrentPath, switchRole, language, theme } = useApp();
  const isAm = language === 'am';
  const isDark = theme === 'dark';

  return (
    <div style={{ backgroundColor: isDark ? '#0F0C09' : 'var(--cream-primary)', color: isDark ? '#FFF4E5' : 'var(--text-dark)', overflowX: 'hidden' }}>
      <Navbar />
      <div style={{ padding: '60px 24px 100px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-role-merchant" style={{ marginBottom: '12px', fontSize: '0.8rem', backgroundColor: isDark ? '#211710' : undefined, color: isDark ? '#FFB94D' : undefined, border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : undefined }}>
            {isAm ? 'ለሰፈር ሱቆች እችርቻሪዎች' : 'FOR RETAILERS & KIOSKS'}
          </span>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '2.8rem', color: isDark ? '#FFF4E5' : 'var(--brown-dark)', margin: '12px 0' }}>
            {isAm 
              ? 'ተወዳጅ ብድርን፣ የጅምላ ዕቃዎችን እና ማጓጓዝን ሲያከናውን ሱቅዎ ሁሌም ክፍት ሆኖ ይሰራል።'
              : 'Keep your shop open while TEWEDAJ handles credit, stock, and delivery.'}
          </h1>
          <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            {isAm 
              ? 'ሱቅዎን በሙሉ እምነት እና እርጋታ ያካሂዱ። የደብተር ብድር ንትርክን ያስቀሩ፣ የጅምላ ዕቃዎችን ከመጋዘን በቀጥታ ይዘዙ፣ እና የወረቀት ደረሰኞችን በአይ-አይ (AI) ይቃኙ።'
              : 'Run your store with complete peace of mind. Eliminate notebook debt arguments, procure bulk goods directly from wholesale hubs, and scan paper receipts with AI.'}
          </p>
        </div>

        {/* Feature Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <CreditCard size={28} color={isDark ? '#FFB94D' : 'var(--gold-primary)'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? 'ዲጂታል የብድር ውሎች' : 'Digital Credit Agreements'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'በቴሌብር እና በሲቢኢ ክፍያ ፈቃድ የተደገፈ ግልጽ የደንበኛ ብድር ውል ያዘጋጃል። እያንዳንዱን ሳንቲም በትክክል ይከታተሉ።'
                : 'Create transparent, legally backed customer credit records with Telebirr and CBE mandate repayments. Track every single Birr.'}
            </p>
          </div>

          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <Boxes size={28} color={isDark ? '#73B84D' : '#4F7D3A'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? 'የቀጥታ የጅምላ ገበያ' : 'Wholesale Marketplace'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'ከሱቅዎ መደርደሪያ ሳይወጡ የአዳ ማኛ ጤፍ፣ ዘይት፣ ዱቄት እና ቅመማ ቅመሞችን ከመስሪያ ሰሌዳዎ በቀጥታ በጅምላ ዋጋ ይዘዙ።'
                : 'Order teff, cooking oil, wheat flour, and spices from certified Merkato distributors without leaving your checkout counter.'}
            </p>
          </div>

          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <Sparkles size={28} color={isDark ? '#FFB94D' : 'var(--gold-primary)'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? 'የወረቀት ደረሰኝ ስካነር (AI OCR)' : 'AI Receipt Scanner'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'ከውጭ የገዟቸውን የወረቀት ደረሰኞች በስልክ ካሜራ ፎቶ ያንሱ፤ ስርዓታችን በራስ-ሰር የዕቃ ክምችትዎን እና ዋጋዎን ያስተካክላል።'
                : 'Bought goods outside the app? Snap a photo of your paper receipt. Our OCR automatically updates your inventory values and unit costs.'}
            </p>
          </div>

          <div className="card" style={{ backgroundColor: isDark ? '#211710' : '#FFFFFF' }}>
            <Receipt size={28} color={isDark ? '#D8C8B8' : '#8D6E63'} style={{ marginBottom: '14px' }} />
            <h3 style={{ color: isDark ? '#FFF4E5' : 'var(--brown-dark)', marginBottom: '8px' }}>
              {isAm ? 'ቀላል የሽያጭ እና የገቢ መዝገብ' : 'Simple POS & Sales Tracker'}
            </h3>
            <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isAm 
                ? 'የጥሬ ገንዘብ፣ የቴሌብር እና የብድር ሽያጮችን በአንድ ጠቅታ ይመዝግቡ። የቀን ትርፍዎን እና ገቢዎን ወዲያውኑ ይወቁ።'
                : 'Record cash, Telebirr, and credit sales with 1 tap. Know your real daily revenue and estimated profit margins instantly.'}
            </p>
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div style={{
          backgroundColor: isDark ? '#211710' : 'var(--surface-elevated)',
          borderRadius: '24px',
          padding: '36px',
          border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontFamily: 'Fraunces, serif', color: isDark ? '#FFF4E5' : 'var(--brown-dark)', fontSize: '2rem', marginBottom: '12px' }}>
            {isAm ? 'የሱቅዎን አሰራር ለማዘመን ዝግጁ ነዎት?' : 'Ready to digitize your shop?'}
          </h2>
          <p style={{ color: isDark ? '#E2D2C1' : 'var(--text-muted)', marginBottom: '24px' }}>
            {isAm 
              ? 'በአዲስ አበባ እና በክልል ከተሞች የሚገኙ በሺዎች የሚቆጠሩ አነስተኛ ነጋዴዎችን ዛሬውኑ ይቀላቀሉ።'
              : 'Join thousands of Ethiopian small business owners building resilient retail enterprises.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => switchRole('merchant')} className="btn btn-gold btn-lg">
              {isAm ? 'የነጋዴ ፖርታልን ይሞክሩ' : 'Launch Merchant Demo Portal'} <ArrowRight size={18} />
            </button>
            <button onClick={() => setCurrentPath('/auth')} className="btn btn-outline btn-lg">
              {isAm ? 'የነጋዴ መለያ ይክፈቱ' : 'Create Merchant Account'}
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
