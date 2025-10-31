import React, { useEffect } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { cva } from "class-variance-authority";
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

import { withConditional } from "../../withConditional";
import { SelectFieldProps } from "./SelectField";
import { cn } from "#/lib/utils";

function hexToBrightness(hexColor: string | undefined) {
  // ensure the hex color is valid and in the proper format
  if (!hexColor || hexColor.length !== 7 || hexColor[0] !== "#") {
    return 120;
  }

  // extract the RGB components from the hex color
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);

  // calculate luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance;
}
export interface ColorPickerFieldProps extends SelectFieldProps {
  color_content_key?: string;
  set_content?: boolean;
  style?: {
    size?: "small" | "full";
  };
}

const colorPickerVariants = cva("w-full", {
  variants: {
    size: {
      small: "w-64 max-w-64",
      full: "w-full",
    },
  },
  defaultVariants: {
    size: "small",
  },
});

export const ColorPickerField = withConditional<ColorPickerFieldProps>(
  ({ form, field }) => {
    const [color, setColor] = React.useState(
      form.watch(field.name) || undefined
    );
    const [contentColor, setContentColor] = React.useState("");

    useEffect(() => {
      if (!field.set_content) return;

      const contentValue =
        hexToBrightness(form.watch(field.name)) > 128 ? "#000000" : "#FFFFFF";
      setContentColor(contentValue);
    }, [form.watch(field.name)]);

    const handleColorChange = (content) => {
      setColor(content);
      form.setValue(field.name, content);
    };

    return (
      <>
        <FormField
          control={form.control}
          name={field.name}
          defaultValue={color}
          render={({ field: formField }) => (
            <FormItem className="grid grid-flow-row auto-rows-min content-end w-full">
              <FormLabel tooltip={field.tooltip} required={field.required}>
                {field.label}
              </FormLabel>
              <FormDescription>{field.description}</FormDescription>
              <div
                className={cn(
                  "bg-background ring-offset-background placeholder:text-muted-foreground focus-within:ring-ring flex h-10 items-center rounded-md border text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  colorPickerVariants(field.style)
                )}
              >
                {color && <span className="ml-3">#</span>}
                <input
                  type="text"
                  className="p-2 mx-0 flex-1 border-0 border-transparent bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-transparent focus:ring-0"
                  defaultValue={
                    formField.value ? formField.value.slice(1) : undefined
                  }
                  placeholder="Choose a color"
                  onChange={(e) => handleColorChange(`#${e.target.value}`)}
                  value={color ? color.slice(1) : undefined}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="mr-2 size-7 rounded-full border shadow-lg"
                      style={{ background: formField.value ?? "#aabbcc" }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="m-0 w-fit p-0">
                    <HexAlphaColorPicker
                      color={formField.value ?? "#aabbcc"}
                      onChange={handleColorChange}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <input hidden {...formField} value={formField.value} />
              <FormMessage />
            </FormItem>
          )}
        />
        {field.set_content && (
          <FormField
            control={form.control}
            name={field.color_content_key!}
            defaultValue={contentColor}
            render={({ field: formField }) => (
              <FormControl>
                <input type="hidden" {...formField} value={contentColor} />
              </FormControl>
            )}
          />
        )}
      </>
    );
  }
);
