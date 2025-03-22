
// ALL THE API OF THE superbase WILL BE INTERGRATED HERE

import { createClient } from '@supabase/supabase-js';
 
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://hhnmnfgvgqwsvxqdwdnj.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhobm1uZmd2Z3F3c3Z4cWR3ZG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMzQ1NTQsImV4cCI6MjA1MzgxMDU1NH0.29S6NlsIJYsnZlP8MF7e__BbEZe4hpv77zm1GbUREZY";


const supabaseClient = async (supabaseAccessToken) => {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
         headers: {
             Authorization: `Bearer ${supabaseAccessToken}`, 
            },
        },
    });
    // set Supabase JWT on the client object,
    // so it is sent up with all Supabase requests
    return supabase;
  };
  
  export default supabaseClient;



        