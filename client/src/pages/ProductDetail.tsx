import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProductRating } from "../components/products/ProductRating.js";
import { useProduct } from "../store/productStore.js";
import { useParams } from "react-router-dom";
import { useCart } from "../store/cartStore.js";
import { useAuth } from "../store/authStore.js";
import { ProductParam } from "../components/products/ProductParam.js";
import { Product, ProductImage } from "@/Types/productType";
import { SkeletonSchema } from "@/components/SkeletonSchema.tsx";
import { SkeletonSchemaCardDetail } from "@/components/products/SkeletonSchemaCardDetail.tsx";
import { SimilarProducts } from "@/components/products/SimilarProducts.tsx";
import { Star, StarHalf, CheckCircle2, Trash2Icon, Expand } from "lucide-react";
import { useWish } from "@/store/wishStore";
import { WishItem } from "@/types/wishList.ts";
import { ReviewsSection } from "@/components/products/ReviewsSection";
import { getReviewsByProduct } from "@/api/review";
import { Review } from "@/Types/review";
import { ImageZoomModal } from "@/components/products/ImageZoomModal";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function ProductDetail() {
  const { addToWishList, itemInWishList, deleteWishListItem } = useWish();
  const { getOneProduct, getImagesProduct } = useProduct();
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.role === "manager";

  const params = useParams();
  const [product, setProduct] = useState<Product>();
  const [productImgs, setProductImgs] = useState<ProductImage[]>([]);
  const [colorSelect, setColorSelect] = useState<string>();
  const [actualImage, setActualImage] = useState<ProductImage>();
  const [sizeSelected, setSizeSelected] = useState<string>("");
  const [isLoadingImages, setIsLoadingImages] = useState(true); //
  const [isWishProduct, setIsWishProduct] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      toast.error("Necesitas iniciar sesión para agregar el producto");
      return;
    }
    if (isAdmin) {
      toast.error("Los administradores no pueden agregar productos a la wishlist");
      return;
    }
    if (product) {
      const wishItemData: WishItem = {
        name: product.name,
        price: product.price,
        url: productImgs[0].url,
        productId: product._id,
      };

      if (isWishProduct) {
        // If it's already in the wishlist, delete it
        await deleteWishListItem(wishItemData);
        setIsWishProduct(false); // Update local state
        toast("Product took out from the wishlist", {
          action: {
            label: "Undo",
            onClick: async () => {
              await addToWishList(wishItemData);
              setIsWishProduct(true);
            },
          },
          icon: <Trash2Icon />,
        });
      } else {
        // If it's not in the wishlist, add it
        await addToWishList(wishItemData);
        setIsWishProduct(true); // Update local state
        toast("Product added to the wishlist", {
          action: {
            label: "Undo",
            onClick: async () => {
              await deleteWishListItem(wishItemData);
              setIsWishProduct(false);
            },
          },
          icon: <CheckCircle2 />,
        });
      }
    }
  };

  useEffect(() => {
    async function getProduct() {
      if (!params.id) return;
      setProduct(undefined);
      setProductImgs([]);

      const res = await getOneProduct(params.id);
      if (!res) return;

      setProduct(res);
      setColorSelect(res.colors[0]);
      setSizeSelected(res.size[0] ?? "");
      const resWishProduct = await itemInWishList(params.id);
      setIsWishProduct(resWishProduct);
    }

    getProduct();
  }, [params.id]);

  useEffect(() => {
    async function fetchImages() {
      if (!colorSelect) return;
      if (!params.id) return;
      const resImgs = await getImagesProduct({
        productId: params.id,
        color: colorSelect,
      });
      setProductImgs(resImgs.data);
      setIsLoadingImages(false); // Finalizar la carga
    }
    fetchImages();
  }, [colorSelect, params.id]);

  useEffect(() => {
    if (productImgs.length > 0) {
      setActualImage(productImgs[0]);
      setIsLoadingImages(false);
    }
    carouselApi?.scrollTo(0, true);
  }, [productImgs, carouselApi]);

  useEffect(() => {
    async function loadReviews() {
      if (!params.id) return;
      try {
        const res = await getReviewsByProduct(params.id);
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadReviews();
  }, [params.id]);

  if (!product || !colorSelect || !actualImage) {
    return (
      <div className="p-20">
        <SkeletonSchemaCardDetail />
      </div>
    );
  }

  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
      : 0;
  const roundedRating = Math.round(averageRating * 2) / 2;

  const hasDiscount =
    product.originalPrice != null && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : undefined;

  const isOutOfStock = product.stock <= 0;

  return (
    <div>
      <div className="flex min-h-screen flex-col">
        <main className="container mx-auto flex flex-col flex-1 px-4 py-8 sm:px-6 lg:px-8 gap-11">
          <div className="grid grid-cols-1 md:gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <a className="hover:text-primary" href="#">
                  Women
                </a>
                <span>/</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Dresses
                </span>
              </div>
              {productImgs.length > 0 ? (
                <div className="relative md:aspect-[2/3] w-full overflow-hidden rounded-xl">
                  {!isLoadingImages && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="absolute top-3 right-3 z-10 rounded-full shadow-md"
                      onClick={() => setIsZoomOpen(true)}
                      aria-label="Ver imagen más de cerca"
                    >
                      <Expand className="h-4 w-4" />
                    </Button>
                  )}
                  <Carousel className="w-full h-full" setApi={setCarouselApi}>
                    <CarouselContent className="h-full">
                      {isLoadingImages ? (
                        <CarouselItem>
                          <div className="p-4 flex items-center justify-center h-full">
                            <SkeletonSchema grid={1} />
                          </div>
                        </CarouselItem>
                      ) : (
                        productImgs.map((img) => (
                          <CarouselItem key={img._id} className="h-full">
                            <div className="p-1 h-full">
                              <img
                                src={img.url}
                                alt=""
                                className="rounded-lg h-full w-full object-cover"
                              />
                            </div>
                          </CarouselItem>
                        ))
                      )}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                  <ImageZoomModal
                    images={productImgs.map((img) => img.url)}
                    initialIndex={carouselApi?.selectedScrollSnap() ?? 0}
                    open={isZoomOpen}
                    onOpenChange={setIsZoomOpen}
                  />
                </div>
              ) : (
                <div className="h-full w-3/7 p-10">
                  <h2 className="text-3xl ">No hay productos</h2>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-6 pt-10">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  by Designer Label
                </p>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                    {product.name}
                  </h1>
                  {isOutOfStock && (
                    <span className="rounded-lg bg-neutral-900 text-white font-bold px-2.5 py-1 text-xs uppercase tracking-wide border border-white/20">
                      Agotado
                    </span>
                  )}
                </div>
                {hasDiscount ? (
                  <div className="mt-2 flex flex-wrap items-baseline gap-3">
                    <p className="text-3xl font-bold text-primary">
                      ${product.price}
                    </p>
                    <p className="text-lg font-medium text-gray-400 line-through dark:text-gray-500">
                      ${product.originalPrice}
                    </p>
                    <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 text-sm font-semibold text-red-500">
                      -{discountPercent}%
                    </span>
                  </div>
                ) : (
                  <p className="mt-2 text-3xl font-bold text-primary">
                    ${product.price}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-8 items-center ">
                <div className="flex flex-col items-center gap-2 max-sm:m-auto">
                  <p className="text-5xl font-black text-gray-900 dark:text-white ">
                    {reviewCount > 0 ? averageRating.toFixed(1) : "—"}
                  </p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => {
                      const starValue = i + 1;
                      if (roundedRating >= starValue) {
                        return (
                          <Star
                            key={i}
                            className="h-5 w-5 text-yellow-400 fill-yellow-400"
                          />
                        );
                      }
                      if (roundedRating >= starValue - 0.5) {
                        return (
                          <StarHalf
                            key={i}
                            className="h-5 w-5 text-yellow-400 fill-yellow-400"
                          />
                        );
                      }
                      return (
                        <Star key={i} className="h-5 w-5 text-gray-300" />
                      );
                    })}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                  </p>
                </div>
                <div className="flex-1 w-full">
                  <ProductRating reviews={reviews} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Description
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>
              </div>

              <div>
                <ProductParam
                  paramName={"Color"}
                  actualItem={colorSelect}
                  updateSelected={setColorSelect}
                  list={product.colors}
                />
                <ProductParam
                  paramName={"Size"}
                  actualItem={sizeSelected}
                  updateSelected={setSizeSelected}
                  list={product.size}
                />
              </div>
              <div className="mt-4 flex gap-4">
                <button
                  disabled={isOutOfStock}
                  className={`flex-1 rounded-lg px-6 py-3 text-center font-bold shadow-md transition-all ${
                    isOutOfStock
                      ? "bg-neutral-300 text-neutral-500 cursor-not-allowed dark:bg-neutral-700 dark:text-neutral-400"
                      : "bg-secondary text-foreground hover:bg-secondary/90 hover:cursor-pointer"
                  }`}
                  onClick={() => {
                    if (isOutOfStock) {
                      return toast.error("Este producto está agotado");
                    }
                    if (!isAuthenticated) {
                      return toast.error(
                        "Necesitas iniciar sesión para agregar el producto"
                      );
                    }
                    if (isAdmin) {
                      return toast.error(
                        "Los administradores no pueden agregar productos al carrito"
                      );
                    }
                    if (!colorSelect || !sizeSelected) {
                      return toast("Please select color and size");
                    }
                    const cartItem = {
                      _id: product._id,
                      name: product.name,
                      description: product.description,
                      color: colorSelect,
                      size: sizeSelected,
                      url: productImgs[0].url,
                      quantity: 1,
                      imageId: actualImage._id,
                    };
                    toast.promise(addToCart(cartItem), {
                      loading: "Adding to cart...",
                      success: "Product added to cart!",
                      error: "Failed to add to cart",
                    });
                  }}
                >
                  {isOutOfStock ? "Agotado" : "Add to Cart"}
                </button>
                <button
                  className="rounded-lg border border-gray-300 dark:border-gray-600 px-6 py-3 font-bold text-primary hover:bg-primary/10 dark:hover:bg-primary/20 hover:cursor-pointer transition-colors"
                  onClick={handleWishlistToggle}
                >
                  {isWishProduct ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>

          {/*REVIEWS */}
          <ReviewsSection productId={product._id} />

          {/* SIMILAR PRODUCTS */}
          <SimilarProducts
            category={product.category}
            productId={params.id || ""}
          />
        </main>
      </div>
    </div>
  );
}
