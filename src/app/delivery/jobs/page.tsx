'use client'

import { DashboardLayout } from '../../../components/dashboard/DashboardLayout'
import { DeliveryJobs } from '../../../components/delivery/DeliveryJobs'

export default function DeliveryJobsPage() {
  return (
    <DashboardLayout>
      <DeliveryJobs />
    </DashboardLayout>
  )
}