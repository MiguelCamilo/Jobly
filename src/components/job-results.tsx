import findApprovedJobs from "../../actions/find-approved-jobs";
import { JobFilterValues } from "@/lib/schemas/validation";

import JobListeItem from "@/components/job-list-item";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

const JobResults = async ({ filterValues }: JobResultsProps) => {
  const jobs = await findApprovedJobs({ filterValues });

  return (
    <div className="grow space-y-4">
      {jobs.map((jobs) => (
        <JobListeItem key={jobs?.id} job={jobs} />
      ))}
      {jobs.length === 0 && (
        <div className="text-center m-auto">
          <p className="text-muted-foreground">No jobs found. Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
};

export default JobResults;
