import { useEffect, useState } from "react";
import { useProduct } from "@/store/productStore.js";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types/productType";
import { PowerCircle } from "lucide-react";
import { switchProductActive } from "@/api/product";

export function ProductTargetAdmin({ product }: { product: Product }) {
  const { getImageProduct } = useProduct();
  const [imgProduct, setImgProduct] = useState<string>();
  const navigate = useNavigate();
  const [active, setActive] = useState<boolean>(product.active);
  const isOutOfStock = product.stock <= 0;

  useEffect(() => {
    async function getImg() {
      const res = await getImageProduct(product._id!);
      setImgProduct(res.url);
    }
    getImg();
  }, []);

  const handleOnClickActive = async (e: any) => {
    try {
      e.stopPropagation();
      const res = await switchProductActive(product._id!);
      setActive(res.data.active);
    } catch (error) {
      throw new Error("Erorr while trying to change product active status");
    }
  };

  return (
    <div
      className={
        `rounded-2xl flex flex-col gap-3 hover:bg-secondary-background transition duration-75 ease-in-out h-[27em] text-foreground p-2 box-border w-full relative ${active ? "" : "filter: contrast-60"} ${isOutOfStock ? "outline outline-2 outline-red-500/60" : ""}`
      }
      onClick={() => {
        navigate(`/admin/playground/update-product/${product._id}`);
      }}
    >
      <div
        className={`
        flex items-center justify-center h-5 absolute w-1/2 right-2 top-2 rounded-bl-lg drop-shadow-lg
        ${active ? "bg-green-500" : "bg-red-500"}
      `}
      >
        {active ? (
          <p className="text-white">Active</p>
        ) : (
          <p className="text-white">Inactive</p>
        )}
      </div>
      {isOutOfStock && (
        <div className="flex items-center justify-center h-5 absolute w-1/2 left-2 top-2 rounded-br-lg drop-shadow-lg bg-neutral-900 border border-white/20 z-10">
          <p className="text-white text-xs font-bold uppercase tracking-wide">
            Agotado
          </p>
        </div>
      )}
      <div className="h-70 flex justify-center w-full rounded-sm">
        <img
          src={imgProduct}
          alt="IMG"
          className={`h-full object-cover w-full rounded-sm ${
            isOutOfStock ? "grayscale" : ""
          }`}
        />
      </div>

      <div className=" h-1/6 w-full flex justify-around">
        <div className="w-3/5 flex flex-col h-full justify-around">
          <p className="w-full truncate text-lg">{product.name}</p>
          <p className=" w-full truncate text-foreground-description">
            {product.description}
          </p>
        </div>
        <div className="flex items-center w-2/5 h-full justify-end">
          <p className=" font-bold">${product.price}</p>
        </div>
      </div>

      <div className="flex items-center justify-end h-15 gap-5">
        <PowerCircle
          className="hover:cursor-pointer hover:text-red-500"
          onClick={handleOnClickActive}
        />
      </div>
    </div>
  );
}
