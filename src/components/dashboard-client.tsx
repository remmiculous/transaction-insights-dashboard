"use client";

import { TransactionList } from "@/components/transaction-list";
import { useTransactionsInfinite } from "@/hooks/useTransactionsInfinite";

export default function DashboardClient() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useTransactionsInfinite({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const transactions = data?.pages.flat() ?? [];

  return (
    <div className="px-4 pt-10">
      <TransactionList
        list={transactions}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      {isFetchingNextPage && (
        <div className="py-4 text-center">Loading more...</div>
      )}
    </div>
  );
}
