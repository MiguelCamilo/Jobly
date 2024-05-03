"use client"
import { SignOutButton, useAuth } from "@clerk/nextjs";

import { LogOut } from "lucide-react";

import ButtonWithIcon from "@/components/ui/button-icon";

export default function AdminPortal() {
  const { sessionId } = useAuth();
  return (
    <main>
      Admin Page
      {/* {!sessionId ? (
        <p>Hello</p>
      ) : (
        <SignOutButton signOutOptions={{ sessionId }}>
          <ButtonWithIcon variants="destructive" icon={LogOut}>
            Sign out
          </ButtonWithIcon>
        </SignOutButton>
      )} */}
    </main>
  );
}
