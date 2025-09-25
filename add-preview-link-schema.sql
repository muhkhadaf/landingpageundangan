-- Add preview_link field to templates table
ALTER TABLE templates 
ADD COLUMN IF NOT EXISTS preview_link TEXT;

-- Add comment for clarity
COMMENT ON COLUMN templates.preview_link IS 'URL for template preview/demo';