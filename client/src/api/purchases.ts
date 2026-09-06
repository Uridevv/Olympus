import axios from "./axios";
import { Purchase } from "@/types/purchaseType";

export const getPurchases = (userId: string | number) =>
  axios.get<Purchase[]>(`/getPurchases/${userId}`);

export const getAllPurchases = () =>
  axios.get<Purchase[]>(`/getAllPurchases`);

export const getPurchase = (userId: string, purchaseId: string) =>
  axios.post<Purchase>(`/getOnePurchase/${userId}`, {purchaseId});
