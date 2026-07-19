import { NextRequest, NextResponse } from 'next/server'
import { getPhpApiUrl } from '@/lib/api-config'

// GET - Fetch active services from PHP API
export async function GET() {
  try {
    const phpUrl = `${getPhpApiUrl('landing_services.php')}?is_active=true`

    const response = await fetch(phpUrl, { cache: 'no-store' })
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch services' },
        { status: response.status }
      )
    }

    const result = await response.json()

    return NextResponse.json({
      data: result.data || []
    })

  } catch (error) {
    console.error('Error in GET /api/services:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}