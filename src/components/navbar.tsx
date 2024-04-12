"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

import { Plus } from "lucide-react";
import { StepBackIcon } from "lucide-react";

import logo from "@/assets/company-logo.png";

import ButtonWithIcon from "@/components/ui/button-icon";

interface NavbarProps {
  hideButton?: boolean;
  showbackArrow?: boolean;
}

const Navbar = ({ hideButton, showbackArrow }: NavbarProps) => {
  const router = useRouter();
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <div className="flex items-center gap-3">
          {showbackArrow && (
            <ButtonWithIcon onClick={() => router.back()} variants="outline" icon={StepBackIcon}>Back</ButtonWithIcon>
          )}
          <Link href="/" className="flex items-center gap-3">
            {/* TODO: change company logo */}
            <Image src={logo} alt="company logo image" width={40} height={40} />
            <span className="text-xl font-bold tracking-tight">Jobly</span>
          </Link>
        </div>
        {hideButton ? null : (
          <ButtonWithIcon icon={Plus}>
            <Link href="/jobs/new">Post a Job</Link>
          </ButtonWithIcon>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
