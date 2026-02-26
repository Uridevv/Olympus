import { Offer } from "@/types/offerType";
import { useNavigate } from "react-router-dom";
import { Edit, Eye } from "lucide-react";

export function OfferTarget({ offer }: { offer: Offer }) {
  const navigate = useNavigate();

  return (
    <div
      className="border-1 rounded-lg h-[40vh] relative text-foreground   hover:shadow-lg hover:shadow-neutral-500/50"
      onClick={() => navigate(`/admin/settings/offers/${offer._id}`)}
    >
      <img
        src={offer.image?.url}
        alt="Offer Image"
        className="h-full w-full object-cover rounded-lg"
      />
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <div className="flex items-end justify-between">
          <div className="max-w-4/6">
            <h2 className="text-xl font-bold">{offer.title}</h2>
            <p className="text-lg font-medium overflow-hidden whitespace-nowrap text-ellipsis">
              {offer.description}{" "}
            </p>
          </div>
          <div className="flex w-1/4  justify-around">
            <Eye
              size={30}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/admin/settings/offers/${offer._id}`);
              }}
            />
            <Edit
              size={30}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/admin/settings/offers/create/${offer._id}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
