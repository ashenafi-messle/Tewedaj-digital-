'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { formatETB } from '../../utils/formatters';
import {
  ShoppingBag,
  Search,
  Filter,
  Plus,
  Truck,
  ShieldCheck,
  Star,
  MapPin,
  CheckCircle2,
  Boxes
} from 'lucide-react';
import { CartDrawer } from '../common/CartDrawer';
import confetti from 'canvas-confetti';

export const MerchantMarketplace: React.FC = () => {
  const { products, addToCart, cart, t, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quantityMap, setQuantityMap] = useState<Record<string, number>>({});
  const isAm = language === 'am';

  const categories = ['All', 'Grains & Teff', 'Oils & Fats', 'Spices & Seasoning', 'Coffee & Tea', 'Flour & Bakery'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const q = (searchQuery || '').toLowerCase();
    const pName = (p.name || p.amharicName || '').toLowerCase();
    const pWholesaler = (p.wholesalerName || p.supplierName || '').toLowerCase();
    const pOrigin = (p.origin || p.supplierLocation || '').toLowerCase();
    const matchesSearch = !q || pName.includes(q) || pWholesaler.includes(q) || pOrigin.includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleQuantityChange = (productId: string, val: number, minMoq: number) => {
    setQuantityMap((prev) => ({
      ...prev,
      [productId]: Math.max(minMoq, val)
    }));
  };

  const handleAddToCart = (product: Product) => {
    const qty = quantityMap[product.id] || product.moq;
    addToCart(product, qty);
    try {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
    } catch (e) {}
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div style={{
        backgroundColor: '#38210F',
        borderRadius: '24px',
        padding: '30px 32px',
        color: '#FFF8E7',
        border: '2px solid #D99A20',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-active" style={{ fontSize: '0.72rem' }}>
              DIRECT FROM MERKATO & COOPERATIVES
            </span>
          </div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.8rem', color: '#F4C542', margin: '0 0 8px' }}>
            {t('merchantMarket.title')}
          </h1>
          <p style={{ color: '#D4C3A3', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
            {t('merchantMarket.subtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="btn btn-gold btn-lg"
          style={{ position: 'relative' }}
        >
          <ShoppingBag size={20} />
          {t('merchantMarket.viewCart')} ({cart.length})
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '16px 20px',
        border: '1px solid rgba(74, 46, 23, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px', backgroundColor: '#FAF5E8', padding: '8px 14px', borderRadius: '10px', border: '1px solid rgba(74,46,23,0.1)' }}>
          <Search size={16} color="#756B5D" />
          <input
            type="text"
            placeholder={t('merchantMarket.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.85rem', color: '#38210F' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: selectedCategory === cat ? '1px solid #D99A20' : '1px solid rgba(74,46,23,0.15)',
                backgroundColor: selectedCategory === cat ? '#FFF6D6' : '#FFFFFF',
                color: selectedCategory === cat ? '#38210F' : '#756B5D',
                fontWeight: selectedCategory === cat ? 700 : 500,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {filteredProducts.map((p) => {
          const qty = quantityMap[p.id] || p.moq;
          const totalLinePrice = p.wholesalePrice * qty;

          return (
            <div key={p.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
              {/* Product Image */}
              <div style={{ position: 'relative', height: '180px', backgroundColor: '#EFEBE9' }}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(56, 33, 15, 0.85)',
                  color: '#FFF8E7',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: 700
                }}>
                  {p.category}
                </span>

                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#FFFFFF',
                  color: '#4F7D3A',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ShieldCheck size={12} /> {p.origin}
                </span>
              </div>

              {/* Product Info */}
              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', color: '#38210F', marginBottom: '4px', lineHeight: 1.3 }}>
                    {p.name}
                  </h3>
                  <p style={{ color: '#756B5D', fontSize: '0.78rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} color="#D99A20" /> {p.wholesalerName} • {p.wholesalerLocation}
                  </p>
                  <p style={{ color: '#756B5D', fontSize: '0.82rem', lineHeight: 1.4, marginBottom: '14px' }}>
                    {p.description}
                  </p>
                </div>

                {/* Price & MOQ */}
                <div style={{ borderTop: '1px solid rgba(74,46,23,0.08)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#756B5D' }}>{t('merchantMarket.wholesalePrice')}</span>
                      <div style={{ color: '#D99A20', fontSize: '1.15rem', fontWeight: 800 }}>
                        {formatETB(p.wholesalePrice)} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#756B5D' }}>/ {p.unit}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#756B5D', backgroundColor: '#FAF5E8', padding: '2px 6px', borderRadius: '4px' }}>
                      {t('merchantMarket.moq')} {p.moq || p.minOrderQuantity || 1} {p.unit}
                    </span>
                  </div>

                  {/* Quantity control and Add to cart */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(74,46,23,0.2)', borderRadius: '8px', backgroundColor: '#FAF5E8' }}>
                      <button
                        onClick={() => handleQuantityChange(p.id, qty - 1, p.moq || p.minOrderQuantity || 1)}
                        style={{ padding: '6px 10px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, padding: '0 6px' }}>{qty}</span>
                      <button
                        onClick={() => handleQuantityChange(p.id, qty + 1, p.moq || p.minOrderQuantity || 1)}
                        style={{ padding: '6px 10px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleAddToCart(p)}
                      className="btn btn-gold btn-sm"
                      style={{ flex: 1, padding: '8px 12px' }}
                    >
                      <Plus size={14} /> {t('merchantMarket.add')} ({formatETB(totalLinePrice)})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};
