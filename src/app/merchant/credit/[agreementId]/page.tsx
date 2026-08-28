'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react'
import { DashboardLayout } from '../../../../components/dashboard/DashboardLayout'
import { useApp } from '../../../../context/AppContext'
import { formatETB } from '../../../../utils/formatters'
import { maskAccountNumber } from '../../../../utils/security'

function AgreementDetail() {
  const params = useParams<{ agreementId: string }>()
  const router = useRouter()
  const { creditAgreements } = useApp()
  const agreement = creditAgreements.find(item => item.id === params.agreementId || item.agreementNumber === params.agreementId)

  if (!agreement) {
    return <div className="card"><h2>Credit agreement not found</h2></div>
  }

  const progress = agreement.totalAmount > 0 ? Math.round((agreement.paidAmount / agreement.totalAmount) * 100) : 0
  const timelineEvents = [
    { date: agreement.creationDate, title: 'Credit Agreement Created', detail: formatETB(agreement.totalAmount) },
    { date: agreement.authorizationMandate.authorizedAt || agreement.creationDate, title: 'Customer Authorization', detail: 'Approved' },
    ...agreement.repayments.map(repayment => ({ date: repayment.date, title: 'Repayment', detail: formatETB(repayment.amount) }))
  ]

  return (
    <div className="credit-detail-page">
      <div className="credit-detail-heading">
        <button className="btn btn-outline btn-sm" onClick={() => router.push('/merchant/credit')}><ArrowLeft size={15} /> Back to Credit Ledger</button>
        <div>
          <span className="sandbox-label">TEWEDAJ DEMO — Telebirr Sandbox Simulation</span>
          <h1>Credit Agreement #{agreement.agreementNumber}</h1>
          <span className="badge badge-active">{agreement.status.toUpperCase()}</span>
        </div>
      </div>

      <div className="credit-detail-summary">
        <div className="card"><span>Original Credit</span><strong>{formatETB(agreement.totalAmount)}</strong></div>
        <div className="card"><span>Paid</span><strong className="success-text">{formatETB(agreement.paidAmount)}</strong></div>
        <div className="card"><span>Remaining</span><strong className="accent-text">{formatETB(agreement.remainingAmount)}</strong></div>
        <div className="card"><span>Repayment Progress</span><strong>{progress}%</strong><div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${progress}%`, background: '#D99A20' }} /></div></div>
      </div>

      <div className="credit-detail-columns">
        <section className="card detail-section">
          <h2><CreditCard size={18} /> Customer</h2>
          <dl>
            <dt>Name</dt><dd>{agreement.customerName}</dd>
            <dt>Phone</dt><dd>{maskAccountNumber(agreement.customerPhone)}</dd>
            <dt>Telebirr</dt><dd>{maskAccountNumber(agreement.paymentPartnerDetails?.telebirrPhone || agreement.customerPhone)}</dd>
            <dt>Authorization</dt><dd className="success-text"><CheckCircle2 size={15} /> Authorized</dd>
          </dl>
        </section>
        <section className="card detail-section">
          <h2><ShieldCheck size={18} /> Agreement</h2>
          <dl>
            <dt>Agreement date</dt><dd>{agreement.creationDate}</dd>
            <dt>Credit amount</dt><dd>{formatETB(agreement.totalAmount)}</dd>
            <dt>Authorized maximum</dt><dd>{formatETB(agreement.totalAmount)}</dd>
            <dt>Due date</dt><dd>{agreement.dueDate || 'Not specified'}</dd>
            <dt>Goods</dt><dd>{agreement.goodsDescription}</dd>
          </dl>
        </section>
      </div>

      <section className="card detail-section">
        <h2>Repayment Timeline & Audit History</h2>
        <div className="credit-timeline">
          {timelineEvents.map((event, index) => <div className="timeline-event" key={`${event.date}-${index}`}><span>{event.date}</span><div><strong>{event.title}</strong><p>{event.detail}</p></div></div>)}
          {(agreement.auditLog || []).map(event => <div className="timeline-event" key={event.id}><span>{new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span><div><strong>Audit: {event.message}</strong><p>{event.timestamp}</p></div></div>)}
        </div>
      </section>
    </div>
  )
}

export default function MerchantCreditAgreementPage() {
  return <DashboardLayout><AgreementDetail /></DashboardLayout>
}
