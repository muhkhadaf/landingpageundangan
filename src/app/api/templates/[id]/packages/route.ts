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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createSupabaseAdmin();
    const { id } = await params;
    const templateId = parseInt(id);

    // Mengambil packages untuk template tertentu dengan features
    const { data: packages, error } = await supabase
      .from('packages_with_features')
      .select('*')
      .eq('template_id', templateId)
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching template packages:', error);
      return NextResponse.json(
        { error: 'Failed to fetch template packages' },
        { status: 500 }
      );
    }

    // Transform data untuk frontend
    const transformedPackages = packages?.map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      price_display: pkg.price_display,
      features: pkg.features?.map((feature: { text: string }) => feature.text) || [],
      is_popular: pkg.is_popular,
      is_active: pkg.is_active,
      sort_order: pkg.sort_order,
      template_id: pkg.template_id
    })) || [];

    return NextResponse.json({
      success: true,
      data: transformedPackages
    });

  } catch (error) {
    console.error('Error in GET /api/templates/[id]/packages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createSupabaseAdmin();
    const { id } = await params;
    const templateId = parseInt(id);
    const body = await request.json();

    const { name, description, price, price_display, features, is_popular, sort_order } = body;

    // Validasi input
    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    // Insert package
    const { data: packageData, error: packageError } = await supabase
      .from('packages')
      .insert({
        name,
        description,
        price,
        price_display,
        is_popular: is_popular || false,
        sort_order: sort_order || 0,
        template_id: templateId,
        is_active: true
      })
      .select()
      .single();

    if (packageError) {
      console.error('Error creating package:', packageError);
      return NextResponse.json(
        { error: 'Failed to create package' },
        { status: 500 }
      );
    }

    // Insert features jika ada
    if (features && features.length > 0) {
      const featureInserts = features.map((feature: string, index: number) => ({
        package_id: packageData.id,
        feature_text: feature,
        sort_order: index + 1
      }));

      const { error: featuresError } = await supabase
        .from('package_features')
        .insert(featureInserts);

      if (featuresError) {
        console.error('Error creating package features:', featuresError);
        // Rollback package creation
        await supabase.from('packages').delete().eq('id', packageData.id);
        return NextResponse.json(
          { error: 'Failed to create package features' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: packageData
    });

  } catch (error) {
    console.error('Error in POST /api/templates/[id]/packages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}