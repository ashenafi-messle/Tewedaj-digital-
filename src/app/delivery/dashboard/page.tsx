'use client'

import { DashboardLayout } from '../../../components/dashboard/DashboardLayout'
import { DeliveryDashboard } from '../../../components/delivery/DeliveryDashboard'

export default function DeliveryDashboardPage() {
  return (
    <DashboardLayout>
      <DeliveryDashboard />
    </DashboardLayout>
  )
}