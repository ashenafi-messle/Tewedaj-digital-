'use client'

'use client'

import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatETB } from '../../utils/formatters';
import { Receipt, CheckCircle2, ShieldCheck, Download, Printer } from 'lucide-react';

export const CustomerPayments: React.FC = () => {
  const { creditAgreements } = useApp();

  const allRepayments = creditAgreements.flatMap(a =>
    a.repayments.map(r => ({
      ...r,
      agreementNumber: a.agreementNumber,
      merchantName: a.merchantName,
    }))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
            <Receipt size={24} color="#00695C" />
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: '#38210F', margin: 0 }}>
              Payment Receipts & Mandate Transactions
            </h1>
          </div>
          <p style={{ color: '#756B5D', fontSize: '0.85rem', margin: '4px 0 0' }}>
            Verified settlement records executed via Telebirr and Commercial Bank of Ethiopia.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Agreement #</th>
                <th>Merchant</th>
                <th>Payment Method</th>
                <th>Mandate Reference #</th>
                <th>Amount Paid</th>
                <th>Receipt Status</th>
              </tr>
            </thead>
            <tbody>
              {allRepayments.map((rep) => (
                <tr key={rep.id}>
                  <td>{rep.date}</td>
                  <td><strong>#{rep.agreementNumber}</strong></td>
                  <td>{rep.merchantName}</td>
                  <td>
                    <span className="badge badge-active">{rep.method}</span>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: '#756B5D' }}>
                    {rep.referenceNumber || 'TB-TX-998822'}
                  </td>
                  <td>
                    <strong style={{ color: '#4F7D3A', fontSize: '0.95rem' }}>
                      {formatETB(rep.amount)}
                    </strong>
                  </td>
                  <td>
                    <span style={{ color: '#4F7D3A', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={13} /> Verified
                    </span>
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
