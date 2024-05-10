"use server";

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { del } from '@vercel/blob';
import { currentUser } from "@clerk/nextjs";


import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";


type FormState = { error?: string } | undefined;

// TODO: update from delete to decline
export async function declineJobSubmission(
  prevState: FormState, // passed to satisfy useFormState error
  formData: FormData,
): Promise<FormState> {
  try {
    const jobId = parseInt(formData.get("jobId") as string);

    const user = await currentUser();
    if (!user || !isAdmin(user)) {
      throw new Error("Not Authorized");
    }

    await prisma.job.update({
      where: {
        id: jobId
      },
      data: {
        status: "DECLINED",
        approved: false,
      }
    })


      revalidatePath("/");

  } catch (error) {
    let message = "Unexpected error occured when declining this job.";
    if (error instanceof Error) {
      message = error.message;
    }

    return { error: message };
  }

  // redirect("/admin"); // belongs outside of the try catch due to nextjs throwing an error when redirect is called
}
