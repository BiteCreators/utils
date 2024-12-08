import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import { useRouter } from "next/router";

TimeAgo.addLocale(en);
TimeAgo.addLocale(ru);

/**
 *
 * @returns function that takes time and returns relative time
 */
export const useGetRelativeTime = () => {
  const router = useRouter();
  const locale = router.locale === "en" ? "en-US" : "ru-RU";

  const timeAgo = new TimeAgo(locale);

  const getRelativeTime = (time: number) => {
    return timeAgo.format(time);
  };

  return { getRelativeTime };
};
