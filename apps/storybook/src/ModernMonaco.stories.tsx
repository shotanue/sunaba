import { useState } from "react";
import { ModernMonaco as Component } from "@repo/components";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: Component,
  tags: ["autodocs"],
  args: {
    value: "console.log(\"Hello, world!\")",
    language: "javascript",
    theme: "vitesse-dark",
    height: 400,
  },
  argTypes: {
    language: {
      control: "select",
      options: ["javascript", "typescript", "json", "html", "css"],
    },
    theme: {
      control: "select",
      options: ["vitesse-dark", "vitesse-light"],
    },
    height: { control: { type: "number", min: 200, max: 1000, step: 50 } },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [code, setCode] = useState<string>(String(args.value ?? ""));
    return (
      <div style={{ width: 800 }}>
        <Component
          {...args}
          value={code}
          onChange={(v) => setCode(v)}
        />
      </div>
    );
  },
};


