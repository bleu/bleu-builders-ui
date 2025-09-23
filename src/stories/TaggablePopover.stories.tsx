import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { TaggablePopover } from "../components/TaggablePopover";

const sampleTags = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "database", label: "Database" },
  { value: "api", label: "API" },
  { value: "ui", label: "UI" },
  { value: "testing", label: "Testing" },
  { value: "documentation", label: "Documentation" },
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "enhancement", label: "Enhancement" },
];

const meta = {
  title: "Components/TaggablePopover",
  component: TaggablePopover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    tags: sampleTags,
    selectedTags: [],
    onSelect: () => {},
    triggerAlert: false,
    alertDescription: undefined,
  },
} satisfies Meta<typeof TaggablePopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSelectedTags: Story = {
  args: {
    tags: sampleTags,
    selectedTags: ["frontend", "ui"],
    onSelect: () => {},
    triggerAlert: false,
    alertDescription: undefined,
  },
  render: (args) => {
    const [selectedTags, setSelectedTags] = useState(args.selectedTags);

    const handleTagSelect = ({ tag }) => {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    };

    return (
      <TaggablePopover
        {...args}
        selectedTags={selectedTags}
        onSelect={handleTagSelect}
      />
    );
  },
};

export const WithAlert: Story = {
  args: {
    tags: sampleTags,
    selectedTags: [],
    onSelect: () => {},
    triggerAlert: true,
    alertDescription:
      "Are you sure you want to modify the tags? This action will be logged.",
  },
  render: (args) => {
    const [selectedTags, setSelectedTags] = useState(args.selectedTags);

    const handleTagSelect = ({ tag }: { tag: string }) => {
      setSelectedTags((prev: string[]) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    };

    return (
      <TaggablePopover
        {...args}
        selectedTags={selectedTags}
        onSelect={handleTagSelect}
      />
    );
  },
};

export const WithCustomAlertDescription: Story = {
  args: {
    tags: sampleTags,
    selectedTags: ["backend"],
    onSelect: () => {},
    triggerAlert: true,
    alertDescription:
      "Changing tags will affect the project classification and may impact search results.",
  },
  render: (args) => {
    const [selectedTags, setSelectedTags] = useState(args.selectedTags);

    const handleTagSelect = ({ tag }) => {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    };

    return (
      <TaggablePopover
        {...args}
        selectedTags={selectedTags}
        onSelect={handleTagSelect}
      />
    );
  },
};
