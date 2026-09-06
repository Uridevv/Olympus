import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, PackageSearch, Pencil, Tag } from "lucide-react";
import { getOneOffer, getProductsInOffer } from "@/api/offer";
import { Offer } from "@/Types/offerType";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/Types/productType";
import { ProductOfferedView } from "@/components/admin/others/offers/ProductOfferedView";
import { Skeleton } from "@/components/ui/skeleton";

export function OfferDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<Offer>();
  const [productsOffered, setProductsOffered] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOffer() {
      if (!params.id) return;
      setIsLoading(true);
      try {
        const res = await getOneOffer(params.id);
        setOffer(res.data);
        try {
          const offered = await getProductsInOffer(params.id);
          setProductsOffered(offered.data);
        } catch {
          setProductsOffered([]);
        }
      } catch (error) {
        console.error("Error al cargar la oferta:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadOffer();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="bg-background p-6">
        <div className="mx-auto max-w-5xl">
          <Skeleton className="h-64 w-full rounded-2xl sm:h-80" />
          <Skeleton className="mt-6 h-8 w-1/2" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center text-foreground">
        <PackageSearch className="h-10 w-10 text-foreground-description" />
        <p className="text-foreground-description">No se encontró la oferta.</p>
        <Link
          to="/admin/settings/offers"
          className="text-sm font-medium text-primary hover:underline"
        >
          Volver a ofertas
        </Link>
      </div>
    );
  }

  const activeProducts = productsOffered.filter((product) => product.active);
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
    <div className="bg-background p-6 text-foreground">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/settings/offers")}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-description transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Volver a ofertas
          </button>
          <button
            type="button"
            onClick={() => navigate(`/admin/settings/offers/create/${offer._id}`)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Pencil size={15} />
            Editar oferta
          </button>
        </div>

        <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-80">
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
              -{offer.discount}%
            </span>
          )}
          {isExpired && (
            <span className="absolute top-4 right-4 rounded-full bg-neutral-900/80 px-3.5 py-1.5 text-sm font-semibold text-white">
              Finalizada
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 p-6">
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
        </div>

        <Separator className="my-8" />

        <div>
          <h2 className="text-xl font-bold sm:text-2xl">
            Productos en esta oferta
          </h2>
          <p className="mt-1 text-sm text-foreground-description">
            {activeProducts.length > 0
              ? `${activeProducts.length} ${
                  activeProducts.length === 1 ? "producto" : "productos"
                } con este descuento. Toca uno para editarlo.`
              : "Todavía no hay productos activos asignados a esta oferta."}
          </p>

          {activeProducts.length > 0 && (
            <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
              {activeProducts.map((product) => (
                <ProductOfferedView key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
