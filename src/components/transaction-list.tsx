"use client";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
  isLoading: boolean;
}

export function TransactionList({
  list,
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage = false,
  isLoading,
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
          <TableHead className="w-3xs text-left font-bold text-md">
            User
          </TableHead>
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
        {!isLoading &&
          list.map((item) => (
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
        {isFetchingNextPage || isLoading
          ? Array.from({ length: 10 }).map((_) => (
              <TableRow key={crypto.randomUUID()}>
                <TableCell className="font-medium">
                  <Skeleton className="h-4 w-5" />
                </TableCell>
                <TableCell className="flex items-center justify-start gap-4 overflow-hidden">
                  <Skeleton className="h-10 w-10 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                </TableCell>
                <TableCell className="">
                  <Skeleton className="m-auto h-4 w-10 rounded" />
                </TableCell>
                <TableCell className="">
                  <Skeleton className="m-auto h-4 w-10 rounded" />
                </TableCell>
                <TableCell className="">
                  <Skeleton className="m-auto h-4 w-10 rounded" />
                </TableCell>
                <TableCell className="">
                  <Skeleton className="m-auto h-4 w-10 rounded" />
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
      {!hasNextPage && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No More Results
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
