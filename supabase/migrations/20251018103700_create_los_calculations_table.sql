/*
  # Create LOS Calculations History Table

  1. New Tables
    - `los_calculations`
      - `id` (uuid, primary key) - Unique identifier for each calculation
      - `opening_stock` (integer) - Opening stock quantity
      - `available_stock` (integer) - Available stock after sales
      - `sales` (integer) - Calculated sales units
      - `current_los` (numeric) - Calculated current LOS percentage
      - `inventory_qty` (integer, nullable) - Inventory quantity for prediction
      - `target_los` (numeric, nullable) - Target LOS percentage
      - `required_sales` (numeric, nullable) - Required sales to reach target
      - `additional_sales` (numeric, nullable) - Additional sales needed
      - `created_at` (timestamptz) - Timestamp of calculation
      
  2. Security
    - Enable RLS on `los_calculations` table
    - Add policy for anyone to insert calculations (no auth required for demo)
    - Add policy for anyone to read calculations
    
  3. Indexes
    - Index on created_at for efficient date-based queries
*/

CREATE TABLE IF NOT EXISTS los_calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opening_stock integer NOT NULL,
  available_stock integer NOT NULL,
  sales integer NOT NULL,
  current_los numeric(5, 2) NOT NULL,
  inventory_qty integer,
  target_los numeric(5, 2),
  required_sales numeric(10, 2),
  additional_sales numeric(10, 2),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE los_calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on los_calculations"
  ON los_calculations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public select on los_calculations"
  ON los_calculations
  FOR SELECT
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS idx_los_calculations_created_at 
  ON los_calculations(created_at DESC);
