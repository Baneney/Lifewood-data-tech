import { supabase } from "@/supabaseClient";
import { useState, useEffect } from "react";


export type RecentApplicationType = {
  id: string; 
  date_submitted: string;
  applicant: {
    id: string; 
    fname: string;
    lname: string;
    dob: string;
    email: string;
    phone: string;
    resume: string;
  };
  position: {
    id: string; 
    title: string;
  };
  // FIX: Added [] here because Supabase returns a list
  logs: {
    id: string;
    status: string;
    datetime: string;
    potential: boolean;
    remarks: string;
  }[]; 
  // Added this to store the "Latest Status" after we format it
  current_status?: string; 
};

export function useRecentApplications() {
  const [applications, setapplications] = useState<RecentApplicationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('application')
        .select(`
          id, 
          date_submitted,
          applicant ( id, fname, lname, dob, email, phone, resume ),
          position ( id, title ),
          logs ( 
            id,
            status, 
            datetime,
            potential,
            remarks 
          )
        `)
        // Correctly ordering to get the newest log first
        .order('datetime', { foreignTable: 'logs', ascending: false })
        // Restricting the payload to only the latest 1 log per application
        .limit(1, { foreignTable: 'logs' }) 
        .order('date_submitted', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
      } else if (data) {
        // Flattening the data so your table doesn't have to deal with the logs array
        const formattedData = data.map(app => ({
          ...app,
            current_status: app.logs?.[0]?.status || 'Pending',
            is_potential: app.logs?.[0]?.potential || false // Extract potential flag
        }));
        
        setapplications(formattedData as unknown as RecentApplicationType[]);
      }
      setIsLoading(false);
    };

    fetchApplications();
  }, []);

  return { applications, isLoading };
}

