'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { formatETB } from '../../utils/formatters';
import { Boxes, Plus, Edit2, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WholesalerProducts: React.FC = () => {
  const { products, addProduct, currentUser, t, language } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const isAm = language === 'am';

  // Form State
  const [name, setName] = useState('Organic Red Haricot Beans (Boleqe)');
  const [category, setCategory] = useState('Grains & Teff');
  const [price, setPrice] = useState(3800);
  const [unit, setUnit] = useState('100kg Quintal');
  const [moq, setMoq] = useState(2);
  const [origin, setOrigin] = useState('Hawassa / Wolaita');
  const [description, setDescription] = useState('High-protein clean sorted beans for bulk retail packaging.');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1551481577-4c8180c436a5?w=600&auto=format&fit=crop');
  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1551481577-4c8180c436a5?w=600&auto=format&fit=crop');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name,
      category,
      wholesalePrice: Number(price),
      unit,
      moq: Number(moq),
      origin,
      wholesalerId: currentUser?.id || 'usr-wholesaler-1',
      wholesalerName: currentUser?.businessName || 'Merkato Central Agro Wholesalers',
      wholesalerLocation: currentUser?.location || 'Merkato Military Tera, Addis Ababa',
      description,
      image,
      stockAvailable: 250,
      inStock: true
    });
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch (e) {}
    setIsAddModalOpen(false);
  };

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
            <Boxes size={24} color="#4A2E17" />
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#38210F', margin: 0 }}>
              {t('wholesalerProducts.title')}
            </h1>
          </div>
          <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
            {t('wholesalerProducts.subtitle')}
          </p>
        </div>

        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-brown">
          <Plus size={16} /> {t('wholesalerProducts.addCommodity')}
        </button>
      </div>

      {/* Grid of Products */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {products.map((p) => (
          <div key={p.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: '160px', position: 'relative' }}>
              <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#38210F', color: '#FFF8E7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                {p.category}
              </span>
            </div>

            <div style={{ padding: '16px' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#38210F', marginBottom: '4px' }}>{p.name}</h3>
              <p style={{ fontSize: '0.78rem', color: '#756B5D', marginBottom: '10px' }}>{p.origin} • MOQ: {p.moq} {p.unit}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(74,46,23,0.08)', paddingTop: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#756B5D' }}>{t('wholesalerProducts.wholesalePrice')}</span>
                  <div style={{ fontWeight: 800, color: '#D99A20', fontSize: '1.1rem' }}>
                    {formatETB(p.wholesalePrice)} / {p.unit}
                  </div>
                </div>
                <span className="badge badge-active" style={{ fontSize: '0.7rem' }}>
                  {isAm ? 'ክምችት አለ' : `${p.stockAvailable || 200} in Stock`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '520px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(74,46,23,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF8E7' }}>
              <h3 style={{ margin: 0, fontFamily: 'Fraunces, serif', color: '#38210F' }}>{t('wholesalerProducts.addCommodity')}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="btn-icon">×</button>
            </div>
            <form onSubmit={handleAdd} style={{ padding: '24px' }}>
              <div className="form-group">
                <label className="form-label">{t('wholesalerProducts.productName')}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">{t('wholesalerProducts.category')}</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Grains & Teff">Grains & Teff</option>
                    <option value="Oils & Fats">Oils & Fats</option>
                    <option value="Spices & Seasoning">Spices & Seasoning</option>
                    <option value="Coffee & Tea">Coffee & Tea</option>
                    <option value="Flour & Bakery">Flour & Bakery</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">{t('wholesalerProducts.unit')}</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">{t('wholesalerProducts.wholesalePrice')}</label>
                  <input
                    type="number"
                    required
                    min={100}
                    className="form-input"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('wholesalerProducts.moq')}</label>
                  <input
                    type="number"
                    required
                    min={1}
                    className="form-input"
                    value={moq}
                    onChange={(e) => setMoq(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('wholesalerProducts.origin')}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('wholesalerProducts.description')}</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('wholesalerProducts.image')}</label>
                <div style={{
                  border: '2px dashed rgba(74, 46, 23, 0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#D99A20'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(74, 46, 23, 0.2)'}
                >
                  {imagePreview ? (
                    <div style={{ position: 'relative' }}>
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImage('https://images.unsplash.com/photo-1551481577-4c8180c436a5?w=600&auto=format&fit=crop');
                          setImagePreview('https://images.unsplash.com/photo-1551481577-4c8180c436a5?w=600&auto=format&fit=crop');
                        }}
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(217, 154, 32, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px'
                      }}>
                        <Plus size={24} color="#D99A20" />
                      </div>
                      <p style={{ color: '#756B5D', fontSize: '0.875rem', marginBottom: '4px' }}>
                        {t('wholesalerProducts.uploadImage')}
                      </p>
                      <p style={{ color: '#A39686', fontSize: '0.75rem' }}>
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-outline btn-sm">{t('wholesalerProducts.cancel')}</button>
                <button type="submit" className="btn btn-brown">{t('wholesalerProducts.save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
