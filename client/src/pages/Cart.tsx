import { useAuth } from "@/store/authStore.js";
import { CartTargetProduct } from "../components/cart/CartTargetProduct.jsx";
import { useCart } from "../store/cartStore.js";
import { payProduct } from "@/api/payment.js";
import { Separator } from "@/components/ui/separator.js";
import { Button } from "@/components/ui/button.js";
import { useEffect } from "react";

export function Cart() {
  const { productsCart, totalPrice, initializeCart } = useCart();
  const user = useAuth.getState().user;
  const userId = user?._id;

  const handlePay = async () => {
    const res = await payProduct({
      products: productsCart,
      userId: userId || "",
    });

    window.location.href = res.data.url;
  };

  useEffect(() => {
    initializeCart();
  }, []);

  return (
    <div className="p-20 max-w-6xl mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-5 text-3xl font-bold">Shopping Cart</h1>
      <div className="grid sm:grid-cols-2 sm:gap-5">
        <div>
          {productsCart.length >= 1 ? (
            <ul>
              {productsCart.map((product, index) => (
                <CartTargetProduct product={product} key={index} />
              ))}
            </ul>
          ) : (
            <p>No Products in cart</p>
          )}
        </div>

        <div className="max-w-xl">
          <div className="p-6 rounded-lg bg-secondary-background">
            <p className="mb-3 text-lg font-semibold">Order Summary</p>
            <Separator />
            <div className="flex justify-between gap-5 my-4">
              <p>Order total</p>
              <p>{totalPrice}</p>
            </div>
            <div className="flex items-center justify-center w-full mt-3">
              <Button className="w-full" onClick={handlePay}>
                Buy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
