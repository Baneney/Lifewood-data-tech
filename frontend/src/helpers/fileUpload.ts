// frontend/src/lib/storage.ts
import { supabase } from "@/supabaseClient";

/**
 * Uploads a file to a specified Supabase bucket and returns the public URL.
 * @param file - The file object from the input
 * @param bucket - The name of the Supabase bucket (e.g., 'resumes')
 * @param folder - Optional folder path inside the bucket
 */
export const uploadFile = async (file: File, bucket: string, folder: string = "") => {
  try {
    const fileExt = file.name.split('.').pop();
    // Unique naming strategy: timestamp + random number
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};