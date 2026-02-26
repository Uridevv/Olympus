import axios from "./axios.js";
import { Category } from "@/Types/categoryType";

export const getCategories = () => axios.get<Category[]>("/categories");

export const getCategory = (id:string) => axios.get<Category>(`/getCategory/${id}`);

export const addCategory = (category: { name: string; description: string }) =>
  axios.post("/addCategory", category);

export const deleteCategory = (id: string) =>
  axios.post(`/deleteCategory/${id}`);

export const updateCategory = (category: Category) =>
  axios.put(`/updateCategory/${category._id}`, category);
