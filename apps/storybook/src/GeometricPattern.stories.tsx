import { GeometricPattern as Component } from "@repo/components";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  render: (args) => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Component {...args} />
    </div>
  ),
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    seed: 1763280663873,
  },
};
