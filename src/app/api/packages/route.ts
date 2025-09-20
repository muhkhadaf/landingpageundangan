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

export async function GET() {
  try {
    const supabase = createSupabaseAdmin();
    
    // Mengambil packages dengan features menggunakan view
    const { data: packages, error } = await supabase
      .from('packages_with_features')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching packages:', error);
      return NextResponse.json(
        { error: 'Failed to fetch packages' },
        { status: 500 }
      );
    }

    // Transform data untuk frontend
    const transformedPackages = packages?.map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      price: pkg.price_display, // Menggunakan format display
      features: pkg.features?.map((feature: { text: string }) => feature.text) || [],
      popular: pkg.is_popular
    })) || [];

    return NextResponse.json({
      success: true,
      data: transformedPackages
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    const body = await request.json();
    
    const { name, description, price, price_display, is_popular, features } = body;

    // Validasi input
    if (!name || !price || !price_display || !features || !Array.isArray(features)) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, price_display, features' },
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
        is_popular: is_popular || false
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

    // Insert features
    if (features.length > 0) {
      const featureData = features.map((feature: string, index: number) => ({
        package_id: packageData.id,
        feature_text: feature,
        sort_order: index + 1
      }));

      const { error: featuresError } = await supabase
        .from('package_features')
        .insert(featureData);

      if (featuresError) {
        console.error('Error creating features:', featuresError);
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
      data: {
        id: packageData.id,
        name: packageData.name,
        message: 'Package created successfully'
      }
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}