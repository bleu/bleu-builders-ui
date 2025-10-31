import React from "react";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/Form";
import { Textarea } from "#/components/ui/Textarea";

import { withConditional } from "../withConditional";
import { BaseField } from "../types";
import isFieldDisabled from "../isFieldDisabled";

export interface TextAreaFieldProps extends BaseField {
  defaultValue?: string;
  length?: {
    maximum?: number;
    minimum: number; // undefined or number
  };
  type: "textarea";
}

export const TextAreaField = withConditional<TextAreaFieldProps>(
  ({ form, field }) => {
    const stringSchema = z
      .string()
      .min(field.length?.minimum || 0)
      .max(field.length?.maximum || Infinity);

    return (
      <FormField
        control={form.control}
        name={field.name}
        defaultValue={field.defaultValue}
        rules={
          field.required
            ? {
                required: true,
                validate: (value) =>
                  stringSchema.safeParse(value).success ||
                  `The value must be between ${field.length?.minimum} and ${field.length?.maximum} long.`,
              }
            : undefined
        }
        render={({ field: formField }) => (
          <FormItem className="w-full">
            <FormLabel tooltip={field.tooltip} required={field.required}>
              {field.label}
            </FormLabel>
            <FormDescription>{field.description}</FormDescription>
            <FormControl>
              <Textarea
                disabled={isFieldDisabled(form, field)}
                placeholder={field.placeholder}
                className="resize-none"
                {...formField}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);
