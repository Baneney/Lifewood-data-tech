import { supabase } from "@/supabaseClient";
import { useState, useEffect } from "react";



export type PositionFetchDataType = {
  id: string; 
  title: string;
  desc: string;
  status: string;
};

export function useFetchCareerPositions() {

  const [positions, setPositions] = useState<PositionFetchDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPositions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('position')
      .select(`id, title, desc, status`)
       .in('status', ['open', 'urgent']) 
      .order('status', { ascending: false })

    if (error) {
      console.error('Error fetching positions:', error);
    } else if (data) {
      setPositions(data as unknown as PositionFetchDataType[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return { positions, isLoading, refetch: fetchPositions };
}



