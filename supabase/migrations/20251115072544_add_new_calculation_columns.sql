/*
  # Add New Calculation Columns for Advanced Features

  1. New Columns Added
    - `new_sell_out_hectoliters` (numeric) - Updated Sell Out after selling required cases
    - `los_after_selling` (numeric) - LOS after selling required cases
    - `cases_received` (integer, nullable) - Cases received as new stock
    - `new_sell_in_hectoliters` (numeric, nullable) - Updated Sell In after receiving cases
    - `los_after_receiving` (numeric, nullable) - Updated LOS after receiving cases
    
  2. Purpose:
    - Tracks updated Sell Out values after selling cases needed for target LOS
    - Tracks updated Sell In values after receiving new stock
    - Enables prediction of LOS changes with inventory updates
    
  3. Benefits:
    - Provides complete audit trail of scenario planning
    - Allows users to simulate different stock movements
    - Improves forecasting accuracy
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'los_calculations' AND column_name = 'new_sell_out_hectoliters'
  ) THEN
    ALTER TABLE los_calculations ADD COLUMN new_sell_out_hectoliters numeric(10, 2);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'los_calculations' AND column_name = 'los_after_selling'
  ) THEN
    ALTER TABLE los_calculations ADD COLUMN los_after_selling numeric(5, 2);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'los_calculations' AND column_name = 'cases_received'
  ) THEN
    ALTER TABLE los_calculations ADD COLUMN cases_received integer;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'los_calculations' AND column_name = 'new_sell_in_hectoliters'
  ) THEN
    ALTER TABLE los_calculations ADD COLUMN new_sell_in_hectoliters numeric(10, 2);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'los_calculations' AND column_name = 'los_after_receiving'
  ) THEN
    ALTER TABLE los_calculations ADD COLUMN los_after_receiving numeric(5, 2);
  END IF;
END $$;
