-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  testimonial_text TEXT NOT NULL,
  photo_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_testimonials_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_testimonials_updated_at 
    BEFORE UPDATE ON testimonials 
    FOR EACH ROW 
    EXECUTE FUNCTION update_testimonials_updated_at_column();

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON testimonials
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated users full access" ON testimonials
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert default testimonials data
INSERT INTO testimonials (customer_name, rating, testimonial_text, sort_order) VALUES
('Andi & Sari', 5, 'Undangan yang dibuat sangat indah dan sesuai dengan tema pernikahan kami. Pelayanan sangat memuaskan!', 1),
('Budi & Maya', 5, 'Hantaran yang disiapkan sangat unik dan berkesan. Tamu undangan sampai terpukau melihatnya!', 2),
('Dika & Rina', 5, 'Tim yang sangat profesional dan responsif. Hasil akhir melebihi ekspektasi kami!', 3),
('Fajar & Dewi', 5, 'Proses pemesanan mudah dan hasilnya sangat memuaskan. Highly recommended!', 4),
('Hendra & Lisa', 5, 'Kualitas undangan premium dengan harga yang terjangkau. Terima kasih atas pelayanan terbaiknya!', 5),
('Indra & Putri', 5, 'Detail yang sangat diperhatikan dan hasil yang sempurna. Pernikahan kami jadi tak terlupakan!', 6);

-- Create index for better performance
CREATE INDEX idx_testimonials_active_sort ON testimonials (is_active, sort_order);
CREATE INDEX idx_testimonials_rating ON testimonials (rating);