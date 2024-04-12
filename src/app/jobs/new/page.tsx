import { Metadata } from 'next';

import NewJobForm from './new-jobform';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
    title: "Post a New Job"
}

export default function Page() {
    return (
        <>
            <Navbar  showbackArrow />
            <NewJobForm />
        </>
    )
}