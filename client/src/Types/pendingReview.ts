import { User } from '@/types/authType'
import { Product } from '@/Types/productType'

export interface PendingReview {
  _id: string;
  user: User;
  product: Product;
  order?:string
  createdAt: string;
}