import { PAYMENT_PROVIDERS } from "../types";

export const formatPaymentMethod = (method: PAYMENT_PROVIDERS) => {
  switch (method) {
    case PAYMENT_PROVIDERS.PAYPAL:
      return "PayPal";
    case PAYMENT_PROVIDERS.STRIPE:
      return "Stripe";
  }
};
