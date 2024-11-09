import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { DataTableDemo } from "./demo/DataTableDemo";

const data = {
  total: 2,
  data: [
    {
      name: "Joao Victor",
      email: "joao@bleu.builders",
      sign_in_count: 2,
      points: 1503,
    },
    {
      name: "José",
      email: "jose@bleu.builders",
      sign_in_count: 2,
      points: 1503,
    },
  ],
  columns: [
    {
      accessorKey: "name",
      title: "Name",
      type: "text",
      value: " ",
      hide: false,
      field_options: {},
    },
    {
      accessorKey: "email",
      title: "Email",
      type: "text",
      value: "",
      hide: false,
      field_options: {},
    },
    {
      accessorKey: "sign_in_count",
      title: "Sign in count",
      type: "text",
      value: 0,
      hide: false,
      field_options: {},
    },
    {
      accessorKey: "points",
      title: "Points",
      type: "text",
      value: 0,
      hide: false,
      field_options: {},
    },
    {
      id: "actions",
      type: "actions",
      accessorKey: "actions",
      actions: [],
    },
  ],
  filters: [],
  search: {},
};

const meta = {
  title: "Data Table",
  component: DataTableDemo,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof DataTableDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

// render componente with data as props
export const BuildFormTextInputFields: Story = {
  args: {
    data,
  },
};
