import prisma from "@/lib/prisma";

export default async function findUnapprovedJobs() {
  try {
    const unApprovedJobs = await prisma.job.findMany({
      where: {
        approved: false,
        status: "PENDING"
      },
    });

    return unApprovedJobs;
  } catch (error) {
    console.error(error);
  }
}
