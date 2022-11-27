import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  headers: {
    apiKey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  },
});
export default supabase;
export async function signUp(email, password) {
  const res = await supabase.auth.signUp({
    email,
    password,
  });
  return res;
}
export async function logOut() {
  console.log("CLICKED");
  const { error } = supabase.auth.signOut();
  return { error };
}
