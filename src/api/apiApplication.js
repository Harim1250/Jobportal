import supabaseClient, {supabaseUrl}  from "../utils/superbase";

// - Apply to job ( candidate )
export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error("Error uploading Resume",error); 
    return null;  
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  const { data, error } = await supabase
    .from("application")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

    if (error) {
      console.error("Error submitting Application",error); 
      return null;  
    }

  return data;
}

// // - Edit Application Status ( recruiter )
export async function updateApplicationStatus(token, { job_id }, status) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  if (error || data.length === 0) {
    console.error("Error Updating Application Status:", error);
    return null;
  }

  return data;
}

export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("application")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("candidate_id", user_id);

    console.log(data);

  if (error) {
    console.error("Error fetching application:", error);
    return null;
  }

  return data;
}
