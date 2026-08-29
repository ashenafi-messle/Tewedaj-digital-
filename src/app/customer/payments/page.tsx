'use client'

import { DashboardLayout } from '../../../components/dashboard/DashboardLayout'
import { CustomerPayments } from '../../../components/customer/CustomerPayments'

export default function CustomerPaymentsPage() {
  return (
    <DashboardLayout>
      <CustomerPayments />
    </DashboardLayout>
  )
}