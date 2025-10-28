/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { withConditional } from "../../withConditional";
import { BaseField } from "../../types";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/Form";

export interface RadiusOption {
  classes: string;
  label: string;
  value: string;
}

export interface RadiusSelectFieldProps extends BaseField {
  options: RadiusOption[];
}

export const RadiusSelect = withConditional<RadiusSelectFieldProps>(
  ({ form, field }) => (
    <FormField
      control={form.control}
      name={field.name}
      rules={field.required ? { required: true } : undefined}
      render={({ field: formField }) => (
        <FormItem className="w-full">
          <FormLabel tooltip={field.tooltip} required={field.required}>
            {field.label}
          </FormLabel>
          <FormDescription>{field.description}</FormDescription>

          <div className="flex items-center space-x-2 bg-background">
            <div className="grid grid-cols-5 gap-2">
              {field.options.map((option) => (
                <div
                  key={option.value}
                  className="flex flex-col text-center text-foreground gap-2 text-sm justify-end"
                >
                  <div
                    className={`flex p-3 border rounded-md hover:border-foreground/80 ${
                      formField.value === option.value
                        ? "border-foreground/80 border-2"
                        : "border-foreground/20"
                    } cursor-pointer`}
                    onClick={() => formField.onChange(option.value)}
                  >
                    <div
                      className={`grow size-8 flex items-center justify-center bg-blue-500 ${option.classes}`}
                    />
                  </div>
                  {option.label}
                </div>
              ))}
            </div>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  )
);
