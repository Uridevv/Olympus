import { User } from "@/types/authType";

export interface Notification {
  _id: string;
  user: User;
  date: string;
  status: "leido" | "sin leer";
  title: string;
  message: string;
  type: "promociones" | "estatus de pedidos" | "novedades";
}
