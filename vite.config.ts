import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: "src/Plugin.tsx", // Path to your main component
      name: "ContactsManager",
      formats: ["umd"],
      fileName: (format) => `contacts-manager.${format}.js`,
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        // Global variables for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
