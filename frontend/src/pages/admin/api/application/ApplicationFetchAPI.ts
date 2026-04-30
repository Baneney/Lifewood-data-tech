import { supabase } from "@/supabaseClient";
import { useState, useEffect } from "react";

// Export the type so other files can use it
export type ApplicationDataType = {
  id: string; 
  date_submitted: string;
  applicant: {
    id: string; 
    fname: string;
    lname: string;
    email: string;
    phone: string;
  };
  position: {
    id: string; 
    title: string;
    status: string;
  };
};

export function useApplications() {

  const [applications, setapplications] = useState<ApplicationDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('application')
        .select(`
          id, date_submitted,
          applicant ( id, fname, lname, email, phone ),
          position ( id, title, status )
        `)
        .order('date_submitted', { ascending: false });

      if (error) {
        console.error('Error fetching data:', error);
      } else if (data) {
        // We cast 'as unknown as ApplicationData[]' if Supabase types 
        // aren't auto-generated, or just ensure the structures match.
        setapplications(data as unknown as ApplicationDataType[]);
      }
      setIsLoading(false);
    };

    fetchApplications();
  }, []);

  return { applications, isLoading };
}