import { useEffect } from "react";
import { WishListTarget } from "../components/wishlist/WishListTarget";
import { useWish } from "@/store/wishStore";

export function WIshList() {
  const { wishList, initializeWishList } = useWish();

  useEffect(() => {
    initializeWishList();
  }, []);

  return (
    <div className="p-20 max-w-6xl mx-auto sm:px-6 lg:px-8 min-h-[70vh]">
      <h1 className="mb-5 text-3xl font-bold">Wish List</h1>
      <div className="grid sm:grid-cols-1 sm:gap-5">
        <div>
          {wishList.length >= 1 ? (
            <ul>
              {wishList.map((product, index) => (
                <WishListTarget product={product} key={index} />
              ))}
            </ul>
          ) : (
            <p>No Products.</p>
          )}
        </div>
      </div>
    </div>
  );
}
