import { User } from '@/types/authType'
import { Product } from '@/Types/productType'

export interface Review {
    _id:string;
    user: User;
    product: Product;
    rating: number;
    opinion: string;
    likes:number;
    dislikes:number;
    likedBy?: string[];
    dislikedBy?: string[];
    createdAt: string;
}