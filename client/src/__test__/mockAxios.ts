import { vi } from "vitest";

const requests = {
  login: "/auth/login",
  signup: "/auth/signup",
};

const mockAxios = {
  instance: {
    post: vi.fn((url, data) => {
      switch (url) {
        case requests.login:
          if (data.email === "error@example.com" || data.password === "wrongPassword") {
            return Promise.reject(new Error("Invalid username or password"));
          } else {
            return Promise.resolve<{ data: { username: string; email: string } }>({
              data: {
                username: "testuser",
                email: "testuser@example.com",
              },
            });
          }

        case requests.signup:
          if (data.email === "existingUser@example.com" || data.name === "existingUser") {
            return Promise.reject(new Error("User already exists"));
          } else {
            return Promise.resolve<{ data: { username: string; email: string } }>({
              data: {
                username: "newUser",
                email: "newUser@example.com",
              },
            });
          }

        default:
          throw new Error(`Unhandled API endpoint: ${url}`);
      }
    }),
    get: vi.fn(),
  },
  requests,
};

export default mockAxios;
