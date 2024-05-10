"use client";

import Link from "next/link";

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from "@/lib/utils";
import { IJobFilterSchema } from "@/lib/schemas/validation";
import LoadingButtonText from '@/components/ui/loading-button-text';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: IJobFilterSchema;
}

const Pagination = ({
  currentPage,
  totalPages,
  filterValues,
}: PaginationProps) => {
  const { query, type, location, remote } = filterValues;

  const generatePageLink = (page: number) => {
    const searchParams = new URLSearchParams({
      ...(query && { query }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  };

  return (
    // TODO: update component to use shadcn pagination components
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn("flex items-center gap-2 font-semibold", currentPage <= 1 && "invisible")}
      >
        <LoadingButtonText className="flex items-center gap-2 border border-primary text-primary rounded-md px-1.5 py-1">
            <ChevronLeft size={16} />
            Previous Page
        </LoadingButtonText>
      </Link>

        <span className="font-semibold">Page {currentPage} of {totalPages}</span>

      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn("flex items-center gap-2 font-semibold", currentPage >= totalPages && "invisible")}
      >
        <LoadingButtonText className="flex items-center gap-2 border border-primary text-primary rounded-md px-1.5 py-1">
            Next Page
            <ChevronRight size={16} />
        </LoadingButtonText>
      </Link>
    </div>
  );
};

export default Pagination;
