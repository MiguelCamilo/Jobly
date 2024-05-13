import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import findApprovedJobs from "../../../../actions/find-approved-jobs";
import findJobBySlug from "../../../../actions/find-job";
import findJobSlugs from "../../../../actions/find-job-slugs";

import JobListItem from "@/components/job-list-item";
import JobDetails from "@/components/job-details";

interface PageProps {
  params: {
    slug: string;
  };
}

const getCachedJob = cache(async (slug: string) => {
  // cached call since metadata and page have to request job data twice
  return await findJobBySlug(slug);
});

// will cache slug pages for faster load times
export async function generateStaticParams() {
  const staticParams = await findJobSlugs();
  return staticParams;
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getCachedJob(slug);

  return {
    title: job.title,
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getCachedJob(slug);
  const approvedJobs = await findApprovedJobs({});

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email.");
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-7xl flex-col items-center gap-5 px-10 md:flex-row md:items-start lg:px-3">
      <JobDetails job={job} applicationLink={applicationLink} />
      <aside className="flex w-1/2 flex-col items-center justify-center">
        {approvedJobs?.jobs.map((job) => (
          <Link key={job?.id} href={`/jobs/${job?.slug}`} className="block">
            {/* <JobListItem job={job} /> */}
          </Link>
        ))}
      </aside>
    </main>
  );
}
