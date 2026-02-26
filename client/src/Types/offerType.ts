export interface Offer {
  _id: string;
  title: string;
  description: string;
  image: {
    url:string,
    public_id:string
  };
  createdAt: string;
  updatedAt: string;
  endDate: string;
  products:string[];
  createdBy:string;
  discount:number;
}

export interface OfferFormData {
  title: string;
  description: string;
  image: string;
  endDate: string;
  products:string[];
  createdBy:string;
  discount:number;
}