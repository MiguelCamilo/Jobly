'use server'

import { jobFilterSchema } from '@/lib/schemas/validation';

export default async function filterJobs(formData: FormData) {
    const values = Object.fromEntries(formData.entries()); // returns an object created by key-value

    const { query, type, location, remote } = jobFilterSchema.parse(values);
}