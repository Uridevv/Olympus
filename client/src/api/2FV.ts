import axios from "./axios.js";

export const sendOTP = (email: string) => axios.post("/send-otp", { email });

export const verifyOTP = (email: string, otp: string) =>
  axios.post("/validateOTP", { email, otp });
