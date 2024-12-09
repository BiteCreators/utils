import { renderHook } from "@testing-library/react";
import { NextRouter, useRouter } from "next/router";

import { useGetRelativeTime } from "../useGetRelativeTime";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock<Partial<NextRouter>>;

const routerWithEnLocale = {
  locale: "en",
};

describe("useGetRelativeTime", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({ ...routerWithEnLocale });
  });

  it("should return just now for the current date and time", () => {
    const { result } = renderHook(useGetRelativeTime);

    const currentDate = new Date().getTime();

    expect(result.current.getRelativeTime(currentDate)).toBe("just now");
  });
  it("should return correct time ago", () => {
    const { result } = renderHook(useGetRelativeTime);

    const currentDate = new Date().getTime();
    const oneDayAgo = currentDate - 24 * 60 * 60 * 1000;
    const twoDaysAgo = currentDate - 2 * 24 * 60 * 60 * 1000;
    const tenDaysAgo = currentDate - 10 * 24 * 60 * 60 * 1000;
    const monthAgo = currentDate - 30 * 24 * 60 * 60 * 1000;
    const yearAgo = currentDate - 365 * 24 * 60 * 60 * 1000;

    expect(result.current.getRelativeTime(oneDayAgo)).toBe("1 day ago");
    expect(result.current.getRelativeTime(twoDaysAgo)).toBe("2 days ago");
    expect(result.current.getRelativeTime(tenDaysAgo)).toBe("1 week ago");
    expect(result.current.getRelativeTime(monthAgo)).toBe("1 month ago");
    expect(result.current.getRelativeTime(yearAgo)).toBe("1 year ago");
  });
  it("should work with negative numbers", () => {
    const { result } = renderHook(useGetRelativeTime);

    const moreThanFiftyFiveYearsAgo = -1 * 365 * 24 * 60 * 60 * 1000;

    expect(
      parseInt(result.current.getRelativeTime(moreThanFiftyFiveYearsAgo)),
    ).toBeGreaterThanOrEqual(1);
  });
  it("should work with future dates", () => {
    const { result } = renderHook(useGetRelativeTime);

    const inOneDay = new Date().getTime() + 24 * 60 * 60 * 1000;
    const inOneYear = new Date().getTime() + 365 * 24 * 60 * 60 * 1000;

    expect(result.current.getRelativeTime(inOneDay)).toBe("in 1 day");
    expect(result.current.getRelativeTime(inOneYear)).toBe("in 1 year");
  });
  it("should translate in russian", () => {
    mockUseRouter.mockReturnValue({
      locale: "ru",
    });

    const { result } = renderHook(useGetRelativeTime);

    const currentDate = new Date().getTime();
    const oneDayAgo = currentDate - 24 * 60 * 60 * 1000;
    const yearAgo = currentDate - 365 * 24 * 60 * 60 * 1000;

    expect(result.current.getRelativeTime(oneDayAgo)).toBe("1 день назад");
    expect(result.current.getRelativeTime(yearAgo)).toBe("1 год назад");
  });
});
