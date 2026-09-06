import { useNavigate } from "react-router-dom";
import { Offer } from "@/Types/offerType";
import { Clock, Tag, ArrowRight } from "lucide-react";

export function OfferTarget({ offer }: { offer: Offer }) {
  const navigate = useNavigate();

  const endDate = new Date(offer.endDate);
  const hasValidEndDate = !isNaN(endDate.getTime());
  const isExpired = hasValidEndDate && endDate.getTime() < Date.now();
  const formattedEndDate = hasValidEndDate
    ? endDate.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div
      onClick={() => navigate(`/offers/${offer._id}`)}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-xl ${
        isExpired ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={offer.image?.url}
          alt={offer.title}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isExpired ? "grayscale" : ""
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />

        {offer.discount > 0 && (
          <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
            <Tag size={12} />
            -{offer.discount}%
          </span>
        )}

        {isExpired && (
          <span className="absolute top-3 right-3 rounded-full bg-neutral-900/80 px-3 py-1 text-xs font-semibold text-white">
            Finalizada
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground line-clamp-1">
            {offer.title}
          </h2>
          <p className="mt-1 text-sm text-foreground-description line-clamp-2">
            {offer.description}
          </p>
        </div>

        {formattedEndDate && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-foreground-description">
            <Clock size={14} />
            {isExpired ? "Finalizó el" : "Válida hasta el"} {formattedEndDate}
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/offers/${offer._id}`);
          }}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Ver oferta
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/offers/termsAndConditions");
          }}
          className="text-center text-xs font-medium text-foreground-description transition-colors hover:text-foreground hover:underline"
        >
          Términos y condiciones
        </button>
      </div>
    </div>
  );
}
