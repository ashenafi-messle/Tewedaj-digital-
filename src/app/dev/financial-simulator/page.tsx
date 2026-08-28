'use client'

import { useState } from 'react'
import { DashboardLayout } from '../../../components/dashboard/DashboardLayout'
import { useApp } from '../../../context/AppContext'
import { formatETB } from '../../../utils/formatters'

export default function FinancialSimulatorPage() {
  const { creditAgreements, recordRepayment } = useApp()
  const [message, setMessage] = useState('')
  const activeAgreement = creditAgreements.find(agreement => agreement.status === 'Active' && agreement.remainingAmount > 0)

  const simulate = (amount: number) => {
    if (!activeAgreement) {
      setMessage('No outstanding active credit agreement is available.')
      return
    }
    const applied = Math.min(amount, activeAgreement.remainingAmount)
    const success = recordRepayment(activeAgreement.id, applied, 'Telebirr Sandbox', `SIM-${Date.now()}`)
    setMessage(success ? `${formatETB(applied)} applied. Any excess remains available to the customer.` : 'Transaction already processed or no balance is due.')
  }

  return (
    <DashboardLayout>
      <div className="card simulator-page">
        <span className="sandbox-label">DEVELOPMENT ONLY</span>
        <h1>Financial Repayment Simulator</h1>
        <p>TEWEDAJ DEMO — Telebirr Sandbox Simulation</p>
        {activeAgreement ? <>
          <div className="simulator-summary"><span>Customer</span><strong>{activeAgreement.customerName}</strong><span>Outstanding credit</span><strong>{formatETB(activeAgreement.remainingAmount)}</strong></div>
          <div className="simulator-actions"><button className="btn btn-outline" onClick={() => simulate(500)}>+ ETB 500</button><button className="btn btn-outline" onClick={() => simulate(1000)}>+ ETB 1,000</button><button className="btn btn-gold" onClick={() => simulate(2000)}>+ ETB 2,000</button></div>
        </> : <p>No outstanding active credit agreement is available.</p>}
        {message && <div className="alert-banner">{message}</div>}
      </div>
    </DashboardLayout>
  )
}
