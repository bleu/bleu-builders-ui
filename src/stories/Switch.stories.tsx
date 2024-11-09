import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Label } from "../components/ui/Label";
import { Switch } from "../components/ui/Switch";

const meta = {
  title: "Components/Switch",
  component: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<{}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SwitchDemo: Story = {
  args: {},
};
