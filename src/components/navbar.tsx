"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Plus, StepBackIcon, MenuIcon } from "lucide-react";

import { addDynamicRoutes, backButtonEnabledRoutes } from '../../routes';

import logo from "@/assets/company-logo.png";

import ButtonWithIcon from "@/components/ui/button-icon";
import {
  Menubar,
  MenubarMenu,
  MenubarContent,
  MenubarTrigger,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/menubar";


const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showbackArrow, setShowbackArrow] = useState<boolean>(false);


  useEffect(() => {
    const isBackButtonEnabledRoute = backButtonEnabledRoutes.some((path) =>
      pathname.includes(path),
    );    
    addDynamicRoutes(pathname)
    setShowbackArrow(isBackButtonEnabledRoute);
  }, [pathname]);  
  
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <div className="flex items-center gap-3">
          {showbackArrow ? (
            <ButtonWithIcon
              onClick={() => router.back()}
              variants="outline"
              icon={StepBackIcon}
            >
              Back
            </ButtonWithIcon>
          ) : (
            <Link href="/" className="flex items-center gap-3">
              {/* TODO: change company logo */}
              <Image
                src={logo}
                alt="company logo image"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold tracking-tight">Jobly</span>
            </Link>
          )}
        </div>

        {showbackArrow && (
          <Link href="/" className="flex items-center gap-3">
            {/* TODO: change company logo */}
            <Image src={logo} alt="company logo image" width={40} height={40} />
            <span className="text-xl font-bold tracking-tight">Jobly</span>
          </Link>
        )}

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <MenuIcon className="size-4 hover:cursor-pointer" />
            </MenubarTrigger>

            <MenubarContent align="end">
              <MenubarItem
                onClick={() => router.push("/jobs/new")}
                className="flex gap-2 hover:cursor-pointer"
              >
                <Plus className="size-4" />
                Post a Job
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </nav>
    </header>
  );
};

export default Navbar;
