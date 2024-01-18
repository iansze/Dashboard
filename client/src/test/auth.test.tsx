import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "../components/auth/AuthForm";

describe("Login Form Tests", () => {
  it("should display the login form", () => {
    render(<AuthForm mode={"login"} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("href", { name: /Login/i })).toBeInTheDocument();
  });

  it("Login with valid credentials", async () => {
    render(<AuthForm mode={"login"} />);
    userEvent.type(screen.getByLabelText(/username/i), "testuser");
    userEvent.type(screen.getByLabelText(/password/i), "password123");
    userEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => expect(screen.queryByText(/login successful/i)).toBeInTheDocument());
  });

  it("Login with invalid credentials", async () => {
    render(<AuthForm mode={"login"} />);
    userEvent.type(screen.getByLabelText(/username/i), "wronguser");
    userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");
    userEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => expect(screen.queryByText(/invalid credentials/i)).toBeInTheDocument());
  });
});
