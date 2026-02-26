import axios from "@/api/axios";
import { Offer, OfferFormData } from "@/Types/offerType";
import { Product } from "@/types/productType";

export const createOffer = (formData: FormData) => {
  // Axios detectará que es un FormData y automáticamente
  // establecerá el Content-Type como multipart/form-data.
  return axios.post<Offer>("/createOffer", formData);
};

export const getAllOffers = () => axios.get<Offer[]>(`/getAllOffers`);

export const getOneOffer = (id: string) =>
  axios.get<Offer>(`/getOneOffer/${id}`);

export const getProductsInOffer = (offerId:string) => {
  return axios.get<Product[]>(`/getProductsInOffer/${offerId}`)
}

export const getOffersByProduct = (productId:string) => {
  return axios.get<Offer[]>(`/getOffersByProduct/${productId}`)
}

export const updateOffer = (id: string, offerData: FormData | OfferFormData) => {
  return axios.put<Offer>(`/updateOffer/${id}`, offerData);
};

export const deleteOffer = (id: string) =>
  axios.delete<Offer>(`/deleteOffer/${id}`);