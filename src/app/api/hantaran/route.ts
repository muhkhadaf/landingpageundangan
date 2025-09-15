import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET - Fetch all hantaran
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const isAvailable = searchParams.get('is_available') || searchParams.get('is_active')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    let query = supabaseAdmin
      .from('hantaran')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (category) {
      query = query.eq('category', category)
    }

    if (isAvailable !== null) {
      // Try different possible column names
      query = query.eq('is_available', isAvailable === 'true')
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new hantaran
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      category, 
      price, 
      description, 
      image_url, 
      contents, 
      is_active 
    } = body

    // Validation
    if (!title || !category || !price) {
      return NextResponse.json(
        { error: 'Title, category, and price are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('hantaran')
      .insert({
        name: title,
        category,
        price: parseInt(price),
        description,
        image_url,
        ingredients: contents || [],
        is_available: is_active !== undefined ? is_active : true
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (_) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}