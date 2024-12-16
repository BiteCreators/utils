import { renderHook } from "@testing-library/react";
import { useRouter } from "next/compat/router";

import { useScopedTranslation, useTranslation } from "../useTranslation";
import { NextRouter } from "next/router";

jest.mock("next/compat/router", () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock<Partial<NextRouter>>;

describe("useTranslation", () => {
  it("should return a whole english version in en locale", () => {
    mockUseRouter.mockReturnValue({ locale: "en" });

    const { result } = renderHook(useTranslation);

    expect(result.current).toHaveProperty("Auth");
    expect(result.current).toHaveProperty("Posts");
    expect(result.current).toHaveProperty("Common");
    expect(result.current.Auth.signIn).toBe("Sign In");
  });
  it("should return a whole russian version in ru locale", () => {
    mockUseRouter.mockReturnValue({ locale: "ru" });
    const { result } = renderHook(useTranslation);

    expect(result.current).toHaveProperty("Auth");
    expect(result.current).toHaveProperty("Posts");
    expect(result.current).toHaveProperty("Common");
    expect(result.current.Auth.signIn).toBe("Войти");
  });
  it("should be able to scope english translations with useScopedTranslation", () => {
    mockUseRouter.mockReturnValue({ locale: "en" });
    const { result } = renderHook(() => useScopedTranslation("Auth"));

    expect(result.current).not.toHaveProperty("Auth");
    expect(result.current.signIn).toBe("Sign In");
  });
  it("should be able to scope russian translations with useScopedTranslation", () => {
    mockUseRouter.mockReturnValue({ locale: "ru" });
    const { result } = renderHook(() => useScopedTranslation("Auth"));

    expect(result.current).not.toHaveProperty("Auth");
    expect(result.current.signIn).toBe("Войти");
  });
});
