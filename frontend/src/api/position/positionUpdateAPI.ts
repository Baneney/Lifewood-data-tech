import { supabase } from "@/supabaseClient";



export interface PositionUpdateDataType {
  id: string;
  title : string;
  desc: string;
  type: string;
  deployment: string;
  status : string;
}


export async function useUpdatePosition(formData: PositionUpdateDataType) {
  const { error } = await supabase
    .from('position')
    .update({ 
      title: formData.title,
      desc: formData.desc,
      type: formData.type,
      status: formData.status,
      deployment: formData.deployment,
    })
    .eq('id', formData.id) 
    .select()
    .single();

  if (error) {
    console.error("Error updating position:", error.message);
    throw error;
  }
}