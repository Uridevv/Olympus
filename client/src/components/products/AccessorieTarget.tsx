import { useNavigate } from "react-router-dom";
import { useProduct } from "../../store/productStore.js";
import { useEffect, useState } from "react";
import { Product } from "../../types/productType.js";
import { Heart, ShoppingCart } from "lucide-react";

interface AccessorieTargetProps {
  product: Product;
}

export function AccessorieTarget({ product }: AccessorieTargetProps) {
  const navigate = useNavigate();

  const { getImageProduct } = useProduct();

  const [prdImage, setPrdImage] = useState<string>();

  useEffect(() => {
    async function getImage() {
      const res = await getImageProduct(product._id);
      setPrdImage(res.url);
    }
    getImage();
  }, []);

  return (
    <div
      className="group relative flex h-[27em] w-full transform cursor-pointer flex-col overflow-hidden rounded-2xl border border-transparent text-white  hover:scale-105  hover:bg-secondary-background transition duration-75 ease-in-out"
      onClick={() => navigate(`/product-detail/${product._id}`)}
    >
      <div className="relative h-3/5 w-full">
        <img
          src={prdImage}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          alt={product.name}
        />
        <div className="absolute inset-0 bg-opacity-20 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-40" />
      </div>

      <div className="flex h-2/5 flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="truncate text-xl font-bold">{product.name}</p>
            <p className="truncate text-sm text-gray-400">
              {product.description}
            </p>
          </div>
          <strong className="text-lg font-bold">${product.price}</strong>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.colors.map((color, i) => (
            <span
              className="rounded-full border border-gray-600 px-2 py-1 text-xs transition-colors duration-200 ease-in-out hover:bg-white hover:text-black"
              key={i}
            >
              {color}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-end gap-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
          <Heart className="h-6 w-6 transition-transform duration-200 ease-in-out hover:scale-125 hover:text-red-500" />
          <ShoppingCart className="h-6 w-6 transition-transform duration-200 ease-in-out hover:scale-125 hover:text-blue-500" />
        </div>
      </div>
    </div>
  );
}
