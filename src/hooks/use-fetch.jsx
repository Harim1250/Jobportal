import { useSession } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { session, isLoaded } = useSession(); // Ensure Clerk session is loaded

  const fn = async (...args) => {

    // checking the session calling form the api 
    
    if (!isLoaded) {
      console.warn("Session is still loading...");
      return;
    }

    if (!session) {
      console.error("User is not authenticated.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabaseAccessToken = await session.getToken({
        template: "superbase",
      });

      if (!supabaseAccessToken) {
        throw new Error("Failed to retrieve access token.");
      }

      const response = await cb(supabaseAccessToken, options, ...args);
      setData(response);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fn, data, loading, error, isLoaded };
};

export default useFetch;
