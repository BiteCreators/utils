import { authTranslationEn } from "./auth";
import { commonTranslationEn } from "./common";
import { devicesTranslationsEn } from "./devices";
import { followersAdminEn } from "./followers";
import { internationalizationTranslationEn } from "./internationalization";
import { navigationTranslationEn } from "./navigation";
import { paymentsTranslationsEn } from "./payments";
import { postsTranslationsEn } from "./posts";
import { privacyPolicyTranslationEn } from "./privacy-policy";
import { profileTranslationEn } from "./profile";
import { termsServiceTranslationEn } from "./terms-service";

export const en = {
  Auth: authTranslationEn,
  Common: commonTranslationEn,
  Devices: devicesTranslationsEn,
  FollowersAdmin: followersAdminEn,
  Internationalization: internationalizationTranslationEn,
  Navigation: navigationTranslationEn,
  Payments: paymentsTranslationsEn,
  Posts: postsTranslationsEn,
  PrivacyPolicy: privacyPolicyTranslationEn,
  Profile: profileTranslationEn,
  TermsService: termsServiceTranslationEn,
};
export type LocaleType = typeof en;
