import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET - Fetch single hantaran by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabaseAdmin
      .from('hantaran')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Hantaran not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (_) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update hantaran by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, name, category, price, description, image_url, contents, ingredients, is_active, is_available } = body

    const updateData: Partial<{
      name: string;
      category: string;
      price: number;
      description: string;
      image_url: string;
      ingredients: string[];
      is_available: boolean;
    }> = {}
    if (title !== undefined) updateData.name = title
    if (name !== undefined) updateData.name = name
    if (category !== undefined) updateData.category = category
    if (price !== undefined) updateData.price = parseInt(price)
    if (description !== undefined) updateData.description = description
    if (image_url !== undefined) updateData.image_url = image_url
    if (contents !== undefined) updateData.ingredients = contents
    if (ingredients !== undefined) updateData.ingredients = ingredients
    if (is_active !== undefined) updateData.is_available = is_active
    if (is_available !== undefined) updateData.is_available = is_available

    const { data, error } = await supabaseAdmin
      .from('hantaran')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Hantaran not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (_) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete hantaran by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabaseAdmin
      .from('hantaran')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Hantaran deleted successfully' })
  } catch (_) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}