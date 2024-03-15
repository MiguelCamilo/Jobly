import findApprovedJobs from '../../actions/find-approved-jobs';

import JobListeItem from '@/components/job-list-item';

export default async function Home() {
  const jobs = await findApprovedJobs();

  return (
    <main>
      {jobs.map((jobs) => (
        <JobListeItem key={jobs.id} job={jobs} />      
      ))}
    </main>
  );
}

// all nextjs components are server components by default