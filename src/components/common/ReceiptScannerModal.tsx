'use client'

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatETB } from '../../utils/formatters';
import { X, Camera, Upload, CheckCircle2, Sparkles, FileText, ArrowRight, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReceiptScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptScannerModal: React.FC<ReceiptScannerModalProps> = ({ isOpen, onClose }) => {
  const { recordExternalReceipt } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedReceipt, setScannedReceipt] = useState<{
    supplier: string;
    date: string;
    invoiceNo: string;
    items: Array<{ name: string; quantity: number; unit: string; buyingPrice: number; sellingPrice: number; category: string }>;
  } | null>(null);

  if (!isOpen) return null;

  const simulateOCRScan = (receiptType: 'supplier' | 'flour') => {
    setIsScanning(true);
    setScannedReceipt(null);
    setIsScanning(false);
    if (receiptType === 'supplier') {
        setScannedReceipt({
          supplier: 'Gondar Agro-Trade Union (Outside Purchase)',
          date: '2026-08-19',
          invoiceNo: 'MK-INV-88902',
          items: [
            { name: 'Pure Sesame Seeds (Nug/Selit)', quantity: 3, unit: '50kg Sack', buyingPrice: 4200, sellingPrice: 4800, category: 'Oilseeds' },
            { name: 'Ethiopian Black Cumin (Tikur Azmud)', quantity: 10, unit: '1kg Pack', buyingPrice: 160, sellingPrice: 220, category: 'Spices' },
            { name: 'Selam Cooking Oil (5L)', quantity: 12, unit: 'Jerrycans', buyingPrice: 1050, sellingPrice: 1250, category: 'Oils & Fats' }
          ]
        });
      } else {
        setScannedReceipt({
          supplier: 'Akaki Modern Flour Mills S.C.',
          date: '2026-08-18',
          invoiceNo: 'AK-MILL-44102',
          items: [
            { name: 'Horizon Fortified Wheat Flour', quantity: 6, unit: '50kg Bags', buyingPrice: 3800, sellingPrice: 4400, category: 'Grains & Cereals' },
            { name: 'Baking Yeast (Mauripan Pack)', quantity: 20, unit: '500g Pack', buyingPrice: 180, sellingPrice: 240, category: 'Bakery' }
          ]
        });
    }

    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch (e) {}
  };

  const handleApplyToInventory = () => {
    if (!scannedReceipt) return;
    recordExternalReceipt(scannedReceipt.items, scannedReceipt.supplier);
    onClose();
    setScannedReceipt(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '580px' }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(74, 46, 23, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFF8E7'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="#D99A20" />
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#38210F', fontFamily: 'Fraunces, serif' }}>
                AI Receipt Scanner & OCR
              </h3>
            </div>
            <p style={{ margin: '3px 0 0', fontSize: '0.78rem', color: '#756B5D' }}>
              Ingest external physical receipts to update stock and purchase ledgers automatically
            </p>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Instructions */}
          <div style={{
            backgroundColor: '#FAF5E8',
            borderRadius: '10px',
            padding: '12px 16px',
            fontSize: '0.825rem',
            color: '#4A2E17',
            marginBottom: '18px',
            border: '1px solid rgba(74, 46, 23, 0.08)'
          }}>
            If your purchase was made outside TEWEDAJ, quickly snap a photo of the paper receipt or supplier invoice. Our AI extractor detects product quantities, buying prices, and units automatically.
          </div>

          {!scannedReceipt && !isScanning && (
            <div>
              <div style={{
                border: '2px dashed #D99A20',
                borderRadius: '16px',
                padding: '32px 20px',
                textAlign: 'center',
                backgroundColor: '#FFFDF9',
                marginBottom: '20px'
              }}>
                <Camera size={40} color="#D99A20" style={{ marginBottom: '12px' }} />
                <h4 style={{ color: '#38210F', marginBottom: '6px' }}>Capture or Upload Receipt</h4>
                <p style={{ color: '#756B5D', fontSize: '0.85rem', marginBottom: '18px' }}>
                  Choose a demo physical paper invoice from local suppliers to test AI ingestion:
                </p>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => simulateOCRScan('supplier')}
                    className="btn btn-gold btn-sm"
                  >
                    <FileText size={14} /> Scan Supplier Spice & Oil Receipt
                  </button>
                  <button
                    onClick={() => simulateOCRScan('flour')}
                    className="btn btn-outline btn-sm"
                  >
                    <FileText size={14} /> Scan Akaki Flour Invoice
                  </button>
                </div>
              </div>
            </div>
          )}

          {isScanning && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <Loader2 size={42} color="#D99A20" className="animate-spin" style={{ marginBottom: '16px', animation: 'spin 1s linear infinite' }} />
              <h4 style={{ color: '#38210F', marginBottom: '6px' }}>Analyzing Receipt with Optical AI...</h4>
              <p style={{ color: '#756B5D', fontSize: '0.85rem' }}>
                Detecting Ethiopian Birr totals, line items, and supplier metadata...
              </p>
            </div>
          )}

          {scannedReceipt && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#EEF5E5',
                padding: '10px 14px',
                borderRadius: '8px',
                marginBottom: '16px',
                border: '1px solid #C8E6C9'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2E7D32', fontWeight: 700, fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} /> OCR Extracted Successfully
                </div>
                <span style={{ fontSize: '0.75rem', color: '#375928' }}>{scannedReceipt.invoiceNo}</span>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#38210F', marginBottom: '12px' }}>
                <strong>Supplier:</strong> {scannedReceipt.supplier} ({scannedReceipt.date})
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', maxHeight: '220px', overflowY: 'auto' }}>
                {scannedReceipt.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#FAF5E8',
                      border: '1px solid rgba(74, 46, 23, 0.08)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div>
                      <strong style={{ color: '#38210F', display: 'block' }}>{item.name}</strong>
                      <span style={{ color: '#756B5D', fontSize: '0.75rem' }}>
                        Qty: +{item.quantity} {item.unit} • Category: {item.category}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: '#D99A20' }}>
                        {formatETB(item.buyingPrice)} / unit
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#4F7D3A' }}>
                        Sell at: {formatETB(item.sellingPrice)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(74, 46, 23, 0.1)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          backgroundColor: '#FFF8E7'
        }}>
          <button onClick={onClose} className="btn btn-outline btn-sm">
            Cancel
          </button>
          {scannedReceipt && (
            <button onClick={handleApplyToInventory} className="btn btn-gold">
              Apply & Update Inventory (+{scannedReceipt.items.length} Items)
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
