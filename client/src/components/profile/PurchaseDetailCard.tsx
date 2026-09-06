import { Purchase } from "@/types/purchaseType";

export function PurchaseDetailCard({ purchase }: { purchase: Purchase }) {
  const createdDate = new Date(purchase.createdAt);
  const fechaFormateada = createdDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="h-[80vh] bg-card rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow flex gap-4">
      <div className="aspect-square h-full w-4/5 mb-4 bg-muted rounded-lg overflow-hidden">
        <img
          src={purchase.productImg.url || "/placeholder.svg"}
          alt={purchase.productBought.name}
          className="w-full object-cover h-full"
        />
      </div>
      <div className="space-y-2 h-full flex flex-col gap-4">
        <h3 className="font-semibold text-3xl line-clamp-2">
          {purchase.productBought.name}
        </h3>
        <p className="text-lg text-muted-foreground">
          {purchase.productBought.description}
        </p>

        <p>
          Fecha de compra:
          <p className="text-sm text-muted-foreground">
            {fechaFormateada}
          </p>
        </p>

        <div className="flex items-center justify-between">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              purchase.state === "Delivered"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {purchase.state}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-lg font-bold text-green-600">
            ${purchase.productBought.price}
          </span>
        </div>
      </div>
    </div>
  );
}
