"use client" 

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation';

import { Job } from "@prisma/client";
import { relativeDate, formatCurrency } from "@/lib/utils";

import {
  Banknote,
  Briefcase,
  Clock,
  Globe2,
  MapPin,
  Link as LinkIcon
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';
import Markdown from "@/components/mark-down/mark-down";
import { useEffect, useState } from 'react';

interface JobDetailsProps {
  job: Job;
  applicationLink?: string;
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
  applicationLink,
}: JobDetailsProps) => {
  const { toast } = useToast()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [urlPathname, setUrlPathname] = useState<string>()

  useEffect(() => {
    const url = `${window.location.origin}${pathname}?${searchParams}`
    setUrlPathname(url)
  }, [pathname, searchParams])

  const createUrlLink = (url: string | undefined) => {    
    navigator.clipboard.writeText(url ?? "")

    toast({
      title: "Job copied to clipboard",
      description: "Feel free to share this job!",
      style: {
        color: "white",
        backgroundColor: "green"        
      }
      
    })
  }
  
  return (
    <section className="w-full grow space-y-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold sm:text-2xl sm:font-semibold">
          {title}
        </h1>

        <div className="flex justify-end gap-2">
          <Button className="hidden w-full sm:block md:w-full bg-blue-500 hover:bg-blue-600">
            <a href={applicationLink}>Apply Now</a>
          </Button>

          <Button onClick={() => { createUrlLink(urlPathname) }} variant="secondary" className="hidden w-10 sm:flex delay-100 hover:bg-primary/20">
            <span>
              <LinkIcon size={20} />
            </span>
          </Button>
        </div>
      </div>

      <div>
        <div className="ml-5 flex flex-row gap-5">
          {companyLogoUrl && (
            <Image
              src={companyLogoUrl}
              alt="Company Logo"
              width={100}
              height={100}
              className="hidden rounded-xl md:flex"
            />
          )}
          <div className="flex flex-col space-y-2">
            <div>
              {applicationUrl ? (
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href={new URL(applicationUrl).origin}
                    target="_blank"
                    className="font-medium text-blue-500 hover:text-blue-600 hover:underline"
                  >
                    {companyName}
                  </Link>
                  {!location ? null : (
                    <p className="flex items-center gap-1.5 ">
                      <Globe2 size={16} className="shrink-0" />
                      {location}
                    </p>
                  )}
                </div>
              ) : (
                <span className="font-medium text-blue-500 hover:text-blue-600 hover:underline">
                  {companyName}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-1.5 sm:flex sm:grid-cols-none">
              <Badge variant="secondary" className="gap-1.5">
                <Briefcase size={16} className="shrink-0" />
                {type}
              </Badge>

              <Badge variant="secondary" className="gap-1.5">
                <MapPin size={16} className="shrink-0" />
                {locationType}
              </Badge>

              <Badge variant="secondary" className="gap-1.5">
                <Banknote size={16} className="shrink-0" />
                {formatCurrency(salary)}
              </Badge>

              <Badge variant="secondary" className="gap-1.5">
                <Clock size={16} className="shrink-0" />
                {relativeDate(createdAt)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* description is optional */}
        {description && <Markdown>{description}</Markdown>}
      </div>
      <Button asChild className="flex w-full sm:hidden md:w-1/5">
        <a href={applicationLink}>Apply Now</a>
      </Button>
    </section>
  );
};

export default JobDetails;
