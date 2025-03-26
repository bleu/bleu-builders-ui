/* eslint-disable camelcase */
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "#/components/ui";

import { DynamicActionComponent } from "./DynamicActionComponent";

export const DataTableRowActions = ({ row, column }) => {
  const actions = row.original.actions || column.columnDef.actions;

  if (!actions?.length) return null;

  const filteredActions = actions.filter(
    ({ condition_key, condition_value, hide }) => {
      if (hide) return false;

      if (!condition_key && !condition_value) return true;

      return row.original?.[condition_key] === condition_value;
    }
  );

  if (filteredActions?.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 items-center justify-center whitespace-nowrap rounded-md p-0"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-full">
        {/* TODO: here we'd need to filter actions that the user cannot perform, or ideally do this in the BE */}
        {filteredActions.map((action) => (
          <DynamicActionComponent key={action} action={action} row={row} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
