import { healthCheckHandler } from "./health/health";
import { createOrder } from "./order/createOrder";
import { getOrder } from "./order/getOrder";
import { initiatePayment } from "./payment/initiatePayment";
import { paymentWebhook } from "./payment/paymentWebhook";

export const handlers = {
  health: healthCheckHandler,
  createOrder,
  getOrder,
  initiatePayment,
  paymentWebhook
};
