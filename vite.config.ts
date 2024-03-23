import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { EsLinter, linterPlugin } from "vite-plugin-linter"
import tsConfigPaths from "vite-tsconfig-paths"

import * as packageJson from "./package.json"
import { name } from './package.json'

const formattedName = name.match(/[^/]+$/)?.[0] ?? name

export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ["./lib/**/*.{ts,tsx}"],
      linters: [new EsLinter({ configEnv })],
    }),
    dts({
   /*   include: ["lib"],
      insertTypesEntry: true,*/
   /*   insertTypesEntry: true*/
      include: ["lib"],
      rollupTypes: true
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ["es", "umd"],
      name: formattedName,
      fileName: (format) => `react-sparklines.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom', ],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'react/jsx-runtime',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
}))
