import type { TransactionFilters } from "@/types/transaction-filters";

export const queryKeys = {
  transactions: {
    all: ["transactions"] as const,
    infinite: (filters: TransactionFilters) =>
      ["transactions", "infinite", filters] as const,
  },
};
