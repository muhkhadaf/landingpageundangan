import { createSupabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// Storage bucket name for testimonial images (using existing template-images bucket)
const TESTIMONIAL_IMAGES_BUCKET = 'template-images'

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = createSupabaseAdmin()
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (2MB max for testimonial photos)
    const maxSize = 2 * 1024 * 1024 // 2MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 2MB.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `testimonials/${fileName}`

    // Upload file to Supabase Storage
    const { error } = await supabaseAdmin.storage
      .from(TESTIMONIAL_IMAGES_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading testimonial image:', error)
      return NextResponse.json(
        { error: 'Failed to upload image' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(TESTIMONIAL_IMAGES_BUCKET)
      .getPublicUrl(filePath)

    return NextResponse.json({
      success: true,
      imageUrl: publicUrlData.publicUrl,
      filePath: filePath
    })

  } catch (error) {
    console.error('Error in testimonial upload API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabaseAdmin = createSupabaseAdmin()
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get('imageUrl')

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image URL provided' },
        { status: 400 }
      )
    }

    // Extract file path from URL
    const url = new URL(imageUrl)
    const pathSegments = url.pathname.split('/').filter(segment => segment !== '')
    
    // Find the bucket name in the path after 'public'
    const publicIndex = pathSegments.findIndex(segment => segment === 'public')
    
    if (publicIndex === -1 || publicIndex + 1 >= pathSegments.length) {
      console.error('Invalid URL structure. Expected format: .../public/bucket/path')
      return NextResponse.json(
        { error: 'Invalid image URL format' },
        { status: 400 }
      )
    }

    const bucketName = pathSegments[publicIndex + 1]
    
    if (bucketName !== TESTIMONIAL_IMAGES_BUCKET) {
      console.error(`Expected bucket '${TESTIMONIAL_IMAGES_BUCKET}', got '${bucketName}'`)
      return NextResponse.json(
        { error: 'Invalid bucket in URL' },
        { status: 400 }
      )
    }

    const filePath = pathSegments.slice(publicIndex + 2).join('/')

    // Delete file from Supabase Storage
    const { error } = await supabaseAdmin.storage
      .from(TESTIMONIAL_IMAGES_BUCKET)
      .remove([filePath])

    if (error) {
      console.error('Error deleting testimonial image:', error)
      return NextResponse.json(
        { error: 'Failed to delete image' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Testimonial image deleted successfully'
    })

  } catch (error) {
    console.error('Error in testimonial delete API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}