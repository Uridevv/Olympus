import axios from "./axios.js";
import { New } from "@/Types/newType";

export const getNews = () => axios.get<New[]>("/getNews");

export const getNew = (id: string) => axios.get<New>(`/getNew/${id}`);

export const createNew = (newData: FormData) =>
  axios.post<New>("/createNew", newData);

export const updateNew = (id: string, newData: FormData) =>
  axios.put<New>(`/updateNew/${id}`, newData);

export const deleteNew = (id: string) => axios.delete<New>(`/deleteNew/${id}`);
