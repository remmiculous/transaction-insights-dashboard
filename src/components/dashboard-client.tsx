"use client";

import { TransactionList } from "@/components/transaction-list";
import { Button } from "@/components/ui/button";
import { useTransactionsInfinite } from "@/hooks/useTransactionsInfinite";

export default function DashboardClient() {
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useTransactionsInfinite({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const transactions = data?.pages.flat() ?? [];

  return (
    <div className="px-4 pt-10">
      <TransactionList list={transactions} />

      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>Load more</Button>
      )}
    </div>
  );
}
