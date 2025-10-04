import type { BetterAuthPlugin } from "better-auth";
import { initialize } from "./endpoints/initialize";
import { ChapaOptions } from "./types";
import { verify } from "./endpoints/verify";
import { transfer } from "./endpoints/transfer";
import { webhook } from "./webhook";

export * from "./client";

export const chapaPlugin = (options: ChapaOptions) => {
  const plugins = [
    initialize(),
    verify(),
    transfer(),
    ...(options.webhookSecret ? [webhook(options)] : []),
  ]
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
