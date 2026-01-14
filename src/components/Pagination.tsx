"use client";
import React from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

//this is for the project page so that 10 projects show at a time for now. you can go back and fourth between them or skip to number pages 
type PaginationProps = {
  page: number;
  totalPages: number;
  totalResults: number;
  q?: string;
};

export default function Pagination({ page, totalPages, totalResults, q = "" }: PaginationProps) {
  const qp = q ? `&q=${encodeURIComponent(q)}` : "";

  const createPageNumbers = () => {
    const pages = [];
    pages.push(1);//shows first page first
    for (let p = page - 1; p <= page + 1; p++) {
      if (p > 1 && p < totalPages) {
        pages.push(p);
      }
    }
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return [...new Set(pages)].sort((a, b) => a - b);
  };

  const pages = createPageNumbers();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
      <p className="hidden md:block text-sm text-slate-900 mb-3 sm:mb-0">
        Showing{" "}<strong>{(page - 1) * 10 + 1}</strong>{" "} to{" "}<strong> {Math.min(page * 10, totalResults)} </strong>{" "} of <strong>{totalResults}</strong> results
      </p>

      <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs dark:shadow-none">
        <Link  href={`/projects?page=${Math.max(page - 1, 1)}${qp}`}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:inset-ring-gray-700 dark:hover:bg-white/5" >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" />
        </Link>
        {pages.map((p, i) => {
          const showEllipsis = i > 0 && p - pages[i - 1] > 1;
          return (
            <React.Fragment key={p}>
              {showEllipsis && (
                <span key={`dots-${p}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 inset-ring inset-ring-gray-300 dark:inset-ring-gray-700">
                  …
                </span>
              )}

              <Link key={p} href={`/projects?page=${p}${qp}`} aria-current={p === page ? "page" : undefined}
                className={ p === page ? "relative z-10 inline-flex items-center bg-sky-600 px-4 py-2 text-sm font-semibold text-white dark:bg-sky-600"
                : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:text-gray-200 dark:inset-ring-gray-700 dark:hover:bg-white/5" }>
                {p}
              </Link>
            </React.Fragment>
          );
        })}

        <Link href={`/projects?page=${Math.min(page + 1, totalPages)}${qp}`}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:inset-ring-gray-700 dark:hover:bg-white/5">
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
      </nav>
    </div>
  );
}
