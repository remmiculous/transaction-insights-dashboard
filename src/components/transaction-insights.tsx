"use client";

import { useMemo } from "react";
import { TrendingUp, DollarSign, Activity, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Transaction } from "@/types/transaction";

interface TransactionInsightsProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function TransactionInsights({
  transactions,
  isLoading,
}: TransactionInsightsProps) {
  const stats = useMemo(() => {
    const totalTransactions = transactions.length;

    // Calculate total successful amount
    const totalSuccessfulAmount = transactions.reduce((sum, t) => {
      // Assuming status === true means successful
      // Also handling amount as string since it comes from API as string
      if (t.status === true) {
        return sum + Number.parseFloat(t.amount);
      }
      return sum;
    }, 0);

    // Calculate success rate
    const successfulCount = transactions.filter(
      (t) => t.status === true,
    ).length;
    const successRate =
      totalTransactions > 0 ? (successfulCount / totalTransactions) * 100 : 0;

    // Calculate top category
    const categoryTotals: Record<string, number> = {};
    for (const t of transactions) {
      const amount = Number.parseFloat(t.amount);
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amount;
    }

    let topCategory = "N/A";
    let maxCategoryAmount = 0;

    for (const [category, amount] of Object.entries(categoryTotals)) {
      if (amount > maxCategoryAmount) {
        maxCategoryAmount = amount;
        topCategory = category;
      }
    }

    return {
      totalTransactions,
      totalSuccessfulAmount,
      successRate,
      topCategory,
    };
  }, [transactions]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">
            Total Transactions
          </CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl">
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              stats.totalTransactions
            )}
          </div>
          <p className="text-muted-foreground text-xs">Loaded transactions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">
            Total Successful
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl">
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              `$${stats.totalSuccessfulAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            )}
          </div>
          <p className="text-muted-foreground text-xs">
            Processed successfully
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">Success Rate</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl">
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              `${stats.successRate.toFixed(1)}%`
            )}
          </div>
          <p className="text-muted-foreground text-xs">Based on current view</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">Top Category</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl capitalize">
            {isLoading ? <Skeleton className="h-8 w-32" /> : stats.topCategory}
          </div>
          <p className="text-muted-foreground text-xs">By total volume</p>
        </CardContent>
      </Card>
    </div>
  );
}
