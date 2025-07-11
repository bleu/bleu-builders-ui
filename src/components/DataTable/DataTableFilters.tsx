import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useEffect, useRef } from "react";

import { Trans } from "react-i18next";
import { Button } from "#/components/ui";

import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { useTableContext } from "./TableContext";

export function DataTableFilters() {
  // @ts-expect-error TS(2339) FIXME: Property 'table' does not exist on type '{}'.
  const { table, filters, setTableState, tableId } = useTableContext();

  if (!table || !filters) {
    return null;
  }

  const isFiltered =
    table.getState().columnFilters.filter((filter) => filter.value.length > 0)
      .length > 0;

  const effectiveTableId = tableId || "default";
  const initialFilterSet = useRef(new Map<string, boolean>());

  useEffect(() => {
    if (filters && !initialFilterSet.current.get(effectiveTableId)) {
      filters.map((filter) => {
        const column = table.getColumn(filter.value);
        if (column) {
          const currentFilterValue = column.getFilterValue();
          if (
            !currentFilterValue ||
            (Array.isArray(currentFilterValue) &&
              currentFilterValue.length === 0)
          ) {
            column.setFilterValue(
              filter.options
                .filter((option) => option.defaultSelected)
                .map((option) => option.value)
            );
          }
        }
        return null;
      });
      initialFilterSet.current.set(effectiveTableId, true);
    }
  }, [filters, table, effectiveTableId]);

  return (
    <div className="flex flex-1 items-start space-x-2">
      <div className="flex flex-wrap gap-1">
        {filters.map(
          (filter) =>
            table.getColumn(filter.value) && (
              <DataTableFacetedFilter
                key={filter.title}
                column={table.getColumn(filter.value)}
                title={filter.title}
                options={filter.options}
              />
            )
        )}
      </div>
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => {
            table.resetColumnFilters();
            if (setTableState?.clearPersistedFilters) {
              setTableState.clearPersistedFilters();
            }
          }}
          className="h-8 px-2 lg:px-3"
        >
          <Trans>Reset</Trans>
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
