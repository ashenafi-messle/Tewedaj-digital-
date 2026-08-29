'use client'

import { DashboardLayout } from '../../../components/dashboard/DashboardLayout'
import { WholesalerDashboard } from '../../../components/wholesaler/WholesalerDashboard'

export default function WholesalerDashboardPage() {
  return (
    <DashboardLayout>
      <WholesalerDashboard />
    </DashboardLayout>
  )
}