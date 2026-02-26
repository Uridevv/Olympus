import { useProduct } from "@/store/productStore";
import { Product } from "@/Types/productType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SimilarProducts({
  category,
  productId,
}: {
  category: string;
  productId: string;
}) {
  const { productsActive } = useProduct();
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filteredProducts = productsActive
      .filter(
        (product) => product.category === category && product._id !== productId,
      )
      .slice(0, 5);
    setSimilarProducts(filteredProducts);
  }, [productsActive, category, productId]);

  const navigate = useNavigate();

  if (similarProducts.length === 0) {
    return (
      <div className="py-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Similar Products
        </h2>
        <div className="text-center">
          <h3 className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            No similar products found
          </h3>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Check out our other products!
          </p>
        </div>
      </div>  
    );
  }

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        Similar Products
      </h3>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:gap-x-8">
        {similarProducts.map((product) => {
          return (
            <div
              key={product._id}
              className="group relative hover:bg-background-hover p-1 rounded-md hover:cursor-pointer"
              onClick={() => navigate(`/product-detail/${product._id}`)}
            >
              <div className="aspect-[3/4] w-full overflow-hidden rounded-lg ">
                <img
                  alt={product.name}
                  className="h-full w-full object-cover object-center transition-opacity"
                  src={product.previewImage}
                />
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.name}
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
