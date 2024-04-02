import * as React from "react";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

import { Button } from "./button";

const ButtonWithIcon = React.forwardRef<
  HTMLButtonElement,
  React.HTMLProps<HTMLButtonElement>
>(({ className, children }, ref) => {
  return (
    <Button ref={ref} className={cn(className)}>
      <Plus height={15} width={15} className='mr-2' />
      {children}
    </Button>
  );
});

ButtonWithIcon.displayName = "ButtonWithIcon";

export default ButtonWithIcon;
