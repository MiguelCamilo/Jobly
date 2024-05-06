import { cache } from "react";
import { Metadata } from "next";

import findJobBySlug from '../../../../actions/find-job';
import findJobSlugs from '../../../../actions/find-job-slugs';

import JobDetails from "@/components/job-details";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

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
  const staticParams = await findJobSlugs()
  return staticParams
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

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email.");
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-[5xl] flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobDetails job={job} />
      <aside className="flex w-full items-center justify-center">
        <Button asChild>
          <a href={applicationLink} className="w-full md:w-fit">
            Apply Now
          </a>
        </Button>
      </aside>
    </main>
  );
}
