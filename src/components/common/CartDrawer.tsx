'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatETB } from '../../utils/formatters';
import { X, Trash2, ShoppingBag, Truck, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CreditRequestModal } from './CreditRequestModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateCartQuantity, checkoutCart, setCurrentPath, currentUser, theme } = useApp();
  const [address, setAddress] = useState('Bole Woreda 03, Near Dembel Mall, Addis Ababa');
  const [notes, setNotes] = useState('Please call when near landmark. Back door storage.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompletedNumber, setOrderCompletedNumber] = useState<string | null>(null);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (Number(item.product?.wholesalePrice) || 0) * (Number(item.quantity) || 0), 0);
  const deliveryFee = 450;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!address.trim()) {
      alert('Please enter a delivery address');
      return;
    }
    setIsSubmitting(true);
    const order = checkoutCart(address, notes);
    setIsSubmitting(false);
    if (order) {
      setOrderCompletedNumber(order.orderNumber);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if confetti fails
      }
    }
  };

  const handleCreditRequest = () => {
    if (!address.trim()) {
      alert('Please enter a delivery address');
      return;
    }
    setIsCreditModalOpen(true);
  };

  const handleDirectOrder = () => {
    handleCheckout();
  };

  // Get wholesaler info from cart (assuming all items from same wholesaler)
  const firstItem = cart[0];
  const wholesalerId = firstItem?.product?.supplierId || firstItem?.product?.wholesalerId || '';
  const wholesalerName = firstItem?.product?.supplierName || firstItem?.product?.wholesalerName || '';
  const wholesalerLocation = firstItem?.product?.supplierLocation || firstItem?.product?.wholesalerLocation || '';
  const wholesalerPhone = '';

  const orderItems = cart.map(item => ({
    productId: item.product.id,
    productName: item.product.name,
    quantity: item.quantity,
    unit: item.product.unit,
    unitPrice: item.product.wholesalePrice,
    totalPrice: item.product.wholesalePrice * item.quantity
  }));

  const drawerContent = (
    <div className="modal-overlay" style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div style={{
        backgroundColor: isDark ? '#1A1512' : '#FFFFFF',
        width: '100%',
        maxWidth: '460px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isDark ? '-8px 0 30px rgba(0, 0, 0, 0.5)' : '-8px 0 30px rgba(74, 46, 23, 0.2)',
        animation: 'slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: isDark ? '1px solid rgba(255, 170, 44, 0.15)' : '1px solid rgba(74, 46, 23, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: isDark ? '#211710' : '#FFF8E7'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color={isDark ? '#FFB94D' : '#D99A20'} />
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: isDark ? '#FFF4E5' : '#38210F', fontFamily: 'Fraunces, serif' }}>
              Wholesale Cart ({cart.length})
            </h3>
          </div>
          <button
            onClick={() => {
              setOrderCompletedNumber(null);
              onClose();
            }}
            className="btn-icon"
            style={{ color: isDark ? '#F0DFCD' : '#38210F' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {orderCompletedNumber ? (
          <div style={{ padding: '36px 24px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#EEF5E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#375928',
              marginBottom: '16px'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ color: '#38210F', marginBottom: '8px' }}>Wholesale Order Placed!</h3>
            <p style={{ color: '#756B5D', fontSize: '0.9rem', marginBottom: '16px', maxWidth: '300px' }}>
              Order <strong>#{orderCompletedNumber}</strong> has been transmitted to Merkato Central Wholesalers and assigned for express delivery.
            </p>
            <div style={{
              backgroundColor: '#FAF5E8',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid rgba(74,46,23,0.1)',
              fontSize: '0.825rem',
              color: '#4A2E17',
              marginBottom: '24px',
              textAlign: 'left',
              width: '100%'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px' }}>
                <Truck size={15} color="#4F7D3A" /> Delivery OTP Security
              </div>
              <div>Share the 4-digit OTP shown in your Inbound Orders tab with the rider when the stock arrives.</div>
            </div>
            <button
              onClick={() => {
                setOrderCompletedNumber(null);
                onClose();
                setCurrentPath('/merchant/orders');
              }}
              className="btn btn-gold"
              style={{ width: '100%' }}
            >
              Track Inbound Order
              <ArrowRight size={16} />
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
            <ShoppingBag size={48} color="#D4C3A3" style={{ marginBottom: '12px' }} />
            <h4 style={{ color: '#38210F', marginBottom: '6px' }}>Your wholesale cart is empty</h4>
            <p style={{ color: '#756B5D', fontSize: '0.85rem', marginBottom: '20px' }}>
              Browse verified Ethiopian grain, oil, and FMCG wholesalers in the marketplace.
            </p>
            <button
              onClick={() => {
                onClose();
                setCurrentPath('/merchant/marketplace');
              }}
              className="btn btn-gold btn-sm"
            >
              Explore Wholesale Market
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '20px 24px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: '#FAF5E8',
                    border: '1px solid rgba(74, 46, 23, 0.08)'
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#38210F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.product.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#756B5D' }}>
                      {formatETB(item.product.wholesalePrice)} / {item.product.unit}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            border: '1px solid rgba(74, 46, 23, 0.2)',
                            background: '#FFFFFF',
                            cursor: 'pointer',
                            fontWeight: 700
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            border: '1px solid rgba(74, 46, 23, 0.2)',
                            background: '#FFFFFF',
                            cursor: 'pointer',
                            fontWeight: 700
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div style={{ fontWeight: 700, color: '#4A2E17', fontSize: '0.9rem' }}>
                        {formatETB((Number(item.product.wholesalePrice) || 0) * (Number(item.quantity) || 0))}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{ background: 'none', border: 'none', color: '#A39686', cursor: 'pointer' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery address input */}
            <div style={{ marginTop: '20px', borderTop: '1px solid rgba(74, 46, 23, 0.1)', paddingTop: '16px' }}>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Truck size={14} color="#D99A20" /> Delivery Drop-off Location
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Sub-city, woreda, nearby landmark..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Note (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Gate code, unloading instructions..."
                />
              </div>

              {/* Price summary */}
              <div style={{ backgroundColor: '#FFFDF9', padding: '14px', borderRadius: '10px', border: '1px solid rgba(74, 46, 23, 0.08)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#756B5D', marginBottom: '6px' }}>
                  <span>Wholesale Subtotal</span>
                  <span>{formatETB(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#756B5D', marginBottom: '6px' }}>
                  <span>Cargo Delivery Fee (Bajaj/Van)</span>
                  <span>{formatETB(deliveryFee)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 800, color: '#38210F', borderTop: '1px dashed rgba(74,46,23,0.15)', paddingTop: '8px' }}>
                  <span>Total Due</span>
                  <span>{formatETB(total)}</span>
                </div>
              </div>

              {/* Payment Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '12px' }}
                >
                  {isSubmitting ? 'Transmitting Order...' : 'Direct Order - Pay on Delivery'}
                </button>
                <button
                  onClick={handleCreditRequest}
                  disabled={isSubmitting}
                  className="btn"
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: isDark ? 'rgba(255, 170, 44, 0.1)' : '#FFF8E7',
                    border: isDark ? '1px solid rgba(255, 170, 44, 0.3)' : '1px solid #D99A20',
                    color: isDark ? '#FFB94D' : '#D99A20',
                    fontWeight: 600
                  }}
                >
                  <ShieldCheck size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                  Request Platform Credit Guarantee
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );

  return (
    <>
      {drawerContent}
      <CreditRequestModal
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
        wholesalerId={wholesalerId}
        wholesalerName={wholesalerName}
        wholesalerPhone={wholesalerPhone || ''}
        wholesalerLocation={wholesalerLocation}
        items={orderItems}
        totalAmount={total}
        onDirectOrder={handleDirectOrder}
      />
    </>
  );
};
