import Image from "next/image";
import Link from "next/link";

import { Job } from "@prisma/client";
import { relativeDate, formatCurrency } from "@/lib/utils";

import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";

import Markdown from "@/components/mark-down/mark-down";

interface JobDetailsProps {
  job: Job;
}

const JobDetails = ({
  job: {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    createdAt,
    companyLogoUrl,
  },
}: JobDetailsProps) => {
  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt="Company Logo"
            width={100}
            height={100}
            className="rounded-xl"
          />
        )}

        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  target="_blank"
                  className="text-blue-500 hover:text-blue-600 hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground">
            <div className="text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <Briefcase size={16} className="shrink-0" />
                {type}
              </p>

              <p className="flex items-center gap-1.5">
                <MapPin size={16} className="shrink-0" />
                {locationType}
              </p>

              {!location ? null : (
                <p className="flex items-center gap-1.5 ">
                  <Globe2 size={16} className="shrink-0" />
                  {location}
                </p>
              )}

              <p className="flex items-center gap-1.5 ">
                <Banknote size={16} className="shrink-0" />
                {formatCurrency(salary)}
              </p>

              <p className="flex items-center gap-1.5">
                <Clock size={16} className="shrink-0" />
                {relativeDate(createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* description is optional */}
        {description && <Markdown>{description}</Markdown>}
      </div>
    </section>
  );
};

export default JobDetails;
