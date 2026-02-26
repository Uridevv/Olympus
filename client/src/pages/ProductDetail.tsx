import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProductRating } from "../components/products/ProductRating.js";
import { useProduct } from "../store/productStore.js";
import { useParams } from "react-router-dom";
import { useCart } from "../store/cartStore.js";
import { ProductParam } from "../components/products/ProductParam.js";
import { Product, ProductImage } from "@/Types/productType";
import { SkeletonSchema } from "@/components/SkeletonSchema.tsx";
import { SkeletonSchemaCardDetail } from "@/components/products/SkeletonSchemaCardDetail.tsx";
import { SimilarProducts } from "@/components/products/SimilarProducts.tsx";
import { Star, StarHalf, CheckCircle2, Trash2Icon } from "lucide-react";
import { useWish } from "@/store/wishStore";
import { WishItem } from "@/types/wishList.ts";
import { Offer } from "@/Types/offerType";
import { ReviewsSection } from "@/components/products/ReviewsSection";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getOffersByProduct } from "@/api/offer.ts";

export function ProductDetail() {
  const { addToWishList, itemInWishList, deleteWishListItem } = useWish();
  const { getOneProduct, getImagesProduct } = useProduct();
  const { addToCart } = useCart();

  const params = useParams();
  const [product, setProduct] = useState<Product>();
  const [productImgs, setProductImgs] = useState<ProductImage[]>([]);
  const [colorSelect, setColorSelect] = useState<string>();
  const [actualImage, setActualImage] = useState<ProductImage>();
  const [sizeSelected, setSizeSelected] = useState<string>("");
  const [isLoadingImages, setIsLoadingImages] = useState(true); //
  const [isWishProduct, setIsWishProduct] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);

  const handleWishlistToggle = async () => {
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
    async function getOffers() {
      try {
        if (params.id === undefined) return;
        const res = await getOffersByProduct(params.id);
        if (res) {
          setOffers(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getOffers();
  }, [params.id]);

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
  }, [productImgs]);

  if (!product || !colorSelect || !actualImage) {
    return (
      <div className="p-20">
        <SkeletonSchemaCardDetail />
      </div>
    );
  }

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
                <div className="md:aspect-[2/3] w-full overflow-hidden rounded-xl">
                  <Carousel className="w-full h-full">
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                  {product.name}
                </h1>
                <p className="mt-2 text-3xl font-bold text-primary">
                  ${product.price}
                </p>
              </div>
              <div className="flex flex-wrap gap-8 items-center ">
                <div className="flex flex-col items-center gap-2 max-sm:m-auto">
                  <p className="text-5xl font-black text-gray-900 dark:text-white ">
                    4.5
                  </p>
                  <div className="flex items-center text-primary">
                    <span className="material-symbols-outlined text-lg">
                      <Star />
                    </span>
                    <span className="material-symbols-outlined text-lg">
                      <Star />
                    </span>
                    <span className="material-symbols-outlined text-lg">
                      <Star />
                    </span>
                    <span className="material-symbols-outlined text-lg">
                      <Star />
                    </span>
                    <span className="material-symbols-outlined text-lg">
                      <StarHalf />
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    150 reviews
                  </p>
                </div>
                <div className="flex-1 w-full">
                  <ProductRating />
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
                  className="flex-1 rounded-lg bg-secondary px-6 py-3 text-center font-bold text-foreground shadow-md hover:bg-secondary/90 transition-all hover:cursor-pointer"
                  onClick={() => {
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
                  Add to Cart
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
