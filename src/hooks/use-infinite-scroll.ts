import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  threshold?: number; // Percentage (0-100) of scroll position to trigger
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
}

export function useInfiniteScroll({
  threshold = 90,
  onLoadMore,
  hasMore,
  isLoading = false,
}: UseInfiniteScrollOptions) {
  const loadingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || isLoading || loadingRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollPercentage =
        ((scrollTop + windowHeight) / documentHeight) * 100;

      if (scrollPercentage >= threshold) {
        loadingRef.current = true;
        onLoadMore();
        setTimeout(() => {
          loadingRef.current = false;
        }, 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, onLoadMore, hasMore, isLoading]);
}
