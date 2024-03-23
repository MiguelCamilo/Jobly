import findApprovedJobs from "../../actions/find-approved-jobs";
import { IJobFilterValuesSchema } from "@/lib/schemas/validation";

import JobListeItem from "@/components/job-list-item";

interface JobResultsProps {
  filterValues: IJobFilterValuesSchema;
}

const JobResults = async ({ filterValues }: JobResultsProps) => {

  const jobs = await findApprovedJobs({ filterValues });

  return (
    <div className="grow space-y-4">
      {jobs.length === 0 ? (
          <div className='flex justify-center items-center h-full w-full'>
            <h1>Couldnt find any jobs with the search</h1>
          </div>
      ) : (
        <>
          {jobs.map((jobs) => (
            <JobListeItem key={jobs?.id} job={jobs} />
          ))}
        </>
      )}
    </div>
  );
};

export default JobResults;
