'use client'

import { DashboardLayout } from '../../../components/dashboard/DashboardLayout'
import { WholesalerOrders } from '../../../components/wholesaler/WholesalerOrders'

export default function WholesalerOrdersPage() {
  return (
    <DashboardLayout>
      <WholesalerOrders />
    </DashboardLayout>
  )
}