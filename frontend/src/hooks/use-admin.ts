import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

export const useAdmin = () => {
  const [adminId, setAdminId] = useState<string | null>(null);

  useEffect(() => {
    const fetchId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setAdminId(user.id);
    };
    fetchId();
  }, []);

  return { adminId };
};