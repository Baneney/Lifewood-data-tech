import { supabase } from "@/supabaseClient";

// export async function checkExistingEmailPhone(
//   email: string,
//   phone: string,
//   fname: string,
//   lname: string,
//   dob: string,
// ) {
//   const cleanEmail = email.trim().toLowerCase();
//   const cleanPhone = phone.trim().toLowerCase();
//   const cleanFname = fname.trim().toLowerCase();
//   const cleanLname = lname.trim().toLowerCase();

//   const { data: conflict, error: fetchError } = await supabase
//     .from("applicant")
//     .select("email, phone, fname, lname, dob")
//     // Find anyone with the same email OR phone...
//     .or(`email.eq.${cleanEmail},phone.eq.${cleanPhone}`)
//     // ...BUT exclude the person if the name and DOB match perfectly
//     .not("fname", "ilike", cleanFname)
//     .not("lname", "ilike", cleanLname)
//     .not("dob", "eq", dob)
//     .maybeSingle();

//   if (fetchError) throw fetchError;

//   return conflict;
// }




export async function checkExistingEmailPhone(
  email: string,
  phone: string,
  fname: string,
  lname: string,
  dob: string,
) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPhone = phone.trim().toLowerCase();
  const cleanFname = fname.trim().toLowerCase();
  const cleanLname = lname.trim().toLowerCase();

  // 1. Fetch any record that matches the email OR the phone
  const { data: record, error: fetchError } = await supabase
    .from("applicant")
    .select("id, email, phone, fname, lname, dob")
    .or(`email.eq.${cleanEmail},phone.eq.${cleanPhone}`)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (!record)
    return { isExistingUser: false, conflictField: null, applicantId: null };

  // 2. Check if it's the SAME person (Name and DOB match)
  const isSamePerson =
    record.fname.toLowerCase() === cleanFname &&
    record.lname.toLowerCase() === cleanLname &&
    record.dob === dob;

  if (isSamePerson) {
    return {
      isExistingUser: true,
      conflictField: null,
      applicantId: record.id,
    };
  }

  // 3. If it's NOT the same person, it's a conflict
  const conflictField = record.email === cleanEmail ? "Email" : "Phone number";
  return { isExistingUser: false, conflictField, applicantId: null };
}



// export async function checkExistingEmailPhone(email: string, phone: string) {
//   const cleanEmail = email.trim().toLowerCase();
//   const cleanPhone = phone.trim().toLowerCase();

//   // 1. Fetch from 'application' table
//   const { data: existingApp, error: fetchError } = await supabase
//     .from("applicant")
//     .select("email, phone")
//     .or(`email.eq.${cleanEmail},phone.eq.${cleanPhone}`)
//     .maybeSingle();

//   // 2. Handle potential database errors
//   if (fetchError) throw fetchError;

//   // 3. Return the result directly
//   return existingApp;
// }

// export async function checkexistingApplication(
//   fname: string,
//   lname: string,
//   dob: string,
//   newSelectedPosIds: string[], // Pass the array from formData.position
// ) {
//   const cleanFname = fname.trim().toLowerCase();
//   const cleanLname = lname.trim().toLowerCase();

//   const { data: activeApps, error: fetchError } = await supabase
//     .from("application")
//     .select(
//       `
//       id,
//       pos_id,
//       position:pos_id ( title ),
//       applicant!inner ( id, fname, lname, dob ),
//       logs!inner ( status )
//     `,
//     )
//     .ilike("applicant.fname", cleanFname)
//     .ilike("applicant.lname", cleanLname)
//     .eq("applicant.dob", dob)
//     .or("status.eq.shortlisted,status.eq.pending", { foreignTable: "logs" });

//   if (fetchError) throw fetchError;

//   // Now we compare the database results with the user's current input
//   const conflicts = activeApps?.filter((app) =>
//     newSelectedPosIds.includes(app.pos_id),
//   );

//   return {
//     hasConflict: conflicts && conflicts.length > 0,
//     conflictingTitles: conflicts?.map((c) => (c.position as any)?.title) || [],
//   };
// }


export async function checkexistingApplication(
  fname: string,
  lname: string,
  email: string,
  newSelectedPosIds: string[], // Pass the array from formData.position
) {
  const cleanFname = fname.trim().toLowerCase();
  const cleanLname = lname.trim().toLowerCase();
  const cleanEmail = email.trim().toLowerCase();

  const { data: activeApps, error: fetchError } = await supabase
    .from("application")
    .select(
      `
      id, 
      pos_id,
      position:pos_id ( title ),
      applicant!inner ( id, fname, lname, email ),
      logs!inner ( status )
    `,
    )
    .ilike("applicant.fname", cleanFname)
    .ilike("applicant.lname", cleanLname)
    .ilike("applicant.email", cleanEmail)
    .or("status.eq.shortlisted,status.eq.pending", { foreignTable: "logs" });

  if (fetchError) throw fetchError;

  // Now we compare the database results with the user's current input
  const conflicts = activeApps?.filter((app) =>
    newSelectedPosIds.includes(app.pos_id),
  );

  return {
    hasConflict: conflicts && conflicts.length > 0,
    conflictingTitles: conflicts?.map((c) => (c.position as any)?.title) || [],
  };
}