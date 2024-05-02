import { cache } from 'react'
import { Metadata } from 'next'

import findJob from '../../../../actions/find-job'

import JobDetails from '@/components/job-details'

interface PageProps {
    params: {
        slug: string
    }
}

const getCachedJob = cache(async (slug: string) => { // cached call since metadata and page have to request job data twice
    return await findJob(slug)
})

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
    const job = await getCachedJob(slug)

    return {
        title: job.title,
    }
}

export default async function Page({ params: { slug } }: PageProps) {
    const job = await getCachedJob(slug)
    
    return (
        <main className="max-w-[5xl] m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start">
            <JobDetails job={job} />
        </main>
    )
}