import { TableOptions } from "@tanstack/react-table";
import { useMemo, useState, useEffect } from "react";
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

  const [columnFilters, setColumnFilters] = useState(() => {
    if (
      tableId &&
      (!initialState.columnFilters || initialState.columnFilters.length === 0)
    ) {
      return persistedFilters;
    }
    return initialState.columnFilters || [];
  });
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
