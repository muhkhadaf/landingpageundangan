import { NextRequest, NextResponse } from 'next/server'
import { getPhpApiUrl, formatImageUrl } from '@/lib/api-config'

// GET - Fetch only published blog posts for public display from PHP API
export async function GET() {
  try {
    const phpUrl = `${getPhpApiUrl('landing_blogs.php')}?is_published=true&limit=6`

    const response = await fetch(phpUrl, { cache: 'no-store' })
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch published blogs' },
        { status: response.status }
      )
    }

    const result = await response.json()
    const blogs = result.blogs || []

    const transformedBlogs = blogs.map((b: any) => ({
      ...b,
      image_url: formatImageUrl(b.image_url)
    }))

    return NextResponse.json({
      blogs: transformedBlogs
    })

  } catch (error) {
    console.error('Error in GET /api/blog/published:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}