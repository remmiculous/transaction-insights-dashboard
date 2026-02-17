"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CalendarIcon, FilterIcon, XIcon } from "lucide-react";
import { format } from "date-fns";
import type { TransactionFilters } from "@/types/transaction-filters";
import type { DateRange } from "react-day-picker";

interface TransactionFiltersProps {
  onFiltersChange: (filters: TransactionFilters) => void;
  currentFilters: TransactionFilters;
}

const STATUS_OPTIONS = [
  { value: "true", label: "Success" },
  { value: "false", label: "Failed" },
  { value: "pending", label: "Pending" },
];

const CATEGORY_OPTIONS = [
  "Shopping",
  "Food",
  "Transport",
  "Entertainment",
  "Bills",
  "Healthcare",
  "Other",
];

export function TransactionFiltersComponent({
  onFiltersChange,
  currentFilters,
}: TransactionFiltersProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    currentFilters.status?.[0],
  );
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    currentFilters.category,
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (currentFilters.dateFrom || currentFilters.dateTo) {
      return {
        from: currentFilters.dateFrom
          ? new Date(currentFilters.dateFrom)
          : undefined,
        to: currentFilters.dateTo ? new Date(currentFilters.dateTo) : undefined,
      };
    }
    return undefined;
  });

  const handleStatusChange = (status: string) => {
    const newStatus = status === "all" ? undefined : status;
    setSelectedStatus(newStatus);
    onFiltersChange({
      ...currentFilters,
      status: newStatus ? [newStatus] : undefined,
    });
  };

  const handleCategoryChange = (category: string) => {
    const newCategory = category === "all" ? undefined : category;
    setSelectedCategory(newCategory);
    onFiltersChange({
      ...currentFilters,
      category: newCategory,
    });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    onFiltersChange({
      ...currentFilters,
      dateFrom: range?.from ? format(range.from, "yyyy-MM-dd") : undefined,
      dateTo: range?.to ? format(range.to, "yyyy-MM-dd") : undefined,
    });
  };

  const handleClearFilters = () => {
    setSelectedStatus(undefined);
    setSelectedCategory(undefined);
    setDateRange(undefined);
    onFiltersChange({});
  };

  const hasActiveFilters = selectedStatus || selectedCategory || dateRange;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <FilterIcon className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium text-sm">Filters:</span>
      </div>

      {/* Status Select */}
      <Select
        value={selectedStatus || "all"}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="h-9 w-[120px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Category Select */}
      <Select
        value={selectedCategory || "all"}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger className="h-9 w-[140px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {CATEGORY_OPTIONS.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date Range Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-[240px] justify-start"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                  {format(dateRange.to, "MMM dd, yyyy")}
                </>
              ) : (
                format(dateRange.from, "MMM dd, yyyy")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateRangeChange}
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9"
          onClick={handleClearFilters}
        >
          <XIcon className="mr-1 h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
