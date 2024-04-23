"use server"

import path from 'path';
import { nanoid } from "nanoid"
import { put } from "@vercel/blob"
import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';
import { createSlug } from '@/lib/utils';
import { CreateJobSchema, ICreateJobSchema } from '@/lib/schemas/validation';

export default async function createJobPosting(values: ICreateJobSchema) {
    const {
        title,
        type,
        companyName,
        companyLogoUrl,
        locationType,
        location,
        applicationEmail,
        applicationUrl,
        salary,
        description
    } = CreateJobSchema.parse(values)

    const slug = `${createSlug(title)}-${nanoid(10)}`

    let newCompanyLogoUrl: string | undefined = undefined;

    if (companyLogoUrl) {
        const blob = await put(
            `company_logos/${slug}${path.extname(companyLogoUrl.name)}`, // creates a folder and places the image file inside and the name of file is the ${slug}
            companyLogoUrl,
            {
                access: "public",
                addRandomSuffix: false, // false because vercel adds one by default and we want to use the slug
            }
        )

        newCompanyLogoUrl = blob.url
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
                salary: parseInt(salary),
                description: description?.trim(),
                approved: true, //TODO: remove
            }
        })

        redirect("/job-submitted")
}