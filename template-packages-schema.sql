-- Schema untuk menghubungkan packages dengan templates
-- File: template-packages-schema.sql

-- Modifikasi tabel packages untuk menambahkan template_id
ALTER TABLE packages ADD COLUMN template_id INTEGER REFERENCES templates(id) ON DELETE CASCADE;

-- Index untuk performa
CREATE INDEX idx_packages_template_id ON packages(template_id);

-- Update data sample untuk menghubungkan packages dengan templates
-- Hapus data packages lama
DELETE FROM package_features;
DELETE FROM packages;

-- Reset sequence untuk memastikan ID dimulai dari 1
ALTER SEQUENCE packages_id_seq RESTART WITH 1;

-- Insert packages dan features dalam satu transaksi
DO $$
DECLARE
    pkg_id INTEGER;
BEGIN
    -- Insert packages untuk Template 1 (Elegant Garden)
    INSERT INTO packages (name, description, price, price_display, is_popular, sort_order, template_id) 
    VALUES ('Paket Basic - Elegant Garden', 'Paket dasar untuk template Elegant Garden', 150000, 'Rp 150.000', false, 1, 1)
    RETURNING id INTO pkg_id;
    
    INSERT INTO package_features (package_id, feature_text, sort_order) VALUES
    (pkg_id, 'Template Elegant Garden', 1),
    (pkg_id, 'Maksimal 100 tamu', 2),
    (pkg_id, '1x revisi gratis', 3),
    (pkg_id, 'Support WhatsApp', 4);

    INSERT INTO packages (name, description, price, price_display, is_popular, sort_order, template_id) 
    VALUES ('Paket Premium - Elegant Garden', 'Paket lengkap untuk template Elegant Garden', 250000, 'Rp 250.000', true, 2, 1)
    RETURNING id INTO pkg_id;
    
    INSERT INTO package_features (package_id, feature_text, sort_order) VALUES
    (pkg_id, 'Template Elegant Garden', 1),
    (pkg_id, 'Maksimal 300 tamu', 2),
    (pkg_id, '3x revisi gratis', 3),
    (pkg_id, 'Support WhatsApp', 4),
    (pkg_id, 'Musik background', 5),
    (pkg_id, 'Galeri foto (10 foto)', 6);

    INSERT INTO packages (name, description, price, price_display, is_popular, sort_order, template_id) 
    VALUES ('Paket Deluxe - Elegant Garden', 'Paket premium untuk template Elegant Garden', 400000, 'Rp 400.000', false, 3, 1)
    RETURNING id INTO pkg_id;
    
    INSERT INTO package_features (package_id, feature_text, sort_order) VALUES
    (pkg_id, 'Template Elegant Garden', 1),
    (pkg_id, 'Unlimited tamu', 2),
    (pkg_id, 'Unlimited revisi', 3),
    (pkg_id, 'Support WhatsApp 24/7', 4),
    (pkg_id, 'Musik background', 5),
    (pkg_id, 'Galeri foto (25 foto)', 6),
    (pkg_id, 'Video prewedding', 7),
    (pkg_id, 'Live streaming', 8);

    -- Insert packages untuk Template 2 (Royal Classic)
    INSERT INTO packages (name, description, price, price_display, is_popular, sort_order, template_id) 
    VALUES ('Paket Basic - Royal Classic', 'Paket dasar untuk template Royal Classic', 200000, 'Rp 200.000', false, 1, 2)
    RETURNING id INTO pkg_id;
    
    INSERT INTO package_features (package_id, feature_text, sort_order) VALUES
    (pkg_id, 'Template Royal Classic', 1),
    (pkg_id, 'Maksimal 100 tamu', 2),
    (pkg_id, '1x revisi gratis', 3),
    (pkg_id, 'Support WhatsApp', 4),
    (pkg_id, 'Desain gold accent', 5);

    INSERT INTO packages (name, description, price, price_display, is_popular, sort_order, template_id) 
    VALUES ('Paket Premium - Royal Classic', 'Paket lengkap untuk template Royal Classic', 350000, 'Rp 350.000', true, 2, 2)
    RETURNING id INTO pkg_id;
    
    INSERT INTO package_features (package_id, feature_text, sort_order) VALUES
    (pkg_id, 'Template Royal Classic', 1),
    (pkg_id, 'Maksimal 300 tamu', 2),
    (pkg_id, '3x revisi gratis', 3),
    (pkg_id, 'Support WhatsApp', 4),
    (pkg_id, 'Desain gold accent', 5),
    (pkg_id, 'Musik background klasik', 6),
    (pkg_id, 'Galeri foto (15 foto)', 7);

    INSERT INTO packages (name, description, price, price_display, is_popular, sort_order, template_id) 
    VALUES ('Paket Deluxe - Royal Classic', 'Paket premium untuk template Royal Classic', 500000, 'Rp 500.000', false, 3, 2)
    RETURNING id INTO pkg_id;
    
    INSERT INTO package_features (package_id, feature_text, sort_order) VALUES
    (pkg_id, 'Template Royal Classic', 1),
    (pkg_id, 'Unlimited tamu', 2),
    (pkg_id, 'Unlimited revisi', 3),
    (pkg_id, 'Support WhatsApp 24/7', 4),
    (pkg_id, 'Desain gold accent', 5),
    (pkg_id, 'Musik background klasik', 6),
    (pkg_id, 'Galeri foto (30 foto)', 7),
    (pkg_id, 'Video prewedding', 8),
    (pkg_id, 'Live streaming', 9),
    (pkg_id, 'Animasi premium', 10);

    -- Insert packages untuk Template 3 (Minimalist Chic)
    INSERT INTO packages (name, description, price, price_display, is_popular, sort_order, template_id) 
    VALUES ('Paket Basic - Minimalist Chic', 'Paket dasar untuk template Minimalist Chic', 125000, 'Rp 125.000', false, 1, 3)
    RETURNING id INTO pkg_id;
    
    INSERT INTO package_features (package_id, feature_text, sort_order) VALUES
    (pkg_id, 'Template Minimalist Chic', 1),
    (pkg_id, 'Maksimal 100 tamu', 2),
    (pkg_id, '1x revisi gratis', 3),
    (pkg_id, 'Support WhatsApp', 4),
    (pkg_id, 'Desain minimalis', 5);

    INSERT INTO packages (name, description, price, price_display, is_popular, sort_order, template_id) 
    VALUES ('Paket Premium - Minimalist Chic', 'Paket lengkap untuk template Minimalist Chic', 225000, 'Rp 225.000', true, 2, 3)
    RETURNING id INTO pkg_id;
    
    INSERT INTO package_features (package_id, feature_text, sort_order) VALUES
    (pkg_id, 'Template Minimalist Chic', 1),
    (pkg_id, 'Maksimal 300 tamu', 2),
    (pkg_id, '3x revisi gratis', 3),
    (pkg_id, 'Support WhatsApp', 4),
    (pkg_id, 'Desain minimalis', 5),
    (pkg_id, 'Musik background modern', 6),
    (pkg_id, 'Galeri foto (12 foto)', 7);

    INSERT INTO packages (name, description, price, price_display, is_popular, sort_order, template_id) 
    VALUES ('Paket Deluxe - Minimalist Chic', 'Paket premium untuk template Minimalist Chic', 375000, 'Rp 375.000', false, 3, 3)
    RETURNING id INTO pkg_id;
    
    INSERT INTO package_features (package_id, feature_text, sort_order) VALUES
    (pkg_id, 'Template Minimalist Chic', 1),
    (pkg_id, 'Unlimited tamu', 2),
    (pkg_id, 'Unlimited revisi', 3),
    (pkg_id, 'Support WhatsApp 24/7', 4),
    (pkg_id, 'Desain minimalis', 5),
    (pkg_id, 'Musik background modern', 6),
    (pkg_id, 'Galeri foto (20 foto)', 7),
    (pkg_id, 'Video prewedding', 8),
    (pkg_id, 'Live streaming', 9);
END $$;

-- Update view untuk mengambil packages dengan features dan template info
DROP VIEW IF EXISTS packages_with_features;
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
    p.template_id,
    t.title as template_title,
    t.category as template_category,
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
LEFT JOIN templates t ON p.template_id = t.id
GROUP BY p.id, p.name, p.description, p.price, p.price_display, p.is_popular, p.is_active, p.sort_order, p.template_id, t.title, t.category, p.created_at, p.updated_at;

-- View untuk mengambil templates dengan packages
CREATE VIEW templates_with_packages AS
SELECT 
    t.id,
    t.title,
    t.category,
    t.price as template_base_price,
    t.description,
    t.image_url,
    t.features as template_features,
    t.is_active,
    t.created_at,
    t.updated_at,
    COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', p.id,
                'name', p.name,
                'description', p.description,
                'price', p.price,
                'price_display', p.price_display,
                'is_popular', p.is_popular,
                'sort_order', p.sort_order,
                'features', pwf.features
            ) ORDER BY p.sort_order
        ) FILTER (WHERE p.id IS NOT NULL), 
        '[]'::json
    ) as packages
FROM templates t
LEFT JOIN packages p ON t.id = p.template_id AND p.is_active = true
LEFT JOIN packages_with_features pwf ON p.id = pwf.id
WHERE t.is_active = true
GROUP BY t.id, t.title, t.category, t.price, t.description, t.image_url, t.features, t.is_active, t.created_at, t.updated_at;