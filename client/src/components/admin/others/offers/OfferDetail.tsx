import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneOffer, getProductsInOffer } from "@/api/offer";
import { Offer } from "@/types/offerType";
import { Separator } from "@/components/ui/separator";
import { useProduct } from "@/store/productStore";
import { Product } from "@/types/productType";
import { ProductOfferedView } from "@/components/admin/others/offers/ProductOfferedView";

export function OfferDetail() {
  const params = useParams();
  const [offer, setOffer] = useState<Offer>();
  const [productsOffered, setProductsOffered] = useState<Product[]>([]);

  useEffect(() => {
    async function loadOffer() {
      if (params.id) {
        const res = await getOneOffer(params.id);
        setOffer(res.data);
        const offered = await getProductsInOffer(params.id);
        setProductsOffered(offered.data);
        
      }
    }
    loadOffer();
  }, []);

  if (!offer) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  return (
    <div className="flex p-6 flex-col">
      <h1 className="text-3xl font-bold">{offer.title}</h1>
      <div className="flex flex-col gap-5 w-full h-full p-3">
        <p className="text-xl">{offer.description}</p>
        <Separator orientation="horizontal" />
        <div className="w-full h-full">
          <h2 className="text-2xl font-bold">Proucts Offered</h2>
          <div className="h-full w-full grid justify-between grid-cols-[repeat(auto-fit,minmax(180px,270px))] p-4">
            {productsOffered.map((product) => {
              if (product.active) {
                return (
                  <ProductOfferedView key={product._id} product={product} />
                );
              }
            })}
          </div>
        </div>

        <Separator orientation="horizontal" />
        <div className="flex flex-col gap-3">
          <p className="text-lg">
            Aprovecha la gran promoción que tenemos para ti. Valida unicamente
            hasta {offer.endDate}.
          </p>
          <p>
            Consulta los{" "}
            <a href="/offers/termsAndConditions/" className="text-blue-800">
              Terminos y condiciones
            </a>{" "}
            de esta promocion en nuestro sitio oficial.
          </p>
        </div>
      </div>
    </div>
  );
}
