import { ProductTargetAdmin } from "@/components/admin/playground/stock/ProductTargetAdmin";
import { useProduct } from "@/store/productStore";
import { useCallback } from "react";
import { SkeletonSchema } from "@/components/SkeletonSchema";

export function AdminStock() {
  const { products, hasMoreProducts, isLoadingProducts, loadMoreProducts } =
    useProduct();

  // Lazy load: se re-ejecuta cada vez que el nodo centinela aparece o desaparece
  // (p. ej. cuando se deja de mostrar el skeleton inicial), a diferencia de un
  // useEffect con ref, que solo corre una vez y puede quedarse con un ref nulo.
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMoreProducts();
          }
        },
        { rootMargin: "300px" }
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [loadMoreProducts]
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl text-foreground font-bold mb-4">Stock</h1>

      {isLoadingProducts && products.length === 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,30%))] gap-4 justify-between">
          <SkeletonSchema grid={8} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,30%))] gap-4 justify-between">
            {products.map((product) => (
              <ProductTargetAdmin product={product} key={product._id} />
            ))}
          </div>

          {hasMoreProducts && (
            <div
              ref={sentinelRef}
              className="flex items-center justify-center py-6"
            >
              {isLoadingProducts && (
                <span className="text-sm text-muted-foreground">
                  Cargando más productos...
                </span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
