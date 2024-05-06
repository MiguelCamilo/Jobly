import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Jobly Admin Portal"  
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-w-[350px]">
            {children}
        </div>
    )
}