import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GET - Fetch single blog post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching blog:', error);
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, excerpt, image_url, is_published, author } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const { data: blog, error } = await supabase
      .from('blogs')
      .update({
        title,
        content,
        excerpt,
        image_url,
        is_published: is_published ?? false,
        author: author || 'Admin',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog:', error);
      return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // First, get the blog to check if it has an image
    const { data: blog, error: fetchError } = await supabase
      .from('blogs')
      .select('image_url')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching blog for deletion:', fetchError);
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Delete the blog post
    const { error: deleteError } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting blog:', deleteError);
      return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }

    // If blog had an image, optionally delete it from storage
    // Note: We'll keep the image in storage as it might be used elsewhere
    // You can uncomment below if you want to delete the image file
    /*
    if (blog.image_url) {
      const imagePath = blog.image_url.split('/').pop();
      if (imagePath) {
        await supabase.storage
          .from('template-images')
          .remove([`blogs/${imagePath}`]);
      }
    }
    */

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}