import type { Chapa } from "chapa-nodejs";
import { createAuthEndpoint } from "better-auth/api";

export const verify = () => (client: Chapa) => {
  return {
    verify: createAuthEndpoint(
      "/chapa/verify",
      {
        method: "POST",
      },
      async (ctx) => {
        try {
          const { tx_ref } = ctx.body;
          const response = await client.verify({ tx_ref });

          return ctx.json(response);
        } catch (error: any) {
          return ctx.json(
            { error: error?.message || "Failed to verify payment" },
            { status: 500 },
          );
        }
      },
    ),
  };
};
