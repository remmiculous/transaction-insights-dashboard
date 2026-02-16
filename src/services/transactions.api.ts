import type { Transaction } from "@/types/transaction";

const BASE_URL = "https://696e0139d7bacd2dd7155c6a.mockapi.io/barter-tech";

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

  const res = await fetch(`${BASE_URL}/transactions?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return res.json();
};
