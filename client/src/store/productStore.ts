import { create } from "zustand";
import {
  getAllProducts,
  getProduct,
  addProduct,
  deleteProduct,
  getAllProductsActive,
} from "../api/product.js";
import {
  addProductImage,
  getProductImage,
  getProductImages,
  updateProductImage,
  deleteImageProductCloudinary,
  deleteProductImage,
} from "../api/productImages.js";
import {
  Product,
  ProductImage,
  ImageFile,
  ProductImageForm,
} from "../types/productType.js";

type ProductCreate = Omit<Product, "id" | "_id" | "active" | "offered" | "previewImage">;
interface ProductPreview extends Product {
  previewImage:string;
}

interface ProductState {
  products: Product[];
  productsActive:ProductPreview[];
  getProducts: () => Promise<any>;
  getProductsActive: () => Promise<any>;
  getOneProduct: (productId: string) => Promise<Product | null>;
  createProduct: (product: ProductCreate) => Promise<Product>;
  uploadImages: (
    files: ProductImageForm[],
    productId: string
  ) => Promise<ImageFile[]>;
  updateImages: (files: ProductImage[]) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  deleteImagesDb: (images: ProductImage[]) => Promise<void>;
  deleteImagesFromCloudinary: (images: ProductImage[]) => Promise<void>;
  createImagesProduct: (
    images: ImageFile[],
    productId: string
  ) => Promise<void>;

  getImageProduct: (productId: string) => Promise<ProductImage>;
  getImagesProduct: (product: {
    productId: string;
    color: string;
  }) => Promise<any>;
}

export const useProduct = create<ProductState>((set) => ({
  products: [],
  productsActive:[],

  // Obtener todos los productos
  getProducts: async () => {
    try {
      const res = await getAllProducts();
      set({ products: res.data });
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  getProductsActive: async () => {
    try {
      const res = await getAllProductsActive();
      set({ productsActive: res.data });
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  // Obtener un producto por su ID
  getOneProduct: async (productId) => {
    try {
      const res = await getProduct(productId);
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // Crear un nuevo producto
  createProduct: async (product) => {
    try {
      const res = await addProduct(product);
      return res.data;
    } catch (error) {
      throw new Error("Error al crear el producto");
    }
  },

  // Subir imágenes a Cloudinary
  uploadImages: async (files, productId) => {
    if (!files || files.length === 0) return [];

    const newFiles: ImageFile[] = [];
    const presetName = "eqwsras";
    const cloudName = "dfzpvm8fs";

    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      if (files[i].file) {
        data.append("file", files[i].file!);
      }
      data.append("upload_preset", presetName);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        const result = await response.json();

        if (result.secure_url) {
          newFiles.push({
            file: result.secure_url,
            public_id: result.public_id,
            productId: productId,
            color: files[i].color,
          });
        } else {
          console.error("Error obteniendo la URL de la imagen:", result);
        }
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
      }
    }

    return newFiles; // ✅ Ahora retorna correctamente los ImageFile[]
  },

  // Actualizar imagenes de un producto en la base de datos.
  updateImages: async (files) => {
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const imageFile = files[i];

        const imageToUpdate = {
          url: imageFile.url, // asumimos que ya es una URL en este punto
          public_id: imageFile.public_id,
          productId: imageFile.productId,
          color: imageFile.color,
        };

        const res = await updateProductImage(
          imageFile._id, // Id imagen actual
          imageToUpdate // Imagen de cloudinary
        );
        console.log(res);
      }
    }
  },

  // Eliminar producto de la base de datos.
  deleteProduct: async (productId) => {
    try {
      const res = await deleteProduct(productId);
      console.log(res);
      return;
    } catch (error) {
      console.log(error);
      throw new Error("Error al eliminar el producto");
    }
  },

  //Eliminar images de la base de datos.
  deleteImagesDb: async (images) => {
    try {
      for (let i = 0; i < images.length; i++) {
        const res = await deleteProductImage(images[i]._id as string);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // Eliminar imágenes de Cloudinary
  deleteImagesFromCloudinary: async (images) => {
    for (let i = 0; i < images.length; i++) {
      try {
        const res = deleteImageProductCloudinary({
          public_id: images[i].public_id as string,
        });
        console.log(res);
      } catch (error) {
        console.error("Error al eliminar imagen:", error);
      }
    }
  },

  // Subir las imagenes ya con url a la base de datos.
  createImagesProduct: async (images, productId) => {
    try {
      for (let i = 0; i < images.length; i++) {
        const image = {
          url: images[i].file as string,
          color: images[i].color,
          public_id: images[i].public_id,
          productId: productId,
        };

        const res = await addProductImage(image);
        console.log(res);
      }
      return;
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear el producto");
    }
  },

  // Obtener una imagen de un producto
  getImageProduct: async (productId) => {
    try {
      const res = await getProductImage(productId);
      return res?.data;
    } catch (error) {
      throw new Error("Error al crear el producto");
    }
  },

  // Obtener todas las imágenes de un producto
  getImagesProduct: async (product) => {
    try {
      const res = await getProductImages(product);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  
}));

// Ejecutar la carga inicial de productos
useProduct.getState().getProducts();
useProduct.getState().getProductsActive();
