import { Meta, StoryObj } from "@storybook/react";
import FormBuilderDemo from "./demo/FormBuilderDemo";
import { BaseField } from "../components/formBuilder/types";

const meta = {
  title: "Form Builder",
  component: FormBuilderDemo,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof FormBuilderDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

// render componente
export const BuildFormTextInputFields: Story = {
  args: {
    title: "Demo",
    description: "Demo with simple inputs",
    fields: [
      {
        type: "input",
        name: "input_normal",
        label: "Simple text input",
        required: true,
      },
      {
        type: "input",
        mode: "number",
        name: "number",
        label: "Number input",
        required: true,
        description: "This is a number input",
      },
      {
        type: "textarea",
        name: "text",
        label: "Text input",
        required: true,
        description: "This is a text input",
      },
      {
        type: "wysiwyg",
        name: "wysiwyg",
        label: "Wysiwyg / Rich Text input",
        description: "This is a wysiwyg where you can write rich text",
      },
    ] as BaseField[],
  },
};

export const BuildFormWithCheckFields: Story = {
  args: {
    title: "Demo with toggable fields",
    description: "This is a demo with toggable fields",
    fields: [
      {
        type: "checkbox",
        name: "checkbox",
        label: "Checkbox input",
        description: "This is a checkbox input",
        required: true,
      },
      {
        type: "radio_item",
        name: "radio_item",
        label: "Radio Item",
        required: true,
        options: [
          {
            label: "Option 1",
            value: "op1",
          },
          {
            label: "Option 2",
            value: "op2",
          },
        ],
      },
      {
        type: "switch",
        name: "switch",
        label: "Switch input",
        required: true,
        description: "This is a switch input",
      },
    ] as BaseField[],
  },
};

export const BuildFormSelectableFields: Story = {
  args: {
    title: "Demo with selectable fields",
    description: "This is a demo with selectable fields",
    fields: [
      {
        type: "select",
        label: "Select input type",
        description: "This is a select input where you can choose an option",
        name: "select_fields",
        required: true,
        options: [
          {
            label: "Option 1",
            value: "op1",
          },
          {
            label: "Option 2",
            value: "op2",
          },
        ],
      },
      {
        type: "multi_select",
        label: "Multi Select input type",
        description: "This is a select input where you can choose an option",
        name: "select_fields_multi",
        required: true,
        options: [
          {
            label: "Option 1",
            value: "op1",
          },
          {
            label: "Option 2",
            value: "op2",
          },
          {
            label: "Option 3",
            value: "op3",
          },
        ],
      },
      {
        type: "searchable_select",
        label: "Searchable Select input type",
        description:
          "This is a searchable select input where you can choose an option",
        name: "select_fields_searchable",
        required: true,
        options: [
          {
            label: "Option 1",
            value: "op1",
          },
          {
            label: "Option 2",
            value: "op2",
          },
          {
            label: "Option 3",
            value: "op3",
          },
        ],
      },
    ] as BaseField[],
  },
};

export const BuildFormDateFields: Story = {
  args: {
    title: "Demo with date fields",
    description: "This is a demo with date fields",
    required: true,
    fields: [
      {
        type: "date",
        label: "Date input type",
        description: "This is a date input",
        name: "date",
      },
      {
        type: "datetime",
        label: "Datetime input type",
        description: "This is a datetime input",
        name: "datetime",
      },
    ] as BaseField[],
  },
};

export const BuildFormColorPicker: Story = {
  args: {
    title: "Demo with color picker",
    description: "This is a demo with color picker",
    fields: [
      {
        type: "color_picker",
        label: "Color Picker",
        description: "This is a color picker",
        name: "color_picker",
      },
    ] as BaseField[],
  },
};

export const BuildFormFileInput: Story = {
  args: {
    title: "Demo with file input",
    description: "This is a demo with file input",
    fields: [
      {
        type: "file",
        label: "File input",
        description: "This is a file input",
        name: "file",
        accept: ".png",
        download: true,
        mode: "file",
      },
    ] as BaseField[],
  },
};

export const BuildFormFieldArray: Story = {
  args: {
    title: "Demo with field array",
    description: "This is a demo with field array",
    fields: [
      {
        type: "field_array",
        label: "Field Array",
        description: "This is a field array",
        name: "field_array",
        fields: [
          {
            type: "input",
            name: "field_array.RESOURCE_ID.name",
            label: "Field Array Input",
            required: true,
          },
        ] as BaseField[],
      },
    ] as BaseField[],
  },
};

export const BuildFormHiddenField: Story = {
  args: {
    title: "Demo with hidden field",
    description: "This is a demo with hidden field",
    fields: [
      {
        type: "hidden",
        name: "hidden",
        value: "hidden",
      },
    ] as BaseField[],
  },
};

// export const BuildFormDelegateField: Story = {
//   args: {
//     title: "Demo with delegate field",
//     description: "This is a demo with delegate field",
//     fields: [
//       {
//         type: "delegate",
//         name: "delegate",
//         label: "Delegate Field",
//         description: "This is a delegate field",
//         delegateKey: "delegateKey",
//         options: [
//           {
//             delegateValue: "delegateValue1",
//             value: "value1",
//           },
//           {
//             delegateValue: "delegateValue2",
//             value: "value2",
//           },
//         ],
//       },
//     ] as BaseField[],
//   },
// };
