import landingIMG from "../assets/img/landing.png";
import { ProductTarget } from "../components/products/ProductTarget.js";
import { useProduct } from "../store/productStore.js";
import { useState, useEffect } from "react";
import { CarouselDemo } from "@/components/main/FeaturedProducts.tsx";

export function Home() {
  const { productsActive } = useProduct();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productsActive) {
      setIsLoading(false);
    }
  }, [productsActive]);

  if (isLoading) {
    return <h2 className="text-2xl font-bold">Loading...</h2>;
  }

  return (
    <div className="p-20 bg-background textt-foreground">
      <div className="flex justify-between max-md:mb-20 min-h-[82vh]">
        <div className="flex flex-col w-1/2 gap-11 max-md:flex-row max-md:w-3/7">
          <h1 className="text-5xl font-bold max-md:w-full max-md:leading-15">
            Lleva el estilo siempre contigo.
          </h1>
          <h2 className="text-4xl max-md:hidden">
            Destaca a donde sea que vallas.
          </h2>
        </div>
        <div className="">
          <img
            src={landingIMG}
            alt=""
            className="bg-transparent relative z-0 max-md:hidden"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold">Featured Products</h2>
      <CarouselDemo products={productsActive} />

      <div className="mt-20 flex flex-col gap-5">
        <h3 className="text-2xl font-bold">Best selling in men's clothing.</h3>
        <div className="h-full w-full grid grid-cols-[repeat(auto-fit,minmax(250px,23%))] max-sm:grid-cols-1  gap-5 justify-between jusitfy-center align-center">
          {productsActive.map((product) => {
            return <ProductTarget product={product} key={product._id} />;
          })}
        </div>

        <h3 className="text-2xl font-bold">
          Best selling in woman's clothing.
        </h3>
        <div className="h-full w-full grid grid-cols-[repeat(auto-fit,minmax(250px,23%))] max-sm:grid-cols-1  gap-5 justify-between jusitfy-center align-center">
          {productsActive.map((product) => {
            return <ProductTarget product={product} key={product._id} />;
          })}
        </div>
      </div>
    </div>
  );
}
