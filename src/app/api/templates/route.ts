import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase'

// GET - Fetch all templates
export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('is_active');
    const limit = searchParams.get('limit');
    const includePackages = searchParams.get('include_packages');

    let query = supabase.from('templates').select('*');
    
    if (isActive !== null) {
      query = query.eq('is_active', isActive === 'true');
    }
    
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    
    query = query.order('created_at', { ascending: false });

    const { data: templates, error } = await query;

    if (error) {
      console.error('Error fetching templates:', error);
      return NextResponse.json(
        { error: 'Failed to fetch templates' },
        { status: 500 }
      );
    }

    let transformedTemplates = templates;

    // Jika diminta include packages, ambil packages untuk setiap template
    if (includePackages === 'true') {
      const templatesWithPackages = await Promise.all(
        templates?.map(async (template) => {
          const { data: packages } = await supabase
            .from('packages_with_features')
            .select('*')
            .eq('template_id', template.id)
            .eq('is_active', true)
            .order('sort_order', { ascending: true });

          const transformedPackages = packages?.map(pkg => ({
            id: pkg.id,
            name: pkg.name,
            description: pkg.description,
            price: pkg.price,
            price_display: pkg.price_display,
            features: pkg.features?.map((feature: { text: string }) => feature.text) || [],
            is_popular: pkg.is_popular,
            sort_order: pkg.sort_order
          })) || [];

          return {
            ...template,
            packages: transformedPackages
          };
        }) || []
      );

      transformedTemplates = templatesWithPackages;
    }

    return NextResponse.json({
      success: true,
      data: transformedTemplates
    });

  } catch (error) {
    console.error('Error in GET /api/templates:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new template
export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = createSupabaseAdmin()
    const body = await request.json()
    const { title, category, price, description, image_url, images, features, preview_link, discount_percentage, discount_start_date, discount_end_date, is_discount_active } = body

    // Validation
    if (!title || !category || !price) {
      return NextResponse.json(
        { error: 'Title, category, and price are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('templates')
      .insert({
        title,
        category,
        price: parseInt(price),
        description,
        image_url,
        images: images || [],
        features: features || [],
        preview_link,
        discount_percentage,
        discount_start_date,
        discount_end_date,
        is_discount_active
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}