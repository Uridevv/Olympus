import { Product } from "@/Types/productType";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "@/store/productStore";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductOfferedView({ product }: { product: Product }) {
  const navigate = useNavigate();
  const [imageProduct, setImageProduct] = useState("");
  const { getImageProduct } = useProduct();

  useEffect(() => {
    let active = true;
    async function loadImages() {
      try {
        const res = await getImageProduct(product._id);
        if (active) setImageProduct(res.url);
      } catch (error) {
        console.log(error);
      }
    }
    loadImages();
    return () => {
      active = false;
    };
  }, [product._id]);

  const isOutOfStock = product.stock <= 0;
  const hasDiscount =
    product.originalPrice != null && product.originalPrice > product.price;

  return (
    <div
      onClick={() => navigate(`/admin/playground/update-product/${product._id}`)}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg"
    >
      <div className="relative h-56 w-full overflow-hidden bg-secondary-background">
        {!imageProduct ? (
          <Skeleton className="h-full w-full rounded-none" />
        ) : (
          <img
            src={imageProduct}
            alt={product.name}
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isOutOfStock ? "grayscale opacity-70" : ""
            }`}
          />
        )}
        {isOutOfStock && (
          <span className="absolute top-2 left-2 rounded-lg bg-neutral-900 px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Agotado
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 p-3">
        <p className="line-clamp-1 font-semibold text-foreground">
          {product.name}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-primary">${product.price}</span>
          {hasDiscount && (
            <span className="text-sm text-foreground-description line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
