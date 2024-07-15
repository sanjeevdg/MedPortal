import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//"@aws-sdk/client-s3"
// "@aws-sdk/client-s3"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
  optimizeDeps: {
    include: [],
  },
});
