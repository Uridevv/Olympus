import { Product } from "@/types/productType";
import { useState, useEffect } from "react";
import { useProduct } from "@/store/productStore";

export function ProductOfferedView({ product }: { product: Product }) {
  const [imageProduct, setImageProduct] = useState("");
  const { getImageProduct } = useProduct();
  
  useEffect(() => { 
    async function loadImages() {
      try {
        const res = await getImageProduct(product._id);
        setImageProduct(res.url);
      } catch (error) {
        console.log(error);
      }
    }
    loadImages();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 rounded-lg border-1 p-4 min-h-30 justify-between">
      <div className="h-75 w-full">
        <img
          src={imageProduct}
          alt={product.name}
          className="h-full w-full cover"
        />
      </div>
    </div>
  );
}
