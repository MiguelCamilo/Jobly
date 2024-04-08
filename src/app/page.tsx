import { IJobFilterValues } from "@/lib/schemas/validation";

import JobResults from "@/components/job-results";
import JobFilterSidebar from "@/components/job-filter-sidebar";
import { Metadata } from 'next';

interface PageProps {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

const createTitleFromFilters = ({ query, type, location }: IJobFilterValues) => {
  const titlePrefix = query ? `${query} jobs` : type ? `${type} Jobs` : "Available Jobs"
  const titleSuffix = location ? ` in ${location}` : ""

  return `${titlePrefix}${titleSuffix}`
}


export function generateMetadata ({ searchParams: { query, type, location, remote } }: PageProps): Metadata {
  return {
    title: createTitleFromFilters({
      query,
      type,
      location,
      remote: remote === "true",
    })
  }
}

export default async function Home({
  searchParams: { query, type, location, remote },
}: PageProps) {

  const filterValues: IJobFilterValues = {
    query,
    type,
    location,
    remote: remote === "true",
  };

  
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {createTitleFromFilters(filterValues)}
        </h1>
        <p className="text-muted-foreground">
          Find a job that fits your lifestyle.
        </p>
      </div>

      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
