import React from "react";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/Form";

import { withConditional } from "../withConditional";
import { BaseField } from "../types";
import RichTextEditor from "#/components/RichTextEditor";

export interface RichTextEditorFieldProps extends BaseField {
  type: "wysiwyg";
}

export const RichTextEditorField = withConditional<RichTextEditorFieldProps>(
  ({ form, field }) => {
    const { control, setValue } = form;
    const defaultValue = form.getValues(field.name) || field.defaultValue || "";

    const handleRichTextChange = (content) => {
      setValue(field.name, content);
    };

    return (
      <FormField
        control={control}
        name={field.name}
        // @ts-ignore
        rules={
          field.required && {
            required: true,
          }
        }
        defaultValue={defaultValue}
        render={({ field: formField }) => (
          <FormItem className="w-full">
            <FormLabel tooltip={field.tooltip} required={field.required}>
              {field.label}
            </FormLabel>
            <FormDescription>{field.description}</FormDescription>
            <input hidden {...formField} value={formField.value} />
            <RichTextEditor
              initialValue={
                typeof formField.value === "string" ? formField.value : ""
              }
              onChange={handleRichTextChange}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);
