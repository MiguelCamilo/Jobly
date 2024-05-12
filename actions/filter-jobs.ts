'use server'

import * as z from 'zod';

import { JobFilterSchema } from '@/lib/schemas/validation';
import { redirect } from 'next/navigation';

export default async function filterJobs(values: z.infer<typeof JobFilterSchema>) {

    const validatedFields = JobFilterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: validatedFields.error };
    }

    const { query, type, location, remote } = validatedFields.data;

    const searchParams = new URLSearchParams({
        ...(query && { query: query.trim() }), // if query is defined then add it to the searchParams
        ...(type && { type }),
        ...(location && { location }),
        ...(remote && { remote: "true" }), // todo: remote boolean not adding to url
    });

    return redirect(`/?${searchParams.toString()}`)
}


