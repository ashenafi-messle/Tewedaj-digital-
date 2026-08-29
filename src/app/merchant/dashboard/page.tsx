'use client'

import { DashboardLayout } from '../../../components/dashboard/DashboardLayout'
import { MerchantDashboard } from '../../../components/merchant/MerchantDashboard'

export default function MerchantDashboardPage() {
  return (
    <DashboardLayout>
      <MerchantDashboard />
    </DashboardLayout>
  )
}