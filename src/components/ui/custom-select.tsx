import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const CustomSelect = React.forwardRef<HTMLSelectElement, React.HTMLProps<HTMLSelectElement>>(({ className, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "bg-backgroundn  h-10 w-full appearance-none truncate rounded-md border border-input pl-3 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        // props should be spread within the html tag so we can pass id and name without
        // overiding the hardcoded className by the props className
        {...props}
      />
      <ChevronDown className="absolute right-3 top-3 size-4 opacity-50" />
    </div>
  );
});

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
