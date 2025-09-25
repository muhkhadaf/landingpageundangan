-- Update templates table to support multiple images
-- Add images array field and keep image_url as thumbnail

ALTER TABLE templates 
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Update existing templates to move image_url to images array if needed
UPDATE templates 
SET images = CASE 
  WHEN image_url IS NOT NULL AND image_url != '' 
  THEN jsonb_build_array(image_url)
  ELSE '[]'::jsonb
END
WHERE images = '[]'::jsonb;

-- Add comment for clarity
COMMENT ON COLUMN templates.image_url IS 'Thumbnail image URL for template cards';
COMMENT ON COLUMN templates.images IS 'Array of image URLs for template detail page (up to 4 images)';