import axios from "./axios.js";
import { CartProduct } from "../types/cartType.js";

interface PayProductPayload {
  products: CartProduct[];
  userId:string;
}

export const payProduct = ({products, userId}: PayProductPayload) =>
  axios.post("/create-checkout-session", {products, userId});
