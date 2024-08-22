import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const root: string = process.cwd();
const pathResolve = (path: string): string => resolve(root, path);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      /** 设置 `@` 指向 `src` 目录 */
      { find: "@", replacement: pathResolve("src") },
      /** 设置 `#` 指向 `types` 目录 */
      // { find: '#', replacement: pathResolve('types') },
    ],
  },
});
