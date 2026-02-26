import axios from "./axios.js";
import { CartProduct } from "../types/cartType.js";

interface PayProductPayload {
  products: CartProduct[];
}

export const payProduct = (products: PayProductPayload) =>
  axios.post("/create-checkout-session", products);
