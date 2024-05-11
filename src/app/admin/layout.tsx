import { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Jobly Admin Portal",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className="min-w-[350px]">{children}</div>
    </ClerkProvider>
  );
}
