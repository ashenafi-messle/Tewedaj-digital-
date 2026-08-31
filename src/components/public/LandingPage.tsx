'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../common/Navbar';
import {
  CreditCard,
  ShoppingBag,
  Truck,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Store,
  Boxes,
  Sparkles,
  Award,
  ChevronRight,
  Receipt,
  FileCheck2,
  TrendingUp,
  MapPin,
  Coffee,
  Apple,
  Sparkle,
  Shirt,
  PackageCheck,
  Smartphone,
  Wallet,
  Check,
  ArrowDown,
  RefreshCw,
  PhoneCall,
  Lock,
  Building2,
  BadgePercent
} from 'lucide-react';
import { DEMO_IMPACT_METRICS } from '../../data/mockData';

// Realistic Ethiopian MSME Photography Collection Assets
const imgGroceryMerchant = '/images/grocery_merchant_1787137578767.jpg';
const imgCafeOwner = '/images/cafe_owner_1787137597742.jpg';
const imgProduceMarket = '/images/produce_market_1787137624624.jpg';
const imgBeautyCosmetics = '/images/beauty_cosmetics_1787137645491.jpg';
const imgClothingRetail = '/images/clothing_retail_1787137668373.jpg';
const imgDeliveryHandover = '/images/delivery_handover_1787137685138.jpg';

export const LandingPage: React.FC = () => {
  const { setCurrentPath, switchRole, t, language, theme } = useApp();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'all' | 'credit' | 'supply' | 'delivery'>('all');

  const merchantCards = [
    {
      id: 1,
      title: language === 'am' ? 'የሰፈር ሸቀጣ ሸቀጥ ሱቅ' : 'Small Grocery & Sundries',
      type: language === 'am' ? 'የሰፈር ችርቻሮ እና የፍጆታ ዕቃዎች' : 'Neighborhood Retail & FMCG',
      location: language === 'am' ? 'ቦሌ ቡልቡላ፣ ጎንደር' : 'Bole Bulbula, Gondar',
      roleKey: 'merchant' as const,
      image: imgGroceryMerchant,
      icon: Store,
      badge: language === 'am' ? 'ሸቀጣ ሸቀጥና እህል' : 'Grocery & Dry Goods',
      feature: language === 'am' ? 'ዲጂታል የብድር መዝገብ' : 'Digital Credit Ledger',
      benefit: language === 'am' ? 'የደንበኞችን ብድር ይቆጣጠሩ፣ ተፈላጊ ዕቃዎችን ይከታተሉ እንዲሁም ጤፍና ዘይት ከሱቅ ሳይወጡ በጅምላ ይዘዙ።' : 'Manage customer credit, track fast-moving stock, and reorder teff & cooking oil without leaving your shop.',
      impact: language === 'am' ? '100% ያለጭቅጭቅ የሚመዘገብ የደንበኛ ብድር' : '100% Zero-dispute customer credit'
    },
    {
      id: 2,
      title: language === 'am' ? 'ባህላዊ ካፌና የቡና መቁያ' : 'Traditional Café & Roastery',
      type: language === 'am' ? 'መስተንግዶና የቡና አቅርቦት' : 'Hospitality & Bean Supply',
      location: language === 'am' ? 'ካዛንቺስ፣ ጎንደር' : 'Kazanchis, Gondar',
      roleKey: 'merchant' as const,
      image: imgCafeOwner,
      icon: Coffee,
      badge: language === 'am' ? 'ቡናና መስተንግዶ' : 'Coffee & Hospitality',
      feature: language === 'am' ? 'ቀጥታ ከአምራች ማዘዣ' : 'Direct Sourcing',
      benefit: language === 'am' ? 'ጥራት ያላቸው የይርጋጨፌ እና የሲዳማ ቡናዎችን በቀጥታ ከአቅራቢዎች ጠዋት በታቀደ ማጓጓዣ ይቀበሉ።' : 'Source premium Yirgacheffe and Sidama coffee sacks directly from agro-suppliers with scheduled morning drop-offs.',
      impact: language === 'am' ? 'በየሳምንቱ ለገበያ የሚባክን 4.5 ሰዓታት ይቆጥባል' : '4.5 hrs saved weekly on market travel'
    },
    {
      id: 3,
      title: language === 'am' ? 'የአትክልትና ፍራፍሬ መደብር' : 'Fresh Produce & Vegetable Stall',
      type: language === 'am' ? 'ትኩስ የግብርና ምርቶች' : 'Fresh Agricultural Market',
      location: language === 'am' ? 'ፒያሳ፣ ጎንደር' : 'Piazza Central, Gondar',
      roleKey: 'merchant' as const,
      image: imgProduceMarket,
      icon: Apple,
      badge: language === 'am' ? 'የግብርና ምርቶች' : 'Agricultural Produce',
      feature: language === 'am' ? 'ፈጣን የዕቃ ፍሰት' : 'Fast Perishables Flow',
      benefit: language === 'am' ? 'የቀጥታ የጅምላ የገበያ ዋጋዎችን ይመልከቱ እና አትክልትና ፍራፍሬዎ ሳይበላሽ በባጃጅ በፍጥነት እንዲደርስዎት ያድርጉ።' : 'Access live wholesale market prices and on-demand Bajaj delivery to keep your vegetables and fruits crisp and fresh.',
      impact: language === 'am' ? 'የምርት ብክነትን በ28% ይቀንሳል' : '28% reduction in produce spoilage'
    },
    {
      id: 4,
      title: language === 'am' ? 'የውበትና የንጽህና መጠበቂያ ቡቲክ' : 'Beauty & Personal Care Boutique',
      type: language === 'am' ? 'ኮስሞቲክስና የውበት ዕቃዎች' : 'Cosmetics & Personal Care',
      location: language === 'am' ? 'ሜክሲኮ፣ ጎንደር' : 'Mexico Square, Gondar',
      roleKey: 'merchant' as const,
      image: imgBeautyCosmetics,
      icon: Sparkle,
      badge: language === 'am' ? 'ውበትና ጤና' : 'Beauty & Care',
      feature: language === 'am' ? 'የደረሰኝ AI OCR ስካነር' : 'OCR Receipt Scanner',
      benefit: language === 'am' ? 'የወረቀት ደረሰኞችን በስልክዎ ካሜራ ስካን በማድረግ የዕቃ ክምችት፣ የመግዣ ዋጋና ትርፍዎን ወዲያውኑ ይመዝግቡ።' : 'Scan paper supplier invoices with your camera to instantly update inventory, cost prices, and daily profit margins.',
      impact: language === 'am' ? 'በወር ከ45,000+ ብር በላይ ዲጂታል ሽያጭ' : 'ETB 45,000+ monthly digital sales'
    },
    {
      id: 5,
      title: language === 'am' ? 'የአልባሳትና ባህላዊ ጨርቃጨርቅ ሱቅ' : 'Apparel & Traditional Textiles',
      type: language === 'am' ? 'ፋሽንና ጨርቃጨርቅ ችርቻሮ' : 'Fashion & Fabric Retail',
      location: language === 'am' ? 'ገበያ ማዕከል፣ ጎንደር' : 'Market Trade Center, Gondar',
      roleKey: 'merchant' as const,
      image: imgClothingRetail,
      icon: Shirt,
      badge: language === 'am' ? 'አልባሳትና ጨርቆች' : 'Apparel & Fabrics',
      feature: language === 'am' ? 'ተለዋዋጭ የክፍያ ውሎች' : 'Flexible Installments',
      benefit: language === 'am' ? 'ለደንበኞችዎ በሲቢኢ ብር (CBE Birr) እና በቴሌብር ግልጽ የሆነ የክፍያ ጊዜ ሰሌዳ ያዘጋጁላቸው።' : 'Structure customer monthly installments with transparent CBE Birr and Telebirr digital payment schedules.',
      impact: language === 'am' ? '98% በወቅቱ የሚከፈል ብድር' : '98% on-time credit repayment'
    },
    {
      id: 6,
      title: language === 'am' ? 'የሰፈር ጭነት አጓጓዥ' : 'Doorstep Cargo Courier',
      type: language === 'am' ? 'ከጅምላ ወደ ሱቅ ማጓጓዝ' : 'Wholesale-to-Shop Logistics',
      location: language === 'am' ? 'ጎንደር' : 'Gondar Trade Corridors',
      roleKey: 'delivery_partner' as const,
      image: imgDeliveryHandover,
      icon: PackageCheck,
      badge: language === 'am' ? 'የባጃጅና ቫን ጭነት' : 'Bajaj & Van Delivery',
      feature: language === 'am' ? 'የ4-አሃዝ OTP ምስጢር ቁጥር' : '4-Digit OTP Security',
      benefit: language === 'am' ? 'የጅምላ ዕቃዎችን ከመጋዘን ተረክበው ለሱቆች ደጃፍ ያድርሱ፤ ወዲያውኑ ክፍያዎን በሞባይል ቦርሳዎ ይቀበሉ።' : 'Pick up wholesale packages from warehouses and deliver directly to shop doorsteps with instant mobile wallet payouts.',
      impact: language === 'am' ? 'ከ15-30 ደቂቃ ፈጣን የጭነት ርክክብ' : '15-30 min express cargo turnaround'
    }
  ];

  return (
    <div className="landing-page" style={{ backgroundColor: 'var(--cream-primary)', color: 'var(--text-dark)', overflowX: 'hidden' }}>
      <Navbar />
      
      {/* =========================================================================
          1. HERO SECTION: BOLD SATURATED GOLDEN-YELLOW WITH ORGANIC SILHOUETTES
          ========================================================================= */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(145deg, #F6C515 0%, #F4A900 65%, #E68A00 100%)',
        padding: '50px 24px 80px',
        overflow: 'hidden',
        borderBottom: '4px solid #3D2817'
      }}>
        {/* Subtle Organic Background Shapes & Leaf Motifs */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 216, 61, 0.45) 0%, rgba(246, 197, 21, 0) 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          width: '320px',
          height: '320px',
          borderRadius: '45% 55% 60% 40%',
          background: 'rgba(230, 138, 0, 0.25)',
          pointerEvents: 'none'
        }} />

        {/* Floating Organic Leaf SVG Watermarks */}
        <svg
          style={{ position: 'absolute', top: '20px', right: '48%', opacity: 0.15, pointerEvents: 'none' }}
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="#3D2817"
        >
          <path d="M50 0 C20 30 10 70 50 100 C90 70 80 30 50 0 Z" />
        </svg>
        <svg
          style={{ position: 'absolute', bottom: '25px', left: '12%', opacity: 0.18, pointerEvents: 'none' }}
          width="60"
          height="60"
          viewBox="0 0 100 100"
          fill="#4D7A35"
        >
          <path d="M50 5 C25 25 15 65 50 95 C85 65 75 25 50 5 Z" />
        </svg>

        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Hero Left Content */}
          <div>
            {/* Eyebrow badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: isDark ? '#0F0C09' : '#3D2817',
              color: isDark ? '#FFB94D' : '#FFD83D',
              padding: '7px 16px',
              borderRadius: '999px',
              fontSize: '0.84rem',
              fontWeight: 800,
              letterSpacing: '0.4px',
              marginBottom: '22px',
              boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(61, 40, 23, 0.2)'
            }}>
              <Sparkles size={16} color={isDark ? '#FFB94D' : '#FFD83D'} />
              {language === 'am' ? 'ለአነስተኛ ነጋዴዎች የተዘጋጀ ዲጂታል መድረክ' : 'Digital Business Platform for Small Merchants'}
            </div>

            {/* Main Bold Headline */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontFamily: 'Fraunces, serif',
              color: isDark ? '#FFF4E5' : '#3D2817',
              lineHeight: 1.08,
              marginBottom: '22px',
              letterSpacing: '-0.8px',
              fontWeight: 800
            }}>
              {language === 'am' ? (
                <>
                  በእምነት ይግዙ።<br />
                  <span style={{ color: isDark ? '#FFB94D' : '#FFFFFF', textShadow: isDark ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(61, 40, 23, 0.3)' }}>በልበ ሙሉነት ይሽጡ።</span><br />
                  ከተወዳጅ ጋር ያድጉ።
                </>
              ) : (
                <>
                  Buy with Trust.<br />
                  <span style={{ color: isDark ? '#FFB94D' : '#FFFFFF', textShadow: isDark ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(61, 40, 23, 0.3)' }}>Sell with Confidence.</span><br />
                  Grow with TEWEDAJ.
                </>
              )}
            </h1>

            {/* Supporting Text */}
            <p style={{
              fontSize: '1.15rem',
              color: isDark ? '#E2D2C1' : '#3D2817',
              lineHeight: 1.6,
              marginBottom: '34px',
              maxWidth: '560px',
              fontWeight: 500
            }}>
              {language === 'am'
                ? 'ተወዳጅ አነስተኛ ነጋዴዎችን ከአስተማማኝ ብድር፣ አቅራቢዎችና አጓጓዦች ጋር በማገናኘት የዕቃ ክምችትን፣ ሽያጭንና የዕለት ተዕለት ንግድን እንዲያቀላጥፉ ያግዛል።'
                : 'TEWEDAJ connects small merchants with trusted credit, suppliers and delivery while helping them manage inventory, sales and everyday business.'}
            </p>

            {/* CTA Buttons: Pill-shaped with High Contrast */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '36px' }}>
              <button
                id="hero-primary-cta"
                onClick={() => setCurrentPath('/auth')}
                style={{
                  backgroundColor: isDark ? '#0F0C09' : '#3D2817',
                  color: isDark ? '#FFB94D' : '#FFF8E7',
                  border: isDark ? '2px solid #FFAA2C' : '2px solid #3D2817',
                  padding: '14px 32px',
                  borderRadius: '9999px',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: isDark ? '0 6px 20px rgba(0, 0, 0, 0.3)' : '0 6px 20px rgba(61, 40, 23, 0.35)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.backgroundColor = isDark ? '#1A1109' : '#26160A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = isDark ? '#0F0C09' : '#3D2817';
                }}
              >
                {language === 'am' ? 'ይጀምሩ' : 'Get Started'}
                <ArrowRight size={18} />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={() => setCurrentPath('/how-it-works')}
                style={{
                  backgroundColor: isDark ? '#0F0C09' : '#FFF8E7',
                  color: isDark ? '#FFB94D' : '#3D2817',
                  border: isDark ? '2px solid #FFAA2C' : '2px solid #3D2817',
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isDark ? '0 4px 14px rgba(0, 0, 0, 0.3)' : '0 4px 14px rgba(61, 40, 23, 0.15)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = '#FFF8E7';
                }}
              >
                {language === 'am' ? 'ተወዳጅ እንዴት ይሰራል?' : 'How TEWEDAJ Works'}
              </button>
            </div>

            {/* Trust Badges */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              paddingTop: '18px',
              borderTop: '1.5px solid rgba(61, 40, 23, 0.2)',
              fontSize: '0.85rem',
              color: '#3D2817',
              fontWeight: 700,
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={18} color="#4D7A35" />
                {language === 'am' ? 'ቴሌብርና ሲቢኢ ፈቃዶች' : 'Telebirr & CBE Mandates'}
              </div>
              <span>•</span>
              <div>{language === 'am' ? '100% ግልጽ የብድር መዝገብ' : '100% Transparent Ledger'}</div>
              <span>•</span>
              <div>{language === 'am' ? 'ቀጥታ አቅርቦት' : 'Direct Supply'}</div>
            </div>
          </div>

          {/* Hero Right: Organic Rounded Merchant Visual Container */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Organic Decorative Backdrop Blob */}
            <div style={{
              position: 'absolute',
              inset: '-14px -10px -14px -10px',
              background: 'radial-gradient(circle, #FFD83D 30%, #E68A00 100%)',
              borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%',
              zIndex: 1,
              transform: 'rotate(-2deg)',
              boxShadow: '0 24px 50px rgba(61, 40, 23, 0.25)'
            }} />

            {/* Organic Leaf Accent Top Right */}
            <div style={{
              position: 'absolute',
              top: '-18px',
              right: '-12px',
              backgroundColor: '#4D7A35',
              color: '#FFF8E7',
              width: '46px',
              height: '46px',
              borderRadius: '50% 10% 50% 50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 4,
              boxShadow: '0 6px 16px rgba(77, 122, 53, 0.4)',
              transform: 'rotate(25deg)'
            }}>
              <Sparkle size={20} />
            </div>

            {/* Main Visual Frame */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              backgroundColor: '#FFF8E7',
              padding: '14px',
              borderRadius: '32px',
              border: '3px solid #3D2817',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(61, 40, 23, 0.2)'
            }}>
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '16 / 10'
              }}>
                <img
                  src={imgGroceryMerchant}
                  alt="Authentic Ethiopian grocery shop owner checking digital ledger on smartphone"
                  referrerPolicy="no-referrer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Live Floating Badge Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(61, 40, 23, 0.92)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFD83D',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <CheckCircle2 size={14} color="#4D7A35" />
                  Live Platform Connected
                </div>

                {/* Bottom Overlay Info */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(45, 27, 13, 0.95) 0%, rgba(45, 27, 13, 0.4) 65%, transparent 100%)',
                  padding: '14px 20px',
                  color: '#FFF8E7'
                }}>
                  <div style={{ fontSize: '0.82rem', color: '#FFD83D', fontWeight: 600 }}>
                    Tracking daily credit & automated teff restock orders
                  </div>
                </div>
              </div>

              {/* Floating Live Activity Counters */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginTop: '12px'
              }}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  border: '1px solid rgba(61, 40, 23, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    backgroundColor: '#EEF5E5',
                    color: '#4D7A35',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Truck size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#756B5D', fontWeight: 600 }}>Bajaj Restock</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#3D2817' }}>5 Quintals Arrived</div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  border: '1px solid rgba(61, 40, 23, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    backgroundColor: '#FFF6D6',
                    color: '#E68A00',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Smartphone size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#756B5D', fontWeight: 600 }}>Telebirr Mandate</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#3D2817' }}>ETB 2,500 Repaid</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PRODUCT / SERVICE CARDS (CREAM BACKGROUND)
          ========================================================================= */}
      <section style={{
        backgroundColor: '#FFF8E7',
        padding: '80px 24px',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px', maxWidth: '680px', margin: '0 auto 52px' }}>
            <span style={{
              color: '#E68A00',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '1.2px'
            }}>
              {language === 'am' ? 'ዋና ዋና አገልግሎቶች' : 'Core Platform Services'}
            </span>
            <h2 style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(2rem, 3vw, 2.7rem)',
              color: '#3D2817',
              margin: '8px 0 14px',
              fontWeight: 800
            }}>
              {language === 'am' ? 'ሱቅዎ እንዲያድግ የሚያስፈልገው ሁሉ' : 'Everything your shop needs to thrive'}
            </h2>
            <p style={{ color: '#756B5D', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {language === 'am'
                ? 'ተወዳጅ የአነስተኛ ንግዶችን ገንዘብ፣ እቃዎች፣ የትራንስፖርትና የብድር መዝገብ በአንድ ቀላልና የተቀናጀ የሞባይል ሥርዓት ያገናኛል።'
                : 'TEWEDAJ connects the money, goods, delivery and credit records of small businesses into one simple, unified mobile ecosystem.'}
            </p>
          </div>

          {/* 4 Main Service Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '26px'
          }}>
            {/* Card 1: Trusted Credit */}
            <div
              id="card-trusted-credit"
              className="card card-interactive"
              onClick={() => switchRole('merchant')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '30px 24px',
                border: '2px solid rgba(61, 40, 23, 0.1)',
                boxShadow: '0 8px 24px rgba(61, 40, 23, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                backgroundColor: '#FFF6D6',
                color: '#E68A00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                border: '1.5px solid #F6C515'
              }}>
                <Wallet size={26} />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#E68A00', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                {language === 'am' ? 'ዲጂታል ብድር' : 'DIGITAL CREDIT'}
              </span>
              <h3 style={{ color: '#3D2817', fontSize: '1.35rem', marginBottom: '10px', fontFamily: 'Fraunces, serif', fontWeight: 700 }}>
                {language === 'am' ? 'አስተማማኝ ብድር' : 'Trusted Credit'}
              </h3>
              <p style={{ color: '#756B5D', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                {language === 'am'
                  ? 'ግልጽ የሆነ የዲጂታል ብድር ውል ይመስርቱ፤ የደብተር ጭቅጭቅ ሳይኖር እያንዳንዱን ክፍያ ይከታተሉ።'
                  : 'Create transparent digital credit agreements and track every repayment without notebook disputes.'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E68A00', fontWeight: 800, fontSize: '0.88rem' }}>
                {language === 'am' ? 'የብድር ማዕከልን ያስሱ' : 'Explore Credit Hub'} <ChevronRight size={16} />
              </div>
            </div>

            {/* Card 2: Easy Restocking */}
            <div
              id="card-easy-restocking"
              className="card card-interactive"
              onClick={() => switchRole('wholesaler')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '30px 24px',
                border: '2px solid rgba(61, 40, 23, 0.1)',
                boxShadow: '0 8px 24px rgba(61, 40, 23, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                backgroundColor: '#FFF0D9',
                color: '#3D2817',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                border: '1.5px solid #E68A00'
              }}>
                <Boxes size={26} />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#3D2817', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                {language === 'am' ? 'የጅምላ አቅርቦት ገበያ' : 'SUPPLY MARKETPLACE'}
              </span>
              <h3 style={{ color: '#3D2817', fontSize: '1.35rem', marginBottom: '10px', fontFamily: 'Fraunces, serif', fontWeight: 700 }}>
                {language === 'am' ? 'ቀላል የጅምላ ግዢ' : 'Easy Restocking'}
              </h3>
              <p style={{ color: '#756B5D', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                {language === 'am'
                  ? 'ምርቶችንና ጥሬ ዕቃዎችን በቀጥታ ከመጋዘን፣ ከአርሶ አደሮች እና ከተረጋገጡ ፋብሪካዎች ያግኙ።'
                  : 'Find products and raw materials directly from trusted wholesalers, regional farmers, and certified manufacturers.'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3D2817', fontWeight: 800, fontSize: '0.88rem' }}>
                {language === 'am' ? 'የጅምላ ገበያ ይመልከቱ' : 'Browse Wholesale'} <ChevronRight size={16} />
              </div>
            </div>

            {/* Card 3: Delivered to Your Shop */}
            <div
              id="card-delivery"
              className="card card-interactive"
              onClick={() => switchRole('delivery_partner')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '30px 24px',
                border: '2px solid rgba(61, 40, 23, 0.1)',
                boxShadow: '0 8px 24px rgba(61, 40, 23, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                backgroundColor: '#EEF5E5',
                color: '#4D7A35',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                border: '1.5px solid #4D7A35'
              }}>
                <Truck size={26} />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#4D7A35', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                {language === 'am' ? 'ፈጣን ማጓጓዣ' : 'LOCAL LOGISTICS'}
              </span>
              <h3 style={{ color: '#3D2817', fontSize: '1.35rem', marginBottom: '10px', fontFamily: 'Fraunces, serif', fontWeight: 700 }}>
                {language === 'am' ? 'እስከ ሱቅዎ ደጃፍ ማድረስ' : 'Delivered to Your Shop'}
              </h3>
              <p style={{ color: '#756B5D', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                {language === 'am'
                  ? 'ሱቅዎን ሳይዘጉ ወይም የተጋነነ የትራንስፖርት ወጪ ሳያወጡ የሚፈልጉትን በባጃጅ ያዘዙ።'
                  : 'Order what you need without closing your shop door or paying unnecessary, inflated transport costs.'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4D7A35', fontWeight: 800, fontSize: '0.88rem' }}>
                {language === 'am' ? 'የአጓጓዥ መረብ ይመልከቱ' : 'View Delivery Network'} <ChevronRight size={16} />
              </div>
            </div>

            {/* Card 4: Know Your Business */}
            <div
              id="card-inventory"
              className="card card-interactive"
              onClick={() => switchRole('merchant')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '30px 24px',
                border: '2px solid rgba(61, 40, 23, 0.1)',
                boxShadow: '0 8px 24px rgba(61, 40, 23, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                backgroundColor: '#FAF3E3',
                color: '#E68A00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                border: '1.5px solid #F6C515'
              }}>
                <BarChart3 size={26} />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#E68A00', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                {language === 'am' ? 'የሱቅ አስተዳደር' : 'STORE MANAGEMENT'}
              </span>
              <h3 style={{ color: '#3D2817', fontSize: '1.35rem', marginBottom: '10px', fontFamily: 'Fraunces, serif', fontWeight: 700 }}>
                {language === 'am' ? 'ንግድዎን በውል ይወቁ' : 'Know Your Business'}
              </h3>
              <p style={{ color: '#756B5D', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                {language === 'am'
                  ? 'የዕቃ ክምችት፣ ግዢ፣ ሽያጭ እና ያልተሰበሰበ የደንበኛ ብድርን በአንድ ግልጽ ዳሽቦርድ ይቆጣጠሩ።'
                  : 'Track inventory, purchases, sales and outstanding customer credit in one clear, real-time dashboard.'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E68A00', fontWeight: 800, fontSize: '0.88rem' }}>
                {language === 'am' ? 'የሱቅ መቆጣጠሪያ ይክፈቱ' : 'Open Store Manager'} <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. REAL ETHIOPIAN MERCHANTS SECTION (WHITE BACKGROUND / HIGH CRAFT)
          ========================================================================= */}
      <section style={{
        backgroundColor: isDark ? '#0F0C09' : '#FFFFFF',
        padding: '85px 24px',
        borderTop: isDark ? '1px solid rgba(255, 170, 44, 0.2)' : '1px solid rgba(61, 40, 23, 0.1)',
        borderBottom: isDark ? '1px solid rgba(255, 170, 44, 0.2)' : '1px solid rgba(61, 40, 23, 0.1)'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px', maxWidth: '760px', margin: '0 auto 50px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: isDark ? '#211710' : '#FAF3E3',
              color: isDark ? '#FFB94D' : '#3D2817',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 800,
              marginBottom: '14px',
              border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : '1px solid #F6C515'
            }}>
              <CheckCircle2 size={14} color={isDark ? '#73B84D' : '#4D7A35'} />
              {language === 'am' ? 'እውነተኛ የኢትዮጵያ አነስተኛና መካከለኛ ንግዶች' : 'AUTHENTIC ETHIOPIAN MSMES'}
            </div>
            <h2 style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(2.1rem, 3.5vw, 2.9rem)',
              color: isDark ? '#FFF4E5' : '#3D2817',
              lineHeight: 1.18,
              margin: '6px 0 16px',
              fontWeight: 800
            }}>
              {language === 'am' ? 'ማህበረሰባችንን ለሚያንቀሳቅሱ ንግዶች የተሰራ።' : 'Built for the businesses that keep our communities moving.'}
            </h2>
            <p style={{ color: isDark ? '#E2D2C1' : '#756B5D', fontSize: '1.08rem', lineHeight: 1.6 }}>
              {language === 'am'
                ? 'የሸቀጣ ሸቀጥ ሱቅ፣ ካፌ፣ የአልባሳት መደብር፣ የውበት ሳሎን ወይም የሰፈር ንግድ ይኑርዎት፤ ተወዳጅ ንግድዎ ያለማቋረጥ እንዲቀጥል ያግዝዎታል።'
                : 'Whether you run a grocery shop, café, clothing store, beauty shop or neighborhood business, TEWEDAJ helps you keep your business running.'}
            </p>
          </div>

          {/* 6 Merchant Photography Cards (16:9) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px'
          }}>
            {merchantCards.map((card) => {
              const IconComp = card.icon;
              return (
                <div
                  key={card.id}
                  id={`merchant-card-${card.id}`}
                  className="card card-interactive"
                  onClick={() => switchRole(card.roleKey)}
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: isDark ? '#211710' : '#FFF8E7',
                    borderRadius: '24px',
                    border: isDark ? '1.5px solid rgba(255, 170, 44, 0.3)' : '1.5px solid rgba(61, 40, 23, 0.12)',
                    boxShadow: isDark ? '0 6px 20px rgba(0, 0, 0, 0.3)' : '0 6px 20px rgba(61, 40, 23, 0.06)'
                  }}
                >
                  {/* Photo Container with 16:9 Aspect Ratio */}
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden' }}>
                    <img
                      src={card.image}
                      alt={card.title}
                      referrerPolicy="no-referrer"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                    />

                    {/* Sector Badge Overlay */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: isDark ? 'rgba(15, 12, 9, 0.95)' : 'rgba(61, 40, 23, 0.92)',
                      backdropFilter: 'blur(6px)',
                      color: isDark ? '#FFB94D' : '#FFD83D',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <IconComp size={13} />
                      <span>{card.badge}</span>
                    </div>

                    {/* Location Pin */}
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '12px',
                      backgroundColor: isDark ? 'rgba(15, 12, 9, 0.95)' : 'rgba(255, 248, 231, 0.95)',
                      color: isDark ? '#FFF4E5' : '#3D2817',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <MapPin size={11} color={isDark ? '#FFB94D' : '#E68A00'} />
                      <span>{card.location}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '1.25rem', color: isDark ? '#FFF4E5' : '#3D2817', margin: '0 0 4px', fontFamily: 'Fraunces, serif', fontWeight: 700 }}>
                        {card.title}
                      </h3>
                      <span style={{
                        display: 'inline-block',
                        backgroundColor: isDark ? '#FFAA2C' : '#FFD83D',
                        color: isDark ? '#160D06' : '#3D2817',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 800
                      }}>
                        {card.feature}
                      </span>
                    </div>

                    <div style={{
                      fontSize: '0.88rem',
                      color: isDark ? '#E2D2C1' : '#3D2817',
                      lineHeight: 1.55,
                      backgroundColor: isDark ? '#0F0C09' : '#FFFFFF',
                      padding: '14px',
                      borderRadius: '14px',
                      borderLeft: isDark ? '4px solid #FFAA2C' : '4px solid #F6C515',
                      margin: '6px 0 16px 0',
                      flex: 1
                    }}>
                      {card.benefit}
                    </div>

                    {/* Impact Metric & CTA Footer */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      borderTop: isDark ? '1px solid rgba(255, 170, 44, 0.2)' : '1px solid rgba(61, 40, 23, 0.08)',
                      fontSize: '0.82rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isDark ? '#73B84D' : '#4D7A35', fontWeight: 800 }}>
                        <CheckCircle2 size={15} />
                        <span>{card.impact}</span>
                      </div>
                      <div style={{ color: isDark ? '#FFB94D' : '#E68A00', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Open Solution <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SUPPLIER SECTION: BOLD GOLDEN-YELLOW SECTION
          ========================================================================= */}
      <section style={{
        backgroundColor: isDark ? '#211710' : '#F6C515',
        background: isDark ? 'linear-gradient(135deg, #211710 0%, #1A1109 100%)' : 'linear-gradient(135deg, #F6C515 0%, #F4A900 100%)',
        padding: '85px 24px',
        borderTop: isDark ? '3px solid #FFAA2C' : '3px solid #3D2817',
        borderBottom: isDark ? '3px solid #FFAA2C' : '3px solid #3D2817',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '44px',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: isDark ? '#0F0C09' : '#3D2817',
                color: isDark ? '#FFB94D' : '#FFF8E7',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 800,
                marginBottom: '18px'
              }}>
                <Boxes size={15} color={isDark ? '#FFB94D' : '#FFD83D'} />
                {language === 'am' ? 'የጅምላ ሻጮች፣ አርሶ አደሮችና አምራቾች' : 'WHOLESALERS, FARMERS & MANUFACTURERS'}
              </div>

              <h2 style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                color: isDark ? '#FFF4E5' : '#3D2817',
                lineHeight: 1.12,
                marginBottom: '18px',
                fontWeight: 800
              }}>
                {language === 'am' ? 'የዕቃ ክምችትዎን ወደ ብዙ ደንበኞች ይለውጡ።' : 'Turn your inventory into more customers.'}
              </h2>

              <p style={{
                fontSize: '1.1rem',
                color: isDark ? '#E2D2C1' : '#3D2817',
                lineHeight: 1.6,
                marginBottom: '28px'
              }}>
                {language === 'am'
                  ? 'ተወዳጅ ለአቅራቢዎች በመቶዎች የሚቆጠሩ አነስተኛ ሱቆችን እንዲያገኙ፣ ቀጥታ ትዕዛዞችን እንዲቀበሉ እና ማጓጓዝን እንዲያስተባብሩ ዲጂታል መንገድ ይሰጣል።'
                  : 'TEWEDAJ gives suppliers a digital channel to reach hundreds of small merchants, receive orders and coordinate delivery.'}
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  id="supplier-cta-btn"
                  onClick={() => switchRole('wholesaler')}
                  style={{
                    backgroundColor: isDark ? '#0F0C09' : '#3D2817',
                    color: isDark ? '#FFB94D' : '#FFF8E7',
                    border: isDark ? '2px solid #FFAA2C' : '2px solid #3D2817',
                    padding: '13px 30px',
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 18px rgba(61, 40, 23, 0.3)'
                  }}
                >
                  {language === 'am' ? 'አቅራቢ ይሁኑ' : 'Become a Supplier'}
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => setCurrentPath('/for-wholesalers')}
                  style={{
                    backgroundColor: isDark ? '#0F0C09' : '#FFF8E7',
                    color: isDark ? '#FFB94D' : '#3D2817',
                    border: isDark ? '2px solid #FFAA2C' : '2px solid #3D2817',
                    padding: '13px 24px',
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {language === 'am' ? 'የጅምላ ዝርዝሮች' : 'Wholesale Details'}
                </button>
              </div>

              {/* Supplier Key Highlights */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px',
                marginTop: '32px'
              }}>
                <div style={{ backgroundColor: isDark ? '#0F0C09' : '#FFF8E7', padding: '14px 18px', borderRadius: '16px', border: isDark ? '1.5px solid #FFAA2C' : '1.5px solid #3D2817' }}>
                  <div style={{ fontWeight: 800, color: isDark ? '#73B84D' : '#4D7A35', fontSize: '1.2rem' }}>
                    {language === 'am' ? 'ቀጥታ ፍላጎት' : 'Direct Demand'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: isDark ? '#E2D2C1' : '#756B5D' }}>
                    {language === 'am' ? 'ከ500+ በላይ የተረጋገጡ የሰፈር ሱቆችን ያግኙ' : 'Access 500+ verified neighborhood kiosks'}
                  </div>
                </div>
                <div style={{ backgroundColor: isDark ? '#0F0C09' : '#FFF8E7', padding: '14px 18px', borderRadius: '16px', border: isDark ? '1.5px solid #FFAA2C' : '1.5px solid #3D2817' }}>
                  <div style={{ fontWeight: 800, color: isDark ? '#FFB94D' : '#E68A00', fontSize: '1.2rem' }}>
                    {language === 'am' ? 'አስተማማኝ OTP' : 'Guaranteed OTP'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: isDark ? '#E2D2C1' : '#756B5D' }}>
                    {language === 'am' ? 'በ4-አሃዝ የሚስጥር ኮድ የተጠበቀ ርክክብ' : 'Zero lost packages with 4-digit driver pin'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Supplier Imagery Frame */}
            <div style={{
              backgroundColor: isDark ? '#0F0C09' : '#FFF8E7',
              padding: '16px',
              borderRadius: '30px',
              border: isDark ? '3px solid #FFAA2C' : '3px solid #3D2817',
              boxShadow: isDark ? '0 16px 36px rgba(0, 0, 0, 0.3)' : '0 16px 36px rgba(61, 40, 23, 0.15)'
            }}>
              <div style={{
                borderRadius: '22px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '16 / 10'
              }}>
                <img
                  src={imgProduceMarket}
                  alt="Ethiopian fresh wholesale agriculture commodities"
                  referrerPolicy="no-referrer"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  background: isDark ? 'linear-gradient(to top, rgba(15, 12, 9, 0.95) 0%, transparent 100%)' : 'linear-gradient(to top, rgba(61, 40, 23, 0.9) 0%, transparent 100%)',
                  color: isDark ? '#FFF4E5' : '#FFF8E7'
                }}>
                  <span style={{ backgroundColor: isDark ? '#73B84D' : '#4D7A35', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                    {language === 'am' ? 'የእርሻና የፍጆታ ዕቃዎች ማዕከል' : 'Agricultural & FMCG Hub'}
                  </span>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, marginTop: '4px' }}>
                    {language === 'am' ? 'ጤፍ፣ ቡና፣ ዘይትና ቅመማ ቅመም በቀጥታ ለችርቻሮ ሱቆች' : 'Bulk Teff, Coffee, Oil & Spices directly to retail stores'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. HOW TEWEDAJ CONNECTS EVERYONE (VISUAL ECOSYSTEM)
          ========================================================================= */}
      <section style={{
        backgroundColor: isDark ? '#0F0C09' : '#FFF8E7',
        padding: '85px 24px',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px', maxWidth: '700px', margin: '0 auto 52px' }}>
            <span style={{
              color: isDark ? '#73B84D' : '#4D7A35',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '1.2px'
            }}>
              {language === 'am' ? 'የተሳሰረ ሥነ-ምህዳር' : 'Connected Ecosystem'}
            </span>
            <h2 style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(2.1rem, 3.5vw, 2.9rem)',
              color: isDark ? '#FFF4E5' : '#3D2817',
              margin: '8px 0 14px',
              fontWeight: 800
            }}>
              {language === 'am' ? 'ተወዳጅ ሁሉንም እንዴት እንደሚያገናኝ' : 'How TEWEDAJ Connects Everyone'}
            </h2>
            <p style={{ color: isDark ? '#E2D2C1' : '#756B5D', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {language === 'am'
                ? 'ገንዘብን፣ እቃዎችን፣ ማጓጓዝንና የሂሳብ መዝገቦችን ያለምንም ውጣ ውረድ የሚያስተሳስር ፈጣን የንግድ ዑደት።'
                : 'A continuous, frictionless commerce circle connecting the money, goods, delivery and records in under 3 seconds.'}
            </p>
          </div>

          {/* Connected Flow Diagram Card */}
          <div style={{
            backgroundColor: isDark ? '#211710' : '#FFFFFF',
            borderRadius: '28px',
            padding: '40px 28px',
            border: isDark ? '2px solid rgba(255, 170, 44, 0.3)' : '2px solid rgba(61, 40, 23, 0.12)',
            boxShadow: isDark ? '0 12px 32px rgba(0, 0, 0, 0.3)' : '0 12px 32px rgba(61, 40, 23, 0.08)'
          }}>
            {/* Center Hub + Nodes Flow */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              position: 'relative'
            }}>
              {[
                {
                  step: '1',
                  role: language === 'am' ? 'ደንበኛ' : 'CUSTOMER',
                  action: language === 'am' ? 'እቃ ወይም ብድር ይጠይቃል' : 'Requests items or credit',
                  icon: Users,
                  color: '#E68A00'
                },
                {
                  step: '2',
                  role: language === 'am' ? 'ብድር' : 'CREDIT',
                  action: language === 'am' ? 'ግልጽ ዲጂታል ውል ይመዘገባል' : 'Transparent digital terms',
                  icon: CreditCard,
                  color: '#F6C515'
                },
                {
                  step: '3',
                  role: language === 'am' ? 'ነጋዴ' : 'MERCHANT',
                  action: language === 'am' ? 'ሽያጩን አጽድቆ ክምችት ያረጋግጣል' : 'Approves sale & checks stock',
                  icon: Store,
                  color: '#3D2817'
                },
                {
                  step: '4',
                  role: language === 'am' ? 'ትዕዛዝ' : 'ORDER',
                  action: language === 'am' ? 'በ1 ጠቅታ የጅምላ ትዕዛዝ ይሰጣል' : '1-tap bulk replenishment',
                  icon: ShoppingBag,
                  color: '#E68A00'
                },
                {
                  step: '5',
                  role: language === 'am' ? 'የጅምላ አቅራቢ' : 'WHOLESALER',
                  action: language === 'am' ? 'የታዘዘውን ምርት ያዘጋጃል' : 'Prepares commodity crate',
                  icon: Boxes,
                  color: '#3D2817'
                },
                {
                  step: '6',
                  role: language === 'am' ? 'አጓጓዥ' : 'DELIVERY',
                  action: language === 'am' ? 'በባጃጅ ተረክቦ በOTP ያስረክባል' : 'Bajaj dispatch & OTP drop',
                  icon: Truck,
                  color: '#4D7A35'
                },
                {
                  step: '7',
                  role: language === 'am' ? 'ክምችት' : 'INVENTORY',
                  action: language === 'am' ? 'የዕቃ ክምችት በራስ-ሰር ይስተካከላል' : 'Auto-updated stock value',
                  icon: BarChart3,
                  color: '#E68A00'
                },
                {
                  step: '8',
                  role: language === 'am' ? 'ሽያጭና ክፍያ' : 'SALES & CASH',
                  action: language === 'am' ? 'በቴሌብር/ሲቢኢ ክፍያ ይፈጸማል' : 'Telebirr/CBE repayment',
                  icon: CheckCircle2,
                  color: '#4D7A35'
                },
              ].map((node, i) => {
                const IconComp = node.icon;
                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: isDark ? '#0F0C09' : '#FFF8E7',
                      borderRadius: '18px',
                      padding: '20px 16px',
                      border: isDark ? '1.5px solid rgba(255, 170, 44, 0.3)' : '1.5px solid rgba(61, 40, 23, 0.15)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: node.color,
                      color: node.color === '#F6C515' || node.color === '#FFD83D' ? '#3D2817' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '10px',
                      boxShadow: isDark ? '0 4px 10px rgba(0, 0, 0, 0.3)' : '0 4px 10px rgba(61, 40, 23, 0.15)'
                    }}>
                      <IconComp size={20} />
                    </div>

                    <div style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: isDark ? '#73B84D' : '#4D7A35',
                      letterSpacing: '0.8px',
                      marginBottom: '2px'
                    }}>
                      {language === 'am' ? `ደረጃ 0${node.step}` : `STEP 0${node.step}`}
                    </div>

                    <div style={{
                      fontSize: '0.98rem',
                      fontWeight: 800,
                      color: isDark ? '#FFF4E5' : '#3D2817',
                      fontFamily: 'Fraunces, serif',
                      marginBottom: '4px'
                    }}>
                      {node.role}
                    </div>

                    <div style={{
                      fontSize: '0.78rem',
                      color: isDark ? '#E2D2C1' : '#756B5D',
                      lineHeight: 1.4
                    }}>
                      {node.action}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Central TEWEDAJ Hub Banner */}
            <div style={{
              marginTop: '32px',
              backgroundColor: isDark ? '#211710' : '#FAF3E3',
              borderRadius: '20px',
              padding: '22px 24px',
              border: isDark ? '2px solid #FFAA2C' : '2px solid #F6C515',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: isDark ? '#0F0C09' : '#3D2817',
                  color: isDark ? '#FFB94D' : '#FFD83D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Fraunces, serif',
                  fontWeight: 800,
                  fontSize: '1.4rem'
                }}>
                  ተ
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: isDark ? '#FFF4E5' : '#3D2817', fontSize: '1.1rem' }}>
                    {language === 'am' ? 'የተወዳጅ የቀጥታ ማስታረቂያ ማዕከል' : 'TEWEDAJ Real-Time Reconciliation Core'}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: isDark ? '#E2D2C1' : '#756B5D' }}>
                    {language === 'am'
                      ? 'የብድር ሂሳቦችን፣ ትዕዛዞችን፣ ጭነቶችንና የገንዘብ ዝውውርን ያለእጅ ድካም በቅጽበት ያመሳስላል።'
                      : 'Syncs credit balances, orders, cargo dispatch, and cash flows without manual data entry.'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentPath('/how-it-works')}
                style={{
                  backgroundColor: isDark ? '#0F0C09' : '#3D2817',
                  color: isDark ? '#FFB94D' : '#FFF8E7',
                  border: isDark ? '1px solid #FFAA2C' : 'none',
                  padding: '10px 22px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {language === 'am' ? 'ሙሉ አሰራሩን ይመልከቱ' : 'Learn Full Architecture'} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. HIGH-IMPACT CREDIT SECTION (DEEP GOLDEN-ORANGE BACKGROUND)
          ========================================================================= */}
      <section style={{
        background: isDark ? 'linear-gradient(135deg, #211710 0%, #1A1109 100%)' : 'linear-gradient(135deg, #F4A900 0%, #E68A00 100%)',
        padding: '85px 24px',
        borderTop: isDark ? '3px solid #FFAA2C' : '3px solid #3D2817',
        borderBottom: isDark ? '3px solid #FFAA2C' : '3px solid #3D2817',
        color: isDark ? '#FFF4E5' : '#3D2817',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            {/* Left Credit Text & Regulatory Safety */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: isDark ? '#0F0C09' : '#3D2817',
                color: isDark ? '#FFB94D' : '#FFD83D',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 800,
                marginBottom: '18px'
              }}>
                <ShieldCheck size={16} color={isDark ? '#73B84D' : '#4D7A35'} />
                {language === 'am' ? 'የኢትዮጵያ ዲጂታል ብድር መስፈርት' : 'ETHIOPIAN DIGITAL CREDIT STANDARD'}
              </div>

              <h2 style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                color: isDark ? '#FFF4E5' : '#3D2817',
                lineHeight: 1.1,
                marginBottom: '20px',
                fontWeight: 800
              }}>
                {language === 'am' ? 'የሰፈር ብድርን አስተማማኝና ደህንነቱ የተጠበቀ ያድርጉ።' : 'Make informal credit safer.'}
              </h2>

              <p style={{
                fontSize: '1.1rem',
                color: isDark ? '#E2D2C1' : '#3D2817',
                lineHeight: 1.65,
                marginBottom: '24px',
                fontWeight: 500
              }}>
                {language === 'am'
                  ? 'ተወዳጅ የብድር ስምምነቶችንና የክፍያ ታሪክን ይመዘግባል፤ የተፈቀዱ የክፍያ አጋሮች ደግሞ በደንበኛው ፈቃድ ክፍያዎችን በህጋዊ መንገድ ያስፈጽማሉ።'
                  : 'TEWEDAJ records the agreement and repayment history, while approved financial partners execute authorized payment transactions.'}
              </p>

              {/* Trust Callout */}
              <div style={{
                backgroundColor: isDark ? 'rgba(15, 12, 9, 0.95)' : 'rgba(255, 248, 231, 0.95)',
                borderRadius: '16px',
                padding: '16px 20px',
                border: isDark ? '1.5px solid #FFAA2C' : '1.5px solid #3D2817',
                marginBottom: '28px',
                fontSize: '0.88rem',
                color: isDark ? '#FFF4E5' : '#3D2817'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: isDark ? '#73B84D' : '#4D7A35', marginBottom: '4px' }}>
                  <Lock size={16} /> {language === 'am' ? 'የተረጋገጠ የክፍያ ጥበቃ ዋስትና' : 'Regulated Payment Flow Guarantee'}
                </div>
                <div>
                  {language === 'am'
                    ? 'ምንም ዓይነት የባንክ ፒን ወይም ያልተፈቀደ ቅነሳ አይደረግም። ሁሉም ክፍያዎች በደንበኛው የኤስኤምኤስ OTP ምስጢር ቁጥር ፈቃድ ብቻ ይፈጸማሉ።'
                    : 'No banking PINs or unauthorized deductions. All debit mandates require explicit SMS OTP consent from the customer.'}
                </div>
              </div>

              <button
                id="credit-hub-cta-btn"
                onClick={() => switchRole('merchant')}
                style={{
                  backgroundColor: isDark ? '#0F0C09' : '#3D2817',
                  color: isDark ? '#FFB94D' : '#FFF8E7',
                  border: isDark ? '2px solid #FFAA2C' : '2px solid #3D2817',
                  padding: '14px 30px',
                  borderRadius: '9999px',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: isDark ? '0 6px 18px rgba(0, 0, 0, 0.3)' : '0 6px 18px rgba(61, 40, 23, 0.3)'
                }}
              >
                {language === 'am' ? 'የብድር ማዕከልን ሞክሩ' : 'Launch Credit Hub Demo'}
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Right: Visual Interactive Credit Ledger Simulator */}
            <div style={{
              backgroundColor: isDark ? '#211710' : '#FFFFFF',
              borderRadius: '28px',
              padding: '30px',
              border: isDark ? '3px solid #FFAA2C' : '3px solid #3D2817',
              boxShadow: isDark ? '0 18px 40px rgba(0, 0, 0, 0.3)' : '0 18px 40px rgba(61, 40, 23, 0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: isDark ? '#FFF4E5' : '#3D2817' }}>
                  {language === 'am' ? 'የቀጥታ መዝገብ #CR-8821' : 'LIVE LEDGER RECORD #CR-8821'}
                </span>
                <span style={{
                  backgroundColor: isDark ? '#0F0C09' : '#EEF5E5',
                  color: isDark ? '#73B84D' : '#4D7A35',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '0.74rem',
                  fontWeight: 800
                }}>
                  {language === 'am' ? '✓ የቴሌብር ፈቃድ' : '✓ TELEBIRR MANDATE'}
                </span>
              </div>

              {/* Top Credit Summary Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '10px',
                backgroundColor: isDark ? '#0F0C09' : '#FAF3E3',
                padding: '16px',
                borderRadius: '16px',
                border: isDark ? '1.5px solid rgba(255, 170, 44, 0.3)' : '1.5px solid rgba(61, 40, 23, 0.12)',
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: isDark ? '#E2D2C1' : '#756B5D', fontWeight: 600 }}>
                    {language === 'am' ? 'ዋና ብድር' : 'Original Credit'}
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFF4E5' : '#3D2817', fontFamily: 'Fraunces, serif' }}>
                    2,000 ብር
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: isDark ? '#E2D2C1' : '#756B5D', fontWeight: 600 }}>
                    {language === 'am' ? 'የተከፈለ' : 'Paid'}
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#73B84D' : '#4D7A35', fontFamily: 'Fraunces, serif' }}>
                    1,000 ብር
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: isDark ? '#E2D2C1' : '#756B5D', fontWeight: 600 }}>
                    {language === 'am' ? 'ቀሪ' : 'Remaining'}
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#FFB94D' : '#E68A00', fontFamily: 'Fraunces, serif' }}>
                    1,000 ብር
                  </div>
                </div>
              </div>

              {/* Repayment Log Entries */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  backgroundColor: isDark ? '#0F0C09' : '#FFF8E7',
                  borderRadius: '12px',
                  border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : '1px solid rgba(61, 40, 23, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color={isDark ? '#73B84D' : '#4D7A35'} />
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: isDark ? '#FFF4E5' : '#3D2817' }}>
                      {language === 'am' ? '500 ብር ተከፍሏል' : 'ETB 500 repayment'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: isDark ? '#E2D2C1' : '#756B5D' }}>
                    {language === 'am' ? 'ነሐሴ 02 • ቴሌብር' : 'Aug 02 • Telebirr'}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  backgroundColor: isDark ? '#0F0C09' : '#FFF8E7',
                  borderRadius: '12px',
                  border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : '1px solid rgba(61, 40, 23, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color={isDark ? '#73B84D' : '#4D7A35'} />
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: isDark ? '#FFF4E5' : '#3D2817' }}>
                      {language === 'am' ? '300 ብር ተከፍሏል' : 'ETB 300 repayment'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: isDark ? '#E2D2C1' : '#756B5D' }}>
                    {language === 'am' ? 'ነሐሴ 08 • ሲቢኢ ብር' : 'Aug 08 • CBE Birr'}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  backgroundColor: isDark ? '#0F0C09' : '#FFF8E7',
                  borderRadius: '12px',
                  border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : '1px solid rgba(61, 40, 23, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color={isDark ? '#73B84D' : '#4D7A35'} />
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: isDark ? '#FFF4E5' : '#3D2817' }}>
                      {language === 'am' ? '200 ብር ተከፍሏል' : 'ETB 200 repayment'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: isDark ? '#E2D2C1' : '#756B5D' }}>
                    {language === 'am' ? 'ነሐሴ 15 • ቴሌብር' : 'Aug 15 • Telebirr'}
                  </span>
                </div>
              </div>

              {/* Final Badge */}
              <div style={{
                backgroundColor: isDark ? '#0F0C09' : '#EEF5E5',
                border: isDark ? '2px solid #73B84D' : '2px solid #4D7A35',
                borderRadius: '14px',
                padding: '12px',
                textAlign: 'center',
                fontWeight: 800,
                color: isDark ? '#73B84D' : '#4D7A35',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <Check size={18} />
                <span>{language === 'am' ? '✓ ሙሉ በሙሉ ተከፍሏል • የእምነት ነጥብ +25 አድጓል' : '✓ FULLY REPAID • TRUST SCORE INCREASED +25 PTS'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. HOW IT WORKS (7 STEP PIPELINE)
          ========================================================================= */}
      <section style={{ backgroundColor: isDark ? '#0F0C09' : '#FAF3E3', padding: '85px 24px', borderBottom: isDark ? '1px solid rgba(255, 170, 44, 0.2)' : '1px solid rgba(61, 40, 23, 0.1)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px', maxWidth: '660px', margin: '0 auto 52px' }}>
            <span style={{ color: isDark ? '#73B84D' : '#4D7A35', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {language === 'am' ? 'የደረጃ በደረጃ ሂደት' : 'Step-by-Step Workflow'}
            </span>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '2.5rem', color: isDark ? '#FFF4E5' : '#3D2817', margin: '8px 0 14px', fontWeight: 800 }}>
              {language === 'am' ? 'ተወዳጅ እንዴት ይሰራል?' : 'How TEWEDAJ Works'}
            </h2>
            <p style={{ color: isDark ? '#E2D2C1' : '#756B5D', fontSize: '1.05rem' }}>
              {language === 'am'
                ? 'ከዲጂታል ምዝገባ ጀምሮ እስከ ደጃፍ ርክክብ እና አውቶማቲክ ክፍያ ድረስ።'
                : 'From digital registration to doorstep stock replenishment and automated repayment.'}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {[
              {
                step: '01',
                title: language === 'am' ? 'የሱቅ መለያ መክፈት' : 'Merchant Account Setup',
                desc: language === 'am' ? 'ነጋዴው ሱቁን፣ አድራሻውንና የተረጋገጠ የሞባይል ቦርሳውን በሰከንዶች ውስጥ ያስመዘግባል።' : 'Shopkeeper registers their store, neighborhood location, and verified mobile money wallet in seconds.'
              },
              {
                step: '02',
                title: language === 'am' ? 'የተረጋገጡ አቅራቢዎችን ማግኘት' : 'Discover Verified Suppliers',
                desc: language === 'am' ? 'የጅምላ ጤፍ፣ ቡና፣ ዱቄት፣ ዘይትና ሌሎች የፍጆታ ዕቃዎችን በቀጥታ ካታሎግ ይመልከቱ።' : 'Browse bulk teff, coffee, flour, cooking oils, and FMCG directly from certified wholesale catalogs.'
              },
              {
                step: '03',
                title: language === 'am' ? 'በ1-ጠቅታ እቃ ማዘዝ' : 'Order Products with 1-Tap',
                desc: language === 'am' ? 'ሱቅዎን ሳይዘጉ ወይም ወደ መርካቶ ሳይጓዙ የጅምላ እቃዎችን በስልክዎ ይዘዙ።' : 'Place bulk replenishment orders without having to close your shop or travel to crowded market sheds.'
              },
              {
                step: '04',
                title: language === 'am' ? 'የአጓጓዥ ምደባ' : 'Delivery Partner Dispatched',
                desc: language === 'am' ? 'በአቅራቢያ ያለ ባጃጅ ወይም ቫን አጓጓዥ ትዕዛዙን ተረክቦ የጭነት ፓኬጁን ያነሳል።' : 'Nearby Bajaj or van courier accepts the pickup job and collects the verified cargo parcel.'
              },
              {
                step: '05',
                title: language === 'am' ? 'ደንበኞች በሱቅ ይሸምታሉ' : 'Customer Purchases at Shop',
                desc: language === 'am' ? 'የሰፈር ነዋሪዎች የዕለት ተዕለት ፍጆታቸውን በጥሬ ገንዘብ ወይም በተመዘገበ ብድር ይገዛሉ።' : 'Local neighborhood families buy daily household staples with cash or structured store credit.'
              },
              {
                step: '06',
                title: language === 'am' ? 'ዲጂታል የብድር ስምምነት' : 'Digital Credit Agreement',
                desc: language === 'am' ? 'ብድር ሲጠየቅ ግልጽ የመክፈያ ጊዜ የያዘ የዲጂታል መዝገብ ወዲያውኑ ይፈጠራል።' : 'If credit is requested, a transparent digital ledger entry is generated with clear due dates.'
              },
              {
                step: '07',
                title: language === 'am' ? 'ክፍያና የቀጥታ ሂሳብ ማመሳሰል' : 'Repayment & Live Ledger',
                desc: language === 'am' ? 'ክፍያዎች በቴሌብር ወይም በሲቢኢ ብር ያለልፋት ይፈጸማሉ፤ ሂሳቡም በቅጽበት ይዘምናል።' : 'Repayments occur smoothly via Telebirr or CBE Birr with instant ledger balance updates.'
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: isDark ? '#211710' : '#FFFFFF',
                  borderRadius: '20px',
                  padding: '24px',
                  border: isDark ? '1.5px solid rgba(255, 170, 44, 0.3)' : '1.5px solid rgba(61, 40, 23, 0.1)',
                  boxShadow: isDark ? '0 2px 10px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(61, 40, 23, 0.04)',
                  position: 'relative'
                }}
              >
                <div style={{
                  fontSize: '1.35rem',
                  fontFamily: 'Fraunces, serif',
                  fontWeight: 800,
                  color: isDark ? '#FFB94D' : '#E68A00',
                  marginBottom: '10px'
                }}>
                  {item.step}
                </div>
                <h4 style={{ color: isDark ? '#FFF4E5' : '#3D2817', fontSize: '1.1rem', marginBottom: '8px', fontWeight: 700 }}>
                  {item.title}
                </h4>
                <p style={{ color: isDark ? '#E2D2C1' : '#756B5D', fontSize: '0.88rem', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. TEST LIVE PLATFORM BANNER
          ========================================================================= */}
      <section style={{
        backgroundColor: isDark ? '#211710' : '#F6C515',
        padding: '60px 24px',
        borderTop: isDark ? '3px solid #FFAA2C' : '3px solid #3D2817',
        borderBottom: isDark ? '3px solid #FFAA2C' : '3px solid #3D2817',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '2.2rem', color: isDark ? '#FFF4E5' : '#3D2817', marginBottom: '12px', fontWeight: 800 }}>
            {language === 'am' ? 'የተወዳጅን የቀጥታ መድረክ ይሞክሩ' : 'Experience the live TEWEDAJ ecosystem'}
          </h2>
          <p style={{ color: isDark ? '#E2D2C1' : '#3D2817', fontSize: '1.05rem', marginBottom: '28px', fontWeight: 500 }}>
            {language === 'am'
              ? 'የሚፈልጉትን ሚና በመምረጥ በቀጥታ ወደ መስተጋብራዊ ፖርታሉ ይግቡና ሙሉውን የንግድ ሂደት ይለማመዱ።'
              : 'Select any persona to jump directly into the interactive portal and experience the full commerce cycle.'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => switchRole('merchant')}
              style={{
                backgroundColor: isDark ? '#0F0C09' : '#3D2817',
                color: isDark ? '#FFB94D' : '#FFF8E7',
                border: isDark ? '2px solid #FFAA2C' : '2px solid #3D2817',
                padding: '12px 24px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              {language === 'am' ? 'የነጋዴ ማዕከል' : 'Launch Merchant Hub'}
            </button>
            <button
              onClick={() => switchRole('wholesaler')}
              style={{
                backgroundColor: isDark ? '#0F0C09' : '#FFF8E7',
                color: isDark ? '#FFB94D' : '#3D2817',
                border: isDark ? '2px solid #FFAA2C' : '2px solid #3D2817',
                padding: '12px 24px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              {language === 'am' ? 'የጅምላ አቅራቢ ፖርታል' : 'Launch Wholesaler Portal'}
            </button>
            <button
              onClick={() => switchRole('delivery_partner')}
              style={{
                backgroundColor: isDark ? '#73B84D' : '#4D7A35',
                color: '#FFF8E7',
                border: '2px solid #4D7A35',
                padding: '12px 24px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              {language === 'am' ? 'የአጓጓዥ መቆጣጠሪያ' : 'Launch Delivery Courier'}
            </button>
            <button
              onClick={() => switchRole('customer')}
              style={{
                backgroundColor: isDark ? '#211710' : '#FFFFFF',
                color: isDark ? '#FFB94D' : '#3D2817',
                border: isDark ? '2px solid #FFAA2C' : '2px solid #3D2817',
                padding: '12px 24px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              {language === 'am' ? 'የደንበኛ ብድር መዝገብ' : 'Launch Customer Ledger'}
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FOOTER: DARK GREEN / MUTED OLIVE FOOTER (#2D4822 / #23381B)
          ========================================================================= */}
      <footer style={{
        backgroundColor: isDark ? '#0F0C09' : '#23381B',
        color: isDark ? '#FFF4E5' : '#FFF8E7',
        padding: '70px 24px 40px',
        borderTop: isDark ? '4px solid #FFAA2C' : '4px solid #F6C515'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}>
            {/* Column 1: Brand & Tagline */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: isDark ? '#FFAA2C' : '#F6C515',
                  color: isDark ? '#0F0C09' : '#3D2817',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Fraunces, serif',
                  fontWeight: 800,
                  fontSize: '1.5rem'
                }}>
                  ተ
                </div>
                <div>
                  <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: '1.4rem', color: isDark ? '#FFF4E5' : '#FFF8E7' }}>
                    TEWEDAJ
                  </div>
                  <div style={{ fontSize: '0.7rem', color: isDark ? '#FFB94D' : '#F6C515', fontWeight: 700, letterSpacing: '1px' }}>
                    ተወዳጅ • ETHIOPIA
                  </div>
                </div>
              </div>

              <p style={{ color: isDark ? '#E2D2C1' : '#D2DEC5', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                {language === 'am'
                  ? 'በእምነት ይግዙ። በልበ ሙሉነት ይሽጡ። ከተወዳጅ ጋር ያድጉ።'
                  : 'Buy with trust. Sell with confidence. Grow with TEWEDAJ.'}
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                  color: isDark ? '#FFB94D' : '#F6C515',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}>
                  {language === 'am' ? 'ጎንደር' : 'Gondar'}
                </span>
                <span style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                  color: isDark ? '#FFB94D' : '#F6C515',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}>
                  Telebirr & CBE
                </span>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: isDark ? '#FFB94D' : '#F6C515', marginBottom: '16px', letterSpacing: '0.5px' }}>
                {language === 'am' ? 'የመድረኩ ክፍሎች' : 'PLATFORM ECOSYSTEM'}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                <li>
                  <button onClick={() => setCurrentPath('/for-merchants')} style={{ background: 'none', border: 'none', color: isDark ? '#E2D2C1' : '#D2DEC5', cursor: 'pointer', textAlign: 'left' }}>
                    {language === 'am' ? 'ለነጋዴዎች' : 'For Merchants'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPath('/for-wholesalers')} style={{ background: 'none', border: 'none', color: isDark ? '#E2D2C1' : '#D2DEC5', cursor: 'pointer', textAlign: 'left' }}>
                    {language === 'am' ? 'ለጅምላ አቅራቢዎች' : 'For Wholesalers'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPath('/for-delivery')} style={{ background: 'none', border: 'none', color: isDark ? '#E2D2C1' : '#D2DEC5', cursor: 'pointer', textAlign: 'left' }}>
                    {language === 'am' ? 'ለአጓጓዦች' : 'For Delivery Partners'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPath('/for-customers')} style={{ background: 'none', border: 'none', color: isDark ? '#E2D2C1' : '#D2DEC5', cursor: 'pointer', textAlign: 'left' }}>
                    {language === 'am' ? 'ለደንበኞች' : 'For Customers'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: isDark ? '#FFB94D' : '#F6C515', marginBottom: '16px', letterSpacing: '0.5px' }}>
                {language === 'am' ? 'ተቋማዊ' : 'COMPANY'}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                <li>
                  <button onClick={() => setCurrentPath('/about')} style={{ background: 'none', border: 'none', color: isDark ? '#E2D2C1' : '#D2DEC5', cursor: 'pointer', textAlign: 'left' }}>
                    {language === 'am' ? 'ስለ እኛ' : 'About Us'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPath('/how-it-works')} style={{ background: 'none', border: 'none', color: isDark ? '#E2D2C1' : '#D2DEC5', cursor: 'pointer', textAlign: 'left' }}>
                    {language === 'am' ? 'እንዴት ይሰራል?' : 'How It Works'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPath('/about')} style={{ background: 'none', border: 'none', color: isDark ? '#E2D2C1' : '#D2DEC5', cursor: 'pointer', textAlign: 'left' }}>
                    {language === 'am' ? 'የግላዊነት ፖሊሲ' : 'Privacy Policy'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPath('/about')} style={{ background: 'none', border: 'none', color: isDark ? '#E2D2C1' : '#D2DEC5', cursor: 'pointer', textAlign: 'left' }}>
                    {language === 'am' ? 'የአገልግሎት ውል' : 'Terms of Service'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Regulatory Info */}
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: isDark ? '#FFB94D' : '#F6C515', marginBottom: '16px', letterSpacing: '0.5px' }}>
                {language === 'am' ? 'ህጋዊ ተገዥነት' : 'COMMERCE COMPLIANCE'}
              </div>
              <p style={{ color: isDark ? '#E2D2C1' : '#D2DEC5', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '14px' }}>
                {language === 'am'
                  ? 'በኢትዮጵያ የንግድ ህግ ድንጋጌዎች መሰረት ለአነስተኛ ንግዶች ዲጂታል የብድር መዝገብ እና የተፈቀዱ የክፍያ መተላለፊያዎችን በመጠቀም የተዘጋጀ።'
                  : 'Designed in accordance with Ethiopian Commercial Code provisions for micro-enterprise credit ledgers and authorized financial gateway integrations.'}
              </p>
              <div style={{ fontSize: '0.82rem', color: isDark ? '#FFF4E5' : '#FFF8E7', fontWeight: 700 }}>
                support@tewedaj.et • +251 11 890 0122
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div style={{
            paddingTop: '24px',
            borderTop: isDark ? '1px solid rgba(255, 170, 44, 0.2)' : '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.8rem',
            color: isDark ? '#E2D2C1' : '#A8BC98'
          }}>
            <div>
              © {new Date().getFullYear()} TEWEDAJ Technologies PLC. {language === 'am' ? 'መብቱ በህግ የተጠበቀ ነው። አዲስ አበባ፣ ኢትዮጵያ።' : 'All rights reserved. Addis Ababa, Ethiopia.'}
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>{language === 'am' ? 'ቴሌብር የተገናኘ' : 'Telebirr Integrated'}</span>
              <span>•</span>
              <span>{language === 'am' ? 'ሲቢኢ ብር ፈቃድ' : 'CBE Birr Mandates'}</span>
              <span>•</span>
              <span>{language === 'am' ? 'የኢትዮጵያ MSME መረብ' : 'Ethiopian MSME Network'}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
