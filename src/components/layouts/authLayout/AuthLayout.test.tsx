import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import AuthLayout from "./AuthLayout";
import { USEROUTER_MOCKIMPLEMENTATION, SESSION_MOCK } from "../../../mocks";

jest.mock("next-auth/react");
const useRouter = jest.spyOn(require("next/router"), "useRouter");

const CHILDREN_MOCK: ReactElement = <h1 data-testid="mock-child">test</h1>;

describe("AuthLayout", () => {
  beforeAll(() => {
    useRouter.mockImplementation(() => USEROUTER_MOCKIMPLEMENTATION);
  });

  it("render children if session exists", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: SESSION_MOCK,
      status: "authenticated",
    });

    render(<AuthLayout>{CHILDREN_MOCK}</AuthLayout>);
    expect(screen.getByTestId("mock-child")).toBeInTheDocument();
  });

  it("renders sidebar navigation if props tags", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: SESSION_MOCK,
      status: "authenticated",
    });

    const TAGS_MOCK: string[] = ["test1", "test2"];

    render(
      <AuthLayout props={{ tags: TAGS_MOCK }}>{CHILDREN_MOCK}</AuthLayout>
    );
    expect(screen.getByRole("complementary")).toBeInTheDocument();
  });

  it("renders document without sidebar navigation if props tags does not exist", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: SESSION_MOCK,
      status: "authenticated",
    });

    render(<AuthLayout>{CHILDREN_MOCK}</AuthLayout>);
    expect(screen.queryByRole("complementary")).toBeNull();
  });

  it("renders Spinner if session is undefined", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: undefined,
      status: "unauthenticated",
    });

    render(<AuthLayout>{CHILDREN_MOCK}</AuthLayout>);
    expect(screen.getByTestId("spinner-container")).toBeInTheDocument();
  });

  it("renders SignIn if session is null", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<AuthLayout>{CHILDREN_MOCK}</AuthLayout>);
    expect(screen.getByTestId("sign-in")).toBeInTheDocument();
  });
});
