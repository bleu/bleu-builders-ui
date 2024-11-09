/* eslint-disable no-restricted-syntax */

import React from "react";
import { useTableState } from "../../components/DataTable/useTableState";
import { buildDataTableColumns } from "../../components/DataTable/SWRDataTable";
import { DataTable } from "../../components/DataTable/DataTable";
import { Table } from "../../components/ui/Table";
import { DataTableHeader } from "../../components/DataTable/SWRDataTable/DataTableHeader";
import { DataTableBody } from "../../components/DataTable/SWRDataTable/DataTableBody";

export function DataTableDemo({ data }) {
  const { tableState, setTableState } = useTableState();

  const buildColumns = (tableColumns, tableFilters) =>
    buildDataTableColumns(tableColumns, tableFilters, []);

  return (
    <div className="border-2 rounded-lg">
      <DataTable
        data={data}
        error={null}
        tableState={tableState}
        setTableState={setTableState}
        setSelectedData={null}
        setQueryToParams={false}
        // @ts-expect-error TS(2339) FIXME: Property 'buildTableColumns' does not exist on type '{}'.
        buildTableColumns={buildColumns}
      >
        <Table>
          <DataTableHeader />
          <DataTableBody hasDetails={false} />
        </Table>
      </DataTable>
    </div>
  );
}
