import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "#/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/Form";
import { Label } from "#/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "#/components/ui/RadioGroup";
import { withConditional } from "../withConditional";
import { BaseField } from "../types";

export interface RadioGroupFieldProps extends BaseField {
  sections: Array<{
    description: string;
    label: string;
    options: Array<{
      label: string;
      tooltip?: string;
      value: string;
    }>;
  }>;
}

const radioGroupVariants = cva("w-full", {
  variants: {
    layout: {
      stack: "flex flex-col justify-between items-start",
      inline: "flex flex-row justify-start items-center space-x-4",
    },
    gap: {
      small: "gap-1",
      medium: "gap-2",
      large: "gap-4",
    },
  },
  defaultVariants: {
    layout: "inline",
    gap: "medium",
  },
});

const RadioGroupWithoutSection = ({ form, field }) => (
  <FormField
    control={form.control}
    name={field.name}
    rules={field.required ? { required: true } : {}}
    render={({ field: rcfField }) => (
      <FormItem className="space-y-0 w-full">
        <FormLabel tooltip={field.tooltip} required={field.required}>
          {field.label}
        </FormLabel>
        <FormDescription>{field.description}</FormDescription>
        <FormControl>
          <RadioGroup
            value={rcfField.value}
            className={cn(radioGroupVariants(field), "py-2")}
          >
            {field.options.map((option) => (
              <FormItem
                key={option.value}
                className="flex items-center space-x-1 space-y-0"
              >
                <FormControl
                  onClick={() => {
                    rcfField.onChange(
                      rcfField.value === option.value ? null : option.value
                    );
                  }}
                >
                  <RadioGroupItem value={option.value} />
                </FormControl>
                <FormLabel className="font-normal" tooltip={option.tooltip}>
                  {option.label}
                </FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const RadioGroupField = withConditional<RadioGroupFieldProps>(
  ({ form, field }) => {
    const hasSections = field.sections?.length > 0;
    if (!hasSections) return <RadioGroupWithoutSection {...{ form, field }} />;

    return (
      <FormField
        control={form.control}
        name={field.name}
        rules={field.required ? { required: true } : undefined}
        render={({ field: formField }) => (
          <FormItem className="space-y-0">
            <FormLabel tooltip={field.tooltip} required={field.required}>
              {field.label}
            </FormLabel>
            <FormDescription>{field.description}</FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={formField.onChange}
                defaultValue={formField.value}
                className="py-2"
              >
                <div className="grid grid-cols-2 gap-4">
                  {field.sections.map((section) => (
                    <div key={section.label} className="space-y-2">
                      <Label>{section.label}</Label>
                      <p className="text-muted-foreground text-sm">
                        {section.description}
                      </p>
                      <div className="flex flex-col gap-1 rounded-md border-red-800 p-2">
                        {section.options.map((option) => (
                          <FormItem
                            key={option.value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel
                              className="font-normal"
                              tooltip={option.tooltip}
                            >
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);
