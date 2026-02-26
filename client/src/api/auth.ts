import axios from "./axios.js";
import { User, Admin, LoginFormData } from "@/types/authType.js";

export type RegisterData = Omit<User, "_id" | "password">;

type VerifyOtpResponse =
  | { message: "success"; user: User }
  | { message: "error"; error: any };

type LoginResponse =
  | { message: "otp_required"; tempToken: string }
  | { message: "success" | "error"; user: User };

export const getUser = (user: { email: string; password: string }) => {
  return axios.post<User>("/getUser", user);
};

export const registerRequest = (user: RegisterData) =>
  axios.post<User>("/register", user);

export const loginWithAuth0 = (user: any) =>
  axios.post("/auth/auth0-login", user);

export const loginRequest = (user: LoginFormData) =>
  axios.post<LoginResponse>("/login", user);

export const verifyOtpLoginRequest = async (data: {
  otp: string;
  tempToken: string;
}): Promise<VerifyOtpResponse> => {
  try {
    const res = await axios.post<User>("/verify-otp-login", data);
    return { message: "success", user: res.data };
  } catch (error: any) {
    return { message: "error", error };
  }
};

export const loginAdminWithAuth0 = (admin: any) =>
  axios.post("/auth/auth0-admin-login", admin);

export type RegisterAdminData = Omit<Admin, "_id" | "password">;

export const registerNewAdmin = (user: RegisterAdminData) =>
  axios.post<Admin>("/registerNewAdmin", user);

export const logoutRequest = () => axios.post("/logout");

export const verifyRequest = (token: string) =>
  axios.post<User>("/verify", token);

export const profileRequest = () => axios.get("/profile");
