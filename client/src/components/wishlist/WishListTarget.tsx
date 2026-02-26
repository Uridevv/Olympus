import { useNavigate } from "react-router-dom";
import { WishItem } from "../../types/wishList.js";
import { X } from "lucide-react";
import { Button } from "../ui/button.js";
import { useWish } from "@/store/wishStore";

interface wishTargetProductProps {
  product: WishItem;
}

export function WishListTarget({ product }: wishTargetProductProps) {
  const { deleteWishListItem } = useWish();

  const navigate = useNavigate();

  return (
    <li className="flex py-6 border-b">
      <div
        onClick={() => {
          navigate(`/product-detail/${product.productId}`);
        }}
        className="cursor-pointer"
      >
        <img
          src={product.url}
          alt=""
          className="w-25 h-24 overflow-hidden rounded-md sm_w-auto sm:h-32"
        />
      </div>

      <div className="flex justify-between flex-1 px-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="font-bold">${product.price}.00</p>

          <Button className="mt-5 rounded-ful">Add to Cart</Button>
        </div>
        <div className="flex flex-col justify-between">
          <button
            className={
              "rounded-full flex items-center justify-center border shadow-md p-1 hover:scale-110 transition"
            }
          >
            <X
              size={25}
              onClick={() => {
                deleteWishListItem(product);
              }}
            />
          </button>
        </div>
      </div>
    </li>
  );
}
