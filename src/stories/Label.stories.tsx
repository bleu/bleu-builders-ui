import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Label } from "../components/ui/Label";

const meta = {
  title: "Components/Label",
  args: {
    children: "Bleu",
  },
  component: (args) => <Label {...args}>{args.children}</Label>,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<React.ComponentPropsWithRef<"label">>;

export default meta;

type Story = StoryObj<typeof meta>;

// render componente
export const LabelDemo: Story = {
  args: {},
};
