import { supabase } from "@/supabaseClient";


export const signInWithEmail = async (formData: any) => {
  const { email, password } = formData;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};
