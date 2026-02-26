export interface WishItem {
  productId: string;
  name: string;
  price: number;
  url: string;
}

export interface wishValidationRepsonse {
  message: string;
  state: boolean;
}
