import { NextRequest, NextResponse } from 'next/server'
import { getPhpApiUrl } from '@/lib/api-config'

// GET - Fetch packages for a template by template ID from PHP API
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const phpUrl = `${getPhpApiUrl('landing_packages.php')}?template_id=${id}&is_active=true`

    const response = await fetch(phpUrl, { cache: 'no-store' })
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch template packages' },
        { status: response.status }
      )
    }

    const result = await response.json()
    
    return NextResponse.json({
      success: true,
      data: result.data || []
    })

  } catch (error) {
    console.error('Error in GET /api/templates/[id]/packages:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}