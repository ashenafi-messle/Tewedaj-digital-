import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPath, language } = useApp();
  const isAm = language === 'am';

  return (
    <footer style={{
      backgroundColor: '#26160A',
      color: '#FFF8E7',
      paddingTop: '60px',
      paddingBottom: '36px',
      borderTop: '3px solid #D99A20',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          {/* Brand Col */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#F4C542',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38210F',
                fontFamily: 'Fraunces, serif',
                fontWeight: 800,
                fontSize: '1.2rem'
              }}>
                ተ
              </div>
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 800, color: '#FFF8E7' }}>
                {isAm ? 'ተወዳጅ (TEWEDAJ)' : 'TEWEDAJ'}
              </span>
            </div>
            <p style={{ color: '#D4C3A3', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              {isAm 
                ? 'በእምነት ይግዙ፤ በልበ-ሙሉነት ይሽጡ፤ ከተወዳጅ ጋር ያድጉ። የኢትዮጵያ አነስተኛ ንግዶችን በአስተማማኝ ብድር፣ በተረጋገጡ አቅራቢዎች እና በቀልጣፋ ትራንስፖርት እናስተሳስራለን።'
                : 'Buy with trust. Sell with confidence. Grow with TEWEDAJ. Connecting Ethiopian small businesses with trusted credit, verified suppliers, and reliable delivery.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#BAA682' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} color="#F4C542" />
                <span>{isAm ? 'አዲስ አበባ፣ ቦሌ እና መርካቶ የንግድ ማዕከላት፣ ኢትዮጵያ' : 'Addis Ababa, Bole & Merkato Commerce Hubs, Ethiopia'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="#F4C542" />
                <span>+251 911 000 789 / 8820 ({isAm ? 'አጭር ቁጥር' : 'Short Code'})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="#F4C542" />
                <span>support@tewedaj.et</span>
              </div>
            </div>
          </div>

          {/* Solutions Col */}
          <div>
            <h4 style={{ color: '#F4C542', fontSize: '1rem', marginBottom: '16px', fontWeight: 700, letterSpacing: '0.5px' }}>
              {isAm ? 'የስርዓቱ ፖርታሎች' : 'Ecosystem Portals'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button
                  onClick={() => setCurrentPath('/for-merchants')}
                  style={{ background: 'none', border: 'none', color: '#D4C3A3', cursor: 'pointer', padding: 0, fontSize: '0.875rem', textAlign: 'left' }}
                >
                  {isAm ? 'ለሰፈር ሱቆች እና ቸርቻሪዎች' : 'For Small Merchants & Kiosks'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPath('/for-wholesalers')}
                  style={{ background: 'none', border: 'none', color: '#D4C3A3', cursor: 'pointer', padding: 0, fontSize: '0.875rem', textAlign: 'left' }}
                >
                  {isAm ? 'ለጅምላ አቅራቢዎች እና አምራቾች' : 'For Wholesalers & Agro-Suppliers'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPath('/for-delivery')}
                  style={{ background: 'none', border: 'none', color: '#D4C3A3', cursor: 'pointer', padding: 0, fontSize: '0.875rem', textAlign: 'left' }}
                >
                  {isAm ? 'ለባጃጅ እና ካርጎ አጓጓዦች' : 'For Delivery Riders & Bajaj Partners'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPath('/for-customers')}
                  style={{ background: 'none', border: 'none', color: '#D4C3A3', cursor: 'pointer', padding: 0, fontSize: '0.875rem', textAlign: 'left' }}
                >
                  {isAm ? 'ለደንበኞች እና ቤተሰቦች' : 'For Everyday Customers & Buyers'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPath('/how-it-works')}
                  style={{ background: 'none', border: 'none', color: '#D4C3A3', cursor: 'pointer', padding: 0, fontSize: '0.875rem', textAlign: 'left' }}
                >
                  {isAm ? 'ተወዳጅ እንዴት ይሰራል?' : 'How TEWEDAJ Works'}
                </button>
              </li>
            </ul>
          </div>

          {/* Financial & Trust Pillars */}
          <div>
            <h4 style={{ color: '#F4C542', fontSize: '1rem', marginBottom: '16px', fontWeight: 700, letterSpacing: '0.5px' }}>
              {isAm ? 'እምነት እና የክፍያ ፈቃድ' : 'Trust & Mandates'}
            </h4>
            <p style={{ color: '#D4C3A3', fontSize: '0.825rem', lineHeight: 1.6, marginBottom: '14px' }}>
              {isAm 
                ? 'ከቴሌብር እና ከኢትዮጵያ ንግድ ባንክ (CBE) ጋር በመተሳሰር በደንበኛ ኤስኤምኤስ OTP የተረጋገጡ ህጋዊ ዲጂታል ውሎች።'
                : 'Digital credit agreements powered by customer authorization mandates in partnership with Telebirr and CBE Birr.'}
            </p>
            <div style={{
              backgroundColor: 'rgba(255, 248, 231, 0.06)',
              border: '1px solid rgba(244, 197, 66, 0.2)',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '0.8rem',
              color: '#FBE6A2'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, marginBottom: '4px' }}>
                <ShieldCheck size={16} color="#4F7D3A" />
                {isAm ? 'ምንም አይነት የባንክ ሚስጥር አይያዝም' : 'Zero Sensitive Credentials Stored'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#BAA682' }}>
                {isAm 
                  ? 'ምንም ዓይነት የይለፍ ቃል ወይም ፒን ቁጥር አንጠይቅም። ክፍያዎች የሚፈጸሙት በባንኩ ህጋዊ የፈቃድ ስርዓት ብቻ ነው።'
                  : 'No PINs or passwords stored. Repayments execute strictly via official banking mandate capabilities.'}
              </div>
            </div>
          </div>

          {/* Quick links & Join */}
          <div>
            <h4 style={{ color: '#F4C542', fontSize: '1rem', marginBottom: '16px', fontWeight: 700, letterSpacing: '0.5px' }}>
              {isAm ? 'ዛሬውኑ ይጀምሩ' : 'Get Started Today'}
            </h4>
            <p style={{ color: '#D4C3A3', fontSize: '0.85rem', marginBottom: '16px' }}>
              {isAm 
                ? 'ከዕቃ እጥረትና ካልተከፈለ ዕዳ ነጻ ሆነው ንግዳቸውን እያሳደጉ ያሉ በሺዎች የሚቆጠሩ ኢትዮጵያውያን ነጋዴዎችን ይቀላቀሉ።'
                : 'Empowering 10,000+ Ethiopian micro-entrepreneurs to thrive without stock shortages or unpaid debts.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => setCurrentPath('/auth')}
                className="btn btn-gold btn-sm"
                style={{ width: '100%' }}
              >
                {isAm ? 'መለያ ይክፈቱ' : 'Create Account'}
              </button>
              <button
                onClick={() => setCurrentPath('/about')}
                className="btn btn-outline btn-sm"
                style={{ width: '100%', borderColor: 'rgba(255, 248, 231, 0.3)', color: '#FFF8E7' }}
              >
                {isAm ? 'ስለ ተወዳጅ ተልዕኮ' : 'About Our Mission'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 248, 231, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.8rem',
          color: '#BAA682'
        }}>
          <div>
            {isAm ? '© 2026 ተወዳጅ የኢትዮጵያ ኢንተርፕራይዝ። መብቱ በህግ የተጠበቀ ነው። አዲስ አበባ፣ ኢትዮጵያ።' : '© 2026 TEWEDAJ Platform. All rights reserved. Addis Ababa, Ethiopia.'}
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={() => setCurrentPath('/about')} style={{ background: 'none', border: 'none', color: '#BAA682', cursor: 'pointer' }}>{isAm ? 'የግላዊነት ፖሊሲ' : 'Privacy Policy'}</button>
            <button onClick={() => setCurrentPath('/how-it-works')} style={{ background: 'none', border: 'none', color: '#BAA682', cursor: 'pointer' }}>{isAm ? 'የአጠቃቀም ደንብ' : 'Terms of Service'}</button>
            <button onClick={() => setCurrentPath('/contact')} style={{ background: 'none', border: 'none', color: '#BAA682', cursor: 'pointer' }}>{isAm ? 'የድጋፍ ማዕከል' : 'Support Center'}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
