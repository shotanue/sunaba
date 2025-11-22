import * as monaco from "monaco-editor";

export const Editor = () => {
	return (
		<div
			className="h-full w-full"
			ref={(node: HTMLDivElement) => {
				const editor = monaco.editor.create(node, {
					value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
						"\n",
					),
					language: "typescript",
				});

				return () => {
					editor.dispose();
				};
			}}
		/>
	);
};
