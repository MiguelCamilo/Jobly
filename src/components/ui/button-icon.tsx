import * as React from "react";

import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';

import { Button } from "./button";
 
interface ButtonWithIconProps {
  icon: LucideIcon;
}

const ButtonWithIcon = React.forwardRef<
  HTMLButtonElement,
  React.HTMLProps<HTMLButtonElement> & ButtonWithIconProps
>(({ className, children, icon: Icon }, ref) => {
  return (
    <Button ref={ref} className={cn(className)}>
      <Icon height={16} width={16} className='mr-2' />
      {children}
    </Button>
  );
});

ButtonWithIcon.displayName = "ButtonWithIcon";

export default ButtonWithIcon;
