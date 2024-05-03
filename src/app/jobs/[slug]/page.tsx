import { cache } from "react";
import { Metadata } from "next";

import findJob from "../../../../actions/find-job";

import JobDetails from "@/components/job-details";
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: {
    slug: string;
  };
}

const getCachedJob = cache(async (slug: string) => {
  // cached call since metadata and page have to request job data twice
  return await findJob(slug);
});

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

  const { applicationEmail, applicationUrl } = job

  const applicationLink = applicationEmail ? `mailto:${applicationEmail}` : applicationUrl;

  if(!applicationLink) {
    console.error("Job has no application link or email.")
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-[5xl] flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobDetails job={job} />

      <aside>
        <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply Now
          </a>
        </Button>
      </aside>
    </main>
  );
}
