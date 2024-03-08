import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

export default forwardRef<
  HTMLSelectElement,
  React.HTMLProps<HTMLSelectElement>
>(function Select({ className, ...props }, ref) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-9 w-full dark:text-gray-400 appearance-none truncate bg-transparent rounded border border-gray-500 focus:ring-0 pl-3 pr-8 text-sm ring-offset-sky-600",
          className
        )}
        ref={ref}
        {...props}
      />
      <ChevronDown className="absolute right-3 dark:text-gray-300 top-3 h-4 w-4 opacity-50" />
    </div>
  );
});
