import { useCategory } from "../../context/CategoryContext.tsx";
import { useFilter } from "../../context/FilterContext.tsx";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RopaFilters() {
  const { categories } = useCategory();
  const { setFilters, filters } = useFilter();

  const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      setFilters((prevState) => ({
        ...prevState,
        minPrice: 0,
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        minPrice: parseInt(e.target.value),
      }));
    }
  };

  const handleChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      setFilters((prevState) => ({
        ...prevState,
        maxPrice: 0,
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        maxPrice: parseInt(e.target.value),
      }));
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      setFilters((prevState) => ({
        ...prevState,
        name: "",
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        name: e.target.value,
      }));
    }
  };

  const handleChangeCategory = (value: string) => {
    setFilters((prevState) => ({
      ...prevState,
      category: value, // Usamos directamente 'value'
    }));
  };

  const handleChangeOnlyOffered = (checked: boolean) => {
    setFilters((prevState) => ({
      ...prevState,
      onlyOffered: checked,
    }));
  };

  const handleChangeShowOutOfStock = (checked: boolean) => {
    setFilters((prevState) => ({
      ...prevState,
      showOutOfStock: checked,
    }));
  };


  return (
    <div className="w-full rounded-xl border bg-card/50 p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="filter-name">Nombre</Label>
          <Input
            id="filter-name"
            type="text"
            placeholder="Buscar por nombre..."
            onChange={handleChangeName}
            value={filters.name}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="filter-category">Categoria</Label>
          <Select onValueChange={handleChangeCategory}>
            <SelectTrigger id="filter-category" className="w-full">
              <SelectValue placeholder="Todas las categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {categories.map((category, i) => (
                  <SelectItem value={category._id} key={i}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Precio</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min."
              onChange={handleChangeMinPrice}
              value={filters.minPrice}
              min={0}
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max."
              onChange={handleChangeMaxPrice}
              value={filters.maxPrice}
              min={0}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Disponibilidad</Label>
          <div className="flex flex-1 flex-col justify-center gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="only-offered"
                checked={filters.onlyOffered}
                onCheckedChange={(checked) =>
                  handleChangeOnlyOffered(checked === true)
                }
              />
              <Label htmlFor="only-offered" className="cursor-pointer font-normal">
                Solo ofertas
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="show-out-of-stock"
                checked={filters.showOutOfStock}
                onCheckedChange={(checked) =>
                  handleChangeShowOutOfStock(checked === true)
                }
              />
              <Label htmlFor="show-out-of-stock" className="cursor-pointer font-normal">
                Mostrar agotados
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
