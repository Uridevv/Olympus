import { useNavigate } from "react-router-dom";
import { useCart } from "../../store/cartStore.js";
import { CartProduct } from "../../types/cartType.js";
import { X, Plus, Minus } from "lucide-react";

interface CartTargetProductProps {
  product: CartProduct;
}

export function CartTargetProduct({ product }: CartTargetProductProps) {
  const navigate = useNavigate();
  const { addQuantity, decreaseQuantity, deleteProductCart } = useCart();


  return (
    <li
      className={`flex py-6 border-b relative ${
        !product.isActive || product.stock === 0 ? "opacity-50" : ""
      }`}
    >
      <div
        className={
          !product.isActive || product.stock === 0
            ? "pointer-events-none flex gap-4 w-full relative"
            : "flex gap-4 w-full relative"
        }
      >
        <div
          className={
            !product.isActive || product.stock === 0
              ? "absolute bottom-0 right-0 bg-red-500"
              : "hidden"
          }
        >
          <p>Producto no disponible</p>
        </div>
        <div
          onClick={() => {
            navigate(`/product-detail/${product._id}`);
          }}
          className="cursor-pointer"
        >
          <img
            src={product.url}
            alt=""
            className="w-25 h-24 overflow-hidden rounded-md sm_w-auto sm:h-32"
          />
        </div>

        <div className="flex justify-between  flex-1 px-6">
          <div className="flex flex-col justify-between">
            <h2 className="text-lg font-bold"> {product.name}</h2>
            <p className="font-bold">${product.price}.00</p>
            <div className="flex items-center gap-3">
              <Minus
                size={15}
                onClick={() => {
                  decreaseQuantity({
                    _id: product._id,
                    name: product.name,
                    description: product.description,
                    color: product.color,
                    size: product.size,
                    url: product.url,
                    quantity: 1,
                    imageId: product.imageId,
                  });
                }}
              />
              <p className="font-bold">{product.quantity}</p>
              <Plus
                size={15}
                onClick={() => {
                  addQuantity({
                    _id: product._id,
                    name: product.name,
                    description: product.description,
                    color: product.color,
                    size: product.size,
                    url: product.url,
                    quantity: 1,
                    imageId: product.imageId,
                  });
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="px-2 py-1 bg-foreground rounded-full text-background">
                {product.color}
              </p>
              <p className="px-2 py-1 bg-foreground rounded-full text-background">
                {product.size}
              </p>
            </div>
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
                  deleteProductCart({
                    _id: product._id,
                    name: product.name,
                    description: product.description,
                    color: product.color,
                    size: product.size,
                    url: product.url,
                    quantity: 1,
                    imageId: product.imageId,
                  });
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
