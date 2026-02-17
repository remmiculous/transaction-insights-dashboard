"use client";

import { format } from "date-fns";
import { CalendarIcon, FilterIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import type { TransactionFilters } from "@/types/transaction-filters";

interface TransactionFiltersProps {
  onFiltersChange: (filters: TransactionFilters) => void;
  currentFilters: TransactionFilters;
}

const STATUS_OPTIONS = [
  { value: "true", label: "Success" },
  { value: "false", label: "Failed" },
  { value: "pending", label: "Pending" },
];

const CATEGORY_OPTIONS = ["payment", "deposit", "withdraw", "invoice"];

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    if (currentFilters.createdAt_gte) {
      return new Date(currentFilters.createdAt_gte);
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

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const gte = new Date(date);
      gte.setHours(0, 0, 0, 0);
      const lte = new Date(date);
      lte.setHours(23, 59, 59, 999);

      onFiltersChange({
        ...currentFilters,
        createdAt_gte: gte.toISOString(),
        createdAt_lte: lte.toISOString(),
      });
    } else {
      onFiltersChange({
        ...currentFilters,
        createdAt_gte: undefined,
        createdAt_lte: undefined,
      });
    }
  };

  const handleClearFilters = () => {
    setSelectedStatus(undefined);
    setSelectedCategory(undefined);
    setSelectedDate(undefined);
    onFiltersChange({});
  };

  const hasActiveFilters = selectedStatus || selectedCategory || selectedDate;

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
            <SelectItem key={category} value={category} className="capitalize">
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-[180px] justify-start"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, "MMM dd, yyyy")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
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
