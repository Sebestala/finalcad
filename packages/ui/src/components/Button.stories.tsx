import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    className: { control: "text" },
    ariaLabel: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Bouton par défaut",
  },
};

export const Primary: Story = {
  args: {
    children: "Bouton primaire",
    className: "bg-blue-500 text-white hover:bg-blue-600",
  },
};

export const Disabled: Story = {
  args: {
    children: "Bouton désactivé",
    disabled: true,
  },
};

export const WithAriaLabel: Story = {
  args: {
    children: "Bouton avec aria-label",
    ariaLabel: "Cliquez ici pour une action spéciale",
  },
};
