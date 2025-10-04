import { Chapa, InitializeResponse, DirectChargeResponse } from "chapa-nodejs";

export interface ChapaOptions {
  client: Chapa;
  webhookSecret?: string;
  webhookHandlers?: ChapaWebhookHandlers;
}

// Extending the Initialize response to support tx_ref
export interface ChapaInitializeResponse extends InitializeResponse {
  tx_ref: string;
}

// Extending the DirectCharge response to support tx_ref
export interface ChapaDirectChargeResponse extends DirectChargeResponse {
  tx_ref: string;
}

// Base interfaces for reusability
interface BaseChargeEvent {
  first_name: string;
  last_name: string;
  email: string | null;
  mobile: string;
  currency: string;
  amount: string;
  charge: string;
  mode: "live" | "test";
  reference: string;
  created_at: string;
  updated_at: string;
  type: string;
  tx_ref: string;
  payment_method: string;
  customization: {
    title: string | null;
    description: string | null;
    logo: string | null;
  };
  meta: any;
}

interface BasePayoutEvent {
  type: "Payout";
  account_name: string;
  account_number: string;
  bank_id: number;
  bank_name: string;
  amount: string;
  charge: string;
  currency: string;
  reference: string;
  chapa_reference: string;
  bank_reference: string;
  created_at: string;
  updated_at: string;
}

// Webhook Event Types based on Chapa documentation
export interface ChargeSuccessEvent extends BaseChargeEvent {
  event: "charge.success";
  status: "success";
}

export interface ChargeRefundedEvent extends BaseChargeEvent {
  event: "charge.refunded";
  status: "refunded";
}

export interface ChargeReversedEvent extends BaseChargeEvent {
  event: "charge.reversed";
  status: "reversed";
}

export interface ChargeFailedEvent extends BaseChargeEvent {
  event: "charge.failed/cancelled";
  status: "failed/cancelled";
}

export interface PayoutSuccessEvent extends BasePayoutEvent {
  event: "payout.success";
  status: "success";
}

export interface PayoutFailedEvent extends BasePayoutEvent {
  event: "payout.failed/cancelled";
  status: "failed/cancelled";
}

export type ChapaWebhookEvent =
  | ChargeSuccessEvent
  | ChargeRefundedEvent
  | ChargeReversedEvent
  | ChargeFailedEvent
  | PayoutSuccessEvent
  | PayoutFailedEvent;

export interface ChapaWebhookHandlers {
  onChargeSuccess?: (event: ChargeSuccessEvent) => Promise<void> | void;
  onChargeRefunded?: (event: ChargeRefundedEvent) => Promise<void> | void;
  onChargeReversed?: (event: ChargeReversedEvent) => Promise<void> | void;
  onChargeFailed?: (event: ChargeFailedEvent) => Promise<void> | void;
  onPayoutSuccess?: (event: PayoutSuccessEvent) => Promise<void> | void;
  onPayoutFailed?: (event: PayoutFailedEvent) => Promise<void> | void;
}

export interface ChapaOptions {
  client: Chapa;
  webhookSecret?: string;
  webhookHandlers?: ChapaWebhookHandlers;
}
