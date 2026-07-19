import { NextRequest, NextResponse } from 'next/server'
import { getPhpApiUrl, formatImageUrl } from '@/lib/api-config'

// GET - Fetch single blog post by ID from PHP API
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const phpUrl = `${getPhpApiUrl('landing_blogs.php')}?id=${id}`

    const response = await fetch(phpUrl, { cache: 'no-store' })
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
      }
      return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
    }

    const result = await response.json()
    const blog = result.blog

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    const formattedBlog = {
      ...blog,
      image_url: formatImageUrl(blog.image_url)
    }

    return NextResponse.json({ blog: formattedBlog })

  } catch (error) {
    console.error('Error in GET /api/blog/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}