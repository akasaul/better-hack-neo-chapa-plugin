import type { Chapa } from "chapa-nodejs";
import { APIError, createAuthEndpoint } from "better-auth/api";

export const initialize = () => (client: Chapa) => {
  return {
    initialize: createAuthEndpoint(
      "/chapa/initialize",
      {
        method: "POST",
      },
      async (ctx) => {
        try {
          const {
            first_name,
            last_name,
            phone_number,
            amount,
            customization,
            meta,
            email,
            currency,
            return_url,
          } = ctx.body;

          // Use Chapa SDK's genTxRef method
          const tx_ref = await client.genTxRef();

          // Use Chapa SDK's initialize method with all supported parameters
          const response = await client.initialize({
            first_name,
            last_name,
            email,
            phone_number,
            currency,
            amount,
            tx_ref,
            callback_url: ctx.context.baseURL + "/chapa/webhook",
            return_url,
            ...(customization && { customization }),
            ...(meta && { meta }),
          });

          return ctx.json(response);
        } catch (error: any) {
          throw new APIError("BAD_REQUEST", {
            message: "Failed to initialize payment",
          });
        }
      },
    ),
  };
};
