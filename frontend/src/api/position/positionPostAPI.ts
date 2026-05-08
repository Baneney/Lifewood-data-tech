import { supabase } from "@/supabaseClient";



// Define the interface for the form data based on your BARARIOS or recruitment project needs
export interface PositionPostDataType {
    title: string,
    desc: string,
    status: string
}


export async function usePostPosition(formData: PositionPostDataType) {
  
  const { error: applicantError } = await supabase
    .from('position')
    .insert([
      { 
        title: formData.title,
        desc: formData.desc,
        status: formData.status,
      }
    ])
    .select()
    .single();
    

    if (applicantError) throw applicantError;

}