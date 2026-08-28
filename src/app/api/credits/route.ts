import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock credit agreements data - in production, this would come from a database
    const mockCredits = [
      {
        id: 'crd-1',
        agreementNumber: 'TW-CR-2026-1234',
        customerName: 'Tigist Abebe',
        merchantName: 'Almaz Family Grocery',
        totalAmount: 15000,
        paidAmount: 5000,
        remainingAmount: 10000,
        status: 'Active',
        startDate: '2026-08-01'
      }
    ]

    return NextResponse.json({ credits: mockCredits })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch credits' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Mock credit creation - in production, this would save to a database
    const newCredit = {
      id: `crd-${Date.now()}`,
      agreementNumber: `TW-CR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      ...body,
      paidAmount: 0,
      remainingAmount: body.totalAmount,
      status: 'Active'
    }

    return NextResponse.json({ credit: newCredit, success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create credit agreement' },
      { status: 400 }
    )
  }
}
