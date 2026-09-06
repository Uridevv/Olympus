import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/Types/productType";
import { useProduct } from "@/store/productStore";
import { Skeleton } from "@/components/ui/skeleton";

export function OfferProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { getImageProduct } = useProduct();
  const [image, setImage] = useState("");

  useEffect(() => {
    let active = true;
    async function loadImage() {
      try {
        const res = await getImageProduct(product._id);
        if (active) setImage(res.url);
      } catch (error) {
        console.error("Error al cargar la imagen del producto", error);
      }
    }
    loadImage();
    return () => {
      active = false;
    };
  }, [product._id]);

  const isOutOfStock = product.stock <= 0;
  const hasDiscount =
    product.originalPrice != null && product.originalPrice > product.price;

  return (
    <div
      onClick={() => navigate(`/product-detail/${product._id}`)}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg"
    >
      <div className="relative h-56 w-full overflow-hidden bg-secondary-background">
        {!image ? (
          <Skeleton className="h-full w-full rounded-none" />
        ) : (
          <img
            src={image}
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
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="line-clamp-1 font-semibold text-foreground">
          {product.name}
        </p>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">
            ${product.price}
          </span>
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
