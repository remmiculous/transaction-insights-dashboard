import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardClient from "@/components/dashboard-client";
import { queryKeys } from "@/lib/query-keys";
import { fetchTransactions } from "@/services/transactions.api";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeys.transactions.infinite({}),
    queryFn: ({ pageParam = 1 }) => fetchTransactions({ pageParam }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
}
