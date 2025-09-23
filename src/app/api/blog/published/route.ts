import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GET - Fetch only published blog posts for public display
export async function GET() {
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(6); // Limit to 6 posts for homepage

    if (error) {
      console.error('Error fetching published blogs:', error);
      return NextResponse.json({ error: 'Failed to fetch published blogs' }, { status: 500 });
    }

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}