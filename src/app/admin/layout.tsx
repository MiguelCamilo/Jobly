import { ClerkProvider } from "@clerk/nextjs"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Jobly Admin Portal"  
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            {children}
        </ClerkProvider>
    )
}