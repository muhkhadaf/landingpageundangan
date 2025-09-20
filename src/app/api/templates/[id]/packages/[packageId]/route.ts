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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; packageId: string }> }
) {
  try {
    const supabase = createSupabaseAdmin();
    const { id, packageId } = await params;
    const templateId = parseInt(id);
    const packageIdInt = parseInt(packageId);
    const body = await request.json();

    const { name, description, price, price_display, features, is_popular, sort_order } = body;

    // Validasi input
    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    // Update package
    const { data: packageData, error: packageError } = await supabase
      .from('packages')
      .update({
        name,
        description,
        price,
        price_display,
        is_popular: is_popular || false,
        sort_order: sort_order || 0,
        updated_at: new Date().toISOString()
      })
      .eq('id', packageIdInt)
      .eq('template_id', templateId)
      .select()
      .single();

    if (packageError) {
      console.error('Error updating package:', packageError);
      return NextResponse.json(
        { error: 'Failed to update package' },
        { status: 500 }
      );
    }

    // Delete existing features
    const { error: deleteError } = await supabase
      .from('package_features')
      .delete()
      .eq('package_id', packageIdInt);

    if (deleteError) {
      console.error('Error deleting old features:', deleteError);
      return NextResponse.json(
        { error: 'Failed to update package features' },
        { status: 500 }
      );
    }

    // Insert new features jika ada
    if (features && features.length > 0) {
      const featureInserts = features.map((feature: string, index: number) => ({
        package_id: packageIdInt,
        feature_text: feature,
        sort_order: index + 1
      }));

      const { error: featuresError } = await supabase
        .from('package_features')
        .insert(featureInserts);

      if (featuresError) {
        console.error('Error creating new features:', featuresError);
        return NextResponse.json(
          { error: 'Failed to update package features' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: packageData
    });

  } catch (error) {
    console.error('Error in PUT /api/templates/[id]/packages/[packageId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; packageId: string }> }
) {
  try {
    const supabase = createSupabaseAdmin();
    const { id, packageId } = await params;
    const templateId = parseInt(id);
    const packageIdInt = parseInt(packageId);

    // Verifikasi bahwa package belongs to template
    const { data: packageCheck, error: checkError } = await supabase
      .from('packages')
      .select('id')
      .eq('id', packageIdInt)
      .eq('template_id', templateId)
      .single();

    if (checkError || !packageCheck) {
      return NextResponse.json(
        { error: 'Package not found or does not belong to this template' },
        { status: 404 }
      );
    }

    // Delete package (features akan terhapus otomatis karena CASCADE)
    const { error: deleteError } = await supabase
      .from('packages')
      .delete()
      .eq('id', packageIdInt)
      .eq('template_id', templateId);

    if (deleteError) {
      console.error('Error deleting package:', deleteError);
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
    console.error('Error in DELETE /api/templates/[id]/packages/[packageId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}