import { useEffect, useState } from "react";
import { useProduct } from "../store/productStore";
import { Product } from "../Types/productType";
import { AccessorieTarget } from "../components/products/AccessorieTarget";
import { SkeletonSchema } from "../components/SkeletonSchema";

export function Accessories() {
  const { products, getProducts } = useProduct();
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await getProducts();
      setLoading(false);
    };
    fetchProducts();
  }, [getProducts]);

  useEffect(() => {
    if (products.length > 0) {
      // const accessoriesProducts = products.filter(
      //   (product) => product.category === "accesorios"
      // );
      setAccessories(products);
    }
  }, [products]);

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Modern Accessories
        </h1>
        <p className="text-lg text-gray-400">
          Discover our exclusive collection of modern and elegant accessories.
        </p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <SkeletonSchema grid={8} />
        </div>
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {accessories.map((product) => (
            <AccessorieTarget key={product._id} product={product} />
          ))}
        </main>
      )}

      {accessories.length === 0 && !loading && (
        <div className="text-center mt-20">
          <p className="text-2xl text-gray-500">
            No accessories available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
