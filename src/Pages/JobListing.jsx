// import { getJobs } from "../api/apiJobs";
// import useFetch from '../hooks/use-fetch';
// import { BarLoader } from "react-spinners";
// import React, { useEffect, useState } from 'react';

// import JobCard from "../components/job-card";
//  import { getCompanies } from "@/api/apiCompanies";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";


// import { State } from "country-state-city";


// const JobListing = () => {

//   const [searchQuery, setSearchQuery] = useState("");
//   const [location, setLocation] = useState("");
//   const [company_id, setCompany_id] = useState("");

  

//   const {
//     fn: fnJobs,
//     data: jobs,
//     loading: loadingJobs,
//     error: errorJobs,
//     isLoaded, // Track if session is loaded
//   } = useFetch(getJobs, {
//     location,
//     company_id,
//     searchQuery,
//   });


//   const {
//     fn: fnCompanies,
//     data: Companies,
//   } = useFetch(getCompanies);


//   useEffect(() => {
//     if (isLoaded) fnCompanies(); // Call only when session is fully loaded
//   }, [isLoaded]);
  

//   console.log(jobs)
 
//   useEffect(() => {
//     if (isLoaded) fnJobs(); // Call only when session is fully loaded
//   }, [isLoaded,location,company_id,searchQuery]);

  
//   const clearFilters = ()=>{
//     setSearchQuery("");
//     setLocation("");
//     setCompany_id("");

//   }



// // search function code here.
//   const handleSearch = (e) => {
//   e.preventDefault();
//   let formData = new FormData(e.target);

//   const query = formData.get("search-query");
//   console.log("Search Query:", query); // Debugging

//   if (query) {
//     setSearchQuery(query);
//   }
// };


//   if (!isLoaded) {
//     return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
//   }

//   // {WHEN API DEOSN'T GET FETCHED}
//   {errorJobs && <p>Error: {errorJobs.message}</p>}


//   return (
//     <div className="">
//       <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 bg">
//         Latest Jobs
//       </h1>
//       <form
//       onSubmit={handleSearch}
//       className="h-14 flex flex-row w-full gap-2 items-center mb-3"
//     >
//       <Input
//         type="text-whote-blue"
//         placeholder="Search Jobs by Title.."
//         name="search-query"
//         className="h-full flex-1 px-4 text-md"
//       />
//       <Button type="submit" className="h-full sm:w-28" variant="blue">
//         Search
//       </Button>
//     </form>

//       <div className="flex flex-col sm:flex-row gap-2">
//         <Select value={location} onValueChange={(value) => setLocation(value)}>
//           <SelectTrigger>
//             <SelectValue placeholder="Filter by Location" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {State.getStatesOfCountry("IN").map(({ name }) => {
//                 return (
//                   <SelectItem key={name} value={name}>
//                     {name}
//                   </SelectItem>
//                 );
//               })}
//             </SelectGroup>
//           </SelectContent>
//         </Select>


//         <Select
//           value={company_id}
//           onValueChange={(value) => setCompany_id(value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Filter by Company" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {Companies?.map(({ name, id }) => {
//                 return (
//                   <SelectItem key={name} value={id}>
//                     {name}
//                   </SelectItem>
//                 );
//               })}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//         <Button
//           className="sm:w-1/2"
//           variant="destructive"
//           onClick={clearFilters}
//         >
//           Clear Filters
//         </Button>
//       </div> 

// {/* THE FILTER BAR */}
//       {loadingJobs && (
//         <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
//       )}


//       {loadingJobs === false && (
//         <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {jobs?.length ? (
//             jobs.map((job) => {
//               return (
//                 <JobCard key={job.id} job={job}
//                 savedInit={job?.saved?.length > 0 }
//                 />
//               );
//             })
//           ) : (
//             <div>No Jobs Found 😢</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobListing;






import { getJobs } from "../api/apiJobs";
import useFetch from "../hooks/use-fetch";
import { BarLoader } from "react-spinners";
import React, { useEffect, useState } from "react";

import JobCard from "../components/job-card";
import { getCompanies } from "@/api/apiCompanies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { State } from "country-state-city";

const Joblisting = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");


  // Fetch jobs with correct params
  const {
         fn: fnJobs,
         data: jobs,
         loading: loadingJobs,
         error: errorJobs,
         isLoaded, // Track if session is loaded
       } = useFetch(getJobs, {
         location,
         company_id,
         searchQuery,
       });

  // Fetch Companies
  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  console.log(jobs)

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);


  // Function to clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setCompany_id("");
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search-query");
    setSearchQuery(query);
  };


  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 bg">
        Latest Jobs
      </h1>

      {/* Search Bar */}

      <form  className="h-14 flex flex-row w-full gap-2 items-center mb-3 ">
        <Input
         onSubmit={handleSearch}
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-full flex-1 px-4 text-md "
        />
        <Button type="submit" className="h-full sm:w-28 cursor-pointer" variant="blue">
          Search
        </Button>
      </form>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Location Filter */}
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Company Filter */}
        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="sm:w-1/2" variant="destructive" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>


      {/* THE FILTER BAR */}
      {loadingJobs && (
         <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
       )}


       {loadingJobs === false && (
         <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
           {jobs?.length ? (
             jobs.map((job) => {
               return (
                 <JobCard key={job.id} job={job}
                 savedInit={job?.saved?.length > 0 }
                 />
               );
             })
           ) : (
             <div>No Jobs Found 😢</div>
           )}
       </div>
      )}
    </div>
  );
 };

export default Joblisting;
