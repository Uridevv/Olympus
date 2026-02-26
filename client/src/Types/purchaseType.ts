import { Product } from "@/types/productType";
import { ProductImage } from "@/types/productType";

export interface Purchase {
  _id: string;
  userId: string;
  state: string;
  createdAt: string;
  productBought: Product;
  productImg: ProductImage;
}
