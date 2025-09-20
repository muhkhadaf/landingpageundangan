-- Schema untuk tabel packages (paket template)
-- File: packages-schema.sql

-- Tabel utama untuk packages
CREATE TABLE packages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    price_display VARCHAR(50) NOT NULL, -- Format display seperti "Rp 150.000"
    is_popular BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk features/fitur dari setiap package
CREATE TABLE package_features (
    id SERIAL PRIMARY KEY,
    package_id INTEGER REFERENCES packages(id) ON DELETE CASCADE,
    feature_text VARCHAR(500) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk kategori packages (opsional untuk future expansion)
CREATE TABLE package_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menambahkan kolom category_id ke tabel packages (opsional)
ALTER TABLE packages ADD COLUMN category_id INTEGER REFERENCES package_categories(id);

-- Index untuk performa
CREATE INDEX idx_packages_active ON packages(is_active);
CREATE INDEX idx_packages_popular ON packages(is_popular);
CREATE INDEX idx_packages_sort_order ON packages(sort_order);
CREATE INDEX idx_package_features_package_id ON package_features(package_id);
CREATE INDEX idx_package_features_sort_order ON package_features(sort_order);

-- Trigger untuk update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert data sample
INSERT INTO packages (name, description, price, price_display, is_popular, sort_order) VALUES
('Paket Basic', 'Paket dasar untuk undangan digital sederhana', 150000, 'Rp 150.000', false, 1),
('Paket Premium', 'Paket lengkap dengan fitur tambahan', 250000, 'Rp 250.000', true, 2),
('Paket Deluxe', 'Paket premium dengan semua fitur terlengkap', 400000, 'Rp 400.000', false, 3);

-- Insert features untuk setiap package
INSERT INTO package_features (package_id, feature_text, sort_order) VALUES
-- Features untuk Paket Basic (id: 1)
(1, 'Template undangan digital', 1),
(1, 'Maksimal 100 tamu', 2),
(1, '1x revisi gratis', 3),
(1, 'Support WhatsApp', 4),

-- Features untuk Paket Premium (id: 2)
(2, 'Template undangan digital', 1),
(2, 'Maksimal 300 tamu', 2),
(2, '3x revisi gratis', 3),
(2, 'Support WhatsApp', 4),
(2, 'Musik background', 5),
(2, 'Galeri foto (10 foto)', 6),

-- Features untuk Paket Deluxe (id: 3)
(3, 'Template undangan digital', 1),
(3, 'Unlimited tamu', 2),
(3, 'Unlimited revisi', 3),
(3, 'Support WhatsApp 24/7', 4),
(3, 'Musik background', 5),
(3, 'Galeri foto (25 foto)', 6),
(3, 'Video prewedding', 7),
(3, 'Live streaming', 8);

-- View untuk mengambil packages dengan features
CREATE VIEW packages_with_features AS
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.price_display,
    p.is_popular,
    p.is_active,
    p.sort_order,
    p.created_at,
    p.updated_at,
    COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', pf.id,
                'text', pf.feature_text,
                'sort_order', pf.sort_order
            ) ORDER BY pf.sort_order
        ) FILTER (WHERE pf.id IS NOT NULL),
        '[]'::json
    ) as features
FROM packages p
LEFT JOIN package_features pf ON p.id = pf.package_id
WHERE p.is_active = true
GROUP BY p.id, p.name, p.description, p.price, p.price_display, p.is_popular, p.is_active, p.sort_order, p.created_at, p.updated_at
ORDER BY p.sort_order, p.id;