import type { BetterAuthClientPlugin } from "better-auth/client";
import type { chapaPlugin } from "./index";
import { InitializeOptions } from "chapa-nodejs";

export const chapaClient = () => {
  return {
    id: "chapa-client",
    $InferServerPlugin: {} as ReturnType<typeof chapaPlugin>,
    getActions: ($fetch) => {
      return {
        chapa: {
          initializePayment: async (
            options: Omit<InitializeOptions, "tx_ref">,
          ) => {
            const res = await $fetch("/chapa/initialize", {
              method: "POST",
              body: options,
            });
            return res;
          },
        },
      };
    },
  } satisfies BetterAuthClientPlugin;
};
