-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to update updated_at timestamp (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for blogs
-- Allow public read access to published blogs
CREATE POLICY "Allow public read access to published blogs" ON blogs
    FOR SELECT USING (is_published = true);

-- Allow admin full access to blogs
CREATE POLICY "Allow admin full access to blogs" ON blogs
    FOR ALL USING (auth.role() = 'service_role');

-- Insert sample blog data
INSERT INTO blogs (title, excerpt, content, author, category, image_url, is_published) VALUES
(
  'Tips Memilih Template Undangan Pernikahan yang Tepat',
  'Panduan lengkap untuk memilih template undangan pernikahan yang sesuai dengan tema dan budget Anda.',
  'Memilih template undangan pernikahan yang tepat adalah langkah penting dalam persiapan pernikahan. Template yang baik tidak hanya mencerminkan kepribadian pasangan, tetapi juga memberikan kesan pertama yang baik kepada tamu undangan.

Berikut adalah beberapa tips yang dapat membantu Anda:

1. **Tentukan Tema Pernikahan**
   Sebelum memilih template, pastikan Anda sudah menentukan tema pernikahan. Apakah akan menggunakan tema tradisional, modern, rustic, atau minimalis?

2. **Sesuaikan dengan Budget**
   Template undangan tersedia dalam berbagai harga. Tentukan budget yang sesuai dengan kemampuan finansial Anda.

3. **Perhatikan Detail Desain**
   Pilih template yang memiliki detail desain yang sesuai dengan selera Anda. Perhatikan pemilihan warna, font, dan elemen dekoratif.

4. **Pastikan Mudah Dibaca**
   Template yang indah tidak akan berguna jika informasi di dalamnya sulit dibaca. Pastikan font dan kontras warna memudahkan pembacaan.

5. **Sesuaikan dengan Jumlah Tamu**
   Beberapa template memiliki batasan jumlah tamu yang dapat diundang. Pastikan template yang dipilih sesuai dengan jumlah tamu Anda.',
  'Admin Ayung',
  'Tips & Panduan',
  '/images/blog-1.jpg',
  true
),
(
  'Tren Hantaran Pernikahan 2024',
  'Discover the latest trends in wedding hantaran for 2024, from traditional to modern styles.',
  'Hantaran pernikahan merupakan tradisi yang masih sangat dilestarikan dalam budaya Indonesia. Setiap tahunnya, tren hantaran mengalami perkembangan yang menarik.

**Tren Hantaran 2024:**

1. **Minimalist Elegant**
   Tren hantaran dengan konsep minimalis namun tetap elegan menjadi pilihan favorit. Penggunaan warna-warna netral dengan aksen emas atau perak.

2. **Eco-Friendly Packaging**
   Semakin banyak pasangan yang memilih kemasan ramah lingkungan untuk hantaran mereka. Penggunaan bahan daur ulang dan kemasan yang dapat digunakan kembali.

3. **Personalized Touch**
   Hantaran dengan sentuhan personal seperti foto pasangan, nama, atau tanggal pernikahan menjadi tren yang populer.

4. **Mix Traditional & Modern**
   Kombinasi antara elemen tradisional dengan sentuhan modern menciptakan hantaran yang unik dan berkesan.

5. **Premium Quality**
   Fokus pada kualitas isi hantaran dengan memilih produk-produk premium dan berkualitas tinggi.',
  'Admin Ayung',
  'Tren & Inspirasi',
  '/images/blog-2.jpg',
  true
),
(
  'Cara Menghemat Budget Pernikahan Tanpa Mengurangi Kualitas',
  'Tips praktis untuk menghemat budget pernikahan sambil tetap mendapatkan hasil yang berkualitas.',
  'Merencanakan pernikahan dengan budget terbatas bukan berarti harus mengorbankan kualitas. Dengan perencanaan yang tepat, Anda tetap bisa mendapatkan pernikahan impian.

**Tips Menghemat Budget:**

1. **Buat Prioritas**
   Tentukan hal-hal yang paling penting bagi Anda dan pasangan. Alokasikan budget lebih besar untuk prioritas utama.

2. **Pilih Paket Bundling**
   Banyak vendor yang menawarkan paket bundling dengan harga lebih hemat dibanding membeli terpisah.

3. **Manfaatkan Teknologi**
   Gunakan undangan digital untuk menghemat biaya cetak dan distribusi.

4. **Timing yang Tepat**
   Pilih tanggal pernikahan di luar peak season untuk mendapatkan harga yang lebih kompetitif.

5. **DIY Elements**
   Beberapa elemen pernikahan bisa dibuat sendiri seperti dekorasi sederhana atau souvenir.

Ingat, pernikahan yang berkesan bukan ditentukan oleh seberapa mahal biayanya, tetapi oleh kebahagiaan dan cinta yang dibagikan.',
  'Admin Ayung',
  'Tips & Panduan',
  '/images/blog-3.jpg',
  false
);

-- Create indexes for better performance
CREATE INDEX idx_blogs_is_published ON blogs(is_published);
CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_blogs_created_at ON blogs(created_at DESC);
CREATE INDEX idx_blogs_author ON blogs(author);