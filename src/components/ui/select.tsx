import { cn } from "@/lib/utils";

const Select = (props: React.HTMLProps<HTMLSelectElement>) => {
  return (
    <select
      className={cn(
        "h-10  appearance-none truncate  rounded-md border border-input bg-background py-2 pl-3 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        props.className,
      )}
    ></select>
  );
};

export default Select;
