-- Add photo_url column to existing testimonials table
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Update existing testimonials with default photo URLs (placeholder images)
UPDATE testimonials SET photo_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' WHERE id = 1;
UPDATE testimonials SET photo_url = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' WHERE id = 2;
UPDATE testimonials SET photo_url = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' WHERE id = 3;
UPDATE testimonials SET photo_url = 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face' WHERE id = 4;
UPDATE testimonials SET photo_url = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' WHERE id = 5;
UPDATE testimonials SET photo_url = 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face' WHERE id = 6;