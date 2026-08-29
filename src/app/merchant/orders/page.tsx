'use client'

import { DashboardLayout } from '../../../components/dashboard/DashboardLayout'
import { MerchantOrders } from '../../../components/merchant/MerchantOrders'

export default function MerchantOrdersPage() {
  return (
    <DashboardLayout>
      <MerchantOrders />
    </DashboardLayout>
  )
}