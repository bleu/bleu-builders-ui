import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import React from "react";
import { Trans } from "react-i18next";
import { Button } from "#/components/ui/Button";
import { Calendar } from "#/components/ui/Calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/Form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/Popover";
import { cn } from "#/lib/utils";

import { withConditional } from "../withConditional";
import { BaseField } from "../types";

export interface DatePickerInputProps extends BaseField {
  type: "date" | "datetime";
}

export const DatePickerInput = withConditional<DatePickerInputProps>(
  ({ form, field }) => {
    const isDatetime = field.type === "datetime";

    return (
      <FormField
        control={form.control}
        name={field.name}
        rules={field.required ? { required: true } : undefined}
        defaultValue={field.defaultValue}
        render={({ field: formField }) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel tooltip={field.tooltip}>{field.label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !formField.value && "text-muted-foreground"
                    )}
                  >
                    {formField.value ? (
                      format(
                        new Date(formField.value),
                        isDatetime ? "PPp" : "PP"
                      )
                    ) : (
                      <span>
                        <Trans>Pick a date</Trans>
                        {/* TODO: change calendar INTL behavior */}
                      </span>
                    )}
                    <CalendarIcon className="ml-auto size-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-[1500]" align="start">
                {/* @ts-expect-error TS(2739) FIXME: Type '{ mode: string; selected: any; onSelect: any... Remove this comment to see the full error message */}
                <Calendar
                  mode="single"
                  selected={formField.value}
                  onSelect={formField.onChange}
                  withTime={isDatetime}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>{field.description}</FormDescription>
            <FormMessage />
            <input hidden {...formField} value={formField.value} />
          </FormItem>
        )}
      />
    );
  }
);
