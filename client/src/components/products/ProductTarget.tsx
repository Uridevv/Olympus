import { useNavigate } from "react-router-dom";
import { Product } from "@/Types/productType.js";

interface ProductTargetPreview extends Product {
  previewImage:string;
}

interface ProductTargetProps {
  product: ProductTargetPreview;
}

export function ProductTarget({ product }: ProductTargetProps) {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-2xl flex flex-col gap-3 hover:bg-secondary-background transition duration-75 ease-in-out h-[27em] text-foreground p-2 box-border w-full relative hover:cursor-pointer"
      onClick={() => {
        navigate(`/product-detail/${product._id}`);
      }}
    >
      {product.offered.isOffered && ( // Se renderiza solo si "offered" es true
        <div className="absolute top-2 left-2 rounded-lg bg-red-500 text-white font-bold px-2 py-1 text-xs">
          Offered
        </div>
      )}
      <div className="h-3/5 w-full flex justify-center">
        <img
          src={product.previewImage}
          className="h-full w-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex items-center justify-around h-15">
        <div className="w-3/4 h-full ">
          <p className="w-full text-xl font-medium truncate ">{product.name}</p>
          <p className="w-full text-sm font-medium truncate text-foreground-description">
            {product.description}
          </p>
        </div>
        <strong className="font-bold text-lg">${product.price}</strong>
      </div>

      <div className="flex w-full wrap gap-2 p-1">
        {product.colors.map((color, i) => (
          <span
            className="rounded-2xl border-1 border-foreground-description p-1 hover:cursor-pointer"
            key={i}
          >
            {color}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-end h-15 gap-5">
      </div>
    </div>
  );
}
