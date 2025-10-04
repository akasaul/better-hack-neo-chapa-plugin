import type { BetterAuthPlugin } from "better-auth";
import { initialize } from "./endpoints/initialize";
import { ChapaOptions } from "./types";

export * from "./client";

export const chapaPlugin = (options: ChapaOptions) => {
  const plugins = [initialize()]
    .map((endpoint) => endpoint(options.client))
    .reduce((acc, endpoint) => {
      Object.assign(acc, endpoint);
      return acc;
    }, {});

  return {
    id: "chapa",
    endpoints: {
      ...plugins,
    },
  } satisfies BetterAuthPlugin;
};
