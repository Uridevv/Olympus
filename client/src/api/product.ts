import axios from "./axios.js";
import { Product, ProductFormData } from "../types/productType.ts";

type ProductAdd = Omit<Product, "id" | "_id" | "active" | "offered" | "previewImage">;

interface GetAllProductsResponse extends Product{
  previewImage:string
}

export interface PaginatedProductsResponse {
  products: GetAllProductsResponse[];
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export const getAllProducts = (page = 1) =>
  axios.get<PaginatedProductsResponse>("/getAllProducts", {
    params: { page },
  });

export const getAllProductsActive = (page = 1) =>
  axios.get<PaginatedProductsResponse>("/getAllProductsActive", {
    params: { page },
  });

export const getProduct = (id: string) =>
  axios.get<Product>(`/getProduct/${id}`);

export const addProduct = (product: ProductAdd) =>
  axios.post<Product>("/addProduct", product);

export const updateProduct = (id: string, product: ProductFormData) =>
  axios.put<Product>(`/updateProduct/${id}`, product);

export const deleteProduct = (id: string) =>
  axios.delete<Product>(`/deleteProduct/${id}`);

export const switchProductActive = (id:string) => axios.put(`/changeProductStatus/${id}`)