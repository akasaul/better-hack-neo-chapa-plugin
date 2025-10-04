import type { BetterAuthPlugin } from "better-auth";

export const chapaPlugin = () => {
  // Inject Chapa client into all endpoints using factory pattern

  return {
    id: "chapa",
    endpoints: {},
  } satisfies BetterAuthPlugin;
};
