import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { role, emailOrPhone } = body

    // Mock authentication - in production, this would validate against a database
    if (!role || !emailOrPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Return mock user data
    const mockUser = {
      id: `usr-${role}-1`,
      name: role === 'merchant' ? 'Almaz Family Grocery' : 
            role === 'wholesaler' ? 'Bekele Agro Wholesalers' :
            role === 'delivery' ? 'Dawit Mengistu' : 'Tigist Abebe',
      role,
      email: emailOrPhone,
      phone: emailOrPhone,
      businessName: role === 'merchant' ? 'Almaz Family Grocery' : 
                    role === 'wholesaler' ? 'Bekele Agro Wholesalers' : undefined,
      location: 'Addis Ababa, Ethiopia'
    }

    return NextResponse.json({ user: mockUser, success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
