"use client"
import { useRouter } from 'next/navigation';

import { BriefcaseBusiness, CircleCheckBig, Plus } from "lucide-react";

import ButtonWithIcon from '@/components/ui/button-icon';

export default function JobSubmittedPage() {
    const router = useRouter();
  return (
    <main className="m-auto my-10 flex min-h-80 max-w-5xl flex-col items-center justify-center space-y-5 px-3 text-center">
      <CircleCheckBig size={70} color="green" />
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Job Submitted
      </h1>
      <p className="text-muted-foreground">
        Your job posting has been submitted and is pending approval from our
        team.
      </p>
      <div className="flex flex-row space-x-4">
        <ButtonWithIcon icon={Plus} variants="default" onClick={() => router.replace("/jobs/new")}>
          Post Another Job
        </ButtonWithIcon>
        <ButtonWithIcon icon={BriefcaseBusiness} variants="outline" onClick={() => router.replace("/")}>
          View Other Jobs
        </ButtonWithIcon>
      </div>
    </main>
  );
}
