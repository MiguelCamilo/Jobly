import Link from "next/link";

import findApprovedJobs from "../../actions/find-approved-jobs";
import { IJobFilterSchema } from "@/lib/schemas/validation";

import JobListItem from "@/components/job-list-item";

interface JobResultsProps {
  filterValues: IJobFilterSchema;
}

const JobResults = async ({ filterValues }: JobResultsProps) => {
  const jobs = await findApprovedJobs({ filterValues });

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link key={job?.id} href={`/jobs/${job?.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <div className="m-auto text-center">
          <p className="text-muted-foreground">
            No jobs found. Try adjusting your search filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobResults;
