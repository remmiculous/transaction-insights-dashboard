import { apiClient } from "@/lib/axios";
import type { Transaction } from "@/types/transaction";

interface FetchParams {
  pageParam?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export const fetchTransactions = async ({
  pageParam = 1,
  limit = 20,
  search,
  category,
  status,
  dateFrom,
  dateTo,
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
  if (dateFrom) params.append("dateFrom", dateFrom);
  if (dateTo) params.append("dateTo", dateTo);

  const res = await apiClient.get("/transactions", { params });

  return res.data;
};
