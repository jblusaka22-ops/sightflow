import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LOSCalculation {
  id?: string;
  sell_out_hectoliters: number;
  sell_in_hectoliters: number;
  sell_out_cases: number;
  sell_in_cases: number;
  current_los: number;
  desired_los: number;
  cases_needed: number;
  new_sell_out_hectoliters?: number;
  los_after_selling?: number;
  cases_received?: number | null;
  new_sell_in_hectoliters?: number;
  los_after_receiving?: number;
  pending_kuja_cases?: number | null;
  adjusted_sell_out?: number | null;
  predicted_los_with_kuja?: number | null;
  created_at?: string;
}

export async function saveCalculation(calculation: LOSCalculation) {
  const { data, error } = await supabase
    .from('los_calculations')
    .insert([calculation])
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getRecentCalculations(limit: number = 10) {
  const { data, error } = await supabase
    .from('los_calculations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getCalculationsByDateRange(startDate: Date, endDate: Date) {
  const { data, error } = await supabase
    .from('los_calculations')
    .select('*')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}
