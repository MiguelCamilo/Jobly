import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import findUnapprovedJobs from "../../../actions/find-unapproved-jobs";

import JobListItem from "@/components/job-list-item";

export default async function AdminPortal() {
  //   const { sessionId } = useAuth();
  const unApprovedJobs = await findUnapprovedJobs();

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="mx-4 flex border-b border-black">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Admin Dashboard
          </h1>
          <UserButton
            showName
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "border-2 border-blue-400 h-10 w-10",                
              },
            }}
          />
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved Jobs</h2>
        {unApprovedJobs?.map((job) => (
          <Link key={job?.id} href={`/admin/jobs/${job?.slug}`}>
            <JobListItem job={job} />
          </Link>
        ))}
        {unApprovedJobs?.length === 0 && (
            <p className="text-muted-foreground text-2xl">
                No jobs awaiting approval
            </p>
        )}
      </section>
    </main>
  );
}
