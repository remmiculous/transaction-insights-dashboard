export interface TransactionFilters {
  status?: string[];
  category?: string;
  createdAt_gte?: string;
  createdAt_lte?: string;
}
