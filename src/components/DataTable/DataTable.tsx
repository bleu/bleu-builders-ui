import {
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TableContext } from "./TableContext";
import { serializeQuery } from "#/lib/serializeQuery";

export function formatRequestParams(originalObj) {
  return {
    ...originalObj,
    grouping: originalObj.grouping.length > 0 ? originalObj.grouping[0] : null,
    sorting: originalObj?.sorting?.length > 0 ? originalObj.sorting[0] : null,
    columnFilters: originalObj.columnFilters.reduce((acc, filter) => {
      acc[filter.id] = filter.value;
      return acc;
    }, {}),
  };
}

const defaultFilterFn = (row, id, filterValue) =>
  row.getValue(id).includes(filterValue);

const buildColumns = (columnsConfig) => {
  if (!columnsConfig) return [];

  return columnsConfig.map((columnConfig) => ({
    ...columnConfig,
    filterFn: columnConfig.filterable ? defaultFilterFn : null,
  }));
};

export function DataTable({
  children,
  data,
  error,
  tableState,
  setTableState,
  buildTableColumns = buildColumns,
  setQueryToParams,
  setSelectedData,
  isLoading = false,
}) {
  const {
    pagination,
    rowSelection,
    columnVisibility,
    columnFilters,
    sorting,
    grouping,
  } = tableState;

  const {
    setPagination,
    setRowSelection,
    setColumnVisibility,
    setColumnFilters,
    setSorting,
    setGrouping,
  } = setTableState;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // @ts-ignore
  const columns = buildTableColumns(data?.columns, data?.filters);
  const filters = data?.filters;
  const searchKey = data?.search?.key;

  const hiddenColumns = columns
    .filter((c) => c.hide)
    .map((c) => ({ [c.accessorKey]: false }))
    .reduce((acc, obj) => Object.assign(acc, obj), {});

  const table = useReactTable({
    data: data?.data ?? [],
    pageCount: Math.ceil((data?.total ?? 0) / pagination.pageSize),
    columns,
    state: {
      ...(grouping.length > 0 ? { grouping } : {}),
      sorting,
      rowSelection,
      columnFilters,
      pagination,
      columnVisibility: {
        ...columnVisibility,
        ...hiddenColumns,
      },
    },
    ...(grouping.length > 0
      ? {
          onGroupingChange: setGrouping,
          getExpandedRowModel: getExpandedRowModel(),
          getGroupedRowModel: getGroupedRowModel(),
          autoResetExpanded: false,
        }
      : {}),
    onPaginationChange: setPagination,
    manualPagination: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  React.useEffect(() => {
    if (setSelectedData)
      setSelectedData(
        table.getSelectedRowModel().flatRows.map((row) => row.original)
      );
  }, [rowSelection, table, setSelectedData]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!setQueryToParams) return;

    const formattedParams = formatRequestParams({
      columnFilters: tableState.columnFilters,
      sorting: tableState.sorting,
      pageIndex: tableState.pagination.pageIndex,
      pageSize: tableState.pagination.pageSize,
      grouping: tableState.grouping,
    });

    const params = serializeQuery(formattedParams);
    navigate(`?${params}`, { replace: true });
  }, [
    tableState.pagination.pageIndex,
    tableState.pagination.pageSize,
    tableState.sorting,
    tableState.columnFilters,
    tableState.grouping,
    navigate,
  ]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    data,
    filters,
    error,
    tableState,
    setTableState,
    table,
    searchKey,
    isLoading,
  };

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
}
