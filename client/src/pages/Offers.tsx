import { getAllOffers } from "@/api/offer";
import { Offer } from "@/Types/offerType";
import { useEffect, useState } from "react";

export function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    async function loadOffers() {
      const res = await getAllOffers();
      setOffers(res.data);
    }
    loadOffers();
  }, []);

  return (
    <div className=" py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-2 dark:text-gray-500">
            Ofertas Exclusivas
          </h1>
          <p className="text-lg text-gray-600">
            No dejes pasar estas increíbles promociones que tenemos para ti.
          </p>
        </header>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 w-full">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-secondary-background rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col"
            >
              <img
                src={offer.image.url}
                alt={offer.title}
                className="h-1/2 w-full h-64 object-cover"
              />
              <div className="p-6 h-1/2 bg-sky-500 justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-500 mb-2">
                    {offer.title}
                  </h2>
                  <p className="text-gray-700 mb-4">{offer.description}</p>
                </div>
                <button className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 hover:cursor-pointer transition-colors duration-300">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
