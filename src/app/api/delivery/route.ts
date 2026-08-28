import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock delivery jobs data - in production, this would come from a database
    const mockJobs = [
      {
        id: 'job-1',
        orderNumber: 'TW-ORD-1234',
        supplierName: 'Merkato Central Agro Wholesalers',
        merchantName: 'Almaz Family Grocery',
        pickupAddress: 'Merkato Military Tera, Addis Ababa',
        dropoffAddress: 'Bole Subcity, Addis Ababa',
        status: 'Available',
        earningsETB: 450,
        distanceKm: 7.5
      }
    ]

    return NextResponse.json({ jobs: mockJobs })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch delivery jobs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Mock delivery job creation - in production, this would save to a database
    const newJob = {
      id: `job-${Date.now()}`,
      ...body,
      status: 'Available'
    }

    return NextResponse.json({ job: newJob, success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create delivery job' },
      { status: 400 }
    )
  }
}
