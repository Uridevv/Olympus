import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, PackageSearch, ScrollText, Tag } from "lucide-react";
import { getOneOffer, getProductsInOffer } from "@/api/offer";
import { Offer } from "@/Types/offerType";
import { Product } from "@/Types/productType";
import { OfferProductCard } from "@/components/products/OfferProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export function OfferDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadOffer() {
      if (!id) return;
      setIsLoading(true);
      setNotFound(false);
      try {
        const res = await getOneOffer(id);
        setOffer(res.data);
        try {
          const productsRes = await getProductsInOffer(id);
          setProducts(productsRes.data.filter((product) => product.active));
        } catch {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error al cargar la oferta:", error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadOffer();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <Skeleton className="h-72 w-full rounded-2xl sm:h-96" />
        <Skeleton className="mt-6 h-8 w-2/3" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-5/6" />
      </div>
    );
  }

  if (notFound || !offer) {
    return (
      <div className="flex flex-col items-center gap-4 py-32 text-center">
        <PackageSearch className="h-12 w-12 text-foreground-description" />
        <h1 className="text-2xl font-bold text-foreground">
          No encontramos esta oferta
        </h1>
        <p className="max-w-sm text-foreground-description">
          Puede que ya haya finalizado o que el enlace ya no esté disponible.
        </p>
        <Link
          to="/offers"
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ArrowLeft size={16} />
          Ver todas las ofertas
        </Link>
      </div>
    );
  }

  const endDate = new Date(offer.endDate);
  const hasValidEndDate = !isNaN(endDate.getTime());
  const isExpired = hasValidEndDate && endDate.getTime() < Date.now();
  const formattedEndDate = hasValidEndDate
    ? endDate.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <button
          type="button"
          onClick={() => navigate("/offers")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-foreground-description transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Volver a ofertas
        </button>

        <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-96">
          <img
            src={offer.image?.url}
            alt={offer.title}
            className={`h-full w-full object-cover ${
              isExpired ? "grayscale" : ""
            }`}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {offer.discount > 0 && (
            <span className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-sm font-bold text-primary-foreground shadow">
              <Tag size={14} />
              -{offer.discount}% de descuento
            </span>
          )}
          {isExpired && (
            <span className="absolute top-4 right-4 rounded-full bg-neutral-900/80 px-3.5 py-1.5 text-sm font-semibold text-white">
              Oferta finalizada
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <h1 className="text-2xl font-extrabold text-white drop-shadow sm:text-4xl">
              {offer.title}
            </h1>
            {formattedEndDate && (
              <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-white/90">
                <Clock size={15} />
                {isExpired ? "Finalizó el" : "Válida hasta el"}{" "}
                {formattedEndDate}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="leading-relaxed text-foreground-description">
            {offer.description}
          </p>
          <Link
            to="/offers/termsAndConditions"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ScrollText size={15} />
            Ver términos y condiciones de esta oferta
          </Link>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Productos incluidos en esta oferta
          </h2>
          <p className="mt-1 text-sm text-foreground-description">
            {products.length > 0
              ? `${products.length} ${
                  products.length === 1
                    ? "producto disponible"
                    : "productos disponibles"
                } con este descuento.`
              : "Por ahora no hay productos disponibles con este descuento."}
          </p>

          {products.length > 0 && (
            <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
              {products.map((product) => (
                <OfferProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
