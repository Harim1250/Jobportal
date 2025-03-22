import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useFetch from "../hooks/use-fetch";
import MDEditor from "@uiw/react-md-editor";
import { ApplyJobDrawer } from "@/components/apply-job";
import ApplicationCard from "@/components/application-card";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
    console.log("Recruiter ID:", job?.recruiter_id);
    console.log("Logged-in User ID:", user?.id);
    console.log("Full Job Data:", job);
  }, [isLoaded, id]); // ✅ Added `id` dependency

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus({ isOpen }).then(() => fnJob()); // ✅ Ensure correct API call format
  };

  if (!isLoaded || loadingJob) {
    return <BarLoader css={{ marginBottom: "1rem" }} width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl">
          {job?.title}
        </h1>
        {job?.company?.logo_url && <img src={job.company.logo_url} className="h-12" alt={job.title} />}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon /> {job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase /> {job?.application?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

      {/* ✅ Hiring Status Select */}
      {job?.recruiter_id === user?.id && (
        <Select value={job?.isOpen ? "open" : "closed"} onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
      <p className="sm:text-lg">{job?.description}</p> 

      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>

      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg"
      />

      {/* ✅ Apply Job Drawer */}
      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.application?.some((ap) => ap.candidate_id === user.id)}
        />
      )}

      {/* ✅ Applications List for Recruiter */}
      {job?.recruiter_id?.trim() === user?.id && (
        <>
          {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />} 
          <div className="flex flex-col gap-2">
            <h2 className="font-bold mb-4 text-xl ml-1">Applications</h2>
            {job?.application?.length > 0 ? (
              job.application.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))
            ) : (
              <p className="text-gray-500 ml-1">No applications found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default JobPage;
