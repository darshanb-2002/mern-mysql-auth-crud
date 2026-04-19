import api from "./axios";

// REGISTER
export const registerUser = (data) => {
  return api.post("/api/auth/register", data);
};

// LOGIN
export const loginUser = (data) => {
  return api.post("/api/auth/login", data);
};

// FORGOT PASSWORD
export const forgotPassword = (email) => {
  return api.post("/api/auth/forgot-password", { email });
};

// RESET PASSWORD
export const resetPassword = (data) => {
  return api.post("/api/auth/reset-password", data);
};

// GET USER (protected)
export const getMe = () => {
  return api.get("/api/auth/me");
};