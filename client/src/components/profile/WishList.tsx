import { useEffect } from "react";
import { useWish } from "@/store/wishStore";
import { WishListTarget } from "@/components/wishlist/WishListTarget";

export function WishList() {
  const { wishList, initializeWishList } = useWish();

  useEffect(() => {
    initializeWishList();
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl">Wish List Profile</h1>

      {wishList.map((wishItem, i) => (
        <WishListTarget product={wishItem} key={i} />
      ))}
    </div>
  );
}
