import axios from "./axios.js";
import { UserSettings, userSettingsData } from "@/types/userSettingsType";

export const getUserSettings = (id: string) =>
  axios.get<UserSettings>(`/getSettings/${id}`);

export const createUserSettings = (id: string) =>
  axios.post(`/addCategory/${id}`);

export const updateUserSettings = (id: string, settings: userSettingsData) =>
  axios.put(`/updateSettings/${id}`, settings);

export const updateUserData = (
  id: string,
  data: { name?: string; lastName?: string; bornDate: Date }
) => axios.put(`/updateData/${id}`, data);
