import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { toast } from "react-toastify";
import LoginUser from "./LoginUser";

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
test("renders login form", () => {
  render(<LoginUser />);

  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  const submitButton = screen.getByRole("button", { name: "Login" });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
test("submits login form successfully", async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <LoginUser />
    </Router>
  );

  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  const submitButton = screen.getByRole("button", { name: "Login" });

  const mockedResponse = {
    data: {
      contact: "1234567890",
      _id: "user-id",
    },
  };
  axios.post.mockResolvedValueOnce(mockedResponse);

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(submitButton);

  expect(axios.post).toHaveBeenCalledWith("http://localhost:8020/donor/login", {
    email: "seniya@gmail.com",
    password: "6164",
  });

  await screen.findByText("Login Success");
  expect(localStorage.setItem).toHaveBeenNthCalledWith(
    1,
    "contactno",
    "1234567890"
  );
  expect(localStorage.setItem).toHaveBeenNthCalledWith(2, "isLoggedIn", true);
  expect(localStorage.setItem).toHaveBeenNthCalledWith(3, "userId", "user-id");
  expect(history.location.pathname).toBe("/");
});

test("displays error message on failed login", async () => {
  render(<LoginUser />);

  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  const submitButton = screen.getByRole("button", { name: "Login" });

  axios.post.mockRejectedValueOnce(new Error("Invalid credentials"));

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(submitButton);

  expect(axios.post).toHaveBeenCalledWith("http://localhost:8020/donor/login", {
    email: "test@example.com",
    password: "password123",
  });

  await screen.findByText("Password or Email is incorrect");
});
