'use client'

import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatETB } from '../../utils/formatters';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  CreditCard,
  Boxes,
  Printer,
  CheckCircle2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export const MerchantReports: React.FC = () => {
  const { salesTransactions, creditAgreements, inventory, t, language } = useApp();
  const isAm = language === 'am';

  const totalSales = salesTransactions.reduce((sum, s) => sum + (Number(s.totalAmount) || 0), 0) + 78500; // adding baseline historical demo month
  const totalCreditIssued = creditAgreements.reduce((sum, a) => sum + (Number(a.totalAmount) || 0), 0);
  const totalCreditCollected = creditAgreements.reduce((sum, a) => sum + (Number(a.paidAmount) || 0), 0);
  const recoveryRate = totalCreditIssued > 0 ? Math.round((totalCreditCollected / totalCreditIssued) * 100) : 100;

  // Category sales distribution
  const categorySalesData = [
    { name: 'Grains & Teff', value: 45000, color: '#F4C542' },
    { name: 'Cooking Oils', value: 28000, color: '#D99A20' },
    { name: 'Spices & Sauces', value: 14500, color: '#4A2E17' },
    { name: 'Flour & Bakery', value: 18000, color: '#4F7D3A' },
  ];

  // Monthly revenue vs cost
  const monthlyData = [
    { month: 'May', revenue: 62000, cost: 48000, profit: 14000 },
    { month: 'Jun', revenue: 74000, cost: 56000, profit: 18000 },
    { month: 'Jul', revenue: 89000, cost: 67000, profit: 22000 },
    { month: 'Aug (MTD)', revenue: totalSales, cost: 69000, profit: 28500 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '24px 28px',
        border: '1px solid rgba(74, 46, 23, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={24} color="#D99A20" />
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#38210F', margin: 0 }}>
              {t('merchantReports.title')}
            </h1>
            <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
              {t('merchantReports.subtitle')}
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('Exporting complete digital ledger CSV / PDF for tax and banking lines.')}
          className="btn btn-gold btn-sm"
        >
          <Download size={14} /> {t('merchantReports.export')}
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="card">
          <span style={{ fontSize: '0.78rem', color: '#756B5D', fontWeight: 600 }}>{t('merchantReports.monthlyRevenue')}</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38210F', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {formatETB(totalSales)}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#4F7D3A' }}>{isAm ? '+24% እድገት ከTEWEDAJ ከተቀላቀሉ በኋላ' : '+24% growth since joining TEWEDAJ'}</span>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.78rem', color: '#756B5D', fontWeight: 600 }}>{t('merchantReports.netProfit')}</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4F7D3A', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            ETB 28,500
          </div>
          <span style={{ fontSize: '0.72rem', color: '#4F7D3A' }}>{isAm ? 'አማካይ 22.8% የሽያጭ ትርፍ' : 'Avg. 22.8% gross retail margin'}</span>
        </div>

        <div className="card">
          <span style={{ fontSize: '0.78rem', color: '#756B5D', fontWeight: 600 }}>{t('merchantReports.collectionRate')}</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#D99A20', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {recoveryRate}%
          </div>
          <span style={{ fontSize: '0.72rem', color: '#756B5D' }}>{isAm ? 'Telebirr እና CBE ውጤታማነት' : 'Telebirr & CBE mandate efficiency'}</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Monthly Revenue vs Profit */}
        <div className="card">
          <h3 style={{ color: '#38210F', fontSize: '1.1rem', marginBottom: '16px' }}>
            {t('merchantReports.monthlyRevenueProfit')}
          </h3>
          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(74,46,23,0.08)" />
                <XAxis dataKey="month" stroke="#756B5D" fontSize={12} />
                <YAxis stroke="#756B5D" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#FFF8E7', borderColor: '#D99A20', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                <Bar dataKey="revenue" name="Total Revenue" fill="#F4C542" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Gross Profit" fill="#4F7D3A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Contribution */}
        <div className="card">
          <h3 style={{ color: '#38210F', fontSize: '1.1rem', marginBottom: '16px' }}>
            {t('merchantReports.categoryShare')}
          </h3>
          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySalesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categorySalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#FFF8E7', borderColor: '#D99A20', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* POS Transactions History */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ color: '#38210F', fontSize: '1.15rem', margin: 0 }}>
            {t('merchantReports.posTransactions')}
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#756B5D' }}>{t('merchantReports.synchronized')}</span>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>{t('merchantReports.receipt')}</th>
                <th>{t('merchantReports.dateTime')}</th>
                <th>{t('merchantReports.customer')}</th>
                <th>{t('merchantReports.itemsSold')}</th>
                <th>{t('merchantReports.paymentChannel')}</th>
                <th>{t('merchantReports.totalAmount')}</th>
              </tr>
            </thead>
            <tbody>
              {salesTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td><strong>#{tx.receiptNumber}</strong></td>
                  <td style={{ fontSize: '0.8rem', color: '#756B5D' }}>{tx.date}</td>
                  <td>{tx.customerName}</td>
                  <td>
                    {tx.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                  </td>
                  <td>
                    <span className="badge badge-active">{tx.paymentMethod || tx.paymentType || 'Cash'}</span>
                  </td>
                  <td>
                    <strong style={{ color: '#D99A20' }}>{formatETB(tx.totalAmount)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
