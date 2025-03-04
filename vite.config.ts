import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import * as path from "path";

export default defineConfig({
  plugins: [
    dts({
      entryRoot: "src",
      tsconfigPath: path.join(__dirname, "tsconfig.json"),
    }),
  ],
  resolve: {
    alias: [
      {
        find: "~",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: "index",
      name: "FeedFramer",
      formats: ["umd"],
    },
    rollupOptions: {
        // Ensure proper file output
        output: {
          entryFileNames: "index.umd.js", // Ensures .js extension
          globals: {
            mustache: 'Mustache'
          },
          assetFileNames: "assets/[name][extname]", // CSS will go in assets/
        },
    },
  },
});
