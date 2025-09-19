import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations that require elevated permissions
// This should only be used in server-side code (API routes, server components)
export const createSupabaseAdmin = () => {
  if (typeof window !== 'undefined') {
    throw new Error('supabaseAdmin should only be used on the server side');
  }
  
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
};

// Database types
export interface Template {
  id: number
  title: string
  category: string
  price: number
  description: string
  image_url: string
  features: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Hantaran {
  id: number
  title: string
  category: string
  price: number
  description: string
  image_url: string
  items_count: number
  contents: string[]
  rating: number
  reviews_count: number
  is_active: boolean
  created_at: string
  updated_at: string
}