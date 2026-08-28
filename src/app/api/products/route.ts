import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock products data - in production, this would come from a database
    const mockProducts = [
      {
        id: 'prod-1',
        name: 'Teff White (Premium)',
        category: 'Grains',
        wholesalePrice: 4500,
        retailPrice: 5200,
        unit: 'quintal',
        moq: 2,
        supplierName: 'Merkato Central Agro Wholesalers',
        supplierLocation: 'Merkato Military Tera, Addis Ababa',
        stock: 150,
        origin: 'Ethiopia'
      },
      {
        id: 'prod-2',
        name: 'Coffee Arabica (Yirgacheffe)',
        category: 'Coffee',
        wholesalePrice: 12000,
        retailPrice: 15000,
        unit: 'kg',
        moq: 10,
        supplierName: 'Sidama Coffee Exporters',
        supplierLocation: 'Sidama Zone, Southern Ethiopia',
        stock: 500,
        origin: 'Ethiopia'
      }
    ]

    return NextResponse.json({ products: mockProducts })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Mock product creation - in production, this would save to a database
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...body
    }

    return NextResponse.json({ product: newProduct, success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 400 }
    )
  }
}
