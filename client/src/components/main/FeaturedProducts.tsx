import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/Types/productType";
import { ProductTarget } from "@/components/products/ProductTarget";

interface CarouselDemoProps {
  products: Product[];
}

export function CarouselDemo({ products }: CarouselDemoProps) {

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {products.slice(0, 6).map((product) => (
          <CarouselItem className="w-full md:basis-1/2 lg:basis-1/3" key={product._id}>
            <ProductTarget product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
