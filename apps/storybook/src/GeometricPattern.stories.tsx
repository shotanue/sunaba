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

export const Secondary: Story = {
	args: {
		seed: 42,
		triangleCount: 100,
		backgroundColor: "#18181b",
		colorPalette: ["#09090b", "#18181b", "#27272a", "#3f3f46", "#52525b"],
		strokeOpacity: 0.15,
		displacementFactor: 0.9,
	},
};
