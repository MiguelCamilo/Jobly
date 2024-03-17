import findApprovedJobs from "../../actions/find-approved-jobs";

import JobListeItem from "@/components/job-list-item";
import JobFilterSidebar from '@/components/job-filter-sidebar';

export default async function Home() {
  const jobs = await findApprovedJobs();

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Available Jobs
        </h1>
        <p className="text-muted-foreground">
          Find a job that fits your lifestyle.
        </p>
      </div>

      <section className='flex flex-col md:flex-row gap-4'>
        <JobFilterSidebar />
        <div className="space-y-4 grow">
          {jobs.map((jobs) => (
            <JobListeItem key={jobs.id} job={jobs} />
          ))}
        </div>
      </section>
    </main>
  );
}
// all nextjs components are server components by default
