import { NextRequest, NextResponse } from 'next/server'
import { getPhpApiUrl, formatImageUrl } from '@/lib/api-config'

// GET - Fetch single template by ID from PHP API
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const phpUrl = `${getPhpApiUrl('landing_templates.php')}?id=${id}`

    const response = await fetch(phpUrl, { cache: 'no-store' })
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 })
      }
      return NextResponse.json({ error: 'Failed to fetch template details' }, { status: 500 })
    }

    const result = await response.json()
    const template = result.data

    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    // Format template images and features
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

    return NextResponse.json({ data: formatted })
  } catch (error) {
    console.error('Error in GET /api/templates/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}