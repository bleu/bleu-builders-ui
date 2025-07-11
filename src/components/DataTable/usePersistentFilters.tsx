import { useCallback, useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

const STORAGE_KEY_PREFIX = "bleu_table_filters_";

export function usePersistentFilters(tableId: string) {
  const storageKey = `${STORAGE_KEY_PREFIX}${tableId}`;

  const [persistedFilters, setPersistedFilters] = useState<ColumnFiltersState>(
    () => {
      if (typeof window === "undefined") return [];

      try {
        const stored = localStorage.getItem(storageKey);
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.warn(`Failed to load persisted filters for ${tableId}:`, error);
        return [];
      }
    }
  );

  const saveFilters = useCallback(
    (filters: ColumnFiltersState) => {
      if (typeof window === "undefined") return;

      try {
        // Only save if filters have actual values
        const activeFilters = filters.filter(
          (filter) =>
            filter.value &&
            (Array.isArray(filter.value) ? filter.value.length > 0 : true)
        );

        if (activeFilters.length === 0) {
          localStorage.removeItem(storageKey);
          setPersistedFilters([]);
        } else {
          localStorage.setItem(storageKey, JSON.stringify(activeFilters));
          setPersistedFilters(activeFilters);
        }
      } catch (error) {
        console.warn(`Failed to save filters for ${tableId}:`, error);
      }
    },
    [storageKey, tableId]
  );

  const clearPersistedFilters = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(storageKey);
      setPersistedFilters([]);
    } catch (error) {
      console.warn(`Failed to clear persisted filters for ${tableId}:`, error);
    }
  }, [storageKey, tableId]);

  return {
    persistedFilters,
    saveFilters,
    clearPersistedFilters,
  };
}
