import { OfferTarget } from "@/components/admin/others/offers/OfferTarget";
import { Offer } from "@/Types/offerType";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllOffers } from "@/api/offer";
import { useEffect, useState } from "react";

export function AdminOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    async function loadOffers() {
      const res = await getAllOffers();
      setOffers(res.data);
    }
    loadOffers();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="p-6 text-foreground bg-background">
      <div className="flex justify-between">
        <h1 className="text-2xl text-foreground font-bold mb-4">Offers</h1>
        <Plus
          className="text-white rounded-lg hover:bg-neutral-700"
          size={30}
          onClick={() => navigate("/admin/settings/offers/create")}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5 justify-between">
        {offers.map((offer) => (
          <OfferTarget offer={offer} key={offer._id} />
        ))}
      </div>
    </div>
  );
}
