import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock orders data - in production, this would come from a database
    const mockOrders = [
      {
        id: 'ord-1',
        orderNumber: 'TW-ORD-1234',
        merchantName: 'Almaz Family Grocery',
        supplierName: 'Merkato Central Agro Wholesalers',
        status: 'Pending',
        totalAmount: 9450,
        orderDate: '2026-08-21 10:30'
      }
    ]

    return NextResponse.json({ orders: mockOrders })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Mock order creation - in production, this would save to a database
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `TW-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      ...body,
      status: 'Pending',
      orderDate: new Date().toISOString()
    }

    return NextResponse.json({ order: newOrder, success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 400 }
    )
  }
}
