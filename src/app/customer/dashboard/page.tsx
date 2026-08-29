'use client'

import { DashboardLayout } from '../../../components/dashboard/DashboardLayout'
import { CustomerDashboard } from '../../../components/customer/CustomerDashboard'

export default function CustomerDashboardPage() {
  return (
    <DashboardLayout>
      <CustomerDashboard />
    </DashboardLayout>
  )
}