import { supabase } from "@/supabaseClient";


export interface LogsDataType {
    status: string;
    potential: boolean;
    remarks: string;
    app_id: string;
    adm_id: string;
}


export async function usePostLogs(data: LogsDataType) {
  
  const { error: applicantError } = await supabase
    .from('logs')
    .insert([
      { 
        status: data.status,
        potential: data.potential,
        remarks: data.remarks,
        app_id: data.app_id,
        adm_id: data.adm_id,
      }
    ])
    .select()
    .single();
    

    if (applicantError) throw applicantError;

}