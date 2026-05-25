"use client";

import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function ListPagination({ page, totalPages, onPageChange, className }) {
  if (totalPages <= 1) return null;

  const goTo = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    if (next !== page) onPageChange(next);
  };

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <Pagination className={cn("mt-12", className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goTo(page - 1);
            }}
            className={cn(page <= 1 && "pointer-events-none opacity-40")}
          />
        </PaginationItem>
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === page}
              onClick={(e) => {
                e.preventDefault();
                goTo(p);
              }}
              className={cn(
                "min-w-9 rounded-full font-bold text-xs",
                p === page && "bg-brand-gold text-black border-brand-gold hover:bg-brand-gold/90"
              )}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goTo(page + 1);
            }}
            className={cn(page >= totalPages && "pointer-events-none opacity-40")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
