import * as z from 'zod';

export const JobFilterSchema = z.object({
    query: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    remote: z.coerce.boolean().optional() // coerce will take the urlSearchParams and if the string exist it will turn it into a boolean value
})
export type JobFilterValues = z.infer<typeof JobFilterSchema> // creates a type from the schema
