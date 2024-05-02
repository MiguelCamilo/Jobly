import { Job } from '@prisma/client';
import Image from 'next/image';

interface JobDetailsProps {
    job: Job
}

const JobDetails = ({ job: {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl
} }: JobDetailsProps) => {
    return (
        <section className="w-full grow space-y-5">
            <div className="flex items-center gap-3">
                <div>
                    {companyLogoUrl && (
                        <Image
                            src={companyLogoUrl}
                            alt='Company Logo'
                            width={100}
                            height={100}
                            className="rounded-xl"
                        />
                    )}
                </div>

                <div>

                </div>
            </div>
        </section>
    )
}

export default JobDetails;
