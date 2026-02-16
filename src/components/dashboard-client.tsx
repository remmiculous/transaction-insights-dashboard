"use client";

import { Button } from "@/components/ui/button";
import { useTransactionsInfinite } from "@/hooks/useTransactionsInfinite";

export default function DashboardClient() {
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useTransactionsInfinite({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const transactions = data?.pages.flat() ?? [];

  return (
    <div>
      {transactions.map((tx) => (
        <div key={tx.id}>{tx.name}</div>
      ))}

      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>Load more</Button>
      )}
    </div>
  );
}
