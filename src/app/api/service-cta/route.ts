import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

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

export interface ServiceCTA {
  id: number;
  title: string;
  description: string;
  button_text: string;
  background_gradient: string;
  text_color: string;
  button_bg_color: string;
  button_text_color: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// GET - Fetch all active CTAs
export async function GET() {
  try {
    const supabase = createSupabaseAdmin();
    
    const { data, error } = await supabase
      .from('service_cta')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching CTAs:', error);
      return NextResponse.json({ error: 'Failed to fetch CTAs' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in GET /api/service-cta:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new CTA
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      button_text = 'Konsultasi Paket Hemat',
      background_gradient = 'linear-gradient(to right, #7c5367, #d1c7cc)',
      text_color = 'white',
      button_bg_color = 'white',
      button_text_color = '#52303f',
      is_active = true,
      sort_order = 0
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
      .insert([{
        title,
        description,
        button_text,
        background_gradient,
        text_color,
        button_bg_color,
        button_text_color,
        is_active,
        sort_order
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating CTA:', error);
      return NextResponse.json({ error: 'Failed to create CTA' }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/service-cta:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}