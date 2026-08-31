'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InventoryItem } from '../../types';
import { formatETB } from '../../utils/formatters';
import {
  Boxes,
  Plus,
  Sparkles,
  Search,
  AlertTriangle,
  CheckCircle2,
  Edit2,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { ReceiptScannerModal } from '../common/ReceiptScannerModal';

export const MerchantInventory: React.FC = () => {
  const { inventory, updateInventoryItem, addInventoryItem, setCurrentPath, t, language } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState<boolean>(false);
  const [isAddManualModalOpen, setIsAddManualModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const isAm = language === 'am';

  // New Manual Item State
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Grains & Cereals');
  const [newItemQty, setNewItemQty] = useState(10);
  const [newItemUnit, setNewItemUnit] = useState('Quintals (100kg)');
  const [newItemBuyPrice, setNewItemBuyPrice] = useState(4000);
  const [newItemSellPrice, setNewItemSellPrice] = useState(4800);
  const [newItemSupplier, setNewItemSupplier] = useState('Direct Trader');

  const categories = ['All', 'Grains & Cereals', 'Cooking Oils', 'Spices & Condiments', 'Flour & Grain Mill', 'Hot Beverages'];

  const filtered = inventory.filter((i) => {
    const matchesCategory = selectedCategory === 'All' || i.category === selectedCategory;
    const q = (searchQuery || '').toLowerCase();
    const itemName = (i.name || i.productName || '').toLowerCase();
    const itemSupplier = (i.supplier || i.category || '').toLowerCase();
    const matchesSearch = !q || itemName.includes(q) || itemSupplier.includes(q);
    return matchesCategory && matchesSearch;
  });

  const totalValuation = inventory.reduce((sum, i) => sum + ((Number(i.quantity) || 0) * (Number(i.sellingPrice) || 0)), 0);
  const totalCost = inventory.reduce((sum, i) => sum + ((Number(i.quantity) || 0) * (Number(i.buyingPrice) || 0)), 0);
  const expectedProfit = totalValuation - totalCost;
  const profitMarginPercentage = totalValuation > 0 ? Math.round((expectedProfit / totalValuation) * 100) : 0;

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addInventoryItem({
      name: newItemName,
      category: newItemCategory,
      quantity: Number(newItemQty),
      unit: newItemUnit,
      buyingPrice: Number(newItemBuyPrice),
      sellingPrice: Number(newItemSellPrice),
      minThreshold: 5,
      supplier: newItemSupplier
    });
    setIsAddManualModalOpen(false);
    setNewItemName('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    updateInventoryItem(editingItem.id, {
      quantity: Number(editingItem.quantity),
      buyingPrice: Number(editingItem.buyingPrice),
      sellingPrice: Number(editingItem.sellingPrice),
      minThreshold: Number(editingItem.minThreshold)
    });
    setEditingItem(null);
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
            <Boxes size={24} color="#D99A20" />
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#38210F', margin: 0 }}>
              {t('merchantInventory.title')}
            </h1>
            <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
              {t('merchantInventory.subtitle')}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setIsReceiptModalOpen(true)}
              className="btn btn-gold"
            >
              <Sparkles size={16} /> {t('merchantInventory.scanReceipt')}
            </button>
            <button
              onClick={() => setIsAddManualModalOpen(true)}
              className="btn btn-outline"
            >
              <Plus size={16} /> {t('merchantInventory.addManual')}
            </button>
          </div>
        </div>
      </div>

      {/* Valuation Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.78rem', color: '#756B5D', fontWeight: 600 }}>{t('merchantInventory.retailValuation')}</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38210F', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {formatETB(totalValuation)}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#756B5D' }}>{isAm ? 'ጠቅላላይ የሽያጭ ዋጋ' : 'Total retail shelf value'}</span>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.78rem', color: '#756B5D', fontWeight: 600 }}>{t('merchantInventory.totalCost')}</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#756B5D', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {formatETB(totalCost)}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#756B5D' }}>{isAm ? 'የጅምላ ዋጋ' : 'Wholesale purchase cost'}</span>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.78rem', color: '#756B5D', fontWeight: 600 }}>{t('merchantInventory.projectedProfit')}</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4F7D3A', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {formatETB(expectedProfit)} ({profitMarginPercentage}%)
          </div>
          <span style={{ fontSize: '0.72rem', color: '#4F7D3A' }}>{isAm ? 'ጤናማ የሽያጭ ልዩነት' : 'Healthy retail spread'}</span>
        </div>
      </div>

      {/* Search and Filters */}
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
            placeholder={t('merchantInventory.searchPlaceholder')}
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

      {/* Inventory Table */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>{t('merchantInventory.productName')}</th>
                <th>{t('merchantInventory.category')}</th>
                <th>{t('merchantInventory.currentStock')}</th>
                <th>{t('merchantInventory.buyingPrice')}</th>
                <th>{t('merchantInventory.sellingPrice')}</th>
                <th>{t('merchantInventory.margin')}</th>
                <th>{t('merchantInventory.stockValuation')}</th>
                <th>{t('merchantInventory.status')}</th>
                <th>{t('merchantInventory.supplier')}</th>
                <th>{t('merchantInventory.action')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const isLow = item.quantity <= (item.minThreshold || item.minStockAlert || 3);
                const buyPrice = Number(item.buyingPrice) || 0;
                const sellPrice = Number(item.sellingPrice) || 0;
                const margin = sellPrice - buyPrice;
                const marginPercent = sellPrice > 0 ? Math.round((margin / sellPrice) * 100) : 0;
                const lineValuation = (Number(item.quantity) || 0) * sellPrice;
                const displayName = item.name || item.productName || 'Unnamed Product';
                const displaySupplier = item.supplier || 'Direct Trader';

                return (
                  <tr key={item.id}>
                    <td>
                      <strong style={{ color: '#38210F' }}>{displayName}</strong>
                    </td>
                    <td>
                      <span className="badge badge-active" style={{ fontSize: '0.7rem' }}>{item.category}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: isLow ? '#C62828' : '#38210F' }}>
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                    <td>{formatETB(buyPrice)}</td>
                    <td>
                      <strong style={{ color: '#D99A20' }}>{formatETB(sellPrice)}</strong>
                    </td>
                    <td style={{ color: '#4F7D3A', fontWeight: 600 }}>
                      +{formatETB(margin)} ({marginPercent}%)
                    </td>
                    <td>
                      <strong>{formatETB(lineValuation)}</strong>
                    </td>
                    <td>
                      {isLow ? (
                        <span className="badge badge-overdue" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <AlertTriangle size={12} /> {t('merchantInventory.lowStock')} ({item.quantity})
                        </span>
                      ) : (
                        <span className="badge badge-active">{t('merchantInventory.inStock')}</span>
                      )}
                    </td>
                    <td style={{ fontSize: '0.78rem', color: '#756B5D' }}>{displaySupplier}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => setEditingItem(item)}
                          className="btn btn-outline btn-sm"
                          style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                        >
                          <Edit2 size={12} /> {t('merchantInventory.edit')}
                        </button>
                        {isLow && (
                          <button
                            onClick={() => setCurrentPath('/merchant/marketplace')}
                            className="btn btn-gold btn-sm"
                            style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                          >
                            {t('merchantInventory.reorder')}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(74,46,23,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF8E7' }}>
              <h3 style={{ margin: 0, fontFamily: 'Fraunces, serif', color: '#38210F' }}>
                {t('merchantInventory.editStock')}: {editingItem.name || editingItem.productName}
              </h3>
              <button onClick={() => setEditingItem(null)} className="btn-icon">×</button>
            </div>
            <form onSubmit={handleSaveEdit} style={{ padding: '24px' }}>
              <div className="form-group">
                <label className="form-label">{t('merchantInventory.currentQty')} ({editingItem.unit})</label>
                <input
                  type="number"
                  min={0}
                  className="form-input"
                  value={editingItem.quantity}
                  onChange={(e) => setEditingItem({ ...editingItem, quantity: Number(e.target.value) })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">{t('merchantInventory.costPerUnit')}</label>
                  <input
                    type="number"
                    min={0}
                    className="form-input"
                    value={editingItem.buyingPrice}
                    onChange={(e) => setEditingItem({ ...editingItem, buyingPrice: Number(e.target.value) })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('merchantInventory.sellingPrice')} (ETB)</label>
                  <input
                    type="number"
                    min={0}
                    className="form-input"
                    value={editingItem.sellingPrice}
                    onChange={(e) => setEditingItem({ ...editingItem, sellingPrice: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('merchantInventory.lowStockThreshold')}</label>
                <input
                  type="number"
                  min={1}
                  className="form-input"
                  value={editingItem.minThreshold}
                  onChange={(e) => setEditingItem({ ...editingItem, minThreshold: Number(e.target.value) })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setEditingItem(null)} className="btn btn-outline btn-sm">{t('action.cancel')}</button>
                <button type="submit" className="btn btn-gold">{t('merchantInventory.updateStock')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Manual Modal */}
      {isAddManualModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(74,46,23,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF8E7' }}>
              <h3 style={{ margin: 0, fontFamily: 'Fraunces, serif', color: '#38210F' }}>
                {t('merchantInventory.addCustom')}
              </h3>
              <button onClick={() => setIsAddManualModalOpen(false)} className="btn-icon">×</button>
            </div>
            <form onSubmit={handleManualAdd} style={{ padding: '24px' }}>
              <div className="form-group">
                <label className="form-label">{t('merchantInventory.productName')}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={isAm ? 'ለምሳሌ የኢትዮጵያ ማር (ጎንደር)' : 'e.g. Pure Ethiopian Honey (Gonder)'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">{t('merchantInventory.category')}</label>
                  <select
                    className="form-select"
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">{t('merchantInventory.measurementUnit')}</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    placeholder={isAm ? 'ለምሳሌ 1ኪግ ጃር፣ ሳክ፣ ካርቶን' : 'e.g. 1kg Jar, Sack, Carton'}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">{t('merchantInventory.initialQty')}</label>
                  <input
                    type="number"
                    min={1}
                    className="form-input"
                    value={newItemQty}
                    onChange={(e) => setNewItemQty(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('merchantInventory.supplierSource')}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newItemSupplier}
                    onChange={(e) => setNewItemSupplier(e.target.value)}
                    placeholder={isAm ? 'ለምሳሌ የአካባቢ ገበት ወይም ውጫ ሱቅ' : 'e.g. Local farmer or outside shop'}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">{t('merchantInventory.costPerUnit')}</label>
                  <input
                    type="number"
                    min={1}
                    className="form-input"
                    value={newItemBuyPrice}
                    onChange={(e) => setNewItemBuyPrice(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('merchantInventory.sellingPrice')} (ETB)</label>
                  <input
                    type="number"
                    min={1}
                    className="form-input"
                    value={newItemSellPrice}
                    onChange={(e) => setNewItemSellPrice(Number(e.target.value))}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setIsAddManualModalOpen(false)} className="btn btn-outline btn-sm">{t('action.cancel')}</button>
                <button type="submit" className="btn btn-gold">{t('merchantInventory.saveInventory')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Receipt Scanner */}
      <ReceiptScannerModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
      />
    </div>
  );
};
