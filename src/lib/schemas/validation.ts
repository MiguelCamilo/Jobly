import * as z from "zod";

import { JOB_TYPES, LOCATION_TYPES } from "../constants/job-types";
import { LOCATION_TYPES_ENUM } from '../enums/enums';

import {
  requiredValidation,
  numericValidation,
  companyLogoUrlValidation,
} from "./schema-validations/schema-validation";

const ApplicationSchema = z.object({
    // .or(z.literal("")) is used to allow an empty string but still allowing .email() to validate
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).email().optional().or(z.literal("")),
}).refine(data => data.applicationEmail || data.applicationUrl, {
    message: "Either an email or a URL is required.",
    path: ["applicationEmail"], // if this error is thrown, it will be shown on the applicationEmail field
});

const LocationSchema = z.object({
    locationType: requiredValidation.refine(
        (value) => LOCATION_TYPES.includes(value),
        "Invalid Location Type."
    ),
    location: z.string().optional(), 
}).refine((data) => {
    !data.locationType || data.locationType === LOCATION_TYPES_ENUM.REMOTE || data.location, {
        message: "Location type is required",
        path: [location]
    }
})

export const CreateJobSchema = z.object({
  title: requiredValidation.max(100),
  type: requiredValidation.refine(
    (types) => JOB_TYPES.includes(types),
    "Invalid Job Type.",
  ),
  companyName: requiredValidation.max(100),
  companyLogoUrl: companyLogoUrlValidation,
  description: z.string().max(5000).optional(),
  salary: numericValidation.max(9,
    "Salary value can't be longer than 9 digits.",
  ),
})
// merges another schema but allows for seperate validation errors to be thrown
.and(ApplicationSchema)
.and(LocationSchema)

export const JobFilterSchema = z.object({
  query: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(), // coerce will take the urlSearchParams and if the string exist it will turn it into a boolean value
});
export type IJobFilterValues = z.infer<typeof JobFilterSchema>; // creates a type from the schema
export type ICreateJobSchema = z.infer<typeof CreateJobSchema>
