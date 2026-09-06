import { create } from "zustand";
import { VerifyAuthResponse, User, Admin } from "@/types/authType";
import {
  getUser,
  registerRequest,
  loginRequest,
  logoutRequest,
  verifyRequest,
  registerNewAdmin,
  loginWithAuth0,
  loginAdminWithAuth0,
  verifyOtpLoginRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";
import type { AxiosResponse } from "axios";

type RegisterPayload = Omit<User, "_id">;
type RegisterPayloadADmin = Omit<Admin, "_id">;
type LoginResponse =
  | { status: "success"; user: User }
  | { status: "otp_required"; tempToken: string }
  | { status: "error"; error: any };

type VerifyOtpResponse =
  | { message: "success"; user: User }
  | { message: "error"; error: any };

interface authStore {
  user: User | null;
  tempToken: string | null; // nuevo 👈
  isAuthenticated: boolean;
  registerErrors: any[];
  loading: boolean;
  getUser: (user: {
    email: string;
    password: string;
  }) => Promise<AxiosResponse<User> | undefined>;
  signUp: (user: {
    email: string;
    phoneNumber: number;
    name: string;
    lastName: string;
    password: string;
    role: string;
  }) => Promise<void>;
  signUpNewAdmin: (user: {
    email: string;
    phoneNumber: number;
    name: string;
    lastName: string;
    password: string;
    role: "admin" | "manager";
  }) => Promise<void>;
  login: (user: { password: string; email: string }) => Promise<LoginResponse>;
  loginAuth0: (user: any) => Promise<void>;
  loginAdminAuth0: (admin: any) => Promise<void>;
  logout: () => Promise<void>;
  checkLogin: () => Promise<VerifyAuthResponse | null>;
  clearRegisterErrors: () => void;
  verifyOtpLogin: (data: {
    otp: string;
    tempToken: string;
  }) => Promise<VerifyOtpResponse | undefined>;
}

export const useAuth = create<authStore>((set) => ({
  user: null,
  isAuthenticated: false,
  registerErrors: [],
  loading: true,
  tempToken: null, // 👈

  getUser: async (user: { email: string; password: string }) => {
    try {
      const res = await getUser(user);
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  signUp: async (user: RegisterPayload) => {
    try {
      const res = await registerRequest(user);
      set({ user: res.data, isAuthenticated: true });
    } catch (error: any) {
      set({ registerErrors: error });
    }
  },

  signUpNewAdmin: async (user: RegisterPayloadADmin) => {
    try {
      const res = await registerNewAdmin(user);
      console.log(res);
    } catch (error: any) {
      set({ registerErrors: error.response.data });
    }
  },

  loginAdminAuth0: async (admin) => {
    try {
      const res = await loginAdminWithAuth0({
        name: admin.given_name,
        lastName: admin.family_name,
        email: admin.email,
        auth0Sub: admin.sub,
        auth0Verification: true,
        userImage: admin.picture,
        role: "manager",
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },

  login: async (user) => {
    try {
      const res = await loginRequest(user);
      const data = res.data;
      console.log(res);

      // Caso OTP requerido
      if (data.message === "otp_required") {
        if (data.tempToken) {
          set({ tempToken: data.tempToken });
          Cookies.set("token", data.tempToken, { expires: 1 });
          console.log("Login con otp exitoso");
          return { status: "otp_required", tempToken: data.tempToken };
        }
      }

      // Caso login exitoso
      if (data.message === "success" && data.user) {
        set({ user: data.user, isAuthenticated: true, loading: false });
        console.log("Login normal exitoso");
        return { status: "success", user: data.user };
      }

      // Si nada matchea
      return { status: "error", error: new Error("Unexpected response") };
    } catch (error: any) {
      set({ registerErrors: error.response?.data });
      return { status: "error", error };
    }
  },

  verifyOtpLogin: async (data: { otp: string; tempToken: string }) => {
    try {
      const res = await verifyOtpLoginRequest(data);
      console.log(res);
      if (res.message === "success") {
        set({ user: res.user, isAuthenticated: true, loading: false });
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  loginAuth0: async (user) => {
    try {
      const res = await loginWithAuth0({
        name: user.given_name,
        lastName: user.family_name,
        email: user.email,
        auth0Sub: user.sub,
        auth0Verification: true,
        userImage: user.picture,
      });
      console.log(res);
      set({ user: res.data, isAuthenticated: true });
    } catch (error) {
      console.log(error);
    }
  },

  logout: async () => {
    const res = await logoutRequest();
    console.log(res);
    Cookies.remove("token");
    Cookies.remove("cart");
    set({ user: null, isAuthenticated: false });
  },

  checkLogin: async () => {
    const cookies = Cookies.get();

    if (!cookies.token) {
      set({ isAuthenticated: false, loading: false, user: null });
      return null;
    }

    try {
      const res = await verifyRequest(cookies.token);
      if (!res.data) {
        set({ isAuthenticated: false, loading: false, user: null });
        return null;
      }

      set({ isAuthenticated: true, loading: false, user: res.data });
      return res.data;
    } catch (error) {
      set({ isAuthenticated: false, loading: false, user: null });
      return null;
    }
  },

  clearRegisterErrors: () => {
    set({ registerErrors: [] });
  },
}));
