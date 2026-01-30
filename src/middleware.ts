// src/middleware.ts
import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((ctx, next) => {
  const url = new URL(ctx.request.url);

  if (url.hostname === "www.gianback.dev") {
    url.hostname = "gianback.dev";
    return Response.redirect(url.toString(), 301);
  }

  return next();
});
