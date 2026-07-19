import { NextRequest, NextResponse } from 'next/server'
import { getPhpApiUrl, formatImageUrl } from '@/lib/api-config'

// GET - Fetch all templates from PHP API
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('is_active')
    const limit = searchParams.get('limit')
    const includePackages = searchParams.get('include_packages')

    const phpUrl = new URL(getPhpApiUrl('landing_templates.php'))
    if (isActive !== null) phpUrl.searchParams.set('is_active', isActive)
    if (limit !== null) phpUrl.searchParams.set('limit', limit)
    if (includePackages !== null) phpUrl.searchParams.set('include_packages', includePackages)

    const response = await fetch(phpUrl.toString(), { cache: 'no-store' })
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch templates from backend' },
        { status: response.status }
      )
    }

    const result = await response.json()
    
    if (!result.data) {
      return NextResponse.json({ success: true, data: [] })
    }

    // Format URLs for images
    const transformed = result.data.map((template: any) => {
      const formatted = {
        ...template,
        image_url: formatImageUrl(template.image_url),
        images: Array.isArray(template.images) 
          ? template.images.map(formatImageUrl) 
          : (typeof template.images === 'string' ? JSON.parse(template.images).map(formatImageUrl) : []),
        features: Array.isArray(template.features)
          ? template.features
          : (typeof template.features === 'string' ? JSON.parse(template.features) : [])
      }

      if (formatted.packages) {
        formatted.packages = formatted.packages.map((pkg: any) => ({
          ...pkg,
          features: Array.isArray(pkg.features)
            ? pkg.features
            : (typeof pkg.features === 'string' ? JSON.parse(pkg.features) : [])
        }))
      }

      return formatted
    })

    return NextResponse.json({
      success: true,
      data: transformed
    })

  } catch (error) {
    console.error('Error in GET /api/templates:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}