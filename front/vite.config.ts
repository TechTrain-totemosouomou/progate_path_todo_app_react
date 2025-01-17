import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";

const frontPort = Number(process.env.FRONT_PORT) || 3000;
const apiPort = Number(process.env.API_PORT) || 8000;
const env = process.env.NODE_ENV || "development";
const getBackendUrl = () => {
  if (env === "development" && process.env.CODESPACES) {
    return `https://${process.env.CODESPACE_NAME}-${apiPort}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`;
  }
  return `http://localhost:${apiPort}`;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: frontPort,
    proxy: {
      "/api": getBackendUrl(),
      "/image": getBackendUrl(),
    },
  },
});
