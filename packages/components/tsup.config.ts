import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src/index.tsx"],
	target: "esnext",
	format: ["esm"],
	clean: true,
	dts: true,
	treeshake: true,
	minify: false,
	sourcemap: true,
});
