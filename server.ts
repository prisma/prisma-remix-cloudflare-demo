import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import { z } from "zod";

export const AppEnv = z.object({
  env: z.object({
    DATABASE_URL: z.string(),
  }),
});

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    env: z.output<typeof AppEnv>['env'],
  }
}

if (build.mode === "development") {
  logDevReady(build);
}

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context) => {
    return AppEnv.parse(context);
  },
  mode: build.mode,
});
