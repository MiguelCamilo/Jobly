import prisma from "@/lib/prisma";

export default async function findUnapprovedJobs() {
  try {
    const unApprovedJobs = await prisma.job.findMany({
      where: {
        approved: false,
      },
    });

    return unApprovedJobs;
  } catch (error) {
    console.error(error);
  }
}
