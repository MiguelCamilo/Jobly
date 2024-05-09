import AdminSidebar from '@/components/admin-sidebar';
import findJobBySlug from '../../../../../actions/find-job';

import JobDetails from '@/components/job-details';

interface PageProps {
    params: {
        slug: string;
    }
}

export default async function Page({ params: { slug } }: PageProps){
    const job = await findJobBySlug(slug)

    return (
        <main className="m-auto my-10 max-w-5xl flex flex-col items-center gap-5 px-3 md:flex-row md:items-start">
            <JobDetails job={job} />
            <AdminSidebar job={job} />
        </main>
    )
}