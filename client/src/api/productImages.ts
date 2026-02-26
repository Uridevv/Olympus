import axios from "./axios.js";
import { ProductImage } from "../types/productType.ts";

export const getProductImages = (product: {
  productId: string;
  color: string;
}) => axios.post<ProductImage[]>("/getProductImages", product);

export const getProductAllImages = (product: { productId: string }) =>
  axios.post<ProductImage[]>("/getAllProductImages", product);

export const getProductImage = (productId: string) =>
  axios.get<ProductImage>(`/getProductImage/${productId}`);

export const addProductImage = (productImage: Omit<ProductImage, "_id">) =>
  axios.post<ProductImage>("/addProductImage", productImage);

export const updateProductImage = (
  id: string,
  image: Omit<ProductImage, "_id">
) => axios.put<ProductImage>(`/updateImage/${id}`, image);

export const deleteImageProductCloudinary = (public_id: {
  public_id: string;
}) => axios.post<{ success: boolean }>("/deleteImageCloudinary", public_id);

export const deleteProductImage = (id: string) =>
  axios.delete<{ success: boolean }>(`/deleteimage/${id}`);
