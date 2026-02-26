import { useCategory } from "../../context/CategoryContext.tsx";
import { useFilter } from "../../context/FilterContext.tsx";
import { Input } from "@/components/ui/input";
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


  return (
    <div className="w-full h-full p-4 justify-between grid gap-5  grid-cols-[repeat(auto-fit,minmax(250px,23%))]">
      <div className=" flex flex-col gap-2">
        <span>Nombre:</span>
        <Input
          type="text"
          placeholder="Search for name."
          onChange={handleChangeName}
          value={filters.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="m-auto">Precio:</span>
        <div className="flex justify-between">
          <Input
            type="number"
            placeholder="Min."
            onChange={handleChangeMinPrice}
            value={filters.minPrice}
            className="w-2/5"
            min={0}
          />
          <Input
            type="number"
            placeholder="Max."
            onChange={handleChangeMaxPrice}
            value={filters.maxPrice}
            className="w-2/5"
            min={0}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span>Categoria:</span>
        <Select onValueChange={handleChangeCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorys</SelectLabel>
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
    </div>
  );
}
