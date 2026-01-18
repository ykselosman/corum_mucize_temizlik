import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svitmrnhwcycdhqkkqyl.supabase.co';
const supabaseKey = 'sb_publishable_JH_T0t9JZ6iV2n6d3nzmVw_CWwzSHHx';

export const supabase = createClient(supabaseUrl, supabaseKey);