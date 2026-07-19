import { NextRequest, NextResponse } from 'next/server'
import { getPhpApiUrl, formatImageUrl } from '@/lib/api-config'

// GET - Fetch all blog posts from PHP API
export async function GET() {
  try {
    const phpUrl = getPhpApiUrl('landing_blogs.php')

    const response = await fetch(phpUrl, { cache: 'no-store' })
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch blogs' },
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
    console.error('Error in GET /api/blog:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}