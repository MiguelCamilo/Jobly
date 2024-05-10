"use client";

import { useFormState } from "react-dom";
import { Job, JobStatus } from "@prisma/client";

import { approvedJobSubission } from "../../actions/approve-jobs";
import { declineJobSubmission } from '../../actions/decline-jobs';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import LoadingButtonText from "@/components/ui/loading-button-text";
interface AdminButtonProps {
  jobId: number;
  jobStatus?: JobStatus;
}

const ApprovedSubmissionButton = ({ jobId, jobStatus }: AdminButtonProps) => {
  const [formState, formAction] = useFormState(approvedJobSubission, undefined);
  // using the useFormState hook allows for progressive enhancement
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} readOnly />
      {formState?.error && <FormError message={formState?.error} />}
      <Button
        variant={"default"}
        size={"icon"}
        className="w-full bg-green-500 px-5 hover:bg-green-600 md:px-0"
        disabled={jobStatus === JobStatus.APPROVED}
      >
        <LoadingButtonText>Approve</LoadingButtonText>
      </Button>
    </form>
  );
};

const DeclineSubmissionButton = ({ jobId, jobStatus }: AdminButtonProps) => {
  // TODO: add modal when declining explaining reason why
  const [formState, formAction] = useFormState(declineJobSubmission, undefined);
  // using the useFormState hook allows for progressive enhancement
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} readOnly />
      {formState?.error && <FormError message={formState?.error} />}
      <Button
        variant={"default"}
        size={"icon"}
        className="w-full bg-red-500 px-5 hover:bg-red-600 md:px-0"
        disabled={jobStatus === JobStatus.DECLINED}
      >
        <LoadingButtonText>Decline</LoadingButtonText>
      </Button>
    </form>
  );
};

interface AdminSidebarProps {
  job: Job;
}

const AdminSidebar = ({ job }: AdminSidebarProps) => {

  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      <Badge variant={JobStatus[job?.status]} className="hidden w-full px-5 md:flex md:px-0">
        <span className="w-full text-center">{job?.status}</span>
      </Badge>
          <ApprovedSubmissionButton jobId={job?.id} jobStatus={job?.status} />
          <DeclineSubmissionButton jobId={job?.id} jobStatus={job?.status} />

    </aside>
  );
};

export default AdminSidebar;
