# Schema Update - Perbaikan Error Supabase

## Masalah yang Diperbaiki

Error yang terjadi: `ERROR: 42501: permission denied to set parameter "app.jwt_secret"`

## Perubahan yang Dilakukan

### 1. Schema Database (supabase-schema.sql)

#### Dihapus:
- Baris `ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';` yang menyebabkan error permission

#### Diperbaiki struktur tabel hantaran:
- `title` → `name`
- `items_count` → dihapus
- `contents` → `ingredients` (JSONB)
- `rating` → dihapus
- `reviews_count` → dihapus
- `is_active` → `is_available`

#### Diperbaiki struktur tabel admin_users:
- `full_name` → `name`
- Ditambahkan field `last_login`

#### Diperbaiki sample data:
- Password hash admin yang benar: `$2b$10$DcnE8KqrSnbSGS7syhLHRO98r6gN5S7Ziu8iP4BI7.zJ7F7pPpuG.`
- Data hantaran menggunakan field baru

### 2. API Routes

#### `/api/hantaran/route.ts`:
- Menggunakan field `name` instead of `title`
- Menggunakan field `ingredients` instead of `contents`
- Menggunakan field `is_available` instead of `is_active`

#### `/api/hantaran/[id]/route.ts`:
- Update untuk menggunakan field baru
- Menghapus field yang tidak diperlukan

#### `/api/auth/admin/route.ts`:
- Update `last_login` saat login berhasil

### 3. Frontend Components

#### `/admin/hantaran/page.tsx`:
- Interface Hantaran diperbaiki
- Form menggunakan field baru
- Tabel menampilkan kolom yang sesuai
- Checkbox "Available" instead of "Active"

#### `/admin/page.tsx`:
- Statistik menggunakan `is_available` instead of `is_active`

## Cara Menggunakan Schema Baru

1. **Jalankan schema di Supabase:**
   ```sql
   -- Copy dan paste isi file supabase-schema.sql ke SQL Editor di Supabase Dashboard
   ```

2. **Verifikasi tabel terbuat:**
   - `templates` - untuk template undangan
   - `hantaran` - untuk paket hantaran
   - `admin_users` - untuk autentikasi admin

3. **Login admin default:**
   - Email: `admin@ayung.com`
   - Password: `admin123`

## Field Mapping

### Hantaran
| Lama | Baru | Tipe | Keterangan |
|------|------|------|------------|
| title | name | VARCHAR(255) | Nama hantaran |
| contents | ingredients | JSONB | Array bahan/isi |
| is_active | is_available | BOOLEAN | Status ketersediaan |
| items_count | - | - | Dihapus |
| rating | - | - | Dihapus |
| reviews_count | - | - | Dihapus |

### Admin Users
| Lama | Baru | Tipe | Keterangan |
|------|------|------|------------|
| full_name | name | VARCHAR(255) | Nama admin |
| - | last_login | TIMESTAMP | Waktu login terakhir |

## Testing

Setelah update schema:
1. Restart development server
2. Test login admin
3. Test CRUD hantaran
4. Test CRUD templates
5. Verifikasi data tersimpan dengan benar