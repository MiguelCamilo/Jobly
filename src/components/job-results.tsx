import Link from "next/link";

import findApprovedJobs from "../../actions/find-approved-jobs";
import { IJobFilterSchema } from "@/lib/schemas/validation";

import JobListItem from "@/components/job-list-item";
import Pagination from '@/components/pagination';

interface JobResultsProps {
  filterValues: IJobFilterSchema;
  page?: number;
}

const JobResults = async ({ filterValues, page = 1 }: JobResultsProps) => {
  const approvedJobs = await findApprovedJobs({ filterValues, page });

  return (
    <div className="grow space-y-4">
      {approvedJobs?.jobs.map((job) => (
        <Link key={job?.id} href={`/jobs/${job?.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {approvedJobs?.jobs.length === 0 && (
        <div className="m-auto text-center">
          <p className="text-muted-foreground">
            No jobs found. Try adjusting your search filters.
          </p>
        </div>
      )}
      {approvedJobs?.jobs.length > 0 && (
        <Pagination 
          currentPage={page} 
          totalPages={Math.ceil(approvedJobs?.totalResults / approvedJobs?.jobsPerPage)} 
          filterValues={filterValues}
        />
      )}
    </div>
  );
};

export default JobResults;
