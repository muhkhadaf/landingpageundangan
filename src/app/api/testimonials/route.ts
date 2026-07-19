import { NextRequest, NextResponse } from 'next/server'
import { getPhpApiUrl, formatImageUrl } from '@/lib/api-config'

// GET - Fetch active testimonials from PHP API
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('is_active')
    const limit = searchParams.get('limit')

    const phpUrl = new URL(getPhpApiUrl('landing_testimonials.php'))
    if (isActive !== null) phpUrl.searchParams.set('is_active', isActive)
    if (limit !== null) phpUrl.searchParams.set('limit', limit)

    const response = await fetch(phpUrl.toString(), { cache: 'no-store' })
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch testimonials' },
        { status: response.status }
      )
    }

    const result = await response.json()
    const testimonials = result.data || []

    const transformedTestimonials = testimonials.map((t: any) => ({
      ...t,
      photo_url: formatImageUrl(t.photo_url)
    }))

    return NextResponse.json({
      data: transformedTestimonials
    })

  } catch (error) {
    console.error('Error in GET /api/testimonials:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}