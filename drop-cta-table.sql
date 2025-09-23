-- Drop CTA table and related objects
-- This script removes the service_cta table and its associated policies, triggers, and functions

-- Drop RLS policies first
DROP POLICY IF EXISTS "Allow public read access to service_cta" ON service_cta;
DROP POLICY IF EXISTS "Allow authenticated users to manage service_cta" ON service_cta;

-- Drop triggers
DROP TRIGGER IF EXISTS update_service_cta_updated_at ON service_cta;

-- Drop the table
DROP TABLE IF EXISTS service_cta;

-- Drop the trigger function if it exists and is not used by other tables
-- Note: Only drop this if no other tables use the same trigger function
-- DROP FUNCTION IF EXISTS update_updated_at_column();

-- Clean up any related indexes (they should be dropped automatically with the table)
-- But just in case, you can add specific DROP INDEX commands here if needed

-- Verify the table is dropped
-- SELECT table_name FROM information_schema.tables WHERE table_name = 'service_cta';