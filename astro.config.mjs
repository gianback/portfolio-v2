// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
  output: "server",
  env: {
    schema: {
      GOOGLE_PRIVATE_KEY: envField.string({
        access: "public",
        context: "server",
        optional: true,
      }),
      GOOGLE_CLIENT_EMAIL: envField.string({
        access: "public",
        context: "server",
        optional: true,
      }),
      SPREADSHEET_ID: envField.string({
        access: "public",
        context: "server",
        optional: true,
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
