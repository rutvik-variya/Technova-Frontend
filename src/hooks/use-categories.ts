"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES.ALL,
    queryFn: getCategories,
  });
};