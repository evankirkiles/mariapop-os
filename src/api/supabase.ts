/*
 * supabase.ts
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space, 
 */
import { createClient } from '@supabase/supabase-js';
import { Database } from './API';

const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

export default supabase;