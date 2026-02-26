import axios from "./axios.ts";
import { CartProductAdd} from "@/types/cartType.ts";

export const getShoppingCart = async (id: number | string) =>
  axios.get(`/getShoppingCart/${id}`);

export const createCart = async (
  id: string | number,
  items: { items: CartProductAdd[] }
) => axios.post(`/createShoppingCart/${id}`, items);

export const addItemToCart = async (id: string | number, Item: CartProductAdd) =>
  axios.post(`/addItemShoppingCart/${id}`, Item);

export const decreaseItemToCart = async (
  id: string | number,
  Item: CartProductAdd
) => axios.post(`/decreaseItemShoppingCart/${id}`, Item);

export const removeItemToCart = async (
  id: string | number,
  Item: CartProductAdd
) => axios.post(`/removeItemShoppingCart/${id}`, Item);

export const updateItemToCart = async (
  id: string | number,
  Item: CartProductAdd
) => axios.post(`/updateItemShoppingCart/${id}`, Item);

export const disableShoppingCart = async (id: number | string) =>
  axios.get(`/disableShoppingCart/${id}`);

export const successShoppingCart = async (id: number | string) =>
  axios.get(`/succesShoppingCart/${id}`);
