import { useContext, createContext, useState, ReactNode } from "react";
import { Purchase } from "@/types/purchaseType";
import { getPurchase, getPurchases } from "@/api/purchases";
import { useAuth } from "@/store/authStore";

interface PurchaseContextType {
  purchases: Purchase[];
  getAllPurchases: () => Promise<void>;
  getOnePurchase: (purchaseId: string) => Promise<Purchase | undefined>;
}

export const PurchaseContext = createContext<PurchaseContextType | undefined>(
  undefined
);

export const usePurchase = () => {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error("usePurchase must be used within a PurchaseProvider");
  }
  return context;
};

export const PurchaseProvider = ({ children }: { children: ReactNode }) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const getAllPurchases = async () => {
    try {
      const user = useAuth.getState().user;
      const userId = user?._id || "";
      const res = await getPurchases(userId);
      if (res) {
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPurchases(sorted);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getOnePurchase = async (purchaseId: string) => {
    try {
      const user = useAuth.getState().user;
      const userId = user?._id || "";
      console.log({ userId: userId, purchaseId: purchaseId });
      const res = await getPurchase(userId, purchaseId);
      if (res) return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PurchaseContext.Provider
      value={{ purchases, getAllPurchases, getOnePurchase }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};
