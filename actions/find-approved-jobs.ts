'use server'

import prisma from '@/lib/prisma';


export default async function findApprovedJobs() {
    
    const jobs = await prisma.job.findMany({
        where: { approved: true }, // only show approved jobs
        orderBy: { createdAt: 'desc' }
    })
    return jobs;
}