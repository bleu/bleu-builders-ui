import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useCommandState } from "cmdk";
import React from "react";
import { Badge } from "#/components/ui/Badge";
import { Button } from "#/components/ui/Button";
import {
  Command,
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
import { Separator } from "#/components/ui/Separator";
import { cn } from "#/lib/utils";

import { withConditional } from "../../withConditional";
import { SelectFieldProps } from "./SelectField";

const SubItem = ({ tags, onSelect, ...props }) => {
  const search = useCommandState((state) => state.search);
  if (!search) return null;

  const tagExists = tags.some((tag) => tag.value === search);
  if (tagExists) return null;

  return (
    <CommandItem onSelect={() => onSelect({ tag: search })} {...props}>
      {search}
    </CommandItem>
  );
};
export interface MultiSelectField extends SelectFieldProps {
  type: "multi_select";
}

export const MultiSelect = withConditional<MultiSelectField>(
  ({ form, field }) => {
    const [options, setOptions] = React.useState(field.options || []);
    const selection = form.watch(field.name) || [""];

    const addNewTag = ({ tag }) => {
      setOptions((state) => [...state, { label: tag, value: tag }]);
      form.setValue(
        field.name,
        selection.length === 1 && selection[0] === ""
          ? [tag]
          : [...selection, tag]
      );
    };

    return (
      <FormField
        control={form.control}
        name={field.name}
        rules={field.required ? { required: true } : undefined}
        render={({ field: formField }) => {
          const formFieldValue = Array.isArray(formField.value)
            ? formField.value.length === 0
              ? [""]
              : formField.value
            : [""];

          return (
            <FormItem className="flex min-w-[6rem] flex-col">
              <FormLabel tooltip={field.tooltip}>{field.label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      size="sm"
                      className="my-4 border-dashed dark:border-2"
                    >
                      <PlusCircledIcon className="mr-2 size-4" />
                      {selection?.length > 0 && selection[0] !== "" && (
                        <>
                          <Separator
                            orientation="vertical"
                            className="mx-2 h-4"
                          />
                          <Badge
                            color="secondary"
                            className={cn("rounded-sm px-1 font-normal", {
                              hidden: selection.length <= 3,
                            })}
                          >
                            {selection.length}
                          </Badge>
                          <div
                            className={cn("space-x-1 flex", {
                              hidden: selection.length > 3,
                              flex: selection.length <= 3,
                            })}
                          >
                            {options
                              ?.filter((option) =>
                                formField.value?.includes(option.value)
                              )
                              .map((option) => (
                                <Badge
                                  color="secondary"
                                  key={option.value}
                                  className="rounded-sm px-1 font-normal max-w-[200px] truncate overflow-hidden whitespace-nowrap"
                                >
                                  {option.label}
                                </Badge>
                              ))}
                          </div>
                        </>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="max-w-[500px] p-0">
                  <Command>
                    <CommandInput placeholder={field.placeholder} />
                    <CommandList>
                      {options?.map((option) => {
                        const isSelected = formFieldValue.includes(
                          option.value
                        );
                        return (
                          <CommandItem
                            key={option.value}
                            onSelect={() => {
                              if (isSelected) {
                                const newValue = formFieldValue.filter(
                                  (value) => value !== option.value
                                );
                                form.setValue(
                                  field.name,
                                  newValue.length === 0 ? [""] : newValue
                                );
                              } else {
                                const newValue =
                                  formFieldValue[0] === ""
                                    ? [option.value]
                                    : [...formFieldValue, option.value];
                                form.setValue(field.name, newValue);
                              }
                            }}
                          >
                            <div
                              className={cn(
                                "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <CheckIcon className={cn("h-4 w-4")} />
                            </div>
                            <span>{option.label}</span>
                          </CommandItem>
                        );
                      })}
                      <SubItem tags={options} onSelect={addNewTag} />
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>{field.description}</FormDescription>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  }
);
