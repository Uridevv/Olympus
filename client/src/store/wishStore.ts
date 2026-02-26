import { create } from "zustand";
import { useAuth } from "./authStore.ts";
import {
  getWishList,
  addWishItem,
  deleteWishItem,
  itemInWishList,
} from "@/api/wishList";
import { WishItem } from "@/types/wishList.ts";

interface WishStore {
  wishList: WishItem[];
  initializeWishList: () => void;
  getWishList: () => void;
  addToWishList: (item: WishItem) => void;
  deleteWishListItem: (itemId: WishItem) => void;
  itemInWishList: (item: string) => Promise<boolean>;
}

export const useWish = create<WishStore>((set) => ({
  wishList: [],

  initializeWishList: async () => {
    try {
      const user = useAuth.getState().user;
      const userId = user?._id;

      if (!userId) {
        console.warn("No se pudo obtener el ID del usuario");
        return set({ wishList: [] });
      }
      const response = await getWishList(userId);

      const wishData = response.data.items;

      set({ wishList: wishData || [] });
    } catch (error) {
      console.error("Error al cargar el carrito desde la BD:", error);
      set({ wishList: [] });
    }
  },

  getWishList: async () => {
    try {
      const user = useAuth.getState().user;
      const userId = user?._id;

      if (!userId) {
        console.warn("No se pudo obtener el ID del usuario");
        return set({ wishList: [] });
      }
      const res = await getWishList(userId);
      const wishData = res.data.wishList;

      set({ wishList: wishData.items || [] });
    } catch (error) {
      console.log(error);
    }
  },

  addToWishList: async (newItem) => {
    try {
      const user = useAuth.getState().user;
      const userId = user?._id;

      if (!userId) {
        console.warn("No se pudo obtener el ID del usuario");
        return set({ wishList: [] });
      }

      const res = await addWishItem(userId, newItem);
      const wishData = res.data.wishList;

      set({ wishList: wishData.items || [] });
    } catch (error) {
      console.log(error);
    }
  },

  deleteWishListItem: async (itemId) => {
    try {
      const user = useAuth.getState().user;
      const userId = user?._id;

      if (!userId) {
        console.warn("No se pudo obtener el ID del usuario");
        return set({ wishList: [] });
      }

      const res = await deleteWishItem(userId, itemId);
      const wishData = res.data.wishList;

      set({ wishList: wishData.items || [] });
    } catch (error) {
      console.log(error);
    }
  },

  itemInWishList: async (item) => {
    try {
      const user = useAuth.getState().user;
      const userId = user?._id;

      if (!userId) {
        console.warn("No se pudo obtener el ID del usuario");
        return false; // Return false or throw an error if no user ID
      }

      const res = await itemInWishList(userId, item);
      return res.data.state; // Return the 'state' property from the response
    } catch (error) {
      console.error("Error al verificar si el item está en la lista de deseos:", error);
      return false; // Return false in case of an error
    }
  },
  
}));
