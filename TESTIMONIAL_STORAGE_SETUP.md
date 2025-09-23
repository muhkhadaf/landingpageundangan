# Supabase Storage Setup untuk Upload Foto Testimoni

## 1. Buat Storage Bucket

1. Buka Supabase Dashboard: https://app.supabase.com
2. Pilih project Anda
3. Navigasi ke **Storage** di sidebar kiri
4. Klik **Create a new bucket**
5. Isi detail bucket:
   - **Name**: `testimonial-images`
   - **Public bucket**: ✅ (centang untuk akses publik)
   - **File size limit**: 2MB (untuk foto testimoni)
   - **Allowed MIME types**: `image/jpeg,image/jpg,image/png,image/webp`

## 2. Setup Storage Policies

Setelah bucket dibuat, setup policies untuk akses:

### Policy untuk Public Read Access
```sql
-- Allow public read access to testimonial images
CREATE POLICY "Public read access for testimonial images" ON storage.objects
FOR SELECT USING (bucket_id = 'testimonial-images');
```

### Policy untuk Service Role Upload/Delete
```sql
-- Allow service role to upload testimonial images
CREATE POLICY "Service role upload testimonial images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'testimonial-images'
);

-- Allow service role to delete testimonial images
CREATE POLICY "Service role delete testimonial images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'testimonial-images'
);
```

## 3. Cara Setup via Dashboard (Recommended)

### Langkah 1: Buat Bucket
1. Di Supabase Dashboard, navigasi ke **Storage**
2. Klik **Create a new bucket**
3. Nama: `testimonial-images`
4. Centang **Public bucket**

### Langkah 2: Setup Policies
1. Klik bucket `testimonial-images`
2. Klik tab **Policies**
3. Klik **Add policy** dan buat policies berikut:

**Policy 1: Public Read Access**
- Name: `Public read access for testimonial images`
- Allowed operation: `SELECT`
- Target roles: `public`
- USING expression: `bucket_id = 'testimonial-images'`

**Policy 2: Service Role Insert**
- Name: `Service role can insert testimonial images`
- Allowed operation: `INSERT`
- Target roles: `service_role`
- WITH CHECK expression: `bucket_id = 'testimonial-images'`

**Policy 3: Service Role Delete**
- Name: `Service role can delete testimonial images`
- Allowed operation: `DELETE`
- Target roles: `service_role`
- USING expression: `bucket_id = 'testimonial-images'`

## 4. Verifikasi Setup

1. Cek di **Storage** > `testimonial-images` bucket sudah ada
2. Cek di **Storage** > `testimonial-images` > **Policies** ada 3 policies
3. Test upload foto melalui admin testimonials

## 5. Struktur File Upload

Foto testimoni akan disimpan dengan struktur:
```
testimonial-images/
└── testimonials/
    ├── 1704123456789-abc123.jpg
    ├── 1704123456790-def456.png
    └── ...
```

## 6. Troubleshooting

### Error: "Bucket not found"
- Pastikan bucket `testimonial-images` sudah dibuat
- Cek nama bucket di kode sesuai dengan yang dibuat

### Error: "Access denied"
- Pastikan policies sudah disetup dengan benar
- Cek service role key sudah benar di environment variables

### Error: "File too large"
- Maksimal ukuran file 2MB untuk foto testimoni
- Kompres foto jika terlalu besar

### Error: "Invalid file type"
- Hanya support JPEG, PNG, WebP
- Konversi file ke format yang didukung