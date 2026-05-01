import { supabase } from "@/supabaseClient";
import { useState, useEffect } from "react";

//======================================= APPLICATIONS =============================================
// export type ApplicationDataType = {
//   id: string; 
//   date_submitted: string;
//   applicant: {
//     id: string; 
//     fname: string;
//     lname: string;
//     email: string;
//     phone: string;
//   };
//   position: {
//     id: string; 
//     title: string;
//   };
//   logs: {
//     id: string,
//     status: string,
//     datetime: string
//   }
// };

// export function useApplications() {

//   const [applications, setapplications] = useState<ApplicationDataType[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       setIsLoading(true);
//       const { data, error } = await supabase
//         .from('application')
//         .select(`
//           id, date_submitted,
//           applicant ( id, fname, lname, email, phone ),
//           position ( id, title, status )
//         `)
//         .order('date_submitted', { ascending: false });

//       if (error) {
//         console.error('Error fetching applications:', error);
//       } else if (data) {
//         // We cast 'as unknown as ApplicationData[]' if Supabase types 
//         // aren't auto-generated, or just ensure the structures match.
//         setapplications(data as unknown as ApplicationDataType[]);
//       }
//       setIsLoading(false);
//     };

//     fetchApplications();
//   }, []);

//   return { applications, isLoading };
// }

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
  }[]; 
  // Added this to store the "Latest Status" after we format it
  current_status?: string; 
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
          id, 
          date_submitted,
          applicant ( id, fname, lname, dob, email, phone, resume ),
          position ( id, title ),
          logs ( 
            id,
            status, 
            datetime 
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
          current_status: app.logs?.[0]?.status || 'Pending'
        }));
        
        setapplications(formattedData as unknown as ApplicationDataType[]);
      }
      setIsLoading(false);
    };

    fetchApplications();
  }, []);

  return { applications, isLoading };
}



//===================================== POSITION =========================================
export type PositionDataType = {
  id: string; 
  title: string;
};

export function useFetchPositions() {

  const [positions, setPositions] = useState<PositionDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('position')
        .select(`id, title`)

      if (error) {
        console.error('Error fetching positions:', error);
      } else if (data) {
        // We cast 'as unknown as ApplicationData[]' if Supabase types 
        // aren't auto-generated, or just ensure the structures match.
        setPositions(data as unknown as PositionDataType[]);
      }
      setIsLoading(false);
    };

    fetchPositions();
  }, []);

  return { positions, isLoading };
}
