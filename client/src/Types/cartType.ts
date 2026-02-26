import {Product} from '@/Types/productType'

// Products arrived from de API.
export interface CartProduct {
  _id:string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  url:string;
  imageId: string;
  isActive:boolean;
  productId: Product;
  stock:number;
}

// Axios Request Interface.
export interface CartProductAdd {
  _id:string;
  name: string;
  description: string;
  quantity: number;
  color: string;
  size: string;
  url:string;
  imageId: string;
}
