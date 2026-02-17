import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { fetchTransactions } from "@/services/transactions.api";
import type { TransactionFilters } from "@/types/transaction-filters";

export const useTransactionsInfinite = (filters: TransactionFilters) => {
  return useInfiniteQuery({
    queryKey: queryKeys.transactions.infinite(filters),

    queryFn: ({ pageParam = 1 }) =>
      fetchTransactions({
        pageParam,
        ...filters,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.length) return undefined;
      return pages.length + 1;
    },
  });
};
