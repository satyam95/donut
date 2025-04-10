import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: resolve(__dirname, "tsconfig.lib.json"),
      outDir: "dist",
      entryRoot: "lib",
      include: ["src", "lib"],
    }),
  ],
  build: {
    lib: {
      // Still use index.ts as the barrel file
      entry: resolve(__dirname, "lib/main.ts"),
      name: "YourLibrary",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "clsx", "tailwind-merge", "class-variance-authority"],
      output: {
        preserveModules: true, // Preserve file structure for better tree-shaking
        preserveModulesRoot: "lib",
        dir: "dist", // JS output will mirror the `lib` folder
        entryFileNames: "[name].js",
      },
    },
  },
});
