import supabaseClient, { supabaseUrl } from "../utils/superbase";

// Fetch Companies
export async function getCompanies(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("companies").select("*");
  console.log(data)

  if (error) {
    console.error("Error fetching Companies:", error);
    return null;
}

  return data;
}


// Add Company
export async function addNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token);

  if (!companyData.name) {
    throw new Error("Company name is required"); // Ensure name exists
  }

  if (!companyData.logo) {
    throw new Error("Company logo is required"); // Ensure logo exists
  }

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name.replace(/\s+/g, "-")}`;

  console.log("Uploading file:", fileName); // Debugging

  // Upload the logo
  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo);

  if (storageError) throw new Error("Error uploading Company Logo");

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

  // Insert company data
  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url,
      },
    ])
    .select();

  console.log("Inserted company:", data); // Debugging

  if (error) {
    console.error(error);
    throw new Error("Error submitting company");
  }

  return data;
}
