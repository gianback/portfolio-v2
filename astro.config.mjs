// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
// https://astro.build/config
export default defineConfig({
  output: "server",

  devToolbar: {
    enabled: false,
  },

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

  integrations: [react()],
  adapter: vercel(),
});
