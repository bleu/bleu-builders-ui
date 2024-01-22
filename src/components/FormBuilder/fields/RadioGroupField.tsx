import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import { BaseField, withConditional } from "../fields";

export interface RadioGroupFieldProps extends BaseField {
  sections: Array<{
    description: string;
    label: string;
    options: Array<{
      label: string;
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

const RadioGroupWithoutSection = ({ form, field }) => {
  const hasClearButton = field.show_clear_button;
  const [selectedValue, setSelectedValue] = React.useState(
    form.getValues(field.name)
  );

  React.useEffect(() => {
    setSelectedValue(form.getValues(field.name));
  }, [form, field.name]);

  const handleChange = (value) => {
    setSelectedValue(value);
    form.setValue(field.name, value);
  };

  const clearSelection = () => {
    setSelectedValue(null);
    form.setValue(field.name, null);
  };

  return (
    <FormField
      control={form.control}
      name={field.name}
      rules={field.required ? { required: true } : {}}
      render={() => (
        <FormItem className="space-y-0 w-full">
          <FormLabel>{field.label}</FormLabel>
          <FormDescription>{field.description}</FormDescription>
          <FormControl>
            <RadioGroup
              onValueChange={handleChange}
              value={selectedValue}
              className={cn(radioGroupVariants(field), "py-2")}
            >
              {field.options.map((option, optionIdx) => (
                <FormItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={optionIdx}
                  className="flex items-center space-x-1 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />

          {hasClearButton && (
            <Button type="button" onClick={clearSelection}>
              Clear
            </Button>
          )}
        </FormItem>
      )}
    />
  );
};

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
            <FormLabel>{field.label}</FormLabel>
            <FormDescription className="">{field.description}</FormDescription>
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
                            <FormLabel className="font-normal">
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
