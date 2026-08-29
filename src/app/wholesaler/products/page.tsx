'use client'

import { DashboardLayout } from '../../../components/dashboard/DashboardLayout'
import { WholesalerProducts } from '../../../components/wholesaler/WholesalerProducts'

export default function WholesalerProductsPage() {
  return (
    <DashboardLayout>
      <WholesalerProducts />
    </DashboardLayout>
  )
}