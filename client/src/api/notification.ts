import axios from "./axios.js";
import { Notification } from "@/Types/notificationType.js";

export const getNotifications = (userId: string) =>
  axios.get<Notification[]>(`/notifications/${userId}`);

export const deleteNotifications = (userId: string, ids: string[]) =>
  axios.delete(`/delete-notification/${userId}`, { data: { ids } });

export const updateNotificationsStatus = (
  userId: string,
  status: Notification["status"],
  ids: string[],
) => axios.put(`/update-notification-status/${userId}`, { status, ids });
