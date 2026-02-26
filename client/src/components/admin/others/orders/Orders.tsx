import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export function Orders() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className="p-6 text-foreground bg-background">
      <h1 className="text-3xl font-bold tracking-tight">Orders</h1>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-bold tracking-tight">
            Gestión de Pedidos
          </h2>
          <p className="text-subtle-light dark:text-subtle-dark mt-1">
            Busca, filtra y gestiona los pedidos de tus clientes.
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <div className="flex flex-col gap-3">
              <Label className="text-xl">Search</Label>
              <Input
                className="w-full pl-10 pr-4 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Buscar pedido por ID, cliente..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col gap-3">
              <Label className="text-xl">State</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>State</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="coming">In coming</SelectItem>
                    <SelectItem value="arrived">Arrived</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="date" className="text-xl">
              Date
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-primary/5 dark:bg-primary/10">
                <tr>
                  <th className="px-6 py-3 font-medium" scope="col">
                    Pedido #
                  </th>
                  <th className="px-6 py-3 font-medium" scope="col">
                    Fecha
                  </th>
                  <th className="px-6 py-3 font-medium" scope="col">
                    Cliente
                  </th>
                  <th className="px-6 py-3 font-medium text-center" scope="col">
                    Artículos
                  </th>
                  <th className="px-6 py-3 font-medium text-center" scope="col">
                    Estado
                  </th>
                  <th className="px-6 py-3 font-medium text-right" scope="col">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-light dark:border-border-dark">
                  <td className="px-6 py-4 font-medium">#1001</td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark">
                    2024-01-15
                  </td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark">
                    Sophia Clark
                  </td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark text-center">
                    2
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
                      Pendiente
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 text-sm font-medium text-white rounded-lg outline-0 hover:bg-secondary-background hover:cursor-pointer">
                      Actualizar
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-border-light dark:border-border-dark">
                  <td className="px-6 py-4 font-medium">#1006</td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark">
                    2024-01-20
                  </td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark">
                    Ethan Rodriguez
                  </td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark text-center">
                    1
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                      En camino
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 text-sm font-medium text-white rounded-lg outline-0 hover:bg-secondary-background hover:cursor-pointer">
                      Ver detalles
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-border-light dark:border-border-dark">
                  <td className="px-6 py-4 font-medium">#1003</td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark">
                    2024-01-17
                  </td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark">
                    Olivia Bennett
                  </td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark text-center">
                    1
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
                      Pendiente
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 text-sm font-medium text-white rounded-lg outline-0 hover:bg-secondary-background hover:cursor-pointer">
                      Actualizar
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-border-light dark:border-border-dark">
                  <td className="px-6 py-4 font-medium">#1007</td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark">
                    2024-01-21
                  </td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark">
                    Mason Lee
                  </td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark text-center">
                    3
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                      Entregado
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 text-sm font-medium text-white rounded-lg outline-0 hover:bg-secondary-background hover:cursor-pointer">
                      Ver detalles
                    </button>
                  </td>
                </tr>
                <tr className="border-b-0">
                  <td className="px-6 py-4 font-medium">#1005</td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark">
                    2024-01-19
                  </td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark">
                    Ava Harper
                  </td>
                  <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark text-center">
                    4
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
                      Pendiente
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 text-sm font-medium text-white rounded-lg outline-0 hover:bg-secondary-background hover:cursor-pointer">
                      Actualizar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
