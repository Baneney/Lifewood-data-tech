import { supabase } from "@/supabaseClient";
import { formatToDBDate } from '@/helpers/dateFormatter';

// Define the interface for the form data based on your BARARIOS or recruitment project needs
export interface SubmissionData {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  dob: Date;
  country: string;
  position: string[]; // Array of Position IDs
}


export async function usePostApplications(formData: SubmissionData, resumeUrl: string) {
  
  
  
    // 1. Insert into APPLICANT table
  const { data: newApplicant, error: applicantError } = await supabase
    .from('applicant')
    .insert([
      { 
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        gender: formData.gender,
        dob: formatToDBDate(formData.dob),// Ensure DB date format
        country: formData.country,
        resume: resumeUrl 
      }
    ])
    .select()
    .single();

  if (applicantError) throw applicantError;





  // 2. Prepare multiple rows for the APPLICATION table
  const applicationRows = formData.position.map(posId => ({
    act_id: newApplicant.id,
    pos_id: posId,
  }));

  const { data: insertedApplications, error: applicationError } = await supabase
    .from('application')
    .insert(applicationRows)
    .select();

  if (applicationError) throw applicationError;





  // 3. Create LOGS for each application created
  const logRows = insertedApplications.map(app => ({
    app_id: app.id,
    status: 'pending',
    adm_id: null, 
  }));

  const { error: logError } = await supabase
    .from('logs')
    .insert(logRows);

  if (logError) throw logError;

  return { success: true };
}