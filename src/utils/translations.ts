export type Language = 'en' | 'am';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    am: string;
  };
}

export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Brand & Slogans
  'app.name': {
    en: 'TEWEDAJ',
    am: 'ተወዳጅ'
  },
  'app.tagline': {
    en: 'ETHIOPIA • MSME Credit Ledger & Wholesale Network',
    am: 'ኢትዮጵያ • የአነስተኛ ንግዶች ዲጂታል ብድር እና የጅምላ አውታረ መረብ'
  },
  'app.subtagline': {
    en: 'Empowering local shopkeepers, cafes, wholesalers & Bajaj logistics with verified digital trust.',
    am: 'የአካባቢ ሱቆችን፣ ካፌዎችን፣ ጅምላ ሻጮችን እና የባጃጅ አጓጓዦችን በዲጂታል እምነት ማብቃት።'
  },

  // Language Switcher
  'lang.switch': {
    en: 'አማርኛ',
    am: 'English'
  },
  'lang.current': {
    en: 'English',
    am: 'አማርኛ'
  },

  // Navigation
  'nav.home': {
    en: 'Home',
    am: 'ዋና ገጽ'
  },
  'nav.howItWorks': {
    en: 'How It Works',
    am: 'እንዴት እንደሚሰራ'
  },
  'nav.merchants': {
    en: 'Merchants & Shops',
    am: 'ሱቆችና ነጋዴዎች'
  },
  'nav.wholesalers': {
    en: 'Wholesalers',
    am: 'ጅምላ አቅራቢዎች'
  },
  'nav.delivery': {
    en: 'Delivery Partners',
    am: 'አጓጓዥ ባልደረቦች'
  },
  'nav.customers': {
    en: 'Customers',
    am: 'ደንበኞች'
  },
  'nav.about': {
    en: 'About Us',
    am: 'ስለ እኛ'
  },
  'nav.signIn': {
    en: 'Sign In',
    am: 'ግባ / መግቢያ'
  },
  'nav.openPortal': {
    en: 'Open Demo Portal',
    am: 'ፖርታል ክፈት'
  },
  'nav.logout': {
    en: 'Log Out',
    am: 'ውጣ'
  },
  'nav.resetPassword': {
    en: 'Reset Password',
    am: 'የይለፍ ቃል ቀይር'
  },
  'nav.portal': {
    en: 'Portal',
    am: 'ፖርታል'
  },
  'nav.notifications': {
    en: 'Notifications',
    am: 'ማሳወቂያዎች'
  },
  'nav.noNotifications': {
    en: 'No notifications yet.',
    am: 'እስካሁን ማሳወቂያ የለም።'
  },
  'nav.changePassword': {
    en: 'Reset / Change Password',
    am: 'የይለፍ ቃል ቀይር'
  },
  'nav.signOut': {
    en: 'Sign Out',
    am: 'ውጣ'
  },
  'nav.wholesaleCart': {
    en: 'Wholesale Cart',
    am: 'የጅምላ ቅርጫት'
  },
  'nav.currentSession': {
    en: 'CURRENT SESSION',
    am: 'የአሁኑ መለያ'
  },
  'nav.verifiedCustomer': {
    en: 'Verified Customer',
    am: 'የተረጋገጠ ደንበኛ'
  },
  'portal.merchant': {
    en: 'Merchant Portal',
    am: 'የሱቅ ነጋዴ ፖርታል'
  },
  'portal.wholesaler': {
    en: 'Wholesaler Portal',
    am: 'የጅምላ አቅራቢ ፖርታል'
  },
  'portal.delivery': {
    en: 'Delivery Portal',
    am: 'የአጓጓዥ ፖርታል'
  },
  'portal.customer': {
    en: 'Customer Portal',
    am: 'የደንበኛ ፖርታል'
  },
  'dashboard.welcome': { en: 'Welcome back', am: 'እንኳን ደህና መጡ' },
  'dashboard.verifiedMerchant': { en: 'Verified Merchant', am: 'የተረጋገጠ ነጋዴ' },
  'dashboard.newCredit': { en: 'New Credit Agreement', am: 'አዲስ የብድር ውል' },
  'dashboard.recordSale': { en: 'Record POS Sale', am: 'የPOS ሽያጭ መዝግብ' },
  'dashboard.scanReceipt': { en: 'Scan Receipt (OCR)', am: 'ደረሰኝ ስካን (OCR)' },
  'dashboard.wholesaleHub': { en: 'Wholesale Hub', am: 'የጅምላ ማዕከል' },
  'dashboard.lowStock': { en: 'Low Stock Warning', am: 'የዝቅተኛ ክምችት ማስጠንቀቂያ' },
  'dashboard.restock': { en: 'Restock from Wholesaler', am: 'ከጅምላ አቅራቢ ክምችት ሙላ' },
  'dashboard.todaySales': { en: "TODAY'S RECORDED SALES", am: 'የዛሬ የተመዘገበ ሽያጭ' },
  'dashboard.outstanding': { en: 'OUTSTANDING CREDIT BALANCE', am: 'ያልተከፈለ የብድር ቀሪ' },
  'dashboard.stockValuation': { en: 'TOTAL STOCK VALUATION', am: 'አጠቃላይ የክምችት ዋጋ' },
  'customer.verified': { en: 'Verified Citizen', am: 'የተረጋገጠ ዜጋ' },
  'customer.currentBalance': { en: 'CURRENT TOTAL CREDIT BALANCE', am: 'አሁን ያለ አጠቃላይ የብድር ቀሪ' },
  'customer.historicalRepaid': { en: 'HISTORICAL REPAID PRINCIPAL', am: 'በታሪክ የተከፈለ ዋና ብድር' },
  'customer.mandate': { en: 'AUTHORIZED REPAYMENT MANDATE', am: 'የተፈቀደ የመክፈያ ማዘዣ' },
  'customer.activeAgreements': { en: 'Your Active Credit Agreements', am: 'ንቁ የብድር ውሎችዎ' },

  // Roles
  'role.merchant': {
    en: 'Merchant / Retailer',
    am: 'የሱቅ ነጋዴ / ቸርቻሪ'
  },
  'role.wholesaler': {
    en: 'Wholesale Supplier',
    am: 'የጅምላ አቅራቢ'
  },
  'role.delivery': {
    en: 'Bajaj / Cargo Delivery',
    am: 'የባጃጅ / ካርጎ አጓጓዥ'
  },
  'role.customer': {
    en: 'Local Customer / Buyer',
    am: 'የአካባቢ ደንበኛ / ገዢ'
  },

  // Hero Section
  'hero.badge': {
    en: 'Trusted by 4,200+ Ethiopian Small Businesses',
    am: 'ከ4,200 በላይ በሆኑ የኢትዮጵያ አነስተኛ ንግዶች የተመረጠ'
  },
  'hero.title1': {
    en: 'Empowering Ethiopia’s Local Commerce with',
    am: 'የኢትዮጵያን የዕለት ተዕለት የንግድ እንቅስቃሴ በ'
  },
  'hero.title2': {
    en: 'Digital Credit & Direct Wholesale Supply',
    am: 'ዲጂታል ብድር እና ቀጥታ የጅምላ አቅርቦት ማሳለጥ'
  },
  'hero.subtitle': {
    en: 'Replace lost notebook debts with automated Telebirr mandates. Order bulk teff, cooking oil, and coffee directly to your shop with doorstep Bajaj logistics.',
    am: 'የጠፋ የደብተር ብድርን በቴሌብር ህጋዊ ማረጋገጫ ይተኩ። ጤፍ፣ የምግብ ዘይትና ቡናን በቀጥታ ከጅምላ አቅራቢ ወደ ሱቅዎ በባጃጅ ያስመጡ።'
  },
  'hero.cta.merchant': {
    en: 'Explore Merchant Portal',
    am: 'የነጋዴ ፖርታልን ይሞክሩ'
  },
  'hero.cta.wholesaler': {
    en: 'Wholesaler Hub',
    am: 'የጅምላ አቅራቢ ማዕከል'
  },
  'hero.cta.delivery': {
    en: 'Delivery Hub',
    am: 'የአጓጓዥ ማዕከል'
  },
  'hero.cta.customer': {
    en: 'Customer Portal',
    am: 'የደንበኛ ፖርታል'
  },

  // Live Stats Banner
  'stats.creditVolume': {
    en: 'Active Credit Ledger Volume',
    am: 'በስራ ላይ ያለ የብድር መጠን'
  },
  'stats.merchants': {
    en: 'Registered Neighborhood MSMEs',
    am: 'የተመዘገቡ የሰፈር ሱቆችና ንግዶች'
  },
  'stats.onTimeRepayment': {
    en: 'OTP Mandate Repayment Rate',
    am: 'የኤስኤምኤስ ማረጋገጫ የብድር መመለሻ ምጣኔ'
  },
  'stats.cargoDelivered': {
    en: 'Wholesale Cargo Delivered',
    am: 'የተጓጓዘ የጅምላ ጭነት'
  },

  // 3 Core Pillars
  'pillar1.title': {
    en: 'Digital Credit Ledger & Mandates',
    am: 'ዲጂታል የብድር መዝገብ እና የቴሌብር ፈቃድ'
  },
  'pillar1.desc': {
    en: 'Turn informal notebook debts into legally enforceable digital contracts backed by customer SMS OTP authorization and Telebirr direct-debit mandates.',
    am: 'የደብተር ብድርን በደንበኛ ኤስኤምኤስ OTP ማረጋገጫ እና በቴሌብር ክፍያ የተደገፈ ህጋዊ ዲጂታል ውል ያድርጉ።'
  },
  'pillar2.title': {
    en: 'Direct Wholesale Sourcing',
    am: 'ቀጥታ የጅምላ ዕቃ ግዢ'
  },
  'pillar2.desc': {
    en: 'Cut out middlemen. Order top-grade Adaa Magna Teff, cooking oil, spices, and roasted coffee sacks at guaranteed wholesale transparent pricing.',
    am: 'የመርካቶ ደላሎችን አስቀርተው የመጀመሪያ ደረጃ የአዳ ጤፍ፣ ዘይት፣ ቅመማ ቅመም እና ቡና በጅምላ ዋጋ ይዘዙ።'
  },
  'pillar3.title': {
    en: 'Bajaj & City Cargo Dispatch',
    am: 'የባጃጅ እና የከተማ ካርጎ ትራንስፖርት'
  },
  'pillar3.desc': {
    en: 'Track your deliveries live with Google Maps. Verify goods handover with secure 4-digit driver OTP codes before releasing payment.',
    am: 'ዕቃዎ ከጅምላ መጋዘን እስከ ሱቅዎ ድረስ በካርታ በቀጥታ ይከታተሉ። በ4-ዲጂት OTP ኮድ ብቻ ዕቃውን ያረጋግጡ።'
  },

  // Merchant Categories
  'category.all': {
    en: 'All Ethiopian MSME Sectors',
    am: 'ሁሉም የኢትዮጵያ ንግድ ዘርፎች'
  },
  'category.grocery': {
    en: 'Small Grocery & FMCG',
    am: 'የሰፈር ሱቅ እና ሸቀጣ ሸቀጥ'
  },
  'category.cafe': {
    en: 'Traditional Café & Roastery',
    am: 'ባህላዊ ካፌ እና የቡና መቁያ'
  },
  'category.produce': {
    en: 'Fresh Produce & Stall',
    am: 'ትኩስ አትክልትና ፍራፍሬ'
  },
  'category.beauty': {
    en: 'Beauty & Cosmetics',
    am: 'የውበት ሳሎንና ኮስሞቲክስ'
  },
  'category.clothing': {
    en: 'Clothing & Habesha Kemis',
    am: 'የባህል ልብስና አልባሳት'
  },
  'category.delivery': {
    en: 'Bajaj Logistics Fleet',
    am: 'የባጃጅና ካርጎ አጓጓዦች'
  },

  // Common Actions & Buttons
  'action.search': {
    en: 'Search...',
    am: 'ፈልግ...'
  },
  'action.filter': {
    en: 'Filter',
    am: 'አጣራ'
  },
  'action.all': {
    en: 'All',
    am: 'ሁሉም'
  },
  'action.active': {
    en: 'Active',
    am: 'በስራ ላይ'
  },
  'action.completed': {
    en: 'Completed',
    am: 'የተጠናቀቀ'
  },
  'action.repaid': {
    en: 'Repaid',
    am: 'የተከፈለ'
  },
  'action.pending': {
    en: 'Pending',
    am: 'በመጠባበቅ ላይ'
  },
  'action.overdue': {
    en: 'Overdue',
    am: 'ያለፈበት'
  },
  'action.viewDetail': {
    en: 'View Details',
    am: 'ዝርዝር ተመልከት'
  },
  'action.save': {
    en: 'Save',
    am: 'አስቀምጥ'
  },
  'action.cancel': {
    en: 'Cancel',
    am: 'ሰርዝ'
  },
  'action.back': {
    en: 'Back',
    am: 'ተመለስ'
  },
  'action.next': {
    en: 'Next Step',
    am: 'ቀጣይ ደረጃ'
  },
  'action.confirm': {
    en: 'Confirm & Authorize',
    am: 'አረጋግጥና ፈቅድ'
  },
  'action.repay': {
    en: 'Make Repayment',
    am: 'ክፍያ ፈጽም'
  },
  'action.print': {
    en: 'Print Receipt / Note',
    am: 'ደረሰኝ / ውል አትም'
  },
  'action.copy': {
    en: 'Copy',
    am: 'ቅዳ'
  },
  'action.copied': {
    en: 'Copied!',
    am: 'ተቀድቷል!'
  },
  'action.addCart': {
    en: 'Add to Wholesale Cart',
    am: 'ወደ ቅርጫት ጨምር'
  },
  'action.checkout': {
    en: 'Proceed to Checkout',
    am: 'ትዕዛዝ አጠናቅቅ'
  },

  // Merchant Dashboard & Credit Hub
  'merchant.creditHubTitle': {
    en: 'Digital Credit Agreement Registry',
    am: 'የዲጂታል ብድር ውል መዝገብ'
  },
  'merchant.creditHubSubtitle': {
    en: 'Bank-account linked agreements backed by Telebirr mobile mandates and customer SMS OTP authorizations.',
    am: 'በባንክ ሂሳብ ቁጥር፣ በቴሌብር እና በደንበኛ ኤስኤምኤስ OTP ማረጋገጫ የተደገፈ አስተማማኝ የብድር አስተዳደር።'
  },
  'merchant.newAgreementBtn': {
    en: '+ Issue New Credit Note',
    am: '+ አዲስ የብድር ውል መዝግብ'
  },
  'merchant.totalCreditOutstanding': {
    en: 'OUTSTANDING CREDIT BALANCE',
    am: 'ያልተሰበሰበ የብድር መጠን'
  },
  'merchant.recoveredThisMonth': {
    en: 'RECOVERED THIS MONTH',
    am: 'በዚህ ወር የተሰበሰበ'
  },
  'merchant.otpRate': {
    en: 'OTP AUTHORIZATION RATE',
    am: 'የኤስኤምኤስ ማረጋገጫ ምጣኔ'
  },
  'merchant.table.agreement': {
    en: 'Agreement #',
    am: 'የውል ቁጥር'
  },
  'merchant.table.customer': {
    en: 'Customer Details',
    am: 'የደንበኛ መረጃ'
  },
  'merchant.table.goods': {
    en: 'Purchased Items',
    am: 'የተወሰዱ ዕቃዎች'
  },
  'merchant.table.bank': {
    en: 'Bank & Payment Partners',
    am: 'የባንክና ቴሌብር መረጃ'
  },
  'merchant.table.principal': {
    en: 'Principal / Paid',
    am: 'ዋና ብድር / የተከፈለ'
  },
  'merchant.table.remaining': {
    en: 'Remaining',
    am: 'ቀሪ ዕዳ'
  },
  'merchant.table.dueDate': {
    en: 'Due Date',
    am: 'የመክፈያ ቀን'
  },
  'merchant.table.mandate': {
    en: 'Mandate & OTP',
    am: 'የክፍያ ፈቃድና OTP'
  },
  'merchant.table.status': {
    en: 'Status',
    am: 'ሁኔታ'
  },
  'merchant.table.action': {
    en: 'Action',
    am: 'ተግባር'
  },

  // Modal: New Credit Agreement Wizard
  'modal.credit.title': {
    en: 'New Digital Credit Agreement',
    am: 'አዲስ የዲጂታል ብድር ውል'
  },
  'modal.credit.step1': {
    en: '1. Customer Selection',
    am: '1. ደንበኛ መምረጥ'
  },
  'modal.credit.step2': {
    en: '2. Goods & Principal',
    am: '2. ዕቃዎችና የገንዘብ መጠን'
  },
  'modal.credit.step3': {
    en: '3. Bank & Telebirr',
    am: '3. የባንክና ቴሌብር መረጃ'
  },
  'modal.credit.step4': {
    en: '4. SMS OTP Authorization',
    am: '4. የደንበኛ ኤስኤምኤስ OTP'
  },
  'modal.credit.step5': {
    en: '5. Review & Seal',
    am: '5. ማጠቃለያና ማጽደቂያ'
  },
  'modal.credit.enterOtp': {
    en: 'Enter Customer 6-Digit SMS Verification OTP',
    am: 'የደንበኛውን ባለ 6-አሃዝ የኤስኤምኤስ ማረጋገጫ OTP ያስገቡ'
  },
  'modal.credit.autoFill': {
    en: 'Auto-Fill Customer OTP Code',
    am: 'የደንበኛውን OTP በራስ-ሰር ሙላ'
  },
  'modal.credit.verified': {
    en: 'Customer Authorization Verified & Digitally Sealed',
    am: 'የደንበኛው ፈቃድ ተረጋግጦ በዲጂታል ፊርማ ጸድቋል'
  },
  'modal.credit.sealBtn': {
    en: 'Activate & Seal Agreement',
    am: 'ውሉን አጽድቀህ መዝግብ'
  },

  // Repayment Modal
  'modal.repay.title': {
    en: 'Record Credit Repayment',
    am: 'የብድር ክፍያ መዝግብ'
  },
  'modal.repay.amount': {
    en: 'Repayment Amount (ETB)',
    am: 'የክፍያ መጠን (በብር)'
  },
  'modal.repay.method': {
    en: 'Payment Channel',
    am: 'የክፍያ መንገድ'
  },
  'modal.repay.ref': {
    en: 'Transaction Reference # (Optional)',
    am: 'የግብይት መለያ ቁጥር (አማራጭ)'
  },
  'modal.repay.confirmBtn': {
    en: 'Confirm & Settle Repayment',
    am: 'ክፍያውን አረጋግጥና መዝግብ'
  },

  // Wholesale Marketplace
  'market.title': {
    en: 'Direct Agro-Wholesale Sourcing Hub',
    am: 'የቀጥታ የእርሻና የምግብ ጅምላ ግዢ ማዕከል'
  },
  'market.subtitle': {
    en: 'Order directly from verified Gondar & regional suppliers with verified bulk prices.',
    am: 'ከአዲስ አበባና ክልል አቅራቢዎች በቀጥታ በጅምላ ዋጋ ይዘዙ።'
  },
  'market.moq': {
    en: 'Min Order Qty',
    am: 'ዝቅተኛ የትዕዛዝ መጠን'
  },
  'market.deliveryTime': {
    en: 'Delivery Time',
    am: 'የማድረሻ ጊዜ'
  },
  'market.inStock': {
    en: 'In Stock',
    am: 'ክምችት አለ'
  },

  // Inventory & AI OCR
  'inv.title': {
    en: 'Smart Inventory & Stock Tracker',
    am: 'ዘመናዊ የዕቃ ክምችትና ቁጥጥር'
  },
  'inv.scanBtn': {
    en: 'Scan Paper Invoice with AI OCR',
    am: 'የወረቀት ደረሰኝ በካሜራ ቃኝ'
  },
  'inv.addManualBtn': {
    en: '+ Add Item Manually',
    am: '+ አዲስ ዕቃ ጨምር'
  },
  'inv.stockValue': {
    en: 'TOTAL INVENTORY VALUE',
    am: 'አጠቃላይ የዕቃ ዋጋ'
  },
  'inv.lowStockAlert': {
    en: 'LOW STOCK ALERTS',
    am: 'የሚያልቁ ዕቃዎች ማስጠንቀቂያ'
  },

  // Delivery Hub
  'delivery.title': {
    en: 'Bajaj & City Cargo Dispatch Console',
    am: 'የባጃጅና ካርጎ አጓጓዦች መቆጣጠሪያ'
  },
  'delivery.subtitle': {
    en: 'Real-time GPS trip navigation and secure 4-digit handover OTP verification.',
    am: 'የቀጥታ የካርታ አቅጣጫ እና የ4-ዲጂት የማስረከቢያ OTP ማረጋገጫ።'
  },
  'delivery.availableJobs': {
    en: 'Available Dispatch Requests',
    am: 'የተዘጋጁ የማጓጓዣ ስራዎች'
  },
  'delivery.activeTrip': {
    en: 'Active In-Transit Cargo',
    am: 'በጉዞ ላይ ያለ ጭነት'
  },
  'delivery.verifyOtpBtn': {
    en: 'Confirm 4-Digit Handover OTP',
    am: 'የ4-ዲጂት ማስረከቢያ OTP አረጋግጥ'
  },

  // Customer Hub
  'customer.title': {
    en: 'My Digital Credit & Store Invoices',
    am: 'የግል የብድር መዝገብ እና ደረሰኞቼ'
  },
  'customer.subtitle': {
    en: 'Track your balances across neighborhood shops and pay instantly via Telebirr or CBE Birr.',
    am: 'በሰፈር ሱቆች ያሉብዎትን ሂሳቦች ይከታተሉ እና በቀላሉ በቴሌብር ወይም በሲቢኢ ብር ይክፈሉ።'
  },
  'customer.trustScore': {
    en: 'CREDIT TRUST RATING',
    am: 'የብድር እምነት ደረጃ'
  },
  'customer.payTelebirr': {
    en: 'Pay via Telebirr Mandate',
    am: 'በቴሌብር ፈቃድ ክፈል'
  },

  // Credit Hub & Modal
  'credit.title': {
    en: 'Digital Credit Ledger & Agreements',
    am: 'የዲጂታል ብድር መዝገብ እና ውሎች'
  },
  'credit.subtitle': {
    en: 'Bank-account linked agreements backed by Telebirr mobile mandates and customer SMS OTP authorizations.',
    am: 'ከባንክ ሂሳብ ጋር የተሳሰሩ፣ በቴሌብር እና በደንበኛ SMS OTP ማረጋገጫ የተደገፉ ህጋዊ የብድር ውሎች።'
  },
  'credit.newAgreementBtn': {
    en: 'New Credit Agreement',
    am: '+ አዲስ የብድር ውል'
  },
  'credit.outstanding': {
    en: 'TOTAL CREDIT OUTSTANDING',
    am: 'ያልተከፈለ አጠቃላይ ብድር'
  },
  'credit.recovered': {
    en: 'TOTAL RECOVERED / SETTLED',
    am: 'የተመለሰ / የተከፈለ ብድር'
  },
  'credit.otpRate': {
    en: 'OTP AUTHORIZATION RATE',
    am: 'የOTP ማረጋገጫ ምጣኔ'
  },
  'credit.searchPlaceholder': {
    en: 'Search by customer name, phone, bank account, or agreement #...',
    am: 'በደንበኛ ስም፣ ስልክ፣ የባንክ ሂሳብ ቁጥር ወይም የውል ቁጥር ፈልግ...'
  },
  'credit.step1': {
    en: 'Customer',
    am: 'ደንበኛ'
  },
  'credit.step2': {
    en: 'Goods & Principal',
    am: 'ዕቃዎች እና የገንዘብ መጠን'
  },
  'credit.step3': {
    en: 'Bank & Telebirr',
    am: 'የባንክ ሂሳብ እና ቴሌብር'
  },
  'credit.step4': {
    en: 'OTP Authorization',
    am: 'የOTP ማረጋገጫ ደረጃ'
  },
  'credit.step5': {
    en: 'Review & Seal',
    am: 'ግምገማ እና ማፅደቂያ'
  },
  'credit.bankSection': {
    en: 'Creditor Bank Account Details',
    am: 'የአበዳሪው የባንክ ሂሳብ ዝርዝር'
  },
  'credit.bankName': {
    en: 'Bank Name',
    am: 'የባንኩ ስም'
  },
  'credit.accountNumber': {
    en: 'Bank Account Number',
    am: 'የባንክ ሂሳብ ቁጥር'
  },
  'credit.accountHolder': {
    en: 'Account Holder / Business Name',
    am: 'የሂሳብ ባለቤት / የንግድ ስም'
  },
  'credit.branch': {
    en: 'Branch / Location',
    am: 'ቅርንጫፍ / አካባቢ'
  },
  'credit.paymentPartners': {
    en: 'Payment Partner Phone Numbers (Telebirr & CBE Birr)',
    am: 'የክፍያ አጋሮች ስልክ ቁጥሮች (ቴሌብር እና ሲቢኢ ብር)'
  },
  'credit.telebirrPhone': {
    en: 'Telebirr Merchant / Settlement Phone #',
    am: 'የቴሌብር ነጋዴ / የመክፈያ ስልክ ቁጥር'
  },
  'credit.cbeBirrPhone': {
    en: 'CBE Birr / E-Birr Phone Number',
    am: 'የሲቢኢ ብር / ኢ-ብር ስልክ ቁጥር'
  },
  'credit.otpTitle': {
    en: 'Customer Consent & OTP Authorization Phase',
    am: 'የደንበኛ ፈቃድ እና የOTP ማረጋገጫ ደረጃ'
  },
  'credit.otpSubtitle': {
    en: 'To make the credit agreement legally enforceable and link the customer’s mobile mandate, an authorization OTP code is sent to the customer’s registered phone.',
    am: 'የብድር ውሉን ህጋዊ ለማድረግ እና የደንበኛውን የሞባይል ክፍያ ፈቃድ ለማገናኘት የማረጋገጫ OTP ኮድ ወደ ደንበኛው ስልክ ይላካል።'
  },
  'credit.sendOtp': {
    en: 'Send SMS OTP',
    am: 'SMS OTP ላክ'
  },
  'credit.resendOtp': {
    en: 'Resend OTP',
    am: 'OTP ድጋሚ ላክ'
  },
  'credit.autoFill': {
    en: 'Auto-Fill Customer OTP Code',
    am: 'የደንበኛውን OTP ኮድ በቀጥታ ሙላ'
  },
  'credit.enterOtp': {
    en: 'Enter Customer 6-Digit SMS Verification OTP',
    am: 'የደንበኛውን ባለ 6-አሃዝ SMS ማረጋገጫ OTP ያስገቡ'
  },
  'credit.verifiedBadge': {
    en: 'Customer Authorization Verified & Digitally Sealed',
    am: 'የደንበኛ ማረጋገጫ ተረጋግጧል እና በዲጂታል ፊርማ ጸድቋል'
  },
  'credit.activateAgreement': {
    en: 'Activate & Seal Agreement',
    am: 'ውሉን አጽድቅ እና አስመዝግብ'
  },

  // Footer & FAQ
  'footer.about': {
    en: 'TEWEDAJ (ተወዳጅ) is Ethiopia’s premier B2B and micro-credit commerce infrastructure, powering MSMEs across Gondar, Hawassa, Adama, Bahir Dar, and beyond.',
    am: 'ተወዳጅ በአዲስ አበባ፣ ሀዋሳ፣ አዳማ፣ ባህር ዳር እና በመላው ኢትዮጵያ የሚገኙ አነስተኛ ንግዶችን የሚያጠናክር የዲጂታል ብድር እና የጅምላ አቅርቦት መድረክ ነው።'
  },
  'footer.rights': {
    en: '© 2026 TEWEDAJ Ethiopia Enterprise. Built for the Ethiopian Local Economy.',
    am: '© 2026 ተወዳጅ የኢትዮጵያ ኢንተርፕራይዝ። ለኢትዮጵያ አካባቢያዊ ኢኮኖሚ የተሰራ።'
  },

  // Merchant Marketplace
  'merchantMarket.title': {
    en: 'Wholesale Catalog & Direct Procurement',
    am: 'የጅምላ ካታሎግ እና ቀጥታ ግዢ'
  },
  'merchantMarket.subtitle': {
    en: 'Procure authentic Adaa Teff, Selam Cooking Oils, Berbere spices, and Horizon Flour at certified wholesale prices. Dispatched directly to your store.',
    am: 'የአዳ ጤፍ፣ የሰላም ዘይት፣ የበርበረ ቅመማ ቅመም እና የሆሪዞን ዱቄት በማረጋገጫ የጅምላ ዋጋ ይዘዙ። በቀጥታ ወደ ሱቅዎ ይልካል:: ቀጥታ ከመርካቶና ከኮኦፐራቲቮች'
  },
  'merchantMarket.viewCart': {
    en: 'View Wholesale Cart',
    am: 'የጅምላ ቅርጫት ይመልከቱ'
  },
  'merchantMarket.searchPlaceholder': {
    en: 'Search grains, oils, spices, suppliers, or origins...',
    am: 'የጥራም ዓይነት፣ ዘይት፣ ቅመማ ቅመም፣ አቅራቢዎች ወይም ምንጣፍ ፈልግ...'
  },
  'merchantMarket.wholesalePrice': {
    en: 'Wholesale Price:',
    am: 'የጅምላ ዋጋ:'
  },
  'merchantMarket.moq': {
    en: 'MOQ:',
    am: 'ዝቅተኛ የትዕዛዝ መጠን:'
  },
  'merchantMarket.add': {
    en: 'Add',
    am: 'ጨምር'
  },

  // Merchant Inventory
  'merchantInventory.title': {
    en: 'Live Store Inventory & Stock Control',
    am: 'የቀጣይ ሱቅ ክምችትና የእቃ ቁጥጥር'
  },
  'merchantInventory.subtitle': {
    en: 'Real-time shop stock levels, valuation, and AI OCR paper receipt ingestion.',
    am: 'የቀጣይ የሱቅ ክምችት ደረጃ፣ ዋጋ እና የAI OCR የወረቀት ደረሰኝ መቀበሪያ።'
  },
  'merchantInventory.scanReceipt': {
    en: 'Scan Receipt (AI OCR)',
    am: 'ደረሰኝ ቃኝ (AI OCR)'
  },
  'merchantInventory.addManual': {
    en: 'Add Manual Product',
    am: 'አዲስ ዕቃ አስገባ'
  },
  'merchantInventory.retailValuation': {
    en: 'RETAIL STOCK VALUATION',
    am: 'የሽያጭ ክምችት ዋጋ'
  },
  'merchantInventory.totalCost': {
    en: 'TOTAL ACQUISITION COST',
    am: 'አጠቃላይ የግዢ ዋጋ'
  },
  'merchantInventory.projectedProfit': {
    en: 'PROJECTED PROFIT MARGIN',
    am: 'የተገመተ የትርፍ መጠን'
  },
  'merchantInventory.searchPlaceholder': {
    en: 'Search products, categories or suppliers...',
    am: 'እቃዎች፣ ምድቦች ወይም አቅራቢዎችን ፈልግ...'
  },
  'merchantInventory.productName': {
    en: 'Product Name',
    am: 'የእቃው ስም'
  },
  'merchantInventory.category': {
    en: 'Category',
    am: 'ምድብ'
  },
  'merchantInventory.currentStock': {
    en: 'Current Stock',
    am: 'የአሁን ክምችት'
  },
  'merchantInventory.buyingPrice': {
    en: 'Buying Price',
    am: 'የግዢ ዋጋ'
  },
  'merchantInventory.sellingPrice': {
    en: 'Selling Price',
    am: 'የሽያጭ ዋጋ'
  },
  'merchantInventory.margin': {
    en: 'Margin',
    am: 'ትርፍ'
  },
  'merchantInventory.stockValuation': {
    en: 'Stock Valuation',
    am: 'የክምችት ዋጋ'
  },
  'merchantInventory.status': {
    en: 'Status',
    am: 'ሁኔታ'
  },
  'merchantInventory.supplier': {
    en: 'Supplier Source',
    am: 'የአቅራቢ ምንጣፍ'
  },
  'merchantInventory.action': {
    en: 'Action',
    am: 'ተግባር'
  },
  'merchantInventory.lowStock': {
    en: 'Low Stock',
    am: 'ዝቅተኛ ክምችት'
  },
  'merchantInventory.inStock': {
    en: 'In Stock',
    am: 'ክምችት አለ'
  },
  'merchantInventory.edit': {
    en: 'Edit',
    am: 'አርትዕ'
  },
  'merchantInventory.reorder': {
    en: 'Re-order',
    am: 'እንደገና ይዘዙ'
  },
  'merchantInventory.editStock': {
    en: 'Edit Stock',
    am: 'ክምችት አርትዕ'
  },
  'merchantInventory.currentQty': {
    en: 'Current Quantity',
    am: 'የአሁን ብዛት'
  },
  'merchantInventory.costPerUnit': {
    en: 'Cost per Unit (ETB)',
    am: 'ዋጋ በእቃ (በብር)'
  },
  'merchantInventory.lowStockThreshold': {
    en: 'Low Stock Threshold Alert',
    am: 'የዝቅተኛ ክምችት ማስጠንቀቂያ'
  },
  'merchantInventory.updateStock': {
    en: 'Update Stock',
    am: 'ክምችት አዘም'
  },
  'merchantInventory.addCustom': {
    en: 'Add Custom Inventory Item',
    am: 'የልዩ ክምችት እቃ አስገባ'
  },
  'merchantInventory.measurementUnit': {
    en: 'Measurement Unit',
    am: 'የልኬ ክፍል'
  },
  'merchantInventory.initialQty': {
    en: 'Initial Quantity',
    am: 'የመጀመሪያ ብዛት'
  },
  'merchantInventory.supplierSource': {
    en: 'Supplier / Source',
    am: 'አቅራቢ / ምንጣፍ'
  },
  'merchantInventory.saveInventory': {
    en: 'Save into Inventory',
    am: 'ወደ ክምችት አስቀምጥ'
  },

  // Merchant Orders (Inbound Cargo)
  'merchantOrders.title': {
    en: 'Inbound Wholesale Orders & Shipments',
    am: 'የገቢ የጅምላ ትዕዛዛትና ጭነቶች'
  },
  'merchantOrders.subtitle': {
    en: 'Track direct cargo shipments from verified suppliers with live OTP handover protection.',
    am: 'ከመርካቶ አቅራቢዎች የሚመጡ ቀጥታ ጭነቶችን በቀጥታ OTP ማስረከቢያ ይከታተሉ።'
  },
  'merchantOrders.orderStock': {
    en: 'Order Wholesale Stock',
    am: 'የጅምላ ክምችት ይዘዙ'
  },
  'merchantOrders.activeShipments': {
    en: 'Active Shipments',
    am: 'በጉዞ ላይ ያሉ ጭነቶች'
  },
  'merchantOrders.pastOrders': {
    en: 'Past Delivered Orders',
    am: 'የተጓጓዙ ትዕዛዛት'
  },
  'merchantOrders.liveTracking': {
    en: 'Live Shipment Tracking',
    am: 'የቀጥታ የጭነት አቅጣጫ'
  },
  'merchantOrders.shipmentDetails': {
    en: 'Shipment Details',
    am: 'የጭነት ዝርዝሮች'
  },
  'merchantOrders.wholesalerSupplier': {
    en: 'Wholesaler Supplier:',
    am: 'የጅምላ አቅራቢ:'
  },
  'merchantOrders.dropoffAddress': {
    en: 'Drop-off Address:',
    am: 'የማስረያ አድራሻ:'
  },
  'merchantOrders.deliveryFee': {
    en: 'Delivery Fee (Bajaj Cargo):',
    am: 'የማድረስ ክፍያ (ባጃጅ ካርጎ):'
  },
  'merchantOrders.assignedCourier': {
    en: 'Assigned Courier:',
    am: 'የተመደየው አጓጓዥ:'
  },
  'merchantOrders.deliveryInstructions': {
    en: 'Delivery Instructions:',
    am: 'የማድረስ መመሪያዎች:'
  },
  'merchantOrders.handoverSecurity': {
    en: 'Delivery Handover Security Code:',
    am: 'የማስረከቢያ ደህንነት ኮድ:'
  },
  'merchantOrders.handoverInstruction': {
    en: 'Give this code to the courier when packages are safely received.',
    am: 'እቃዎች በደህናነት ከተቀበሉ በኋላ ይህን ኮድ ለአጓጓዥው ይስጡ።'
  },
  'merchantOrders.selectOrder': {
    en: 'Select an order to track',
    am: 'ለመከታተር ትዕዛዝ ይምረጡ'
  },
  'merchantOrders.totalCost': {
    en: 'Total Cost:',
    am: 'ጠቅላላይ ዋጋ:'
  },
  'merchantOrders.handoverOtp': {
    en: 'HANDOVER OTP',
    am: 'የማስረከቢያ OTP'
  },

  // Merchant Reports (Financial)
  'merchantReports.title': {
    en: 'Financial Reports & Business Analytics',
    am: 'የፋይናንስያል ሪፖርትና የንግድ ትንታኔ'
  },
  'merchantReports.subtitle': {
    en: 'Audited sales records, estimated profit margins, and credit recovery ratios.',
    am: 'የተፈተሙ የሽያጭ መዝገቦች፣ የተገመቱ የትርፍ መጠኖች እና የብድር መመለሻ ምጣኔዎች።'
  },
  'merchantReports.export': {
    en: 'Export Financial Ledger (PDF)',
    am: 'የፋይናንስያል መዝገብ ወጭ ላክ (PDF)'
  },
  'merchantReports.monthlyRevenue': {
    en: 'MONTHLY GROSS REVENUE',
    am: 'ወርአዊ ጠቅላላይ ገቢ'
  },
  'merchantReports.netProfit': {
    en: 'ESTIMATED NET PROFIT',
    am: 'የተገመተ የንጹህ ትርፍ'
  },
  'merchantReports.collectionRate': {
    en: 'CREDIT COLLECTION RATE',
    am: 'የብድር መመለሻ ምጣኔ'
  },
  'merchantReports.monthlyRevenueProfit': {
    en: 'Monthly Revenue & Profitability (ETB)',
    am: 'ወርአዊ ገቢና ትርፍ (በብር)'
  },
  'merchantReports.categoryShare': {
    en: 'Product Category Revenue Share',
    am: 'የእቃ ምድብ የገቢ አካፍል'
  },
  'merchantReports.posTransactions': {
    en: 'Recent Point-of-Sale (POS) Transactions',
    am: 'የቅርብ የሽያጭ ግብዮች'
  },
  'merchantReports.synchronized': {
    en: 'Synchronized with inventory',
    am: 'ከክምችት ጋር ተስማምዟል'
  },
  'merchantReports.receipt': {
    en: 'Receipt #',
    am: 'ደረሰኝ #'
  },
  'merchantReports.dateTime': {
    en: 'Date & Time',
    am: 'ቀንና ሰዓት'
  },
  'merchantReports.customer': {
    en: 'Customer',
    am: 'ደንበኛ'
  },
  'merchantReports.itemsSold': {
    en: 'Items Sold',
    am: 'የተሸጉ እቃዎች'
  },
  'merchantReports.paymentChannel': {
    en: 'Payment Channel',
    am: 'የክፍያ መንገድ'
  },
  'merchantReports.totalAmount': {
    en: 'Total Amount',
    am: 'ጠቅላላይ ዋጋ'
  },

  // Wholesaler Dashboard
  'wholesalerDashboard.title': {
    en: 'Wholesale Supplier Hub',
    am: 'የጅምላ አቅራቢ ማዕከል'
  },
  'wholesalerDashboard.tier': {
    en: 'Tier 1 Distributor',
    am: 'የመጀመሪያ ደረጃ ስርጭት'
  },
  'wholesalerDashboard.location': {
    en: 'Direct bulk supply to retail merchants across Gondar',
    am: 'ቀጥታ የጅምላ አቅርቦት ለአዲስ አበባ የሽያጭ አስተዳደሮች'
  },
  'wholesalerDashboard.addProduct': {
    en: 'Add Bulk Product',
    am: 'የጅምላ እቃ አስገባ'
  },
  'wholesalerDashboard.incomingOrders': {
    en: 'Incoming Orders',
    am: 'የገቢ ትዕዛዛት'
  },
  'wholesalerDashboard.creditRequests': {
    en: 'Credit Requests',
    am: 'የብድር ጥያቄዎች'
  },
  'wholesalerDashboard.monthlyVolume': {
    en: 'MONTHLY WHOLESALE VOLUME',
    am: 'ወርአዊ የጅምላ መጠን'
  },
  'wholesalerDashboard.demandGrowth': {
    en: '+32% demand from retail kiosks',
    am: '+32% ፍለጋ ከሽያጭ ኪዮስኮች'
  },
  'wholesalerDashboard.activeClients': {
    en: 'ACTIVE RETAIL CLIENTS',
    am: 'ንቁ የሽያጭ ደንበኞች'
  },
  'wholesalerDashboard.stockVarieties': {
    en: 'BULK STOCK VARIETIES',
    am: 'የጅምላ ክምችት ዓይነቶች'
  },
  'wholesalerDashboard.handoverRate': {
    en: 'DISPATCH HANDOVER RATE',
    am: 'የማስረከቢያ መጠን'
  },
  'wholesalerDashboard.weeklyOutflow': {
    en: 'Weekly Wholesale Outflow (ETB)',
    am: 'ሳምንታዊ የጅምላ ውጤት (በብር)'
  },
  'wholesalerDashboard.incomingRetailOrders': {
    en: 'Incoming Retail Orders',
    am: 'የገቢ የሽያጭ ትዕዛዛት'
  },
  'wholesalerDashboard.pendingDispatch': {
    en: 'Pending Dispatch',
    am: 'ለመላክ በመጠባበቅ ላይ'
  },
  'wholesalerDashboard.courier': {
    en: 'Courier',
    am: 'አጓጓዥ'
  },
  'wholesalerDashboard.assigningCourier': {
    en: 'Assigning courier...',
    am: 'አጓጓዥ በመመደዝ ላይ...'
  },
  'wholesalerDashboard.acceptPack': {
    en: 'Accept & Pack',
    am: 'ተቀበል እና አሸልም'
  },
  'wholesalerDashboard.readyPickup': {
    en: 'Ready for Pickup',
    am: 'ለመውሰድ ዝግጁ'
  },
  'wholesalerDashboard.manageAllOrders': {
    en: 'Manage All Wholesaler Orders',
    am: 'ሁሉንም የጅምላ ትዕዛዛት ያስተዳድሩ'
  },

  // Wholesaler Orders
  'wholesalerOrders.title': {
    en: 'Wholesale Dispatch & Merchant Orders',
    am: 'የጅምላ መላክ እና የነጋዴ ትዕዛዛት'
  },
  'wholesalerOrders.subtitle': {
    en: 'Fulfill retail merchant bulk orders and release stock to authorized delivery riders.',
    am: 'የሽያጭ ነጋዴዎች የጅምላ ትዕዛዛትን ያሟሉ እና ክምችትን ለተፈቀደ አጓጓዦች ይለቁ።'
  },
  'wholesalerOrders.orderNum': {
    en: 'Order #',
    am: 'ትዕዛዝ #'
  },
  'wholesalerOrders.retailMerchant': {
    en: 'Retail Merchant',
    am: 'የሽያጭ ነጋዴ'
  },
  'wholesalerOrders.dropoffAddress': {
    en: 'Dropoff Address',
    am: 'የማስረያ አድራሻ'
  },
  'wholesalerOrders.orderedItems': {
    en: 'Ordered Items',
    am: 'የተዘዙ እቃዎች'
  },
  'wholesalerOrders.totalValue': {
    en: 'Total Value',
    am: 'ጠቅላላይ ዋጋ'
  },
  'wholesalerOrders.assignedCourier': {
    en: 'Assigned Courier',
    am: 'የተመደየው አጓጓዥ'
  },
  'wholesalerOrders.status': {
    en: 'Status',
    am: 'ሁኔታ'
  },
  'wholesalerOrders.handoverActions': {
    en: 'Handover Actions',
    am: 'የማስረከቢያ ተግባራት'
  },
  'wholesalerOrders.unassigned': {
    en: 'Unassigned',
    am: 'ያልተመደደው'
  },
  'wholesalerOrders.handoverRider': {
    en: 'Handover to Rider',
    am: 'ለአጓጓዥ ይስጡ'
  },
  'wholesalerOrders.confirmDelivered': {
    en: 'Confirm Delivered',
    am: 'የተለከበ ያረጋግጡ'
  },
  'wholesalerOrders.settlePaid': {
    en: 'Settle Paid',
    am: 'ክፍያ ያረጋግጡ'
  },

  // Wholesaler Analytics
  'wholesalerAnalytics.title': {
    en: 'Retail Market Demand & Wholesale Trends',
    am: 'የሽያጭ ገበቻ ፍለጋ እና የጅምላ አዝናኝሮች'
  },
  'wholesalerAnalytics.subtitle': {
    en: 'Real-time procurement heatmaps across Gondar retail trade corridors.',
    am: 'በአዲስ አበባ የሽያጭ የንግድ መንገዶች የቀጥታ የግዢ ካርታዎች።'
  },
  'wholesalerAnalytics.subcityOutflow': {
    en: 'Wholesale Outflow by Sub-City (ETB)',
    am: 'የጅምላ ውጤት በክፍለ ከተማ (በብር)'
  },
  'wholesalerAnalytics.dispatched': {
    en: 'Dispatched (ETB)',
    am: 'የተላከ (በብር)'
  },
  'wholesalerAnalytics.fastestCommodities': {
    en: 'Fastest Moving Wholesale Commodities (%)',
    am: 'በፍጥነት የሚሸጉ የጅምላ እቃዎች (%)'
  },

  // Wholesaler Products
  'wholesalerProducts.title': {
    en: 'Bulk Product Catalog',
    am: 'የጅምላ እቃ ካታሎግ'
  },
  'wholesalerProducts.subtitle': {
    en: 'Manage wholesale SKUs, pricing, and inventory for retail merchant procurement.',
    am: 'የጅምላ SKUs፣ ዋጋ እና ክምችት ለየሽያጭ ነጋዴዎች ግዢ ያስተዳድሩ።'
  },
  'wholesalerProducts.addCommodity': {
    en: 'Add New Commodity',
    am: 'አዲስ እቃ አስገባ'
  },
  'wholesalerProducts.productName': {
    en: 'Product Name',
    am: 'የእቃው ስም'
  },
  'wholesalerProducts.category': {
    en: 'Category',
    am: 'ምድብ'
  },
  'wholesalerProducts.wholesalePrice': {
    en: 'Wholesale Price (ETB)',
    am: 'የጅምላ ዋጋ (በብር)'
  },
  'wholesalerProducts.moq': {
    en: 'MOQ (Min Order Qty)',
    am: 'ዝቅተኛ የትዕዛዝ ብዛት'
  },
  'wholesalerProducts.unit': {
    en: 'Unit',
    am: 'ክፍል'
  },
  'wholesalerProducts.origin': {
    en: 'Origin',
    am: 'ምንጣፍ'
  },
  'wholesalerProducts.description': {
    en: 'Description',
    am: 'መግለጫ'
  },
  'wholesalerProducts.image': {
    en: 'Product Image',
    am: 'የእቃው ምስል'
  },
  'wholesalerProducts.uploadImage': {
    en: 'Upload Image',
    am: 'ምስል ያስገቡ'
  },
  'wholesalerProducts.removeImage': {
    en: 'Remove Image',
    am: 'ምስል አስወጣ'
  },
  'wholesalerProducts.save': {
    en: 'Save Product',
    am: 'እቃውን አስቀምጥ'
  },
  'wholesalerProducts.cancel': {
    en: 'Cancel',
    am: 'ሰርዝ'
  },

  // Credit Request Manager
  'creditRequestManager.title': {
    en: 'Merchant Credit Requests',
    am: 'የነጋዴ የብድር ጥያቄዎች'
  },
  'creditRequestManager.subtitle': {
    en: 'Review and approve credit requests from retail merchants.',
    am: 'የሽያጭ ነጋዴዎች የብድር ጥያቄዎችን ተመልከቱ እና ያፀውዩ።'
  },
  'creditRequestManager.pending': {
    en: 'Pending Requests',
    am: 'በመጠባበቅ ላይ ያሉ ጥያቄዎች'
  },
  'creditRequestManager.merchant': {
    en: 'Merchant',
    am: 'ነጋዴ'
  },
  'creditRequestManager.requestedAmount': {
    en: 'Requested Amount',
    am: 'የተጠየቀ ዋጋ'
  },
  'creditRequestManager.purpose': {
    en: 'Purpose',
    am: 'ዓላማ'
  },
  'creditRequestManager.dueDate': {
    en: 'Due Date',
    am: 'የመጨረሻ ቀን'
  },
  'creditRequestManager.viewDetails': {
    en: 'View Details',
    am: 'ዝርዝሮች ይመልከቱ'
  },
  'creditRequestManager.approve': {
    en: 'Approve',
    am: 'ፀውይ'
  },
  'creditRequestManager.reject': {
    en: 'Reject',
    am: 'አልፀውይ'
  },
  'creditRequestManager.telebirrPhone': {
    en: 'Telebirr Phone Number',
    am: 'የቴሌቢር ስልክ ቁጥር'
  },
  'creditRequestManager.rejectionReason': {
    en: 'Rejection Reason',
    am: 'የአልፀውይነት ምክንያት'
  },
  'creditRequestManager.enterTelebirr': {
    en: 'Enter Telebirr phone number for payment',
    am: 'ለክፍያ የቴሌቢር ስልክ ቁጥር ያስገቡ'
  },
  'creditRequestManager.enterReason': {
    en: 'Enter reason for rejection',
    am: 'የአልፀውይነት ምክንያት ያስገቡ'
  },

  // Delivery Dashboard
  'deliveryDashboard.title': {
    en: 'Courier Pilot',
    am: 'የአጓጓዥ ፓይለት'
  },
  'deliveryDashboard.activeRider': {
    en: 'Active Rider',
    am: 'ንቁ አጓጓዥ'
  },
  'deliveryDashboard.vehicle': {
    en: 'Vehicle',
    am: 'መኪና'
  },
  'deliveryDashboard.zone': {
    en: 'Zone',
    am: 'ዞን'
  },
  'deliveryDashboard.availableJobs': {
    en: 'Available Jobs',
    am: 'የሚገኙ ስራዎች'
  },
  'deliveryDashboard.todayEarnings': {
    en: "TODAY'S NET EARNINGS",
    am: 'የዛሬ ንብረት'
  },
  'deliveryDashboard.instantPayout': {
    en: 'Instant payout ready on Telebirr wallet',
    am: 'በቴሌቢር ቱሌት ዝግጁ ክፍያ'
  },
  'deliveryDashboard.completedTrips': {
    en: 'COMPLETED TRIPS',
    am: 'የተጠናቀቁ ጉዟቶች'
  },
  'deliveryDashboard.deliveries': {
    en: 'Deliveries',
    am: 'የማስረያዎች'
  },
  'deliveryDashboard.zeroDispute': {
    en: 'Zero dispute handovers',
    am: 'ዜሮ ክርክር ማስረያ'
  },
  'deliveryDashboard.reputationScore': {
    en: 'COURIER REPUTATION SCORE',
    am: 'የአጓጓዥ አስተዳደር ነጥብ'
  },
  'deliveryDashboard.topRider': {
    en: 'Top 5% rider in Bole corridor',
    am: 'ከቦሌ ኮሪዶር ከፍተኛ 5% አጓጓዥ'
  },
  'deliveryDashboard.activeDelivery': {
    en: 'Active Delivery in Progress',
    am: 'ንቁ የማስረያ በሂደት ላይ'
  },
  'deliveryDashboard.liveEnRoute': {
    en: 'Live En Route',
    am: 'በመንገድ ላይ'
  },
  'deliveryDashboard.handoverVerification': {
    en: 'Delivery Handover Verification',
    am: 'የማስረያ ማረጋገጫ'
  },
  'deliveryDashboard.pickupWarehouse': {
    en: 'Pickup Warehouse',
    am: 'የመያዣ መጋዘን'
  },
  'deliveryDashboard.dropoffShop': {
    en: 'Drop-off Shop',
    am: 'የማስረያ ሱቅ'
  },
  'deliveryDashboard.merchantContact': {
    en: 'Merchant Contact',
    am: 'የነጋዴ አድራሻ'
  },
  'deliveryDashboard.tripPayout': {
    en: 'Your Trip Payout',
    am: 'የእርስዎ ጉዟ ክፍያ'
  },
  'deliveryDashboard.enterOtp': {
    en: 'Enter 4-Digit Merchant OTP Code',
    am: 'የ4 አሃዝ የነጋዴ OTP ኮድ ያስገቡ'
  },
  'deliveryDashboard.otpPlaceholder': {
    en: 'Ask merchant for their 4-digit code (e.g. 5821)',
    am: 'ከነጋᴴው 4 አሃዝ ኮድ ይጠይቁ (ለምሳሌ 5821)'
  },
  'deliveryDashboard.verifyOtp': {
    en: 'Verify OTP & Settle',
    am: 'OTP ያረጋግጡ እና ይክፈሉ'
  },
  'deliveryDashboard.availableDeliveries': {
    en: 'Available Nearby Deliveries',
    am: 'በአቅርብ ያሉ የማስረያዎች'
  },
  'deliveryDashboard.tradeCorridor': {
    en: 'Bole & Gondar Trade Corridor',
    am: 'የቦሌ እና መርካቶ የንግድ ኮሪዶር'
  },
  'deliveryDashboard.tripPayoutLabel': {
    en: 'Trip Payout',
    am: 'የጉዟ ክፍያ'
  },
  'deliveryDashboard.acceptJob': {
    en: 'Accept Job',
    am: 'ስራውን ተቀበሉ'
  },

  // Delivery Jobs
  'deliveryJobs.title': {
    en: 'Available Cargo Jobs Marketplace',
    am: 'የጅምላ ስራዎች ገበቻ'
  },
  'deliveryJobs.subtitle': {
    en: 'Browse and accept nearby wholesale shipments ready for pickup in Gondar and Kality warehouses.',
    am: 'በመርካቶ እና ቃሊቲ መጋዘኖች ለመያዝ ዝግጁ የጅምላ ማስረያዎችን ያስሱ እና ይቀበሉ።'
  },
  'deliveryJobs.kmTrip': {
    en: 'km trip',
    am: 'ኪሎሜተር ጉዟ'
  },
  'deliveryJobs.pickupWholesaler': {
    en: 'Pickup (Wholesaler)',
    am: 'መያዣ (የጅምላ አቅራቢ)'
  },
  'deliveryJobs.dropoffMerchant': {
    en: 'Drop-off (Merchant)',
    am: 'ማስረያ (ነጋዴ)'
  },
  'deliveryJobs.acceptTrip': {
    en: 'Accept Trip & Navigate',
    am: 'ጉዟውን ተቀበሉ እና ያስተርሙ'
  },
  'deliveryJobs.noJobs': {
    en: 'All available shipments are currently assigned',
    am: 'ሁሉም የሚገኙ ማስረያዎች በአሁን ጊዜ ተመድበዋል'
  },
  'deliveryJobs.newOrders': {
    en: 'New orders appear here in real-time as merchants check out.',
    am: 'አዳዲስ ትዕዛዛት ነጋዴዎች እየተሸጉ በእውነተኛ ጊዜ ይታያሉ።'
  },

  // Delivery Earnings
  'deliveryEarnings.title': {
    en: 'Courier Wallet & Trip Earnings',
    am: 'የአጓጓዥ ቱሌት እና የጉዟ ክፍያ'
  },
  'deliveryEarnings.subtitle': {
    en: 'Instant payout tracking with direct settlements to Telebirr & CBE Birr.',
    am: 'ቀጥታ ወደ ቴሌቢር እና CBE ቢር ክፍያ መከታት።'
  },
  'deliveryEarnings.cashout': {
    en: 'Instant Telebirr Cashout',
    am: 'የቴሌቢር ቀጥታ ክፍያ'
  },
  'deliveryEarnings.monthlyPayout': {
    en: "THIS MONTH'S TOTAL PAYOUT",
    am: 'የወሩ ጠቅላላይ ክፍያ'
  },
  'deliveryEarnings.confirmedTrips': {
    en: 'All trips confirmed via OTP',
    am: 'ሁሉም ጉዟቶች በOTP ተረጋግጠው'
  },
  'deliveryEarnings.walletBalance': {
    en: 'AVAILABLE WALLET BALANCE',
    am: 'የቱሌት ሚዛን'
  },
  'deliveryEarnings.readyWithdrawal': {
    en: 'Ready for 0-fee withdrawal',
    am: 'ለክፍያ ዝግጁ'
  },
  'deliveryEarnings.avgEarning': {
    en: 'AVERAGE EARNING PER TRIP',
    am: 'አማካይ የጉዟ ክፍያ'
  },
  'deliveryEarnings.basedOn': {
    en: 'Based on 32 completed deliveries',
    am: 'በ32 የተጠናቀቁ ማስረያዎች ላይ የተመሰረተ'
  },
  'deliveryEarnings.weeklyEarnings': {
    en: 'Weekly Earnings (ETB)',
    am: 'ሳምንታዊ ክፍያ (በብር)'
  },
  'deliveryEarnings.dailyEarnings': {
    en: 'Daily Earnings (ETB)',
    am: 'የቀን ክፍያ (በብር)'
  },

  // Delivery Active
  'deliveryActive.title': {
    en: 'Live Cargo Route',
    am: 'በእውነተኛ ጊዜ የጅምላ መንገድ'
  },
  'deliveryActive.noActive': {
    en: 'No Active Deliveries Right Now',
    am: 'በአሁን ጊዜ ምንም ንቁ ማስረያ የለም'
  },
  'deliveryActive.readyAccept': {
    en: 'You are currently ready to accept incoming trips from nearby wholesalers.',
    am: 'አሁን ከአቅርብ የጅምላ አቅራቢዎች የሚመጡ ጉዟቶችን ለመቀበል ዝግጁ ነዎት።'
  },
  'deliveryActive.viewJobs': {
    en: 'View Available Cargo Jobs',
    am: 'የሚገኙ የጅምላ ስራዎችን ይመልከቱ'
  },
  'deliveryActive.finalizeHandover': {
    en: 'Finalize Handover via OTP',
    am: 'በOTP ማስረያውን ያጠናቅቁ'
  },
  'deliveryActive.otpInstruction': {
    en: 'Enter the 4-digit security code from the merchant\'s screen to unlock your payment.',
    am: 'ክፍያዎን ለመክፈት ከነጋᴴው ገጽ የ4 አሃዝ የደህንነት ኮድ ያስገቡ።'
  },
  'deliveryActive.confirmDelivered': {
    en: 'Confirm Delivered & Settle ETB',
    am: 'የተለከበ ያረጋግጡ እና ይክፈሉ ብር'
  }
};

export const t = (key: string, lang: Language, fallback?: string): string => {
  if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
    return TRANSLATIONS[key][lang];
  }
  if (TRANSLATIONS[key] && TRANSLATIONS[key]['en']) {
    return TRANSLATIONS[key]['en'];
  }
  return fallback || key;
};
