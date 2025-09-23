import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create admin client for server-side operations
const createSupabaseAdmin = () => {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

// GET - Fetch single CTA by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid CTA ID' }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    
    const { data, error } = await supabase
      .from('service_cta')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'CTA not found' }, { status: 404 });
      }
      console.error('Error fetching CTA:', error);
      return NextResponse.json({ error: 'Failed to fetch CTA' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in GET /api/service-cta/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update CTA
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid CTA ID' }, { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      description,
      button_text,
      background_gradient,
      text_color,
      button_bg_color,
      button_text_color,
      is_active,
      sort_order
    } = body;

    // Validation
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdmin();
    
    const { data, error } = await supabase
      .from('service_cta')
      .update({
        title,
        description,
        button_text,
        background_gradient,
        text_color,
        button_bg_color,
        button_text_color,
        is_active,
        sort_order
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'CTA not found' }, { status: 404 });
      }
      console.error('Error updating CTA:', error);
      return NextResponse.json({ error: 'Failed to update CTA' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in PUT /api/service-cta/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete CTA
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid CTA ID' }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    
    const { error } = await supabase
      .from('service_cta')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting CTA:', error);
      return NextResponse.json({ error: 'Failed to delete CTA' }, { status: 500 });
    }

    return NextResponse.json({ message: 'CTA deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/service-cta/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}