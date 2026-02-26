import axios from "./axios.js";
import { WishItem } from "../types/wishList.js";
import {wishValidationRepsonse} from '@/types/wishList.js'

export const getWishList = (id: string | number) =>
  axios.get(`/getWishList/${id}`);

export const addWishItem = (id: string | number, item: WishItem) =>
  axios.post(`/addWishItem/${id}`, item);

export const deleteWishItem = (id: string | number, item: WishItem) =>
  axios.post(`/deleteWishItem/${id}`, item);

export const itemInWishList = (id: string | number, item: string) =>
  axios.post<wishValidationRepsonse>(`/itemInWishList/${id}`, {productId : item});
