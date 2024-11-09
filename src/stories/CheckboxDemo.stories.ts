import { Meta, StoryObj } from "@storybook/react";
import { CheckboxDemo } from "./demo/CheckboxDemo";

const meta = {
  title: "Components/Checkbox",
  component: CheckboxDemo,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CheckboxDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  args: {},
};
