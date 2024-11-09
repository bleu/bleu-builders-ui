import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Badge, BadgeProps } from "../components/ui/Badge";
// meta
const meta = {
  title: "Components/Badge",
  render: (args) => <Badge {...args}>{args.children}</Badge>,
  tags: ["autodocs"],
  args: {
    color: "primary",
    outline: "none",
    size: "md",
    children: "text",
  },
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "destructive", "pending"],
    },
    outline: {
      control: { type: "select" },
      options: ["none", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
  },

  parameters: {
    layout: "centered",
  },
} satisfies Meta<BadgeProps>;

export default meta;

type Story = StoryObj<typeof meta>;

// colors
export const Default: Story = {
  args: {
    color: "primary",
  },
};
export const Secondary: Story = {
  args: {
    color: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    color: "destructive",
  },
};

export const Pending: Story = {
  args: {
    color: "pending",
  },
};

// sizes

export const Xs: Story = {
  args: {
    size: "xs",
  },
};

export const Sm: Story = {
  args: {
    size: "sm",
  },
};

export const Md: Story = {
  args: {
    size: "md",
  },
};

export const Lg: Story = {
  args: {
    size: "lg",
  },
};

// outline

export const OutlineBadge: Story = {
  args: {
    outline: "outline",
  },
};

// link

export const LinkWithStyleBadge: Story = {
  render: ({ color, outline, size, children }) => (
    <Badge color={color} outline={outline} size={size}>
      {children}
    </Badge>
  ),
};
