-- Create CTA (Call to Action) table for Services component
CREATE TABLE IF NOT EXISTS service_cta (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  button_text VARCHAR(100) NOT NULL DEFAULT 'Konsultasi Paket Hemat',
  background_gradient VARCHAR(255) DEFAULT 'linear-gradient(to right, #7c5367, #d1c7cc)',
  text_color VARCHAR(50) DEFAULT 'white',
  button_bg_color VARCHAR(50) DEFAULT 'white',
  button_text_color VARCHAR(50) DEFAULT '#52303f',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger for updated_at
CREATE TRIGGER update_service_cta_updated_at BEFORE UPDATE ON service_cta
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE service_cta ENABLE ROW LEVEL SECURITY;

-- Create policies for service_cta
CREATE POLICY "Allow public read access to active CTA" ON service_cta
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow admin full access to CTA" ON service_cta
    FOR ALL USING (auth.role() = 'service_role');

-- Insert default CTA data
INSERT INTO service_cta (title, description, button_text, background_gradient, text_color, button_bg_color, button_text_color, is_active, sort_order) VALUES
('Butuh Paket Kombinasi?', 'Dapatkan diskon spesial untuk pemesanan undangan + hantaran sekaligus!', 'Konsultasi Paket Hemat', 'linear-gradient(to right, #7c5367, #d1c7cc)', 'white', 'white', '#52303f', true, 1);

-- Create index for better performance
CREATE INDEX idx_service_cta_is_active ON service_cta(is_active);
CREATE INDEX idx_service_cta_sort_order ON service_cta(sort_order);