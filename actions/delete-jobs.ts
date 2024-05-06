"use server";

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { del } from '@vercel/blob';
import { currentUser } from "@clerk/nextjs";


import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";


type FormState = { error?: string } | undefined;

export async function deleteJobSubmission(
  formData: FormData,
): Promise<FormState> {
  try {
    const jobId = parseInt(formData.get("jobId") as string);

    const user = await currentUser();
    if (!user || !isAdmin(user)) {
      throw new Error("Not Authorized");
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (job?.companyLogoUrl) {
        await del(job.companyLogoUrl)
    }

    await prisma.job.delete({
        where: {
          id: jobId,
        },
      });

      revalidatePath("/");

  } catch (error) {
    let message = "Unexpected error occured when deleting job.";
    if (error instanceof Error) {
      message = error.message;
    }

    return { error: message };
  }

  redirect("/admin"); // belongs outside of the try catch due to nextjs throwing an error when redirect is called
}
