import { NextRequest, NextResponse } from 'next/server'
import { getPhpApiUrl } from '@/lib/api-config'

// GET - Fetch active packages from PHP API
export async function GET() {
  try {
    const phpUrl = `${getPhpApiUrl('landing_packages.php')}?is_active=true`

    const response = await fetch(phpUrl, { cache: 'no-store' })
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch packages' },
        { status: response.status }
      )
    }

    const result = await response.json()
    const packages = result.data || []

    const transformedPackages = packages.map((pkg: any) => ({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      price: pkg.price_display, // Frontend expects price_display as 'price'
      features: pkg.features || [],
      popular: pkg.is_popular
    }))

    return NextResponse.json({
      success: true,
      data: transformedPackages
    })

  } catch (error) {
    console.error('Error in GET /api/packages:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}