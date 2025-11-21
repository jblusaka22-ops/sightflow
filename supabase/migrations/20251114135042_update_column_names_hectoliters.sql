/*
  # Update Column Names to Hectoliters

  This migration renames the hectometer columns to hectoliter columns to reflect
  the correct unit used by Zambian Breweries and the beverage industry.
  
  1. Renamed Columns:
    - `sell_out_hectometers` → `sell_out_hectoliters`
    - `sell_in_hectometers` → `sell_in_hectoliters`
    
  2. Purpose:
    - Ensures accurate volume measurement terminology
    - Maintains data compatibility with existing calculations
    - Uses correct SI unit (hectoliter) for brewery operations
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'los_calculations' AND column_name = 'sell_out_hectometers'
  ) THEN
    ALTER TABLE los_calculations RENAME COLUMN sell_out_hectometers TO sell_out_hectoliters;
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'los_calculations' AND column_name = 'sell_in_hectometers'
  ) THEN
    ALTER TABLE los_calculations RENAME COLUMN sell_in_hectometers TO sell_in_hectoliters;
  END IF;
END $$;
