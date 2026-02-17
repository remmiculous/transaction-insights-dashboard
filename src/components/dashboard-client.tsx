"use client";

import { TransactionList } from "@/components/transaction-list";
import { Spinner } from "@/components/ui/spinner";
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

  if (isLoading)
    return (
      <div className="mx-auto h-max w-max px-4 py-10">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="mx-auto h-max w-max px-4 py-10">
        <p>Error: {error.message}</p>
      </div>
    );

  const transactions = data?.pages.flat() ?? [];

  return (
    <div className="px-4 py-10">
      <TransactionList
        list={transactions}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
