import React from "react";
import { Checkbox } from "#/components/ui/Checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/Form";

import { withConditional } from "../withConditional";
import { SelectFieldProps } from "./selects/SelectField";

export interface MultiSelectCheckboxesFieldProps extends SelectFieldProps {
  type: "multi_select_checkbox";
}

export const MultiSelectCheckboxes =
  withConditional<MultiSelectCheckboxesFieldProps>(({ form, field }) => (
    <FormField
      control={form.control}
      name={field.name}
      rules={field.required ? { required: true } : undefined}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base" tooltip={field.tooltip}>
              {field.label}
            </FormLabel>
            <FormDescription>{field.description}</FormDescription>
          </div>
          <div className="h-full overflow-y-auto multi-select">
            {field.options?.map((item) => (
              <FormField
                key={item.value}
                control={form.control}
                name={field.name}
                defaultValue={[]}
                render={({ field: formField }) => (
                  <FormItem
                    key={item.value}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={formField.value
                          ?.map(String)
                          .includes(item.value)}
                        onCheckedChange={(checked) =>
                          checked
                            ? formField.onChange([
                                ...formField.value,
                                item.value,
                              ])
                            : formField.onChange(
                                formField.value?.filter(
                                  (value) =>
                                    String(value) !== String(item.value)
                                )
                              )
                        }
                      />
                    </FormControl>
                    <FormLabel className="font-normal" tooltip={item.tooltip}>
                      {item.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  ));
