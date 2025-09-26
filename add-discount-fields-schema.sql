-- Add discount fields to templates table
ALTER TABLE templates 
ADD COLUMN IF NOT EXISTS discount_percentage INTEGER DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
ADD COLUMN IF NOT EXISTS discount_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS discount_end_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_discount_active BOOLEAN DEFAULT false;

-- Add comment for clarity
COMMENT ON COLUMN templates.discount_percentage IS 'Discount percentage (0-100)';
COMMENT ON COLUMN templates.discount_start_date IS 'Start date for discount period';
COMMENT ON COLUMN templates.discount_end_date IS 'End date for discount period';
COMMENT ON COLUMN templates.is_discount_active IS 'Whether discount is currently active';

-- Create index for better performance when querying discounted templates
CREATE INDEX IF NOT EXISTS idx_templates_discount_active ON templates(is_discount_active) WHERE is_discount_active = true;
CREATE INDEX IF NOT EXISTS idx_templates_discount_dates ON templates(discount_start_date, discount_end_date) WHERE is_discount_active = true;