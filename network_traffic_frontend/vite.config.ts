import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  build: {
    outDir: "dist-react",
  },
  preview: {
    port: 5123,
    strictPort: true,
  },
  server: {
    host: true,
    port: 5123,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    cors: {
      origin: "http://localhost:5123/",
      credentials:true,
    },
    proxy: {
      "/network" :{
        // target: "http://localhost:8081",
        target: "http://network-traffic-backend:8080/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/network/, ''),
      },
    }
  },
  resolve: {
    alias: {
      "@": resolve("./src"),
      "@lib": resolve("./src/lib"),
      "@pages": resolve("./src/pages"),
      "@model": resolve("./src/model"),
      "@hooks": resolve("./src/hooks"),
      "@config": resolve("./src/config"),
      "@routes": resolve("./src/routes"),
      "@assets": resolve("./src/assets"),
      "@entity": resolve("./src/entity"),
      "@handler": resolve("./src/handler"),
      "@service": resolve("./src/service"),
      "@context": resolve("./src/context"),
      "@components": resolve("./src/components")
    },
  },
});