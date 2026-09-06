import { useContext, createContext, useState, ReactNode } from "react";
import {Product} from '../types/productType.ts'

interface FilterState {
  name: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  onlyOffered: boolean;
  showOutOfStock: boolean;
}
interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  filterProducts: (products: Product[]) => Product[];
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useCategory must be used whitin an AuthProvider");
  }
  return context;
};

export const FilterProvider = ({ children }:{children:ReactNode}) => {
  const [filters, setFilters] = useState({
    name:"",
    category:"all",
    minPrice:0,
    maxPrice:0,
    onlyOffered:false,
    showOutOfStock:true
  });


  const filterProducts = (products:Product[]) =>{
    return products.filter( product =>{
      return(
         product.price>= filters.minPrice &&
        (
          filters.category == 'all' ||
          filters.category == product.category
        ) &&
        (
          filters.name == '' ||
          product.name.toLowerCase().includes(filters.name.toLowerCase())
        ) &&
        (
          filters.maxPrice == 0 ||
          product.price <= filters.maxPrice
        ) &&
        (
          !filters.onlyOffered ||
          product.offered?.isOffered === true
        ) &&
        (
          filters.showOutOfStock ||
          product.stock > 0
        )
      )
    })

  }
  
  return (
    <FilterContext.Provider
      value={{filterProducts, setFilters, filters}}
    >
      {children}
    </FilterContext.Provider>
  );
};
