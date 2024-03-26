import { JobFilterValues } from "@/lib/schemas/validation";

import JobFilterSidebar from "@/components/job-filter-sidebar";
import JobResults from "@/components/job-results";

interface PageProps {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export default async function Home({
  searchParams: { query, type, location, remote },
}: PageProps) {

  const filterValues: JobFilterValues = {
    query,
    type,
    location,
    remote: remote === "true",
  };
  
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

      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
