"use client";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { Transaction } from "@/types/transaction";

interface TransactionListProps {
  list: Transaction[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export function TransactionList({
  list,
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage = false,
}: TransactionListProps) {
  useInfiniteScroll({
    threshold: 90,
    onLoadMore: () => fetchNextPage?.(),
    hasMore: hasNextPage,
    isLoading: isFetchingNextPage,
  });

  return (
    <Table className="rounded-2xl border">
      <TableHeader>
        <TableRow>
          <TableHead className="text-left font-bold text-md">ID</TableHead>
          <TableHead className="text-left font-bold text-md">User</TableHead>
          <TableHead className="text-center font-bold text-md">
            Amount
          </TableHead>
          <TableHead className="text-center font-bold text-md">
            Category
          </TableHead>
          <TableHead className="text-center font-bold text-md">
            Status
          </TableHead>
          <TableHead className="text-right font-bold text-md">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell className="flex items-center justify-start gap-4 overflow-hidden">
              <Image
                src={item.avatar}
                alt={item.name}
                width={40}
                height={40}
                className="rounded"
              />
              <p>{item.name}</p>
            </TableCell>
            <TableCell className="text-center">
              {item.currency} {item.amount}
            </TableCell>
            <TableCell className="text-center">{item.category}</TableCell>
            <TableCell className="text-center">
              {item.status === true ? (
                <p className="flex items-center justify-center rounded-lg bg-green-600 p-1 font-medium text-sm text-white">
                  Success
                </p>
              ) : item.status === false ? (
                <p className="flex items-center justify-center rounded-lg bg-red-600 p-1 font-medium text-sm text-white">
                  Failed
                </p>
              ) : (
                <p className="flex items-center justify-center rounded-lg bg-yellow-600 p-1 font-medium text-sm text-white">
                  Pending
                </p>
              )}
            </TableCell>
            <TableCell className="text-right">
              {new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
