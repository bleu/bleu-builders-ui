import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useTranslation, Trans } from "react-i18next";
import { Button, Select } from "#/components/ui";
import { useTableContext } from "./TableContext";

export function DataTablePagination({
  itemsPerPageOptions = [10, 20, 30, 40, 50],
}) {
  // @ts-expect-error TS(2339) FIXME: Property 'table' does not exist on type '{}'.
  const { table } = useTableContext();

  const { t } = useTranslation();
  const currentPage = Number(table.getState().pagination.pageIndex) + 1;
  const pageCount = table.getPageCount() || 1;
  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex flex-col items-end md:flex-row md:items-center gap-y-2 space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{t("Items per page")}</p>
          <Select.SelectRoot
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <Select.SelectTrigger className="h-8 w-[70px]">
              <Select.SelectValue
                placeholder={table.getState().pagination.pageSize}
              />
            </Select.SelectTrigger>
            <Select.SelectContent side="top">
              {itemsPerPageOptions.map((pageSize) => (
                <Select.SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </Select.SelectItem>
              ))}
            </Select.SelectContent>
          </Select.SelectRoot>
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            <Trans>Page {{ currentPage }} of</Trans> {pageCount}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              // @ts-ignore
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              // @ts-ignore
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              // @ts-ignore
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
