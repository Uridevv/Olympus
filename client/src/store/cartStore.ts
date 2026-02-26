import { create } from "zustand";
import Cookies from "js-cookie";
import { CartProduct, CartProductAdd } from "../types/cartType.ts";
import { useAuth } from "./authStore.ts";
import {
  getShoppingCart,
  addItemToCart,
  removeItemToCart,
  decreaseItemToCart,
} from "../api/shoppingCart.ts";

interface CartStore {
  productsCart: CartProduct[];
  totalPrice: number;
  initializeCart: () => void;
  producIsInCart: (prouct: CartProduct) => CartProduct | undefined;
  setCartCookies: () => void;
  addToCart: (product: CartProductAdd) => Promise<void>;
  addQuantity: (product: CartProductAdd) => void;
  decreaseQuantity: (product: CartProductAdd) => void;
  deleteProductCart: (product: CartProductAdd) => void;
}

export const useCart = create<CartStore>((set, get) => ({
  productsCart: [],

  totalPrice: 0,

  initializeCart: async () => {
    try {
      const user = useAuth.getState().user;
      const userId = user?._id;

      if (!userId) {
        return set({ productsCart: [], totalPrice: 0 });
      }
      const response = await getShoppingCart(userId);
      console.log(response)

      const cartData = response.data.cart;
      const cartItemsFromDB = cartData.items || [];

      // Mapear a CartProduct[] si los productos vienen populados
      const mappedCart: CartProduct[] = cartItemsFromDB.map((item:CartProduct) => ({
        _id: item.productId._id,
        name: item.productId.name,
        description: item.productId.description,
        price: item.productId.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        url: item.url || "",
        imageId:item.imageId,
        isActive:item.productId.active,
        stock:item.productId.stock,
      }));

      // Calcular el total de los productos cullo estatus sea active.
      mappedCart.forEach((item) => {
        if (!item.isActive) {
          item.price = 0; // O puedes eliminar el producto del carrito si no está activo
        }
      });

      const total = mappedCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      
      set({ productsCart: mappedCart, totalPrice: total });
    } catch (error) {
      set({ productsCart: [], totalPrice: 0 });
    }
  },

  producIsInCart: (product) => {
    const { productsCart } = get(); // Usar get() para acceder al estado actual
    return productsCart.find(
      (prod) =>
        prod._id === product._id &&
        prod.color === product.color &&
        prod.size === product.size
    );
  },

  addToCart: async (product) => {
    const userId = useAuth.getState().user?._id;
    if (!userId) return console.warn("Usuario no autenticado");

    try {
      const newItem = {
        _id: product._id,
        productId: product._id,
        name: product.name,
        description: product.description,
        size: product.size,
        quantity: 1,
        color: product.color,
        url: product.url || "",
        imageId: product.imageId,
      };
      await addItemToCart(userId, newItem);

      // Luego de actualizar el backend, traes el carrito actualizado
      await get().initializeCart();
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  },

  addQuantity: async (product) => {
    const userId = useAuth.getState().user?._id;
    if (!userId) return console.warn("Usuario no autenticado");

    const newItem = {
      _id: product._id,
      name: product.name,
      description: product.description,
      size: product.size,
      quantity: 1,
      color: product.color,
      url: product.url || "",
      imageId: product.imageId,
    };

    try {
      // await updateItemToCart(userId, newItem);
      await addItemToCart(userId, newItem);

      await get().initializeCart();
    } catch (error) {
      console.error("Error al aumentar cantidad:", error);
    }
  },

  decreaseQuantity: async (product) => {
    const userId = useAuth.getState().user?._id;
    if (!userId) return console.warn("Usuario no autenticado");

    const newItem = {
      _id: product._id,
      name: product.name,
      description: product.description,
      size: product.size,
      quantity: product.quantity,
      color: product.color,
      url: product.url || "",
      imageId: product.imageId,
    };

    try {
      await decreaseItemToCart(userId, newItem);

      await get().initializeCart();
    } catch (error) {
      console.error("Error al reducir cantidad:", error);
    }
  },

  deleteProductCart: async (product) => {
    const userId = useAuth.getState().user?._id;
    if (!userId) return console.warn("Usuario no autenticado");
    const newItem = {
      _id: product._id,
      name: product.name,
      description: product.description,
      size: product.size,
      quantity: 0, // o puedes omitir quantity si no lo usas en backend
      color: product.color,
      url: product.url || "",
      imageId: product.imageId,
    };
    try {
      await removeItemToCart(userId, newItem);

      await get().initializeCart();
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
    }
  },

  setCartCookies: () => {
    const { productsCart } = get();
    Cookies.set("cart", JSON.stringify(productsCart), { expires: 1 });
  },

}));
