import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDevelopment = command === "serve";

  return {
    plugins: [
      react({
        babel: {
          plugins: [
            [
              "babel-plugin-react-compiler",
              {
                panicThreshold: isDevelopment ? "all_errors" : "none",
              },
            ],
          ],
        },
      }),
      tailwindcss(),
    ],
  };
});
