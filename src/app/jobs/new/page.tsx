import { Metadata } from "next";

import NewJobForm from "@/components/new-jobform";

export const metadata: Metadata = {
  title: "Post a New Job",
};

export default function Page() {
  return <NewJobForm />;
}
