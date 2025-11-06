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
  const monacoRef = useRef<any>(null);
  const editorRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const lastValueRef = useRef<string>(value);

  useEffect(() => {
    let disposed = false;
    (async () => {
      const { init } = await import("modern-monaco");
      const monaco = await init({ theme });
      if (disposed || !containerRef.current) return;
      monacoRef.current = monaco;

      const model = monaco.editor.createModel(value, language);
      modelRef.current = model;

      const editor = monaco.editor.create(containerRef.current, {
        automaticLayout: true,
        ...options,
      });
      editorRef.current = editor;
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
  }, []);

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


