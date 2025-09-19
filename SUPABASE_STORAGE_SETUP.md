# Supabase Storage Setup untuk Upload Gambar Template

## 1. Buat Storage Bucket

1. Buka Supabase Dashboard: https://app.supabase.com
2. Pilih project Anda
3. Navigasi ke **Storage** di sidebar kiri
4. Klik **Create a new bucket**
5. Isi detail bucket:
   - **Name**: `template-images`
   - **Public bucket**: ✅ (centang untuk akses publik)
   - **File size limit**: 5MB (opsional)
   - **Allowed MIME types**: `image/jpeg,image/jpg,image/png,image/webp` (opsional)

## 2. Setup Storage Policies

Setelah bucket dibuat, setup policies untuk akses:

### Policy untuk Public Read Access
```sql
-- Allow public read access to template images
CREATE POLICY "Public read access for template images" ON storage.objects
FOR SELECT USING (bucket_id = 'template-images');
```

### Policy untuk Admin Upload/Delete
```sql
-- Allow authenticated users to upload template images
CREATE POLICY "Admin upload template images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'template-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete template images
CREATE POLICY "Admin delete template images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'template-images' 
  AND auth.role() = 'authenticated'
);
```

## 3. Cara Menjalankan SQL Policies

1. Di Supabase Dashboard, navigasi ke **SQL Editor**
2. Copy dan paste SQL policies di atas
3. Klik **Run** untuk setiap policy

## 4. Verifikasi Setup

1. Cek di **Storage** > **template-images** bucket sudah ada
2. Cek di **Authentication** > **Policies** ada policies untuk storage.objects
3. Test upload gambar melalui admin panel

## 5. Environment Variables

Pastikan file `.env.local` sudah memiliki:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 6. Struktur File Upload

Gambar akan disimpan dengan struktur:
```
template-images/
└── templates/
    ├── 1704123456789-abc123.jpg
    ├── 1704123456790-def456.png
    └── ...
```

## 7. Fitur yang Tersedia

- ✅ Upload gambar (JPEG, PNG, WebP)
- ✅ Validasi ukuran file (max 5MB)
- ✅ Validasi tipe file
- ✅ Generate nama file unik
- ✅ Preview gambar sebelum upload
- ✅ Hapus gambar lama saat update
- ✅ URL publik otomatis

## 8. Troubleshooting

### Error: "Bucket not found"
- Pastikan bucket `template-images` sudah dibuat
- Cek nama bucket di kode sesuai dengan yang dibuat

### Error: "Access denied"
- Pastikan policies sudah disetup dengan benar
- Cek authentication user sudah login

### Error: "File too large"
- Maksimal ukuran file 5MB
- Kompres gambar jika terlalu besar

### Error: "Invalid file type"
- Hanya support JPEG, PNG, WebP
- Konversi file ke format yang didukung