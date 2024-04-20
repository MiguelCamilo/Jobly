import { Metadata } from "next";

import NewJobForm from "@/components/new-jobform";
import { Suspense } from 'react';
import JobFormLoadingAnimation from '@/components/job-form-loading-animation';

export const metadata: Metadata = {
  title: "Post a New Job",
};

export default function Page() {
  return (
    <Suspense fallback={<JobFormLoadingAnimation />}>
      <NewJobForm />
    </Suspense>
  )
}
