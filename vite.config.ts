import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { EsLinter, linterPlugin } from "vite-plugin-linter"
import tsConfigPaths from "vite-tsconfig-paths"

import * as packageJson from "./package.json"

export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ["./src/**/*.{ts,tsx}"],
      linters: [new EsLinter({ configEnv })],
    }),
    dts(),
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "ReactSparklines",
      formats: ["es", "umd"],
      fileName: (format) => `react-sparklines.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        },
      },
    },
  },
}))
