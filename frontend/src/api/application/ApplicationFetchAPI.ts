import { supabase } from "@/supabaseClient";
import { useState, useEffect } from "react";

//======================================= APPLICATIONS =============================================


export type ApplicationDataType = {
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

export function useApplications() {
  const [applications, setapplications] = useState<ApplicationDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      .order('datetime', { foreignTable: 'logs', ascending: false })
      .limit(1, { foreignTable: 'logs' }) 
      .order('date_submitted', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
    } else if (data) {
      const formattedData = data.map(app => ({
        ...app,
        current_status: app.logs?.[0]?.status || 'Pending'
      }));
      
      setapplications(formattedData as unknown as ApplicationDataType[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return { applications, isLoading, refetch: fetchApplications };
}






//===================================== POSITION =========================================
export type PositionDataType = {
  id: string; 
  title: string;
  desc: string;
  status: string;
};

export function useFetchPositions() {

  const [positions, setPositions] = useState<PositionDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPositions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('position')
      .select(`id, title, desc, status`)
      .order('status', { ascending: false })

    if (error) {
      console.error('Error fetching positions:', error);
    } else if (data) {
      setPositions(data as unknown as PositionDataType[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return { positions, isLoading, refetch: fetchPositions };
}





