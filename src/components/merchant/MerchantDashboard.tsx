'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Boxes,
  Plus,
  Truck,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Receipt,
  UserCheck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { CreditAgreementModal } from '../common/CreditAgreementModal';
import { RepaymentModal } from '../common/RepaymentModal';
import { ReceiptScannerModal } from '../common/ReceiptScannerModal';
import { CreditAgreement } from '../../types';
import { formatETB } from '../../utils/formatters';

export const MerchantDashboard: React.FC = () => {
  const {
    currentUser,
    creditAgreements,
    inventory,
    orders,
    salesTransactions,
    recordSale,
    setCurrentPath,
    t,
    language
  } = useApp();
  const router = useRouter();

  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedAgreementForRepay, setSelectedAgreementForRepay] = useState<CreditAgreement | null>(null);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);

  // Quick Sale State
  const [saleProduct, setSaleProduct] = useState(inventory[0]?.name || 'White Teff (Magna)');
  const [saleQuantity, setSaleQuantity] = useState(2);
  const [saleTotal, setSaleTotal] = useState(1400);
  const [salePayment, setSalePayment] = useState<'Cash' | 'Telebirr' | 'CBE Birr'>('Telebirr');

  // Metrics Calculations
  const activeAgreements = creditAgreements.filter(a => a.status === 'Active');
  const totalCreditOutstanding = activeAgreements.reduce((sum, a) => sum + (Number(a.remainingAmount) || 0), 0);
  const totalInventoryValue = inventory.reduce((sum, i) => sum + ((Number(i.quantity) || 0) * (Number(i.sellingPrice) || 0)), 0);
  const todaySales = salesTransactions.reduce((sum, s) => sum + (Number(s.totalAmount) || 0), 0);
  const activeDeliveries = orders.filter(o => o.status === 'In Transit' || o.status === 'Accepted' || o.status === 'Pending');

  // 7-day Sales & Credit collection trend
  const salesChartData = [
    { day: 'Thu', sales: 9400, creditCollected: 3200 },
    { day: 'Fri', sales: 12100, creditCollected: 4500 },
    { day: 'Sat', sales: 18400, creditCollected: 6100 },
    { day: 'Sun', sales: 15200, creditCollected: 5200 },
    { day: 'Mon', sales: 11000, creditCollected: 4000 },
    { day: 'Tue', sales: 13500, creditCollected: 4800 },
    { day: 'Today', sales: todaySales, creditCollected: 7200 },
  ];

  const handleRecordSaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordSale({
      customerName: 'Walk-in Cash / Telebirr Customer',
      items: [{ productName: saleProduct, quantity: saleQuantity, unitPrice: saleTotal / saleQuantity, total: saleTotal }],
      totalAmount: Number(saleTotal),
      paymentMethod: salePayment
    });
    setIsSaleModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. Welcome & Quick Action Bar */}
      <div className="card" style={{
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#38210F', margin: 0 }}>
              {t('dashboard.welcome')}, {currentUser?.name}
            </h1>
            <span className="badge badge-active" style={{ fontSize: '0.72rem' }}>{t('dashboard.verifiedMerchant')}</span>
          </div>
          <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
            {currentUser?.businessName} • {currentUser?.location}
          </p>
        </div>

        {/* Quick Action CTAs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setIsCreditModalOpen(true)}
            className="btn btn-gold btn-sm"
          >
            <Plus size={15} /> {t('dashboard.newCredit')}
          </button>
          <button
            type="button"
            onClick={() => setIsSaleModalOpen(true)}
            className="btn btn-outline btn-sm"
          >
            <Receipt size={15} /> {t('dashboard.recordSale')}
          </button>
          <button
            type="button"
            onClick={() => setIsReceiptModalOpen(true)}
            className="btn btn-outline btn-sm"
          >
            <Sparkles size={15} color="#D99A20" /> {t('dashboard.scanReceipt')}
          </button>
          <button
            type="button"
            onClick={() => router.push('/merchant/marketplace')}
            className="btn btn-brown btn-sm"
          >
            <ShoppingBag size={15} /> {t('dashboard.wholesaleHub')}
          </button>
        </div>
      </div>

      {/* 2. Low Stock Alerts Banner */}
      {inventory.some(i => i.quantity <= i.minThreshold) && (
        <div className="alert-banner" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#E65100', fontSize: '0.875rem' }}>
            <AlertTriangle size={18} />
            <span>
              <strong>{t('dashboard.lowStock')}:</strong> {language === 'am' ? 'አንዳንድ ፈጣን የሚሸጡ ዕቃዎች ከመሙያ ደረጃ በታች ናቸው።' : `Some fast-moving items (${inventory.filter(i => i.quantity <= i.minThreshold).map(i => i.name).join(', ')}) are below re-order thresholds.`}
            </span>
          </div>
          <button
            onClick={() => setCurrentPath('/merchant/marketplace')}
            className="btn btn-gold btn-sm"
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          >
            {t('dashboard.restock')} <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* 3. KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px'
      }}>
        {/* Metric 1 */}
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>{t('dashboard.todaySales')}</span>
            <div className="stat-icon" style={{ backgroundColor: '#EEF5E5', color: '#2E7D32' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38210F', fontFamily: 'Fraunces, serif' }}>
            {formatETB(todaySales)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#4F7D3A', marginTop: '6px' }}>
            <TrendingUp size={13} /> +18.4% vs last week average
          </div>
        </div>

        {/* Metric 2 */}
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>{t('dashboard.outstanding')}</span>
            <div className="stat-icon" style={{ backgroundColor: '#FFF6D6', color: '#D99A20' }}>
              <CreditCard size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D99A20', fontFamily: 'Fraunces, serif' }}>
            {formatETB(totalCreditOutstanding)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#756B5D', marginTop: '6px' }}>
            Across {activeAgreements.length} active customer agreements
          </div>
        </div>

        {/* Metric 3 */}
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>{t('dashboard.stockValuation')}</span>
            <div className="stat-icon" style={{ backgroundColor: '#FAF5E8', color: '#4A2E17' }}>
              <Boxes size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38210F', fontFamily: 'Fraunces, serif' }}>
            {formatETB(totalInventoryValue)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#756B5D', marginTop: '6px' }}>
            {inventory.length} tracked product varieties in shop
          </div>
        </div>

        {/* Metric 4 */}
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#756B5D', fontWeight: 600 }}>INBOUND WHOLESALE DELIVERIES</span>
            <div className="stat-icon" style={{ backgroundColor: '#E0F2F1', color: '#00695C' }}>
              <Truck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38210F', fontFamily: 'Fraunces, serif' }}>
            {activeDeliveries.length} Shipments
          </div>
          <div style={{ fontSize: '0.75rem', color: '#00695C', marginTop: '6px', fontWeight: 600 }}>
            {activeDeliveries.filter(d => d.status === 'In Transit').length} couriers currently en route
          </div>
        </div>
      </div>

      {/* 4. Chart & Live Logistics Status */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Sales & Repayments Chart */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: '#38210F', fontSize: '1.1rem', margin: 0 }}>
              Sales & Mandate Repayments
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#756B5D' }}>Past 7 Days</span>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F4C542" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F4C542" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCredit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F7D3A" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4F7D3A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(74,46,23,0.08)" />
                <XAxis dataKey="day" stroke="#756B5D" fontSize={12} />
                <YAxis stroke="#756B5D" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFF8E7', borderColor: '#D99A20', borderRadius: '8px', fontSize: '0.8rem' }}
                />
                <Area type="monotone" dataKey="sales" name="Daily Sales (ETB)" stroke="#D99A20" fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="creditCollected" name="Credit Repaid (ETB)" stroke="#4F7D3A" fillOpacity={1} fill="url(#colorCredit)" />
                <Legend wrapperStyle={{ fontSize: '0.75rem', paddingTop: '10px' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Delivery Pulse Widget */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={18} color="#D99A20" />
                <h3 style={{ color: '#38210F', fontSize: '1.1rem', margin: 0 }}>
                  Active Cargo Delivery
                </h3>
              </div>
              <span className="badge badge-transit">Live Inbound</span>
            </div>

            {activeDeliveries.length > 0 ? (
              <div>
                <div style={{ backgroundColor: '#FAF5E8', padding: '14px', borderRadius: '12px', marginBottom: '12px', border: '1px solid rgba(74,46,23,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <strong style={{ color: '#38210F', fontSize: '0.9rem' }}>Order #{activeDeliveries[0].orderNumber}</strong>
                    <span style={{ color: '#D99A20', fontWeight: 700, fontSize: '0.85rem' }}>{formatETB(activeDeliveries[0].totalAmount)}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#756B5D', marginBottom: '8px' }}>
                    From: {activeDeliveries[0].wholesalerName || activeDeliveries[0].supplierName || 'Wholesaler'} • Assigned to Dawit Mengistu (Bajaj Cargo)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#4F7D3A', fontWeight: 600 }}>
                    <span>Estimated Arrival: 18 mins</span>
                    <span>Handover OTP: <strong>{activeDeliveries[0].deliveryOtp || activeDeliveries[0].otpCode || '5821'}</strong></span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#756B5D' }}>
                <Truck size={36} color="#D4C3A3" style={{ marginBottom: '8px' }} />
                <p style={{ margin: 0, fontSize: '0.85rem' }}>No wholesale deliveries in transit right now.</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setCurrentPath('/merchant/orders')}
            className="btn btn-outline btn-sm"
            style={{ width: '100%', marginTop: '12px' }}
          >
            Manage Inbound Wholesale Orders <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 5. Active Credit Agreements Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ color: '#38210F', fontSize: '1.2rem', margin: 0 }}>
              Recent Customer Credit Agreements
            </h3>
            <p style={{ color: '#756B5D', fontSize: '0.8rem', margin: '2px 0 0' }}>
              Transparent ledger tracking with automated Telebirr & CBE mandate schedules
            </p>
          </div>
          <button
            onClick={() => setIsCreditModalOpen(true)}
            className="btn btn-gold btn-sm"
          >
            <Plus size={14} /> Create Agreement
          </button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Agreement #</th>
                <th>Customer</th>
                <th>Purchased Goods</th>
                <th>Total Credit</th>
                <th>Settled</th>
                <th>Remaining</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {creditAgreements.slice(0, 5).map((ag) => (
                <tr key={ag.id}>
                  <td>
                    <strong>#{ag.agreementNumber}</strong>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#38210F' }}>{ag.customerName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#756B5D' }}>{ag.customerPhone}</div>
                  </td>
                  <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ag.goodsDescription}
                  </td>
                  <td>{formatETB(ag.totalAmount)}</td>
                  <td style={{ color: '#4F7D3A', fontWeight: 600 }}>{formatETB(ag.paidAmount)}</td>
                  <td>
                    <strong style={{ color: (Number(ag.remainingAmount) || 0) > 0 ? '#D99A20' : '#4F7D3A' }}>
                      {formatETB(ag.remainingAmount)}
                    </strong>
                  </td>
                  <td>{ag.dueDate}</td>
                  <td>
                    <span className={`badge ${ag.status === 'Active' ? 'badge-active' : ag.status === 'Repaid' ? 'badge-repaid' : 'badge-overdue'}`}>
                      {ag.status}
                    </span>
                  </td>
                  <td>
                    {ag.remainingAmount > 0 ? (
                      <button
                        onClick={() => setSelectedAgreementForRepay(ag)}
                        className="btn btn-gold btn-sm"
                        style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                      >
                        Record Payment
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#4F7D3A', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={13} /> Fully Settled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      <CreditAgreementModal
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
      />

      <RepaymentModal
        isOpen={!!selectedAgreementForRepay}
        onClose={() => setSelectedAgreementForRepay(null)}
        agreement={selectedAgreementForRepay}
      />

      <ReceiptScannerModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
      />

      {/* POS Quick Sale Modal */}
      {isSaleModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(74,46,23,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF8E7' }}>
              <h3 style={{ margin: 0, fontFamily: 'Fraunces, serif', color: '#38210F' }}>Quick Point-of-Sale Entry</h3>
              <button onClick={() => setIsSaleModalOpen(false)} className="btn-icon">×</button>
            </div>
            <form onSubmit={handleRecordSaleSubmit} style={{ padding: '24px' }}>
              <div className="form-group">
                <label className="form-label">Item Sold</label>
                <select
                  className="form-select"
                  value={saleProduct}
                  onChange={(e) => setSaleProduct(e.target.value)}
                >
                  {inventory.map(i => (
                    <option key={i.id} value={i.name}>{i.name} (Stock: {i.quantity} {i.unit})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    className="form-input"
                    value={saleQuantity}
                    onChange={(e) => setSaleQuantity(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Total Received (ETB)</label>
                  <input
                    type="number"
                    min={10}
                    className="form-input"
                    value={saleTotal}
                    onChange={(e) => setSaleTotal(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Payment Channel</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['Telebirr', 'Cash', 'CBE Birr'] as const).map(p => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setSalePayment(p)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        border: salePayment === p ? '2px solid #D99A20' : '1px solid rgba(74,46,23,0.15)',
                        backgroundColor: salePayment === p ? '#FFF6D6' : '#FFFFFF',
                        fontWeight: salePayment === p ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setIsSaleModalOpen(false)} className="btn btn-outline btn-sm">Cancel</button>
                <button type="submit" className="btn btn-gold">Save Sale & Deduct Stock</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
