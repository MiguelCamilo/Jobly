"use server"
/**
 * Retrieves all approved job locations from the database.
 * @returns {Promise<string[]>} A promise that resolves to an array of unique job locations.
 */
import prisma from '@/lib/prisma';


export default async function findAllJobLocations() {
    const locations = await prisma.job.findMany({
        where: { approved: true },
        select: { location: true},
        distinct: ["location"]
    })

    return locations
}