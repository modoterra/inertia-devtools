import { defineConfig } from "vite";
import { resolve } from "path";
import copy from "rollup-plugin-copy";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    open: "/panel.html",
  },
  build: {
    rollupOptions: {
      input: {
        background: resolve(__dirname, "background.ts"),
        content: resolve(__dirname, "content.ts"),
        devtools: resolve(__dirname, "devtools.html"),
        panel: resolve(__dirname, "panel.html"),
      },
      output: {
        entryFileNames: "assets/[name].js",
      },
      plugins: [
        copy({
          targets: [{ src: "manifest.json", dest: "build/" }],
          hook: "writeBundle",
        }),
      ],
    },
    outDir: "build",
    emptyOutDir: true,
  },
});
