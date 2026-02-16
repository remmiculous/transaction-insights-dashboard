import type { Transaction } from "@/types/transaction";

export const queryKeys = {
  transactions: {
    all: ["transactions"] as const,
    infinite: (filters: Transaction) =>
      ["transactions", "infinite", filters] as const,
  },
};
