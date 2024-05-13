"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { IJobFilterSchema} from "@/lib/schemas/validation";

interface IFindApprovedJobsProps {
  filterValues?: IJobFilterSchema;
  page?: number;
}

// docs for offset pagination: https://www.prisma.io/docs/orm/prisma-client/queries/pagination
export default async function findApprovedJobs({
  filterValues,
  page = 1
}: IFindApprovedJobsProps) {
  const { query, type, location, remote } = filterValues ?? {};

  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage

  // takes a two seperate words and combines them with a & symbol. Ex: "Frontend Developer" => "Frontend & Developer"
  const searchString = query?.split(" ").filter((word: string) => word.length > 0).join(" & ");

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


  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage, // take: the amount of results we want to return
    skip
  });

  const countsPromise = prisma.job.count({ where })

  // this is how we are able to make one request to db without having to await both calls
  const [jobs, totalResults] = await Promise.all([jobsPromise, countsPromise])

  return {
    jobs,
    totalResults,
    jobsPerPage
  };
}
