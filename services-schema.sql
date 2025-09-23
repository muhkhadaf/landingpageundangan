-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100) NOT NULL DEFAULT 'Mail',
  features TEXT[] NOT NULL DEFAULT '{}',
  price VARCHAR(100) NOT NULL,
  popular BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at 
    BEFORE UPDATE ON services 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated users full access" ON services
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert default data
INSERT INTO services (title, description, icon, features, price, popular, sort_order) VALUES
(
  'Undangan Pernikahan',
  'Desain undangan eksklusif yang mencerminkan kepribadian dan tema pernikahan Anda',
  'Mail',
  ARRAY[
    'Desain custom sesuai tema',
    'Berbagai pilihan kertas premium',
    'Cetak digital & offset berkualitas tinggi',
    'Packaging mewah',
    'Revisi unlimited'
  ],
  'Mulai dari Rp 5.000',
  false,
  1
),
(
  'Hantaran Pernikahan',
  'Hantaran cantik dan bermakna yang akan memukau keluarga besar kedua belah pihak',
  'Gift',
  ARRAY[
    'Konsep hantaran unik & kreatif',
    'Dekorasi sesuai tema pernikahan',
    'Packaging premium & elegan',
    'Koordinasi pengiriman',
    'Konsultasi gratis'
  ],
  'Mulai dari Rp 150.000',
  true,
  2
);

-- Create index for better performance
CREATE INDEX idx_services_active_sort ON services (is_active, sort_order);
CREATE INDEX idx_services_popular ON services (popular) WHERE popular = true;