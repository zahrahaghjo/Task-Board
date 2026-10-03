import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set base to "/your-repo-name/" when deploying to GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: "./",
});
