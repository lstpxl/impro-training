import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // @ts-expect-error Property 'env' does not exist on type 'ImportMeta'.ts
  console.log("import.meta.env.BASE_URL=", import.meta.env.BASE_URL);
  // @ts-expect-error Property 'env' does not exist on type 'ImportMeta'.ts
  console.log("import.meta.env.VITE_BASE_URL=", import.meta.env.VITE_BASE_URL);
  // @ts-expect-error Property 'env' does not exist on type 'ImportMeta'.ts
  console.log("import.meta.env.VITE_DEP_URL=", import.meta.env.VITE_DEP_URL);

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // @ts-expect-error Property 'env' does not exist on type 'ImportMeta'.ts
    base: import.meta.env.BASE_URL,
  });
};
