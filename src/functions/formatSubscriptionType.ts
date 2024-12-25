import { LocaleType } from "../locales";
import { SUBSCRIPTION_TYPES } from "../types";

export const formatSubscriptionType = (
  type: SUBSCRIPTION_TYPES,
  t: LocaleType["Payments"],
) => {
  let label: string;

  switch (type) {
    case SUBSCRIPTION_TYPES.DAY:
      label = `$1 ${t.oneDay}`;
      break;
    case SUBSCRIPTION_TYPES.WEEKLY:
      label = `$7 ${t.sevenDays}`;
      break;
    case SUBSCRIPTION_TYPES.MONTHLY:
      label = `1 ${t.oneMonth}`;
      break;
    default:
      label = "unknown subsription type";
  }

  return label;
};
