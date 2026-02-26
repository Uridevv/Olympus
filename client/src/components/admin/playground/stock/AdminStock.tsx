import { ProductTargetAdmin } from "@/components/admin/playground/stock/ProductTargetAdmin";
import { useProduct } from "@/store/productStore";

export function AdminStock() {
  const { products } = useProduct();

  if (!products) return <h1>Loading...</h1>;

  return (
    <div className="p-6">
      <h1 className="text-2xl text-foreground font-bold mb-4">Stock</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,30%))] gap-4 justify-between">
        {products.map((product) => (
          <ProductTargetAdmin product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
