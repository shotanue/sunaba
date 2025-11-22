import { Editor as Component } from "@repo/components";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	component: Component,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
	args: {},
	argTypes: {
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
		return (
			<div
				style={{
					width: "100vw",
					height: "100vh",
					margin: 0,
				}}
			>
				<Component {...args} />
			</div>
		);
	},
};
