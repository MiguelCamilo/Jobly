"use server"; 

import { notFound } from 'next/navigation';

import prisma from '@/lib/prisma';

export default async function findJobBySlug(slug: string) {
    const job = await prisma.job.findUnique({
        where: { slug },
    })

    if (!job) {
        return notFound();
    }

    return job;
}
