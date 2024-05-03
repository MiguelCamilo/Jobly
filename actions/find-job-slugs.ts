"use server"
import prisma from "@/lib/prisma";

export default async function findJobSlugs() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: { slug: true },
  });

  return jobs.map(({ slug }) => slug); // returns an array of strings
}
