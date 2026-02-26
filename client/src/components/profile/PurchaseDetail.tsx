import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePurchase } from "@/context/PurchaseContext";
import { Purchase } from "@/types/purchaseType";

import { PurchaseDetailCard } from "@/components/profile/PurchaseDetailCard";

export function PurchaseDetail() {
  const { id } = useParams();
  const { getOnePurchase } = usePurchase();
  const [purchase, setPurchase] = useState<Purchase>();

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        if (!id) throw new Error("Purchase ID is required");
        const res = await getOnePurchase(id);
        if (!res) throw new Error("Purchase not found");
        setPurchase(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPurchase();
  }, []);

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        if (!id) throw new Error("Purchase ID is required");
        const res = await getOnePurchase(id);
        if (!res) throw new Error("Purchase not found");
        setPurchase(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPurchase();
  }, [id]);

  return (
    <div className="p-4">
      {purchase && <PurchaseDetailCard purchase={purchase} />}
    </div>
  );
}
