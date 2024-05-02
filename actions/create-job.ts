"use server";

import prisma from "@/lib/prisma";
import { createSlug } from "@/lib/utils";
import { CreateJobSchema } from '@/lib/schemas/validation';
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import path from "path";

export async function createJobPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    type,
    companyName,
    companyLogoUrl,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = CreateJobSchema.parse(values);

  const slug = `${createSlug(title)}-${nanoid(10)}`;

  let newCompanyLogoUrl: string | undefined = undefined;

  if (companyLogoUrl) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogoUrl.name)}`, // creates a folder and places the image file inside and the name of file is the ${slug}
      companyLogoUrl,
      {
        access: "public",
        addRandomSuffix: false, // false because vercel adds one by default and we want to use the slug
      },
    );

    newCompanyLogoUrl = blob.url;
  }

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl: newCompanyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),      
    },
  });

  redirect("/job-submitted");
}
