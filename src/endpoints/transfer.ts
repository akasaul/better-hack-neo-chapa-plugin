import type { Chapa } from "chapa-nodejs";
import { createAuthEndpoint } from "better-auth/api";

export const transfer = () => (client: Chapa) => {
  return {
    transfer: createAuthEndpoint(
      "/chapa/transfer",
      {
        method: "POST",
      },
      async (ctx) => {
        try {
          const {
            account_name,
            account_number,
            amount,
            currency,
            reference,
            bank_code,
          } = ctx.body;

          // Use Chapa SDK's transfer method
          const response = await client.transfer({
            account_name,
            account_number,
            amount,
            currency,
            reference,
            bank_code,
          });

          return ctx.json(response);
        } catch (error: any) {
          return ctx.json(
            { error: error?.message || "Failed to initiate transfer" },
            { status: 500 },
          );
        }
      },
    ),
  };
};
