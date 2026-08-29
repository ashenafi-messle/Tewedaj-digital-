'use client'

import { DashboardLayout } from '../../../components/dashboard/DashboardLayout'
import { MerchantInventory } from '../../../components/merchant/MerchantInventory'

export default function MerchantInventoryPage() {
  return (
    <DashboardLayout>
      <MerchantInventory />
    </DashboardLayout>
  )
}