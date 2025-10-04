import { createAuthEndpoint } from "better-auth/api";
import type {
  ChapaOptions,
  ChargeRefundedEvent,
  ChargeReversedEvent,
  ChargeSuccessEvent,
  ChargeFailedEvent,
} from "./types";

export const webhook = (options: ChapaOptions) => () => {
  return {
    webhook: createAuthEndpoint(
      "/chapa/webhook",
      {
        method: "GET",
        allowUnauthenticated: true,
      },
      async (ctx) => {
        try {
          // Get query parameters from the GET request
          if (!ctx.request) {
            return ctx.json({ error: "Invalid request" }, { status: 400 });
          }

          const url = new URL(ctx.request.url);
          const trx_ref = url.searchParams.get("trx_ref");
          const status = url.searchParams.get("status");

          // Validate required parameters
          if (!trx_ref) {
            return ctx.json(
              { error: "Missing trx_ref parameter" },
              { status: 400 },
            );
          }

          if (!status) {
            return ctx.json(
              { error: "Missing status parameter" },
              { status: 400 },
            );
          }

          // Verify the transaction with Chapa to get full details
          const verifyResponse = await options.client.verify({
            tx_ref: trx_ref,
          });

          if (!verifyResponse || verifyResponse.status !== "success") {
            return ctx.json(
              { error: "Failed to verify transaction with Chapa" },
              { status: 400 },
            );
          }

          // Map the status to event type and call appropriate handler
          if (options.webhookHandlers) {
            // Construct event data based on verification response
            const eventData = {
              ...verifyResponse.data,
              tx_ref: trx_ref,
            };

            switch (status) {
              case "success":
                if (options.webhookHandlers.onChargeSuccess) {
                  await options.webhookHandlers.onChargeSuccess({
                    ...eventData,
                  } as unknown as ChargeSuccessEvent);
                }
                break;

              case "refunded":
                if (options.webhookHandlers.onChargeRefunded) {
                  await options.webhookHandlers.onChargeRefunded({
                    ...eventData,
                  } as unknown as ChargeRefundedEvent);
                }
                break;

              case "reversed":
                if (options.webhookHandlers.onChargeReversed) {
                  await options.webhookHandlers.onChargeReversed({
                    ...eventData,
                  } as unknown as ChargeReversedEvent);
                }
                break;

              case "failed/cancelled":
                if (options.webhookHandlers.onChargeFailed) {
                  await options.webhookHandlers.onChargeFailed({
                    ...eventData,
                  } as unknown as ChargeFailedEvent);
                }
                break;
              default:
                console.warn(`Unhandled webhook status: ${status}`);
            }
          }

          return ctx.json({
            message: "Webhook received successfully",
            trx_ref,
            status,
          });
        } catch (error: any) {
          console.error("Webhook processing error:", error);
          return ctx.json(
            { error: error?.message || "Failed to process webhook" },
            { status: 500 },
          );
        }
      },
    ),
  };
};
