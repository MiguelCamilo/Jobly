"use server"

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'
import { isAdmin } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs'

type FormState = { error?: string } | undefined

export async function approvedJobSubission(formData: FormData): Promise<FormState> {
    try {
        const jobId = parseInt(formData.get("jobId") as string)

        const user = await currentUser()
        if (!user || !isAdmin(user)) {
            throw new Error("Not Authorized")
        }
        
        await prisma.job.update({
            where: {
                id: jobId
            },
            data: {
                approved: true
            }
        })

        revalidatePath("/") // revalidates the page

    } catch (error) {
        let message = "Unexpected error when approving job."
        if (error instanceof Error) {
            message = error.message
        }
        return { error: message }
    }
}

