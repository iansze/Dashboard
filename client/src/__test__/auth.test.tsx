import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import mockAxios from "./mockAxios";
import { wrapper } from "./test-utils";
import AuthForm from "../components/auth/AuthForm";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

vi.mock("../utils/axios", () => mockAxios);

describe("Login Form Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display the login form", () => {
    render(<AuthForm mode="login" />, { wrapper });
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("Login with valid credentials", async () => {
    const user = userEvent.setup();
    render(<AuthForm mode="login" />, { wrapper });

    await user.type(screen.getByPlaceholderText(/username/i), "testuser");
    await user.type(screen.getByPlaceholderText(/email/i), "user@example.com");
    await user.type(screen.getByPlaceholderText(/password/i), "password");
    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockAxios.instance.post).toHaveBeenCalledWith(mockAxios.requests.login, {
        username: "testuser",
        email: "user@example.com",
        password: "password",
      });
    });
  });

  it("Login with invalid credentials", async () => {
    const user = userEvent.setup();
    render(<AuthForm mode="login" />, { wrapper });

    await user.type(screen.getByPlaceholderText(/username/i), "wrongUser");
    await user.type(screen.getByPlaceholderText(/email/i), "error@example.com");
    await user.type(screen.getByPlaceholderText(/password/i), "wrongPassword");
    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
    });
  });
});

describe("Sign up Form Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display the sign form", () => {
    render(<AuthForm mode="signUp" />, { wrapper });
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("Sign up with valid credentials", async () => {
    const user = userEvent.setup();
    render(<AuthForm mode="signUp" />, { wrapper });

    await user.type(screen.getByPlaceholderText(/username/i), "newUser");
    await user.type(screen.getByPlaceholderText(/email/i), "newUser@example.com");
    await user.type(screen.getByPlaceholderText(/password/i), "password");
    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockAxios.instance.post).toHaveBeenCalledWith(mockAxios.requests.signup, {
        username: "newUser",
        email: "newUser@example.com",
        password: "password",
      });
    });
  });

  it("Sign up with invalid credentials", async () => {
    const user = userEvent.setup();
    render(<AuthForm mode="signUp" />, { wrapper });

    await user.type(screen.getByPlaceholderText(/username/i), "existingUser");
    await user.type(screen.getByPlaceholderText(/email/i), "existingUser@example.com");
    await user.type(screen.getByPlaceholderText(/password/i), "password");
    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockAxios.instance.post).toHaveBeenCalledWith(mockAxios.requests.signup, {
        username: "existingUser",
        email: "existingUser@example.com",
        password: "password",
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
    });
  });
});
