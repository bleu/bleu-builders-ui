/* eslint-disable no-restricted-syntax */
import React from "react";
import { flexRender } from "@tanstack/react-table";

import { Trans } from "react-i18next";
import { useNavigate } from "react-router";
import { TableBody, TableCell, TableRow } from "#/components/ui";

import { useTableContext } from "../TableContext";

export function DataTableBody({ hasDetails, isLoading = false }) {
  // @ts-expect-error TS(2339) FIXME: Property 'table' does not exist on type '{}'.
  const { table } = useTableContext();

  const navigate = useNavigate();
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            onClick={() => {
              if (hasDetails) {
                navigate(`${row.original.id}`);
              }
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : isLoading ? (
        <TableRow>
          <TableCell className="h-24 text-center animate-pulse">
            <Trans>Loading</Trans>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell className="h-24 text-center">
            <Trans>No results found</Trans>.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
