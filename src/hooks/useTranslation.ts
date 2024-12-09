//TODO: find out why it was "next/compat/router"
import { useRouter } from "next/router";
import { en, ru } from "../locales";

export const useTranslation = () => {
  const router = useRouter();

  const locale = router?.locale === "en" ? en : ru;

  return locale;
};

export const useScopedTranslation = <T extends keyof typeof en>(
  namespace: T,
) => {
  const locale = useTranslation();

  return locale[namespace];
};
