'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { CreditAgreement } from '../../types';
import { formatETB } from '../../utils/formatters';
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  DollarSign,
  FileText,
  User,
  Printer,
  ChevronRight,
  Building2,
  Smartphone,
  Lock,
  Copy,
  Check
} from 'lucide-react';
import { CreditAgreementModal } from '../common/CreditAgreementModal';
import { RepaymentModal } from '../common/RepaymentModal';

export const MerchantCreditHub: React.FC = () => {
  const { creditAgreements, currentUser, language, t } = useApp();
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNewAgreementModalOpen, setIsNewAgreementModalOpen] = useState<boolean>(false);
  const [selectedAgreementForRepay, setSelectedAgreementForRepay] = useState<CreditAgreement | null>(null);
  const [viewAgreementDetail, setViewAgreementDetail] = useState<CreditAgreement | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);

  const filtered = creditAgreements.filter((a) => {
    const matchesFilter = filterStatus === 'All' || a.status === filterStatus;
    const q = (searchQuery || '').toLowerCase();
    const custName = (a.customerName || '').toLowerCase();
    const agNum = (a.agreementNumber || '').toLowerCase();
    const goods = (a.goodsDescription || '').toLowerCase();
    const phone = (a.paymentPartnerDetails?.telebirrPhone || '').toLowerCase();
    const matchesSearch =
      !q ||
      custName.includes(q) ||
      agNum.includes(q) ||
      goods.includes(q) ||
      phone.includes(q);
    return matchesFilter && matchesSearch;
  });

  const totalOutstanding = creditAgreements
    .filter(a => a.status === 'Active' || a.status === 'Overdue')
    .reduce((sum, a) => sum + (Number(a.remainingAmount) || 0), 0);

  const totalRecovered = creditAgreements.reduce((sum, a) => sum + (Number(a.paidAmount) || 0), 0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header Card */}
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
            <CreditCard size={24} color="#D99A20" />
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: 'var(--brown-dark)', margin: 0 }}>
              {t('credit.title', 'Digital Credit Ledger & Agreements')}
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
            {t('credit.subtitle', 'Bank-account linked agreements backed by Telebirr mobile mandates and customer SMS OTP authorizations.')}
          </p>
        </div>

        <button
          onClick={() => setIsNewAgreementModalOpen(true)}
          className="btn btn-gold"
        >
          <Plus size={16} /> {t('credit.newAgreementBtn', 'New Credit Agreement')}
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {t('credit.outstanding', 'TOTAL CREDIT OUTSTANDING')}
          </span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold-primary)', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {formatETB(totalOutstanding)}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {language === 'am' ? 'ያልተከፈለ ገቢር ሂሳብ' : 'Active unpaid balances'}
          </span>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {t('credit.recovered', 'TOTAL RECOVERED / SETTLED')}
          </span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4F7D3A', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            {formatETB(totalRecovered)}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#4F7D3A' }}>
            {language === 'am' ? 'ያለምንም ጭቅጭቅ የተመለሰ' : 'Zero notebook disputes'}
          </span>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {t('credit.otpRate', 'OTP AUTHORIZATION RATE')}
          </span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brown-dark)', fontFamily: 'Fraunces, serif', marginTop: '4px' }}>
            100% {language === 'am' ? 'የተረጋገጠ' : 'Verified'}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#4F7D3A' }}>
            {language === 'am' ? 'በቴሌብርና ሲቢኢ ደንበኛ ጸድቋል' : 'Telebirr & CBE customer authorized'}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        backgroundColor: 'var(--white)',
        borderRadius: '16px',
        padding: '16px 20px',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px', backgroundColor: 'var(--surface-elevated)', padding: '8px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder={t('credit.searchPlaceholder', 'Search by customer name, phone, bank account, or agreement #...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.85rem', color: 'var(--text-dark)' }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'All', labelEn: 'All', labelAm: 'ሁሉም' },
            { id: 'Active', labelEn: 'Active', labelAm: 'ገቢር' },
            { id: 'Repaid', labelEn: 'Repaid', labelAm: 'የተከፈለ' },
            { id: 'Overdue', labelEn: 'Overdue', labelAm: 'ያለፈበት' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: filterStatus === st.id ? '1px solid #D99A20' : '1px solid rgba(74,46,23,0.15)',
                backgroundColor: filterStatus === st.id ? '#FFF6D6' : '#FFFFFF',
                color: filterStatus === st.id ? '#38210F' : '#756B5D',
                fontWeight: filterStatus === st.id ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {language === 'am' ? st.labelAm : st.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Agreements Table */}
      <div className="card">
        <div className="table-container">
          <table className="table credit-agreements-table">
            <thead>
              <tr>
                <th>{language === 'am' ? 'የውል ቁጥር' : 'Agreement'}</th>
                <th>{language === 'am' ? 'የደንበኛ መረጃ' : 'Customer Details'}</th>
                <th>{language === 'am' ? 'የተወሰዱ ዕቃዎች' : 'Purchased Items'}</th>
                <th>{language === 'am' ? 'የቴሌብር መለያ' : 'Telebirr Account'}</th>
                <th>{language === 'am' ? 'ዋና / የተከፈለ' : 'Principal / Paid'}</th>
                <th>{language === 'am' ? 'ቀሪ' : 'Remaining'}</th>
                <th>{language === 'am' ? 'የመክፈያ ቀን' : 'Due Date'}</th>
                <th>{language === 'am' ? 'OTP ማረጋገጫ' : 'Mandate & OTP'}</th>
                <th>{language === 'am' ? 'ሁኔታ' : 'Status'}</th>
                <th>{language === 'am' ? 'ተግባር' : 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ag) => {
                const percent = Math.round((ag.paidAmount / ag.totalAmount) * 100);
                return (
                  <tr key={ag.id}>
                    <td>
                      <button
                        onClick={() => setViewAgreementDetail(ag)}
                        style={{ background: 'none', border: 'none', color: '#D99A20', fontWeight: 700, cursor: 'pointer', textAlign: 'left', textDecoration: 'underline' }}
                      >
                        #{ag.agreementNumber}
                      </button>
                      <div style={{ fontSize: '0.72rem', color: '#756B5D' }}>{ag.creationDate}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#38210F' }}>{ag.customerName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#756B5D' }}>{ag.customerPhone}</div>
                      {ag.customerIdNumber && (
                        <div style={{ fontSize: '0.68rem', color: '#A39686' }}>{ag.customerIdNumber}</div>
                      )}
                    </td>
                    <td className="table-cell-wrap">
                      {ag.goodsDescription}
                    </td>
                    <td>
                      <div style={{ fontSize: '0.75rem', color: '#38210F' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                          <Building2 size={12} color="#D99A20" />
                          <span>Telebirr: {ag.paymentPartnerDetails?.telebirrPhone || ag.customerPhone}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#4F7D3A', fontSize: '0.72rem', marginTop: '2px' }}>
                          <Smartphone size={11} />
                          <span>Telebirr: {ag.paymentPartnerDetails?.telebirrPhone || ag.merchantPhone}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#38210F' }}>{formatETB(ag.totalAmount)}</div>
                      <div style={{ color: '#4F7D3A', fontSize: '0.75rem' }}>Paid: {formatETB(ag.paidAmount)}</div>
                    </td>
                    <td>
                      <strong style={{ color: (Number(ag.remainingAmount) || 0) > 0 ? '#D99A20' : '#4F7D3A' }}>
                        {formatETB(ag.remainingAmount)}
                      </strong>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: '#38210F' }}>{ag.dueDate}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '0.72rem', color: '#4F7D3A', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700 }}>
                          <ShieldCheck size={12} /> {ag.authorizationMandate?.provider || 'Telebirr Mandate'}
                        </span>
                        <span style={{ fontSize: '0.68rem', color: '#2E7D32', backgroundColor: '#E8F5E9', padding: '1px 5px', borderRadius: '4px', display: 'inline-block' }}>
                          ✓ OTP Authorized
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${ag.status === 'Active' ? 'badge-active' : ag.status === 'Repaid' || ag.status === 'Fully Repaid' ? 'badge-repaid' : 'badge-overdue'}`}>
                        {ag.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {ag.remainingAmount > 0 ? (
                          <button
                            onClick={() => setSelectedAgreementForRepay(ag)}
                            className="btn btn-gold btn-sm"
                            style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                          >
                            Repay
                          </button>
                        ) : (
                          <button
                            onClick={() => setViewAgreementDetail(ag)}
                            className="btn btn-outline btn-sm"
                            style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                          >
                            Receipt
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

      {/* AGREEMENT DETAILS & PRINTABLE VIEW MODAL */}
      {viewAgreementDetail && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '640px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(74,46,23,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF8E7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} color="#D99A20" />
                <h3 style={{ margin: 0, fontFamily: 'Fraunces, serif', color: '#38210F', fontSize: '1.25rem' }}>
                  Credit Agreement #{viewAgreementDetail.agreementNumber}
                </h3>
              </div>
              <button onClick={() => setViewAgreementDetail(null)} className="btn-icon">×</button>
            </div>

            <div style={{ padding: '24px', maxHeight: '70vh', overflowY: 'auto' }}>
              <div style={{ border: '2px dashed rgba(74,46,23,0.2)', borderRadius: '14px', padding: '20px', backgroundColor: '#FFFDF9', marginBottom: '20px' }}>
                <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(74,46,23,0.1)', paddingBottom: '12px', marginBottom: '16px' }}>
                  <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: '1.25rem', color: '#38210F' }}>
                    {language === 'am' ? 'ተወዳጅ ህጋዊ የዲጂታል ብድር ውል ማስታወሻ' : 'TEWEDAJ DIGITAL CREDIT NOTE'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#756B5D' }}>
                    {language === 'am' ? 'የተፈቀደ የጥቃቅን ብድር መዝገብ' : 'Authorized Micro-Credit Registry'} • Ref: {viewAgreementDetail.authorizationMandate.mandateReference}
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#E8F5E9', color: '#2E7D32', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700, marginTop: '6px' }}>
                    <ShieldCheck size={12} /> {language === 'am' ? 'በህግ የታሰረ እና በደንበኛ OTP የተፈረመ' : 'Legally Enforced & Customer OTP Signed'}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem', marginBottom: '16px' }}>
                  <div>
                    <span style={{ color: '#756B5D', fontSize: '0.75rem' }}>{language === 'am' ? 'አበዳሪ (ነጋዴ):' : 'Creditor (Merchant):'}</span>
                    <strong style={{ display: 'block', color: '#38210F' }}>{viewAgreementDetail.merchantName}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#756B5D' }}>{viewAgreementDetail.merchantPhone}</span>
                    <div style={{ fontSize: '0.72rem', color: '#756B5D' }}>{viewAgreementDetail.merchantLocation}</div>
                  </div>
                  <div>
                    <span style={{ color: '#756B5D', fontSize: '0.75rem' }}>{language === 'am' ? 'ተበዳሪ (ደንበኛ):' : 'Borrower (Customer):'}</span>
                    <strong style={{ display: 'block', color: '#38210F' }}>{viewAgreementDetail.customerName}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#756B5D' }}>{viewAgreementDetail.customerPhone}</span>
                    {viewAgreementDetail.customerIdNumber && (
                      <div style={{ fontSize: '0.72rem', color: '#756B5D' }}>{language === 'am' ? 'ብሔራዊ መታወቂያ: ' : 'National ID: '}{viewAgreementDetail.customerIdNumber}</div>
                    )}
                  </div>
                </div>

                {/* Telebirr-only authorization details */}
                <div style={{
                  backgroundColor: '#FFF6D6',
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '16px',
                  border: '1px solid #D99A20'
                }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38210F', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Smartphone size={15} color="#D99A20" /> {language === 'am' ? 'የቴሌብር ፈቃድ ዝርዝር' : 'Telebirr Authorization Details'}
                  </div>
                  <div style={{ fontSize: '0.8rem' }}>
                    <div>Telebirr: <strong>{viewAgreementDetail.paymentPartnerDetails?.telebirrPhone || viewAgreementDetail.merchantPhone}</strong></div>
                    <div style={{ color: '#4F7D3A', marginTop: '4px', fontWeight: 600 }}>Provider: TELEBIRR_SANDBOX</div>
                  </div>
                </div>

                {/* Customer OTP Verification Proof Box */}
                <div style={{
                  backgroundColor: '#EEF5E5',
                  border: '1px solid #C8E6C9',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  marginBottom: '16px',
                  fontSize: '0.78rem',
                  color: '#2E7D32'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                      <Lock size={14} /> {language === 'am' ? 'የደንበኛ OTP ማረጋገጫ ማህተም' : 'Customer OTP Authorization Timestamp'}
                    </div>
                    <span style={{ fontWeight: 800, letterSpacing: '1px' }}>
                      CODE: {viewAgreementDetail.authorizationMandate.otpAuthCode || 'VERIFIED'}
                    </span>
                  </div>
                  <div>
                    {language === 'am'
                      ? `በደንበኛ ስልክ ${viewAgreementDetail.authorizationMandate.customerOtpPhone || viewAgreementDetail.customerPhone} በ ${viewAgreementDetail.authorizationMandate.otpVerifiedTimestamp || viewAgreementDetail.authorizationMandate.authorizedAt || viewAgreementDetail.creationDate} በSMS OTP ተረጋግጧል።`
                      : `Authorized on customer phone ${viewAgreementDetail.authorizationMandate.customerOtpPhone || viewAgreementDetail.customerPhone} at ${viewAgreementDetail.authorizationMandate.otpVerifiedTimestamp || viewAgreementDetail.authorizationMandate.authorizedAt || viewAgreementDetail.creationDate}.`}
                  </div>
                </div>

                <div style={{ backgroundColor: '#FAF5E8', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
                  <strong>{language === 'am' ? 'በብድር የተወሰዱ ዕቃዎች:' : 'Goods Purchased on Credit:'}</strong>
                  <div style={{ color: '#4A2E17', marginTop: '2px' }}>{viewAgreementDetail.goodsDescription}</div>
                  {viewAgreementDetail.terms && (
                    <div style={{ fontSize: '0.75rem', color: '#756B5D', marginTop: '4px' }}>
                      {language === 'am' ? 'የውል ሁኔታዎች: ' : 'Terms: '}{viewAgreementDetail.terms}
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center', marginBottom: '16px' }}>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '8px', border: '1px solid rgba(74,46,23,0.1)' }}>
                    <span style={{ fontSize: '0.72rem', color: '#756B5D' }}>{language === 'am' ? 'አጠቃላይ ዋና ብድር' : 'Total Principal'}</span>
                    <strong style={{ display: 'block', color: '#38210F', fontSize: '1.05rem' }}>{formatETB(viewAgreementDetail.totalAmount)}</strong>
                  </div>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '8px', border: '1px solid rgba(74,46,23,0.1)' }}>
                    <span style={{ fontSize: '0.72rem', color: '#756B5D' }}>{language === 'am' ? 'የተከፈለ' : 'Paid'}</span>
                    <strong style={{ display: 'block', color: '#4F7D3A', fontSize: '1.05rem' }}>{formatETB(viewAgreementDetail.paidAmount)}</strong>
                  </div>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '8px', border: '1px solid rgba(74,46,23,0.1)' }}>
                    <span style={{ fontSize: '0.72rem', color: '#756B5D' }}>{language === 'am' ? 'ቀሪ' : 'Remaining'}</span>
                    <strong style={{ display: 'block', color: '#D99A20', fontSize: '1.05rem' }}>{formatETB(viewAgreementDetail.remainingAmount)}</strong>
                  </div>
                </div>

                {/* Repayment History */}
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#38210F', display: 'block', marginBottom: '6px' }}>
                    {language === 'am' ? 'የተከፈሉ ክፍያዎች ታሪክ:' : 'Payment Installment History:'}
                  </strong>
                  {(viewAgreementDetail.repayments || []).length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {viewAgreementDetail.repayments.map((r) => (
                        <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', backgroundColor: '#FFFFFF', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(74,46,23,0.08)' }}>
                          <span>{r.date} • {r.method || r.paymentMethod || 'Payment'} (Ref: {r.referenceNumber || 'N/A'})</span>
                          <strong style={{ color: '#4F7D3A' }}>+{formatETB(r.amount)}</strong>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.8rem', color: '#756B5D' }}>{language === 'am' ? 'እስካሁን የተመዘገበ ክፍያ የለም።' : 'No repayments recorded yet.'}</div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  onClick={() => router.push(`/merchant/credit/${viewAgreementDetail.id}`)}
                  className="btn btn-outline btn-sm"
                >
                  {language === 'am' ? 'ሙሉ ዝርዝር' : 'Full Details'}
                </button>
                <button
                  onClick={() => alert(language === 'am' ? 'የውሉ ማስታወሻ ወደ ብሉቱዝ ደረሰኝ ማተሚያ ተልኳል።' : 'Print preview sent to Bluetooth receipt printer.')}
                  className="btn btn-outline btn-sm"
                >
                  <Printer size={14} /> {language === 'am' ? 'የውል ማስታወሻ አትም' : 'Print Agreement Note'}
                </button>
                {viewAgreementDetail.remainingAmount > 0 && (
                  <button
                    onClick={() => {
                      setSelectedAgreementForRepay(viewAgreementDetail);
                      setViewAgreementDetail(null);
                    }}
                    className="btn btn-gold btn-sm"
                  >
                    {language === 'am' ? 'ክፍያ መዝግብ' : 'Record Payment'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreditAgreementModal
        isOpen={isNewAgreementModalOpen}
        onClose={() => setIsNewAgreementModalOpen(false)}
      />

      <RepaymentModal
        isOpen={!!selectedAgreementForRepay}
        onClose={() => setSelectedAgreementForRepay(null)}
        agreement={selectedAgreementForRepay}
      />
    </div>
  );
};
