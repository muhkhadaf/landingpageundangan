-- Supabase Storage Policies untuk Template Images
-- CARA SETUP MELALUI SUPABASE DASHBOARD (BUKAN SQL EDITOR)

-- ========================================
-- LANGKAH 1: Setup Bucket
-- ========================================
-- 1. Buka Supabase Dashboard
-- 2. Navigasi ke Storage
-- 3. Buat bucket baru dengan nama: template-images
-- 4. Centang "Public bucket" untuk akses publik

-- ========================================
-- LANGKAH 2: Setup Policies via Dashboard
-- ========================================
-- 1. Di Storage, klik bucket "template-images"
-- 2. Klik tab "Policies"
-- 3. Klik "Add policy" dan buat policies berikut:

-- POLICY 1: Public Read Access
-- Name: Public read access for template images
-- Allowed operation: SELECT
-- Target roles: public
-- USING expression: bucket_id = 'template-images'

-- POLICY 2: Service Role Insert
-- Name: Service role can insert template images  
-- Allowed operation: INSERT
-- Target roles: service_role
-- WITH CHECK expression: bucket_id = 'template-images'

-- POLICY 3: Service Role Update
-- Name: Service role can update template images
-- Allowed operation: UPDATE  
-- Target roles: service_role
-- USING expression: bucket_id = 'template-images'

-- POLICY 4: Service Role Delete
-- Name: Service role can delete template images
-- Allowed operation: DELETE
-- Target roles: service_role  
-- USING expression: bucket_id = 'template-images'

-- ========================================
-- ALTERNATIF: Jika tetap ingin pakai SQL
-- ========================================
-- Jalankan sebagai superuser atau gunakan RPC function:

-- 7. Verifikasi policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';