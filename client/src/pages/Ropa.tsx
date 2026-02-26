import { RopaFilters } from "../components/products/RopaFilters";
import { Catalogo } from "../components/products/Catalogo";

export function Ropa() {
  return (
    <div className="bg-background w-full p-20 flex flex-col gap-7">
      <RopaFilters/>
      <Catalogo/>
    </div>
  );
}
