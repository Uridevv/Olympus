import axios from "./axios.js";
import { Product, ProductFormData } from "../types/productType.ts";

type ProductAdd = Omit<Product, "id" | "_id" | "active" | "offered" | "previewImage">;

interface GetAllProductsResponse extends Product{
  previewImage:string
}
export const getAllProducts = () => axios.get<GetAllProductsResponse[]>("/getAllProducts");

export const getAllProductsActive = () => axios.get<GetAllProductsResponse[]>("/getAllProductsActive");

export const getProduct = (id: string) =>
  axios.get<Product>(`/getProduct/${id}`);

export const addProduct = (product: ProductAdd) =>
  axios.post<Product>("/addProduct", product);

export const updateProduct = (id: string, product: ProductFormData) =>
  axios.put<Product>(`/updateProduct/${id}`, product);

export const deleteProduct = (id: string) =>
  axios.delete<Product>(`/deleteProduct/${id}`);

export const switchProductActive = (id:string) => axios.put(`/changeProductStatus/${id}`)