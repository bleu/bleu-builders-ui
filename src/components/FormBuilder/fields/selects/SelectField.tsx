import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/Form";
import * as Select from "#/components/ui/Select";

import { withConditional } from "../../withConditional";
import { BaseField } from "../../types";
import isFieldDisabled from "../../isFieldDisabled";

export interface SelectFieldProps extends BaseField {
  options?: Array<{
    label: string;
    tooltip?: string;
    value: string;
  }>;
}

export const SelectField = withConditional<SelectFieldProps>(
  ({ form, field }) => (
    <FormField
      control={form.control}
      name={field.name}
      defaultValue={field.defaultValue}
      rules={field.required ? { required: true } : undefined}
      render={({ field: formField }) => (
        <FormItem className="w-full">
          <FormLabel tooltip={field.tooltip} required={field.required}>
            {field.label}
          </FormLabel>
          <FormDescription>{field.description}</FormDescription>
          <Select.SelectRoot
            onValueChange={formField.onChange}
            value={String(formField.value)}
            name={field.name}
            disabled={isFieldDisabled(form, field)}
          >
            <FormControl>
              <Select.SelectTrigger className="h-10 w-full rounded-md border dark:border-2 shadow-none">
                <Select.SelectValue placeholder={field.placeholder} />
              </Select.SelectTrigger>
            </FormControl>
            <Select.SelectContent className="z-[10000]">
              {field.options?.map((option) => (
                <Select.SelectItem
                  key={String(option.value)}
                  value={String(option.value)}
                >
                  {option.label}
                </Select.SelectItem>
              ))}
            </Select.SelectContent>
          </Select.SelectRoot>

          <FormMessage />
        </FormItem>
      )}
    />
  )
);
