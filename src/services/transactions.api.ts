import { apiClient } from "@/lib/axios";
import type { Transaction } from "@/types/transaction";

interface FetchParams {
  pageParam?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export const fetchTransactions = async ({
  pageParam = 1,
  limit = 20,
  search,
  category,
}: FetchParams): Promise<Transaction[]> => {
  const params = new URLSearchParams();

  params.append("page", String(pageParam));
  params.append("limit", String(limit));

  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const res = await apiClient.get("/transactions", { params });

  return res.data;
};
