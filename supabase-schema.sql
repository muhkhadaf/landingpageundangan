-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  image_url TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hantaran table
CREATE TABLE IF NOT EXISTS hantaran (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  image_url TEXT,
  ingredients JSONB DEFAULT '[]'::jsonb,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hantaran_updated_at BEFORE UPDATE ON hantaran
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE hantaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for templates
CREATE POLICY "Allow public read access to active templates" ON templates
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow admin full access to templates" ON templates
    FOR ALL USING (auth.role() = 'service_role');

-- Create policies for hantaran
CREATE POLICY "Allow public read access to available hantaran" ON hantaran
    FOR SELECT USING (is_available = true);

CREATE POLICY "Allow admin full access to hantaran" ON hantaran
    FOR ALL USING (auth.role() = 'service_role');

-- Create policies for admin_users
CREATE POLICY "Allow admin access to admin_users" ON admin_users
    FOR ALL USING (auth.role() = 'service_role');

-- Insert sample data for templates
INSERT INTO templates (title, category, price, description, image_url, features) VALUES
('Elegant Garden', 'Modern', 150000, 'Template undangan modern dengan tema taman yang elegan', '/images/template-1.jpg', '["Template digital", "Customizable text", "High resolution", "Multiple formats"]'),
('Royal Classic', 'Traditional', 200000, 'Template undangan klasik dengan sentuhan royal', '/images/template-2.jpg', '["Template digital", "Traditional design", "Gold accents", "Premium quality"]'),
('Minimalist Chic', 'Modern', 125000, 'Template undangan minimalis yang chic dan modern', '/images/template-3.jpg', '["Clean design", "Modern typography", "Customizable colors", "Mobile friendly"]');

-- Insert sample data for hantaran
INSERT INTO hantaran (name, category, price, description, image_url, ingredients) VALUES
('Paket Hantaran Mewah', 'Premium', 2500000, 'Paket hantaran premium dengan 9 dulang berisi makanan dan buah-buahan pilihan terbaik', '/images/hantaran-1.jpg', '["Buah-buahan segar premium", "Kue tradisional pilihan", "Makanan ringan berkualitas", "Permen dan coklat import", "Minuman kemasan premium", "Dekorasi dulang mewah", "Kemasan gift box eksklusif", "Kartu ucapan personal", "Dokumentasi penyerahan"]'),
('Paket Hantaran Deluxe', 'Deluxe', 3200000, 'Paket hantaran deluxe dengan 11 dulang dan pilihan makanan yang lebih beragam', '/images/hantaran-2.jpg', '["Buah-buahan segar premium", "Kue tradisional pilihan", "Makanan ringan berkualitas", "Permen dan coklat import", "Minuman kemasan premium", "Dekorasi dulang mewah", "Kemasan gift box eksklusif", "Kartu ucapan personal", "Dokumentasi penyerahan", "Bunga segar", "Aksesoris tambahan"]'),
('Paket Hantaran Royal', 'Royal', 4000000, 'Paket hantaran royal dengan 13 dulang dan layanan premium lengkap', '/images/hantaran-3.jpg', '["Buah-buahan segar premium", "Kue tradisional pilihan", "Makanan ringan berkualitas", "Permen dan coklat import", "Minuman kemasan premium", "Dekorasi dulang mewah", "Kemasan gift box eksklusif", "Kartu ucapan personal", "Dokumentasi penyerahan", "Bunga segar", "Aksesoris tambahan", "Layanan antar", "Setup di lokasi"]');

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@ayung.com', '$2b$10$DcnE8KqrSnbSGS7syhLHRO98r6gN5S7Ziu8iP4BI7.zJ7F7pPpuG.', 'Administrator', 'admin');

-- Create indexes for better performance
CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_templates_is_active ON templates(is_active);
CREATE INDEX idx_hantaran_category ON hantaran(category);
CREATE INDEX idx_hantaran_is_available ON hantaran(is_available);
CREATE INDEX idx_admin_users_email ON admin_users(email);