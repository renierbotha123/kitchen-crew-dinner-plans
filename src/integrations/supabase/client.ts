// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ifpxvvdvwfbfitaqtohk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmcHh2dmR2d2ZiZml0YXF0b2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMzYwMjUsImV4cCI6MjA2NjYxMjAyNX0.mPLanNtOydgk5d21NZblP04lUEyfZ7eHs7bUQHXWM0s";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);