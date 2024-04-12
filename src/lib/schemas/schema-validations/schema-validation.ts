import * as z from 'zod'

export const requiredValidation = z
  .string()
  .min(1, "Minimum of one character required.");

export const numericValidation  = requiredValidation.regex(/^\d+$/, "Value must me a number.")

export const companyLogoUrlValidation = 
  z.custom<File | undefined>()
  .refine((file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Invalid file type. Please upload an image file."
    )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2; // max size of 2MB
  }, "File must be less than 2MB.");
