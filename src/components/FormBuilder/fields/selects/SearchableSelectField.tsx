import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "#/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "#/components/ui/Command";
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

import { withConditional } from "../../withConditional";
import { SelectFieldProps } from "./SelectField";

export const SearchableSelectField = withConditional<SelectFieldProps>(
  ({ form, field }) => (
    <FormField
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem className="flex flex-col">
          <input hidden {...formField} value={formField.value} />
          <FormLabel tooltip={field.tooltip} required={field.required}>
            {field.label}
          </FormLabel>
          <FormDescription>{field.description}</FormDescription>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !formField.value && "text-muted-foreground"
                  )}
                >
                  {formField.value
                    ? field.options?.find(
                        (option) => option.value === formField.value
                      )?.label
                    : "Select an option"}
                  <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search options..." />
                <CommandList>
                  <CommandEmpty>No options found.</CommandEmpty>
                  <CommandGroup className="max-h-80 overflow-y-auto">
                    {field.options?.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          form.setValue(field.name, option.value);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            option.value === formField.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
);
