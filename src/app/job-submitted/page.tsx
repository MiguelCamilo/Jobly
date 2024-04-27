import { CircleCheckBig } from "lucide-react";

export default function JobSubmittedPage() {
  return (
    <main className="m-auto my-10 flex min-h-80 max-w-5xl flex-col items-center justify-center space-y-5 px-3 text-center">
      <CircleCheckBig size={70} color='green' />
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Job Submitted
      </h1>
      <p className="text-muted-foreground">
        Your job posting has been submitted and is pending approval from our
        team.
      </p>
    </main>
  );
}
