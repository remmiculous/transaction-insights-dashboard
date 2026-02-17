import { apiClient } from "@/lib/axios";
import type { Transaction } from "@/types/transaction";

interface FetchParams {
  pageParam?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string[];
  createdAt_gte?: string;
  createdAt_lte?: string;
}

export const fetchTransactions = async ({
  pageParam = 1,
  limit = 20,
  search,
  category,
  status,
  createdAt_gte,
  createdAt_lte,
}: FetchParams): Promise<Transaction[]> => {
  const params = new URLSearchParams();

  params.append("page", String(pageParam));
  params.append("limit", String(limit));

  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (status && status.length > 0) {
    for (const s of status) {
      params.append("status", s);
    }
  }
  if (createdAt_gte) params.append("createdAt_gte", createdAt_gte);
  if (createdAt_lte) params.append("createdAt_lte", createdAt_lte);

  const res = await apiClient.get("/transactions", { params });

  return res.data;
};
