import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch all admins
export async function GET() {
  try {
    const { data: admins, error } = await supabase
      .from('admin_users')
      .select('id, name, email, created_at, last_login')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching admins:', error);
      return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500 });
    }

    return NextResponse.json(admins);
  } catch (error) {
    console.error('Error in GET /api/admin/admins:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new admin
export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Username, email, dan password harus diisi' }, { status: 400 });
    }

    // Check if username or email already exists
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('id')
      .or(`name.eq.${username},email.eq.${email}`)
      .single();

    if (existingAdmin) {
      return NextResponse.json({ error: 'Username atau email sudah digunakan' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin
    const { data: newAdmin, error } = await supabase
      .from('admin_users')
      .insert({
        name: username,
        email,
        password_hash: hashedPassword,
        created_at: new Date().toISOString()
      })
      .select('id, name, email, created_at')
      .single();

    if (error) {
      console.error('Error creating admin:', error);
      return NextResponse.json({ error: 'Gagal membuat admin baru' }, { status: 500 });
    }

    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/admins:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}