import { Purchase } from "@/types/purchaseType";

export function PurchaseProductTarget({ purchase }: { purchase: Purchase }) {
  const createdDate = new Date(purchase.createdAt);
  const fechaFormateada = createdDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="bg-card rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="aspect-square h-2/3 w-full mb-4 bg-muted rounded-lg overflow-hidden">
        <img
          src={purchase.productImg.url || "/placeholder.svg"}
          alt={purchase.productBought.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2 h-1/3">
        <h3 className="font-semibold text-lg line-clamp-2">
          {purchase.productBought.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {purchase.productBought.name}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {fechaFormateada}
          </span>
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
            {purchase.productBought.price}
          </span>
          <button className="text-sm text-primary hover:underline">
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
}
