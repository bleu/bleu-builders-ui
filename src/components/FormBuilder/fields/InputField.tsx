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
import { Input } from "#/components/ui/Input";

import { withConditional } from "../withConditional";
import { BaseField } from "../types";
import { cn } from "#/lib";

export interface InputFieldProps extends BaseField {
  length?: {
    maximum?: number;
    minimum: number; // undefined or number
  };
  mode: "text" | "number" | "time";
  type: "input";
}

export const InputField = withConditional<InputFieldProps>(
  ({ form, field }) => {
    const validator = field.mode === "number" ? z.coerce.number() : z.string();

    validator
      .min(field.length?.minimum || 0)
      .max(field.length?.maximum || Infinity);

    const numberInputOnWheelPreventChange = (e) => {
      e.target.blur();
      e.stopPropagation();
    };

    const disabled =
      typeof field.disabled === "function"
        ? field.disabled(form.getValues())
        : field.disabled;

    return (
      <FormField
        control={form.control}
        name={field.name}
        rules={
          field.required
            ? {
                required: true,
                validate: (value) =>
                  validator.safeParse(value).success ||
                  `The value must be between ${field.length?.minimum} and ${field.length?.maximum} long.`,
              }
            : undefined
        }
        defaultValue={field.defaultValue}
        render={({ field: formField }) => (
          <FormItem
            className={cn(field.mode === "time" ? "w-[240px]" : "w-full")}
          >
            <FormLabel tooltip={field.tooltip}>{field.label}</FormLabel>
            <FormDescription>{field.description}</FormDescription>
            <FormControl>
              <Input
                placeholder={field.placeholder}
                {...formField}
                disabled={disabled}
                type={field.mode}
                onWheel={(event) =>
                  field.mode === "number" &&
                  numberInputOnWheelPreventChange(event)
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);
