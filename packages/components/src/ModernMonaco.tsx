import type * as Monaco from "monaco-editor";
import { useEffect, useRef } from "react";

export type ModernMonacoProps = {
	value?: string;
	language?: string;
	theme?: string;
	height?: number | string;
	className?: string;
	onChange?: (value: string) => void;
	// Narrow subset to avoid leaking all monaco types upstream
	options?: Record<string, unknown>;
};

export function ModernMonaco({
	value = "",
	language = "javascript",
	theme = "vitesse-dark",
	height = 400,
	className,
	onChange,
	options,
}: ModernMonacoProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const monacoRef = useRef<typeof Monaco | null>(null);
	const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
	const modelRef = useRef<Monaco.editor.ITextModel | null>(null);
	const lastValueRef = useRef<string>(value);

	useEffect(() => {
		let disposed = false;
		(async () => {
			const { init } = await import("modern-monaco");
			const monaco = await init({ theme });
			if (disposed || !containerRef.current) return;
			monacoRef.current = monaco as unknown as typeof Monaco;

			const model = monaco.editor.createModel(value, language);
			modelRef.current = model as unknown as Monaco.editor.ITextModel;

			const editor = monaco.editor.create(containerRef.current, {
				automaticLayout: true,
				...options,
			});
			editorRef.current =
				editor as unknown as Monaco.editor.IStandaloneCodeEditor;
			editor.setModel(model);

			if (onChange) {
				editor.onDidChangeModelContent(() => {
					const next = model.getValue();
					lastValueRef.current = next;
					onChange(next);
				});
			}
		})();

		return () => {
			disposed = true;
			try {
				editorRef.current?.dispose?.();
			} catch {}
			try {
				modelRef.current?.dispose?.();
			} catch {}
			editorRef.current = null;
			modelRef.current = null;
			monacoRef.current = null;
		};
	}, [language, onChange, options, theme, value]);

	useEffect(() => {
		const monaco = monacoRef.current;
		const model = modelRef.current;
		if (!monaco || !model) return;
		if (language) {
			monaco.editor.setModelLanguage(model, language);
		}
	}, [language]);

	useEffect(() => {
		const model = modelRef.current;
		if (!model) return;
		if (value !== lastValueRef.current && value !== model.getValue()) {
			model.pushEditOperations(
				[],
				[
					{
						range: model.getFullModelRange(),
						text: value,
					},
				],
				() => null,
			);
			lastValueRef.current = value;
		}
	}, [value]);

	return (
		<div
			ref={containerRef}
			className={className}
			style={{ height: typeof height === "number" ? `${height}px` : height }}
		/>
	);
}
