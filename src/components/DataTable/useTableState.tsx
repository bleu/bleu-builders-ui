import {
  ColumnFiltersState,
  TableOptions,
  Updater,
} from "@tanstack/react-table";
import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { isEqual } from "lodash";
import { usePersistentFilters } from "./usePersistentFilters";

export function useTableState(
  tableId?: string,
  initialState: TableOptions<unknown[]>["state"] = {}
) {
  const [pagination, setPagination] = useState(
    initialState.pagination || { pageIndex: 0, pageSize: 10 }
  );
  const [rowSelection, setRowSelection] = useState(
    initialState.rowSelection || {}
  );
  const [columnVisibility, setColumnVisibility] = useState(
    initialState.columnVisibility || {}
  );
  const { persistedFilters, saveFilters, clearPersistedFilters } =
    usePersistentFilters(tableId || "");

  const [columnFilters, setColumnFiltersState] = useState(() => {
    if (
      tableId &&
      (!initialState.columnFilters || initialState.columnFilters.length === 0)
    ) {
      return persistedFilters;
    }
    return initialState.columnFilters || [];
  });
  const columnFiltersRef = useRef(columnFilters);
  const setColumnFilters = useCallback(
    (updater: Updater<ColumnFiltersState>) => {
      const previousFilters = columnFiltersRef.current;
      const nextFilters =
        typeof updater === "function" ? updater(previousFilters) : updater;
      if (isEqual(nextFilters, previousFilters)) return;

      columnFiltersRef.current = nextFilters;
      setColumnFiltersState(nextFilters);
      setPagination((previous) =>
        previous.pageIndex === 0 ? previous : { ...previous, pageIndex: 0 }
      );
    },
    []
  );
  const [sorting, setSorting] = useState(initialState.sorting || []);

  const [grouping, setGrouping] = useState(initialState.grouping || []);
  const [expanded, setExpanded] = useState(initialState.expanded || false);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (tableId && isInitialized) {
      saveFilters(columnFilters);
    }
  }, [columnFilters, tableId, saveFilters, isInitialized]);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const state = useMemo(
    () => ({
      pagination,
      rowSelection,
      columnVisibility,
      columnFilters,
      sorting,
      grouping,
      expanded,
    }),
    [
      pagination,
      rowSelection,
      columnVisibility,
      columnFilters,
      sorting,
      grouping,
      expanded,
    ]
  );

  const handlers = useMemo(
    () => ({
      setPagination,
      setRowSelection,
      setColumnVisibility,
      setColumnFilters,
      setSorting,
      setGrouping,
      setExpanded,
      clearPersistedFilters,
    }),
    [
      setPagination,
      setRowSelection,
      setColumnVisibility,
      setColumnFilters,
      setSorting,
      setGrouping,
      setExpanded,
      clearPersistedFilters,
    ]
  );

  return {
    tableState: state,
    setTableState: handlers,
  };
}
