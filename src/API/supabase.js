import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ngglnutdczuswnfvzxyh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nZ2xudXRkY3p1c3duZnZ6eHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwOTI5MDUsImV4cCI6MjAzNTY2ODkwNX0.GJio1swd8fFP802BhVciQxe4Mn7m-vGaALutnAI9u6I";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
