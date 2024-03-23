'use server'

import { jobFilterSchema } from '@/lib/schemas/validation';
import { redirect } from 'next/navigation';

export default async function filterJobs(formData: FormData) {
    const values = Object.fromEntries(formData.entries()); // returns an object created by key-value

    const { query, type, location, remote } = jobFilterSchema.parse(values);

    const searchParams = new URLSearchParams({
        ...(query && { query: query.trim() }), // if query is defined then add it to the searchParams
        ...(type && { type }),
        ...(location && { location }),
        ...(remote && { remote: "true" }), 
    });

    redirect(`/?${searchParams.toString()}`)
}


