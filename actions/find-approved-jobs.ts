"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { JobFilterValues } from "@/lib/schemas/validation";

interface IFindApprovedJobsProps {
  filterValues: JobFilterValues;
}

export default async function findApprovedJobs({
  filterValues,
}: IFindApprovedJobsProps) {
  const { query, type, location, remote } = filterValues;

  // takes a two seperate words and combines them with a & symbol. Ex: "Frontend Developer" => "Frontend & Developer"
  const searchString = query
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return jobs;
}
