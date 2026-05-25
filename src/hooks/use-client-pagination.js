"use client";

import { useEffect, useMemo, useState } from "react";

export function useClientPagination(items, pageSize = 12) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const safePage = Math.min(page, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, safePage, pageSize]);

  const setPageSafe = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return {
    page: safePage,
    totalPages,
    paginatedItems,
    setPage: setPageSafe,
    pageSize,
    totalCount: items.length,
  };
}
