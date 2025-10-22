import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "#/components/ui/Form";
import { Switch } from "#/components/ui/Switch";

import { withConditional } from "../withConditional";
import { BaseField } from "../types";

export interface SwitchFieldProps extends BaseField {
  type: "switch";
}

function transformIntoBoolean(value: any): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value === "true";
  }

  if (typeof value === "number") {
    return value === 1;
  }

  return false;
}

export const SwitchField = withConditional<SwitchFieldProps>(
  ({ form, field }) => {
    const disabled =
      typeof field.disabled === "function"
        ? field.disabled(form.getValues())
        : field.disabled;

    return (
      <FormField
        control={form.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            <input
              type="hidden"
              name={field.name}
              value={String(formField.value)}
            />
            <div className="space-y-1 leading-none">
              <FormLabel tooltip={field.tooltip}>{field.label}</FormLabel>
              <FormDescription>{field.description}</FormDescription>
            </div>
            <FormControl>
              <Switch
                disabled={disabled || false}
                checked={transformIntoBoolean(formField.value)}
                onCheckedChange={formField.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    );
  }
);
