import * as z from "zod";

const requiredValidation = (minimumTextLenght: number, errorMessage: string) => {
    return z.string().min(minimumTextLenght, { message: errorMessage });
}  

export const CreateJobSchema = z.object({
  title: z.string(requiredValidation(5, "Title requires a minimum of 5 characters")),
  type: z.string(),
  locationType: z.string(),
});

export const JobFilterSchema = z.object({
  query: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(), // coerce will take the urlSearchParams and if the string exist it will turn it into a boolean value
});
export type JobFilterValues = z.infer<typeof JobFilterSchema>; // creates a type from the schema
// export type CreateJobSchema = z.infer<typeof CreateJobSchema>
