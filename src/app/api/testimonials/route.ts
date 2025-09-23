import { createSupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export interface Testimonial {
  id: number;
  customer_name: string;
  rating: number;
  testimonial_text: string;
  photo_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// GET - Fetch all testimonials
export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('is_active');
    const limit = searchParams.get('limit');

    let query = supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by active status if specified
    if (isActive !== null) {
      query = query.eq('is_active', isActive === 'true');
    }

    // Apply limit if specified
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching testimonials:', error);
      return NextResponse.json(
        { error: 'Failed to fetch testimonials' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new testimonial
export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    const body = await request.json();

    const { customer_name, rating, testimonial_text, photo_url, is_active } = body;

    // Validation
    if (!customer_name || !testimonial_text) {
      return NextResponse.json(
        { error: 'Customer name and testimonial text are required' },
        { status: 400 }
      );
    }

    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert([{
        customer_name,
        rating: rating || 5,
        testimonial_text,
        photo_url,
        is_active: is_active !== undefined ? is_active : true
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating testimonial:', error);
      return NextResponse.json(
        { error: 'Failed to create testimonial' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update testimonial
export async function PUT(request: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    const body = await request.json();

    const { id, customer_name, rating, testimonial_text, photo_url, is_active } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    // Validation
    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const updateData: Partial<Testimonial> = {};
    if (customer_name !== undefined) updateData.customer_name = customer_name;
    if (rating !== undefined) updateData.rating = rating;
    if (testimonial_text !== undefined) updateData.testimonial_text = testimonial_text;
    if (photo_url !== undefined) updateData.photo_url = photo_url;
    if (is_active !== undefined) updateData.is_active = is_active;

    const { data, error } = await supabase
      .from('testimonials')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating testimonial:', error);
      return NextResponse.json(
        { error: 'Failed to update testimonial' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete testimonial
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error);
      return NextResponse.json(
        { error: 'Failed to delete testimonial' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}