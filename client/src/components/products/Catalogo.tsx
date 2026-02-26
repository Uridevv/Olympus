import { ProductTarget } from "./ProductTarget.js";
import { useProduct } from "../../store/productStore.js";
import { useEffect, useState } from "react";
import { useFilter } from "../../context/FilterContext.js";
import { Product } from "../../types/productType.ts";

export function Catalogo() {
  const [filteredProducts, setFitleredProducts] = useState<Product[]>([]);

  const { products, productsActive } = useProduct();

  const { filterProducts, filters } = useFilter();

  useEffect(() => {
    if (products.length > 0) {
      const newProducts = filterProducts(productsActive);
      setFitleredProducts(newProducts);
    }
  }, [products, productsActive]);

  useEffect(() => {
    if (products.length > 0) {
      const newProducts = filterProducts(productsActive);
      setFitleredProducts(newProducts);
    }
  }, [filters]);

  if (filteredProducts.length == 0) {
    return (
      <div className="w-full flex flex-wrap justify-between">
        <h2 className="font-bold text-white text-4xl">Sin Coincidencias</h2>
      </div>
    );
  }

  return (
    <div className="h-full w-full grid grid-cols-[repeat(auto-fit,minmax(250px,23%))] gap-5 justify-between">
      {filteredProducts.map((product) => (
        <ProductTarget key={product._id} product={product} />
      ))}
    </div>
  );
}
