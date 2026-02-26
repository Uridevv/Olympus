import { PurchaseProductTarget } from "@/components/profile/PurchaseProductTarget";
import { usePurchase } from "@/context/PurchaseContext";
import { Purchase } from "@/types/purchaseType";

export function Dashboard() {
  const { purchases } = usePurchase();

  // 1️⃣ Agrupar las compras por fecha (sin formatear para no perder orden cronológico)
  const groupedPurchases = purchases.reduce((acc, purchase) => {
    const dateKey = purchase.createdAt.split("T")[0]; // 'YYYY-MM-DD'
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(purchase);
    return acc;
  }, {} as Record<string, Purchase[]>);

  // 2️⃣ Ordenar fechas de más reciente a más antigua
  const sortedDates = Object.keys(groupedPurchases).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Purchases</h1>

      {purchases.length > 0 ? (
        <div className="p-4">
          {sortedDates.map((dateKey) => {
            // Mostrar la fecha en formato legible
            const formattedDate = new Date(dateKey).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <div key={dateKey}>
                {/* Encabezado de fecha */}
                <div className="flex items-center my-4">
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {formattedDate}
                  </h2>
                  <div className="flex-grow border-t border-gray-300 dark:border-gray-600 ml-4"></div>
                </div>

                {/* Compras de ese día */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedPurchases[dateKey].map((purchase) => (
                    <PurchaseProductTarget
                      purchase={purchase}
                      key={purchase._id}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4">
          <h1 className="text-xl">No Purchases</h1>
        </div>
      )}
    </div>
  );
}
