import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set the base path for GitHub Pages deployment (repository name)
  base: '/mall-space-optimiser/',

  // Server configuration for local development
  server: {
    host: "0.0.0.0", // Allows access from all network devices
    port: 8080,      // You can change this port if needed
  },

  // Plugins used by Vite
  plugins: [
    react(),
    mode === 'development' && componentTagger(), // Optional: only add in dev mode
  ].filter(Boolean), // Removes 'false' from the plugins array if mode !== 'development'

  // Path aliases for easier imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Use '@' to refer to the src folder
    },
  },
}));
