import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { UserRole } from './types';

// Public Pages
import { LandingPage } from './components/public/LandingPage';
import { AboutPage } from './components/public/AboutPage';
import { HowItWorksPage } from './components/public/HowItWorksPage';
import { ForMerchantsPage } from './components/public/ForMerchantsPage';
import { ForWholesalersPage } from './components/public/ForWholesalersPage';
import { ForDeliveryPage } from './components/public/ForDeliveryPage';
import { ForCustomersPage } from './components/public/ForCustomersPage';
import { ContactPage } from './components/public/ContactPage';
import { AuthPage } from './components/public/AuthPage';

// Merchant Pages
import { MerchantDashboard } from './components/merchant/MerchantDashboard';
import { MerchantCreditHub } from './components/merchant/MerchantCreditHub';
import { MerchantMarketplace } from './components/merchant/MerchantMarketplace';
import { MerchantInventory } from './components/merchant/MerchantInventory';
import { MerchantOrders } from './components/merchant/MerchantOrders';
import { MerchantReports } from './components/merchant/MerchantReports';

// Wholesaler Pages
import { WholesalerDashboard } from './components/wholesaler/WholesalerDashboard';
import { WholesalerProducts } from './components/wholesaler/WholesalerProducts';
import { WholesalerOrders } from './components/wholesaler/WholesalerOrders';
import { WholesalerAnalytics } from './components/wholesaler/WholesalerAnalytics';

// Delivery Pages
import { DeliveryDashboard } from './components/delivery/DeliveryDashboard';
import { DeliveryJobs } from './components/delivery/DeliveryJobs';
import { DeliveryActive } from './components/delivery/DeliveryActive';
import { DeliveryEarnings } from './components/delivery/DeliveryEarnings';

// Customer Pages
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { CustomerCredits } from './components/customer/CustomerCredits';
import { CustomerPayments } from './components/customer/CustomerPayments';

// Navigation & Layout Components
import { RoleSidebar } from './components/navigation/RoleSidebar';
import { RoleHeader } from './components/navigation/RoleHeader';
import { LanguageToggle } from './components/common/LanguageToggle';
import { ThemeToggle } from './components/common/ThemeToggle';
import {
  Store,
  Boxes,
  Truck,
  UserCheck,
  Sparkles,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const { currentPath, setCurrentPath, currentUser, switchUserRole, cart, t, language } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isPublicPage =
    currentPath === '/' ||
    currentPath === '/about' ||
    currentPath === '/how-it-works' ||
    currentPath === '/for-merchants' ||
    currentPath === '/for-wholesalers' ||
    currentPath === '/for-delivery' ||
    currentPath === '/for-customers' ||
    currentPath === '/auth' ||
    currentPath === '/reset-password';

  // Render Public Page Header
  const renderPublicNav = () => {
    const isDark = theme === 'dark';
    return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: isDark ? 'rgba(15, 12, 9, 0.96)' : 'rgba(255, 248, 231, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: isDark ? '1px solid rgba(255, 170, 44, 0.2)' : '1px solid rgba(74, 46, 23, 0.1)',
      padding: '14px 24px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div
          onClick={() => setCurrentPath('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: isDark ? '#FFAA2C' : '#38210F',
            color: isDark ? '#160D06' : '#F4C542',
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
            <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: '1.35rem', color: isDark ? '#FFF4E5' : '#38210F', lineHeight: 1 }}>
              {language === 'am' ? 'ተወዳጅ' : 'TEWEDAJ'}
            </div>
            <div style={{ fontSize: '0.65rem', color: isDark ? '#FFB94D' : '#D99A20', fontWeight: 700, letterSpacing: '1px' }}>
              {language === 'am' ? 'ተወዳጅ • ዲጂታል ንግድ' : 'TEWEDAJ ተወዳጅ • Digital Commerce'}
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button
            onClick={() => setCurrentPath('/')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPath === '/' ? (isDark ? '#FFB94D' : '#D99A20') : (isDark ? '#F0DFCD' : '#4A2E17'),
              fontWeight: currentPath === '/' ? 700 : 500,
              fontSize: '0.88rem'
            }}
          >
            {t('nav.home', 'Home')}
          </button>
          <button
            onClick={() => setCurrentPath('/how-it-works')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPath === '/how-it-works' ? (isDark ? '#FFB94D' : '#D99A20') : (isDark ? '#F0DFCD' : '#4A2E17'),
              fontWeight: currentPath === '/how-it-works' ? 700 : 500,
              fontSize: '0.88rem'
            }}
          >
            {t('nav.howItWorks', 'How It Works')}
          </button>
          <button
            onClick={() => setCurrentPath('/for-merchants')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPath === '/for-merchants' ? (isDark ? '#FFB94D' : '#D99A20') : (isDark ? '#F0DFCD' : '#4A2E17'),
              fontWeight: currentPath === '/for-merchants' ? 700 : 500,
              fontSize: '0.88rem'
            }}
          >
            {t('nav.merchants', 'Merchants')}
          </button>
          <button
            onClick={() => setCurrentPath('/for-wholesalers')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPath === '/for-wholesalers' ? (isDark ? '#FFB94D' : '#D99A20') : (isDark ? '#F0DFCD' : '#4A2E17'),
              fontWeight: currentPath === '/for-wholesalers' ? 700 : 500,
              fontSize: '0.88rem'
            }}
          >
            {t('nav.wholesalers', 'Wholesalers')}
          </button>
          <button
            onClick={() => setCurrentPath('/for-delivery')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPath === '/for-delivery' ? (isDark ? '#FFB94D' : '#D99A20') : (isDark ? '#F0DFCD' : '#4A2E17'),
              fontWeight: currentPath === '/for-delivery' ? 700 : 500,
              fontSize: '0.88rem'
            }}
          >
            {t('nav.delivery', 'Delivery')}
          </button>
          <button
            onClick={() => setCurrentPath('/for-customers')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPath === '/for-customers' ? (isDark ? '#FFB94D' : '#D99A20') : (isDark ? '#F0DFCD' : '#4A2E17'),
              fontWeight: currentPath === '/for-customers' ? 700 : 500,
              fontSize: '0.88rem'
            }}
          >
            {t('nav.customers', 'Customers')}
          </button>
          <button
            onClick={() => setCurrentPath('/about')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPath === '/about' ? (isDark ? '#FFB94D' : '#D99A20') : (isDark ? '#F0DFCD' : '#4A2E17'),
              fontWeight: currentPath === '/about' ? 700 : 500,
              fontSize: '0.88rem'
            }}
          >
            {t('nav.about', 'About Us')}
          </button>
          <button
            onClick={() => setCurrentPath('/contact')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPath === '/contact' ? (isDark ? '#FFB94D' : '#D99A20') : (isDark ? '#F0DFCD' : '#4A2E17'),
              fontWeight: currentPath === '/contact' ? 700 : 500,
              fontSize: '0.88rem'
            }}
          >
            {t('nav.contact', 'Contact')}
          </button>
        </nav>

        {/* CTA Buttons & Language/Theme Switchers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ThemeToggle compact={true} />
          <LanguageToggle />
          <button
            onClick={() => setCurrentPath('/auth')}
            className="btn btn-outline btn-sm"
          >
            {t('nav.signIn', 'Sign In')}
          </button>
          <button
            onClick={() => setCurrentPath('/auth')}
            className="btn btn-gold btn-sm"
          >
            {t('nav.openPortal', 'Open Demo Portal')}
          </button>
        </div>
      </div>
    </header>
    );
  };

  // Render Public Page Body
  const renderPublicContent = () => {
    switch (currentPath) {
      case '/':
        return <LandingPage />;
      case '/about':
        return <AboutPage />;
      case '/how-it-works':
        return <HowItWorksPage />;
      case '/for-merchants':
        return <ForMerchantsPage />;
      case '/for-wholesalers':
        return <ForWholesalersPage />;
      case '/for-delivery':
        return <ForDeliveryPage />;
      case '/for-customers':
        return <ForCustomersPage />;
      case '/contact':
        return <ContactPage />;
      case '/auth':
        return <AuthPage />;
      case '/reset-password':
        return <AuthPage initialMode="reset_password" />;
      default:
        return <LandingPage />;
    }
  };

  // Render Authenticated Dashboard Body
  const renderDashboardContent = () => {
    switch (currentPath) {
      // Merchant Routes
      case '/merchant/dashboard':
        return <MerchantDashboard />;
      case '/merchant/credit-hub':
      case '/merchant/credit':
        return <MerchantCreditHub />;
      case '/merchant/marketplace':
        return <MerchantMarketplace />;
      case '/merchant/inventory':
        return <MerchantInventory />;
      case '/merchant/orders':
        return <MerchantOrders />;
      case '/merchant/reports':
        return <MerchantReports />;

      // Wholesaler Routes
      case '/wholesaler/dashboard':
        return <WholesalerDashboard />;
      case '/wholesaler/products':
        return <WholesalerProducts />;
      case '/wholesaler/orders':
        return <WholesalerOrders />;
      case '/wholesaler/analytics':
        return <WholesalerAnalytics />;

      // Delivery Partner Routes
      case '/delivery/dashboard':
        return <DeliveryDashboard />;
      case '/delivery/jobs':
        return <DeliveryJobs />;
      case '/delivery/active':
        return <DeliveryActive />;
      case '/delivery/earnings':
        return <DeliveryEarnings />;

      // Customer Portal Routes
      case '/customer/dashboard':
        return <CustomerDashboard />;
      case '/customer/credits':
        return <CustomerCredits />;
      case '/customer/payments':
        return <CustomerPayments />;

      default:
        // Fallback based on role
        if (currentUser?.role === 'merchant') return <MerchantDashboard />;
        if (currentUser?.role === 'wholesaler') return <WholesalerDashboard />;
        if (currentUser?.role === 'delivery') return <DeliveryDashboard />;
        if (currentUser?.role === 'customer') return <CustomerDashboard />;
        return <MerchantDashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: theme === 'dark' ? '#0F0C09' : '#FFF8E7' }}>
      {isPublicPage ? (
        /* PUBLIC MARKETING SITE */
        <>
          {renderPublicNav()}
          <main style={{ flex: 1 }}>
            {renderPublicContent()}
          </main>
        </>
      ) : (
        /* AUTHENTICATED DASHBOARD APPLICATION */
        <div className="dashboard-layout">
          {/* Left Role-specific Sidebar */}
          <RoleSidebar />

          {/* Main Dashboard Canvas */}
          <div className="dashboard-main">
            <RoleHeader />
            <div className="dashboard-content">
              {renderDashboardContent()}
            </div>
          </div>
        </div>
      )}

      {/* QUICK ROLE SWITCHER FLOATING DOCK (To test all 4 Ethiopian Ecosystem roles seamlessly) */}
      <div style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 9999,
        backgroundColor: '#38210F',
        borderRadius: '30px',
        padding: '6px 10px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
        border: '2px solid #D99A20',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span style={{ color: '#F4C542', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', padding: '0 6px' }}>
          {language === 'am' ? '⚡ ሚና ይቀይሩ:' : '⚡ Switch Role:'}
        </span>

        <button
          onClick={() => switchUserRole('merchant')}
          style={{
            padding: '5px 10px',
            borderRadius: '20px',
            backgroundColor: currentUser?.role === 'merchant' && !isPublicPage ? '#D99A20' : 'rgba(255,255,255,0.1)',
            color: '#FFF8E7',
            border: 'none',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title={language === 'am' ? 'ነጋዴ / ሱቅ (አልማዝ)' : 'Merchant / Kiosk (Almaz)'}
        >
          <Store size={12} /> {language === 'am' ? 'ነጋዴ' : 'Merchant'}
        </button>

        <button
          onClick={() => switchUserRole('wholesaler')}
          style={{
            padding: '5px 10px',
            borderRadius: '20px',
            backgroundColor: currentUser?.role === 'wholesaler' && !isPublicPage ? '#D99A20' : 'rgba(255,255,255,0.1)',
            color: '#FFF8E7',
            border: 'none',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title={language === 'am' ? 'ጅምላ ሻጭ / አቅራቢ (በቀለ)' : 'Wholesaler / Supplier (Bekele)'}
        >
          <Boxes size={12} /> {language === 'am' ? 'ጅምላ ሻጭ' : 'Wholesaler'}
        </button>

        <button
          onClick={() => switchUserRole('delivery')}
          style={{
            padding: '5px 10px',
            borderRadius: '20px',
            backgroundColor: currentUser?.role === 'delivery' && !isPublicPage ? '#4F7D3A' : 'rgba(255,255,255,0.1)',
            color: '#FFF8E7',
            border: 'none',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title={language === 'am' ? 'አጓጓዥ / ባጃጅ ካርጎ (ዳዊት)' : 'Delivery Rider / Bajaj Cargo (Dawit)'}
        >
          <Truck size={12} /> {language === 'am' ? 'አጓጓዥ' : 'Delivery'}
        </button>

        <button
          onClick={() => switchUserRole('customer')}
          style={{
            padding: '5px 10px',
            borderRadius: '20px',
            backgroundColor: currentUser?.role === 'customer' && !isPublicPage ? '#00695C' : 'rgba(255,255,255,0.1)',
            color: '#FFF8E7',
            border: 'none',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title={language === 'am' ? 'ገዢ / ደንበኛ (ትዕግስት)' : 'Buyer / Customer (Tigist)'}
        >
          <UserCheck size={12} /> {language === 'am' ? 'ደንበኛ' : 'Customer'}
        </button>

        {!isPublicPage && (
          <button
            onClick={() => setCurrentPath('/')}
            style={{
              padding: '5px 8px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#F4C542',
              border: 'none',
              fontSize: '0.7rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            title={language === 'am' ? 'ወደ ድረ-ገጹ ተመለስ' : 'Return to Public Website'}
          >
            {language === 'am' ? 'ድረ-ገጽ ↗' : 'Web ↗'}
          </button>
        )}

        <div style={{ marginLeft: '4px', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '6px' }}>
          <ThemeToggle compact={true} />
        </div>
      </div>
    </div>
  );
}
