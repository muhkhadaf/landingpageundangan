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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createSupabaseAdmin();
    const { id } = await params;
    const packageId = id;

    // Mengambil package dengan features
    const { data: packageData, error } = await supabase
      .from('packages_with_features')
      .select('*')
      .eq('id', packageId)
      .single();

    if (error) {
      console.error('Error fetching package:', error);
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      );
    }

    // Transform data untuk frontend
    const transformedPackage = {
      id: packageData.id,
      name: packageData.name,
      description: packageData.description,
      price: packageData.price_display,
      features: packageData.features?.map((feature: { text: string }) => feature.text) || [],
      popular: packageData.is_popular
    };

    return NextResponse.json({
      success: true,
      data: transformedPackage
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createSupabaseAdmin();
    const { id } = await params;
    const packageId = id;
    const body = await request.json();
    
    const { name, description, price, price_display, is_popular, features } = body;

    // Update package
    const { error: packageError } = await supabase
      .from('packages')
      .update({
        name,
        description,
        price,
        price_display,
        is_popular: is_popular || false
      })
      .eq('id', packageId);

    if (packageError) {
      console.error('Error updating package:', packageError);
      return NextResponse.json(
        { error: 'Failed to update package' },
        { status: 500 }
      );
    }

    // Update features jika ada
    if (features && Array.isArray(features)) {
      // Hapus features lama
      await supabase
        .from('package_features')
        .delete()
        .eq('package_id', packageId);

      // Insert features baru
      if (features.length > 0) {
        const featureData = features.map((feature: string, index: number) => ({
          package_id: parseInt(packageId),
          feature_text: feature,
          sort_order: index + 1
        }));

        const { error: featuresError } = await supabase
          .from('package_features')
          .insert(featureData);

        if (featuresError) {
          console.error('Error updating features:', featuresError);
          return NextResponse.json(
            { error: 'Failed to update package features' },
            { status: 500 }
          );
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Package updated successfully'
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createSupabaseAdmin();
    const { id } = await params;
    const packageId = id;

    // Soft delete - set is_active to false
    const { error } = await supabase
      .from('packages')
      .update({ is_active: false })
      .eq('id', packageId);

    if (error) {
      console.error('Error deleting package:', error);
      return NextResponse.json(
        { error: 'Failed to delete package' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Package deleted successfully'
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}