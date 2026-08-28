'use client'

import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, BarChart3, MapPin, Users, DollarSign, Award } from 'lucide-react';
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

export const WholesalerAnalytics: React.FC = () => {
  const { t, language } = useApp();
  const isAm = language === 'am';
  const subCityDemandData = [
    { subCity: 'maraki', orders: 180, volume: 420000 },
    { subCity: 'arada', orders: 140, volume: 310000 },
    { subCity: 'piasa', orders: 110, volume: 240000 },
    { subCity: 'azezo', orders: 130, volume: 290000 },
    { subCity: 'tseda', orders: 90, volume: 195000 },
  ];

  const commodityShare = [
    { name: 'Adaa Magna Teff', value: 48, color: '#F4C542' },
    { name: 'Selam Cooking Oil 5L', value: 26, color: '#D99A20' },
    { name: 'Horizon Wheat Flour', value: 16, color: '#4A2E17' },
    { name: 'Pure Red Pepper Berbere', value: 10, color: '#4F7D3A' },
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
            <TrendingUp size={24} color="#4A2E17" />
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#38210F', margin: 0 }}>
              {t('wholesalerAnalytics.title')}
            </h1>
          </div>
          <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
            {t('wholesalerAnalytics.subtitle')}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Subcity Demand */}
        <div className="card">
          <h3 style={{ color: '#38210F', fontSize: '1.1rem', marginBottom: '16px' }}>
            {t('wholesalerAnalytics.subcityOutflow')}
          </h3>
          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subCityDemandData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(74,46,23,0.08)" />
                <XAxis dataKey="subCity" stroke="#756B5D" fontSize={11} />
                <YAxis stroke="#756B5D" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#FFF8E7', borderColor: '#D99A20', borderRadius: '8px' }} />
                <Bar dataKey="volume" name={t('wholesalerAnalytics.dispatched')} fill="#4A2E17" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Commodity Share */}
        <div className="card">
          <h3 style={{ color: '#38210F', fontSize: '1.1rem', marginBottom: '16px' }}>
            {t('wholesalerAnalytics.fastestCommodities')}
          </h3>
          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={commodityShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {commodityShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#FFF8E7', borderColor: '#D99A20', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '0.78rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
