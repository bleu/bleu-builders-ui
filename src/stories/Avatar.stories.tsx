import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";

// meta
const meta = {
  title: "Components/Avatar",
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/bleu.png" alt="avatar" />
      <AvatarFallback>Bleu Builders</AvatarFallback>
    </Avatar>
  ),
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<{}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AvatarWithImage: Story = {
  args: {},
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/bleu.png" alt="avatar" />
      <AvatarFallback>Avatar</AvatarFallback>
    </Avatar>
  ),
};
export const AvatarWithFallback: Story = {
  args: {},
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="avatar" />
      <AvatarFallback>bleu</AvatarFallback>
    </Avatar>
  ),
};
