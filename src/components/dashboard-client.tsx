"use client";

import { useState } from "react";
import { TransactionList } from "@/components/transaction-list";
import { TransactionFiltersComponent } from "@/components/transaction-filters";
import { Spinner } from "@/components/ui/spinner";
import { useTransactionsInfinite } from "@/hooks/useTransactionsInfinite";
import type { TransactionFilters } from "@/types/transaction-filters";

export default function DashboardClient() {
  const [filters, setFilters] = useState<TransactionFilters>({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useTransactionsInfinite(filters);

  if (error)
    return (
      <div className="mx-auto h-max w-max px-4 py-10">
        <p>Error: {error.message}</p>
      </div>
    );

  const transactions = data?.pages.flat() ?? [];

  return (
    <div className="space-y-6 px-4 py-10">
      <TransactionFiltersComponent
        currentFilters={filters}
        onFiltersChange={setFilters}
      />

      <TransactionList
        list={transactions}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
      />
    </div>
  );
}
