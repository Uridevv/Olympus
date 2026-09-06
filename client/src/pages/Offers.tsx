import { getAllOffers } from "@/api/offer";
import { Offer } from "@/Types/offerType";
import { OfferTarget } from "@/components/products/OfferTarget";
import { useEffect, useState } from "react";
import { Sparkles, Tag } from "lucide-react";

export function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        const res = await getAllOffers();
        setOffers(res.data);
      } catch (error) {
        console.error("Error al cargar las ofertas:", error);
      } finally {
        setLoading(false);
      }
    }
    loadOffers();
  }, []);

  return (
    <div className="bg-background">
      <header className="border-b border-border bg-secondary-background py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Sparkles size={16} />
            Promociones activas
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Ofertas Exclusivas
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-foreground-description">
            No dejes pasar estas increíbles promociones que tenemos para ti.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <p className="py-20 text-center text-foreground-description">
            Cargando ofertas...
          </p>
        ) : offers.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <Tag className="h-10 w-10 text-foreground-description" />
            <p className="text-foreground-description">
              No hay ofertas disponibles en este momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
            {offers.map((offer) => (
              <OfferTarget key={offer._id} offer={offer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
