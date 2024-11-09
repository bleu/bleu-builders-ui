/* eslint-disable no-restricted-syntax */
import React from "react";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

import { Trans, useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Badge, Checkbox, Table } from "#/components/ui";
import { SectionTitle } from "#/components/SectionTitle";
import { formatDate, formatDateTime } from "#/lib/formatDate";
import { Link } from "#/components/Link";

import { DataTableColumnHeader } from "#/components/DataTable/DataTableColumnHeader";
import { DataTablePagination } from "#/components/DataTable/DataTablePagination";
import { DataTableRowActions } from "#/components/DataTable/DataTableRowActions";
import { DataTableToolbar } from "#/components/DataTable/DataTableToolbar";
import { DataTable } from "../DataTable";
import { useSWRDataTable } from "../useSWRDataTable";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { deserializeQuery } from "#/lib/serializeQuery";
import { formatNumber } from "#/lib";

export const formatParamsToDataTable = (params, searchKey) => {
  const { columnFilters = {}, pageIndex, pageSize, sorting } = params;

  const sortingObj = sorting ? { sorting: [sorting] } : {};
  const columnFiltersObj =
    Object.keys(columnFilters).length > 0
      ? {
          columnFilters: Object.entries(columnFilters).map(([id, value]) => ({
            id,
            value: Array.isArray(value)
              ? value
              : id === searchKey
                ? value
                : [value],
          })),
        }
      : {};

  const to = {
    ...sortingObj,
    pagination: {
      pageIndex: pageIndex || 0,
      pageSize: !pageSize ? 10 : pageSize > 50 ? 50 : pageSize,
    },
    ...columnFiltersObj,
  };

  return to;
};

export const renderDataTableCell = ({ filters, column, row, selectedRows }) => {
  const value = row.getValue(column.columnDef.accessorKey);
  const { i18n } = useTranslation();

  const displayAs =
    column.columnDef.field_options?.display_type || column.columnDef.type;

  switch (displayAs) {
    case "text":
      return <div className="max-w-[400px] truncate">{value}</div>;
    case "boolean":
      return value ? (
        <CheckIcon className="size-4 bg-primary text-primary-foreground rounded-full" />
      ) : (
        <Cross2Icon className="size-4 text-muted-foreground" />
      );
    case "badge":
      // TODO: needs to be refactored
      switch (value) {
        case "draft":
          return <Badge color="pending">Draft</Badge>;
        case "scheduled":
          return (
            <Badge color="success" outline="outline">
              Scheduled
            </Badge>
          );
        case "active":
          return <Badge color="success">Active</Badge>;
        case "ended":
          return <Badge color="destructive">Ended</Badge>;
        default:
          if (column.columnDef.accessorKey !== "is_active") {
            return <Badge>{value}</Badge>;
          }

          // eslint-disable-next-line no-case-declarations
          const status = filters[0].options.find(
            // eslint-disable-next-line no-shadow
            (status) => status.value === row.getValue("is_active")
          );

          if (!status) {
            return null;
          }

          return (
            <Badge color={status.value === false ? null : "destructive"}>
              {status.label}
            </Badge>
          );
      }
    case "date":
      return <div>{value ? formatDate(value, i18n.language) : ""}</div>;
    case "datetime":
      return <div>{value ? formatDateTime(value, i18n.language) : ""}</div>;
    case "number":
      return (
        <div>
          {formatNumber(value, 1, "decimal", "standard", 0.001, i18n.language)}
        </div>
      );
    case "actions":
      return <DataTableRowActions row={row} column={column} />;
    case "image":
      // eslint-disable-next-line no-case-declarations
      const image = row.getValue("image") || value;
      if (image?.url) {
        return (
          <img
            className="aspect-ratio-1 size-16 rounded-sm object-contain"
            src={image.url}
            alt={image.alt_text}
          />
        );
      }
      return <div className="max-w-[400px] truncate">{value}</div>;

    case "link":
      // eslint-disable-next-line no-case-declarations
      const url = row.getValue("details_url");
      if (!url) return <div>{value}</div>;
      return (
        <Link to={url}>
          <span className="underline">{value}</span>
        </Link>
      );

    case "selection":
      return (
        <Checkbox
          checked={selectedRows.some((r) => r.id === row.original.id)}
          onCheckedChange={(checkValue) => row.toggleSelected(!!checkValue)}
          aria-label="Select row"
        />
      );
    case "select":
      return value;
    case "external_link":
      return (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="underline text-primary flex items-center"
        >
          <span>
            <Trans>Open</Trans>&nbsp;{column.columnDef.title}
          </span>
        </a>
      );
    default:
      return null;
  }
};

export const defaultDataTableFilterFn = (row, id, filterValue) =>
  row.getValue(id).includes(filterValue);

export const buildDataTableColumns = (columnsConfig, filters, selectedRows) => {
  if (!columnsConfig) return [];

  return columnsConfig.map((columnConfig) => ({
    ...columnConfig,
    header: ({ column }) => (
      // @ts-expect-error TS(2741) FIXME: Property 'className' is missing in type '{ column:... Remove this comment to see the full error message
      <DataTableColumnHeader column={column} title={columnConfig.title} />
    ),
    cell: (rest) => renderDataTableCell({ filters, ...rest, selectedRows }),
    filterFn: columnConfig.filterable ? defaultDataTableFilterFn : null,
  }));
};

export function SWRDataTable({
  fetchPath,
  searchKey = undefined,
  defaultParams = {},
  hasDetails = false,
  action,
  setSelectedData,
  selectedRows,
}: {
  action?: React.ReactNode;
  defaultParams?: Record<string, unknown>;
  fetchPath: string;
  hasDetails?: boolean;
  searchKey?: string;
  selectedRows?: any[];
  setSelectedData?: (data: any[]) => void;
}) {
  const [searchParams] = useSearchParams();
  const initialSearch = {
    ...formatParamsToDataTable(
      deserializeQuery(searchParams.toString()),
      searchKey
    ),
    ...defaultParams,
  };

  const { data, error, tableState, setTableState } = useSWRDataTable(
    fetchPath,
    initialSearch
  );

  const buildColumns = (tableColumns, tableFilters) =>
    buildDataTableColumns(tableColumns, tableFilters, selectedRows);

  if (error) {
    return (
      <div className="flex items-center justify-between space-y-2">
        <div>
          <SectionTitle>
            <Trans>Something went wrong!</Trans>
          </SectionTitle>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <DataTable
      data={data}
      error={error}
      tableState={tableState}
      setTableState={setTableState}
      // @ts-ignore
      buildTableColumns={buildColumns}
      setSelectedData={setSelectedData}
      setQueryToParams
    >
      <div className="space-y-4">
        <DataTableToolbar action={action} />
        <div className="rounded-md border dark:border-2">
          <Table>
            <DataTableHeader />
            <DataTableBody hasDetails={hasDetails} />
          </Table>
        </div>
        <DataTablePagination />
      </div>
    </DataTable>
  );
}

export { DataTableHeader, DataTableBody };
