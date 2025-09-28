import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// PUT - Update admin
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { username, email, password } = await request.json();
    const { id } = await params;

    if (!username || !email) {
      return NextResponse.json({ error: 'Username dan email harus diisi' }, { status: 400 });
    }

    // Check if username or email already exists (excluding current admin)
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('id')
      .or(`name.eq.${username},email.eq.${email}`)
      .neq('id', id)
      .single();

    if (existingAdmin) {
      return NextResponse.json({ error: 'Username atau email sudah digunakan' }, { status: 400 });
    }

    // Prepare update data
    const updateData: {
      name: string;
      email: string;
      updated_at: string;
      password_hash?: string;
    } = {
      name: username,
      email,
      updated_at: new Date().toISOString()
    };

    // Hash password if provided
    if (password && password.trim() !== '') {
      updateData.password_hash = await bcrypt.hash(password, 10);
    }

    // Update admin
    const { data: updatedAdmin, error } = await supabase
      .from('admin_users')
      .update(updateData)
      .eq('id', id)
      .select('id, name, email, created_at, last_login')
      .single();

    if (error) {
      console.error('Error updating admin:', error);
      return NextResponse.json({ error: 'Gagal mengupdate admin' }, { status: 500 });
    }

    if (!updatedAdmin) {
      return NextResponse.json({ error: 'Admin tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(updatedAdmin);
  } catch (error) {
    console.error('Error in PUT /api/admin/admins/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete admin
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if admin exists
    const { data: admin } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', id)
      .single();

    if (!admin) {
      return NextResponse.json({ error: 'Admin tidak ditemukan' }, { status: 404 });
    }

    // Delete admin
    const { error } = await supabase
      .from('admin_users')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting admin:', error);
      return NextResponse.json({ error: 'Gagal menghapus admin' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Admin berhasil dihapus' });
  } catch (error) {
    console.error('Error in DELETE /api/admin/admins/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}