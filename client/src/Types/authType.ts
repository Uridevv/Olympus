export interface User {
  _id: string;
  email: string;
  phoneNumber: number;
  name: string;
  lastName: string;
  password: string;
  role: string;
}

export interface Admin {
  _id:string;
  email: string;
  phoneNumber: number;
  name: string;
  lastName: string;
  password: string;
  role: "admin" | "manager";
}

export interface VerifyAuthResponse {
  _id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginFormData {
  email:string;
  password:string;
}

export interface RegisterFormData {
  email:string;
  phoneNumber:string;
  name:string;
  lastName:string;
  password:string;
  role:string;
  confirmPassword?:string;
}