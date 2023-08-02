import { SUPABASE_URL, SUPABASE_API_KEY } from "@env";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY, {
  auth: {
    persistSession: false,
  },
});
