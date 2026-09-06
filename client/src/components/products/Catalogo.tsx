import { ProductTarget } from "./ProductTarget.js";
import { useProduct } from "../../store/productStore.js";
import { useCallback, useEffect, useState } from "react";
import { useFilter } from "../../context/FilterContext.js";
import { Product } from "../../types/productType.ts";
import { SkeletonSchema } from "../SkeletonSchema.tsx";

export function Catalogo() {
  const [filteredProducts, setFitleredProducts] = useState<Product[]>([]);

  const {
    productsActive,
    hasMoreProductsActive,
    isLoadingProductsActive,
    loadMoreProductsActive,
  } = useProduct();

  const { filterProducts, filters } = useFilter();

  useEffect(() => {
    const newProducts = filterProducts(productsActive);
    setFitleredProducts(newProducts);
  }, [productsActive, filters]);

  // Lazy load: se re-ejecuta cada vez que el nodo centinela aparece o desaparece
  // (p. ej. cuando se deja de mostrar el skeleton inicial), a diferencia de un
  // useEffect con ref, que solo corre una vez y puede quedarse con un ref nulo.
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMoreProductsActive();
          }
        },
        { rootMargin: "300px" }
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [loadMoreProductsActive]
  );

  if (isLoadingProductsActive && productsActive.length === 0) {
    return (
      <div className="h-full w-full grid grid-cols-[repeat(auto-fit,minmax(250px,23%))] gap-5 justify-between">
        <SkeletonSchema grid={8} />
      </div>
    );
  }

  if (filteredProducts.length == 0) {
    return (
      <div className="w-full flex flex-wrap justify-between">
        <h2 className="font-bold text-white text-4xl">Sin Coincidencias</h2>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="h-full w-full grid grid-cols-[repeat(auto-fit,minmax(250px,23%))] gap-5 justify-between">
        {filteredProducts.map((product) => (
          <ProductTarget key={product._id} product={product} />
        ))}
      </div>

      {hasMoreProductsActive && (
        <div ref={sentinelRef} className="flex items-center justify-center py-6">
          {isLoadingProductsActive && (
            <span className="text-sm text-muted-foreground">
              Cargando más productos...
            </span>
          )}
        </div>
      )}
    </div>
  );
}
