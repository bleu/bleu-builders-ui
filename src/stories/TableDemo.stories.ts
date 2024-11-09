import { Meta, StoryObj } from "@storybook/react";
import { TableDemo } from "./demo/TableDemo";

const meta = {
  title: "Components/Table",
  component: TableDemo,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TableDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

// render componente
export const Table: Story = {
  args: {},
};
