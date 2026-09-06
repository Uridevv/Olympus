import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { TicketMinus, Filter, SquareCheckBig, Square } from "lucide-react";
import {
  createOffer,
  getOneOffer,
  updateOffer,
  deleteOffer,
  getProductsInOffer,
} from "@/api/offer";
import { Offer, OfferFormData } from "@/Types/offerType";
import { Textarea } from "@/components/ui/textarea";
import { useProduct } from "@/store/productStore";
import { FormProductOfferTarget } from "@/components/admin/others/offers/FormProductOfferTarget";
import { useAuth } from "@/store/authStore";
import { useCategory } from "@/context/CategoryContext";
import { Product } from "@/Types/productType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function OfferForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<OfferFormData>();
  const { productsActive } = useProduct();
  const { categories } = useCategory();
  const [productsInOffer, setProductsInOffer] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [offer, setOffer] = useState<Offer>();
  const [isLoading, setIsLoading] = useState(true);

  // La lista de productos activos viene paginada; hay que traer todas las
  // páginas para que el formulario pueda ofrecer todos los productos disponibles.
  useEffect(() => {
    let cancelled = false;
    async function loadAllActiveProducts() {
      while (!cancelled && useProduct.getState().hasMoreProductsActive) {
        // Si ya hay una carga en curso (p.ej. la carga inicial disparada al
        // importar el store), hay que ceder el hilo con un macrotask real
        // (setTimeout) en vez de seguir en un loop de solo microtasks: si no,
        // el loop nunca deja que la promesa del fetch en curso se resuelva y
        // el tab se cuelga/crashea.
        if (useProduct.getState().isLoadingProductsActive) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          continue;
        }
        await useProduct.getState().loadMoreProductsActive();
      }
    }
    loadAllActiveProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(
    () =>
      categoryFilter === "all"
        ? productsActive
        : productsActive.filter((product) => product.category === categoryFilter),
    [productsActive, categoryFilter]
  );

  const selectableFilteredIds = useMemo(
    () =>
      filteredProducts
        .filter((product) => {
          const isOutOfStock = product.stock <= 0;
          const belongsToCurrentOffer =
            !!params.id && product.offered.offers.includes(params.id);
          const isLockedByOtherOffer =
            product.offered.isOffered && !belongsToCurrentOffer;
          return !isOutOfStock && !isLockedByOtherOffer;
        })
        .map((product) => product._id),
    [filteredProducts, params.id]
  );

  const allFilteredSelected =
    selectableFilteredIds.length > 0 &&
    selectableFilteredIds.every((id) => productsInOffer.includes(id));

  const handleToggleSelectAll = () => {
    setProductsInOffer((prev) => {
      if (allFilteredSelected) {
        const idsToRemove = new Set(selectableFilteredIds);
        return prev.filter((id) => !idsToRemove.has(id));
      }
      return Array.from(new Set([...prev, ...selectableFilteredIds]));
    });
  };

  const onSubmit: SubmitHandler<OfferFormData> = async (values) => {
    const userId = useAuth.getState().user?._id;
    if (!userId) {
      toast.error("Error: Usuario no autenticado.");
      return;
    }

    // Lógica común: Crear un FormData para enviar los datos
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("endDate", values.endDate);
    formData.append("products", JSON.stringify(productsInOffer));
    formData.append("createdBy", userId);
    formData.append("discount", values.discount.toString())

    // Lógica para el CASO DE ACTUALIZACIÓN (si hay params.id)
    if (params.id) {
      const imageFile = getValues("image")[0];
      // Si se seleccionó un nuevo archivo, lo agregamos al FormData
      if (imageFile) {
        formData.append("image", imageFile);
      }

      toast.promise(updateOffer(params.id, formData), {
        loading: "Updating offer...",
        success: (response) => {
          const offerData = response.data;
          setTimeout(() => navigate("/admin/settings/offers"), 2000);
          return `Offer "${offerData.title}" updated successfully!`;
        },
        error: (err) => {
          const errorMessage = err.response?.data?.message || err.message;
          return `Failed to update offer: ${errorMessage}`;
        },
      });
      return;
    }

    // Lógica para el CASO DE CREACIÓN
    const imageFile = getValues("image")[0];
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      // La imagen es obligatoria solo en la creación
      toast.error("Por favor, sube una imagen para la oferta.");
      return;
    }

    toast.promise(createOffer(formData), {
      loading: "Creating offer...",
      success: (response) => {
        const offerData = response.data;
        setTimeout(() => navigate("/admin/settings/offers"), 2000);
        return `Offer "${offerData.title}" created successfully!`;
      },
      error: (err) => {
        const errorMessage = err.response?.data?.message || err.message;
        return `Failed to create offer: ${errorMessage}`;
      },
    });
  };

  useEffect(() => {
    async function loadOfferData() {
      if (params.id) {
        setIsLoading(true); // Activa el estado de carga
        try {
          const res = await getOneOffer(params.id);
          const data = res.data;
          setOffer(data);
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("endDate", data.endDate);
          setValue("discount", data.discount)
          const offered = await getProductsInOffer(params.id);
          toast.promise(getProductsInOffer(params.id), {
            loading: "Loading products in offer...",
            success: () => {
              setProductsInOffer(
                offered.data.map((product: Product) => product._id)
              );
              return "Products loaded successfully!";
            },
            error: "Failed to load products in offer.",
          });
        } catch (error) {
          console.error("Error al cargar la oferta:", error);
          toast.error("No se pudo cargar la oferta.");
        } finally {
          setIsLoading(false); // Desactiva el estado de carga
        }
      } else {
        setIsLoading(false); // No hay params.id, por lo que el formulario está listo para crear
      }
    }
    loadOfferData();
  }, [params.id, setValue]);

  const OnHandleDelete = async () => {
    if (params.id) {
      toast.promise(deleteOffer(params.id), {
        loading: "Deleting offer...",
        success: () => {
          setTimeout(() => {
            navigate("/admin/settings/offers");
          }, 2000);
          return "Offer deleted successfully!";
        },
        error: "Failed to delete offer.",
      });
    }
  };

  // Función de validación personalizada para la fecha
  const validateEndDate = (value: string) => {
    const selectedDate = new Date(value);
    const today = new Date();
    // Normaliza la fecha de hoy a medianoche para comparar solo la fecha sin la hora
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0); // También normaliza la fecha seleccionada

    return (
      selectedDate > today ||
      "La fecha de finalización debe ser posterior a hoy."
    );
  };

  if (isLoading) {
    return <div>Cargando formulario...</div>;
  }

  // Condición para el caso de no encontrar oferta
  if (params.id && !offer) {
    return <div>Oferta no encontrada</div>;
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-6 justify-center items-center",
        className
      )}
      {...props}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-3/5">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <TicketMinus className="size-6" />
            <h1 className="text-xl font-bold">Create Offer.</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Title"
                {...register("title", { required: true })}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="General description about the offer"
                {...register("description", { required: true })}
                required
                className="h-[25vh]"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="title">Discount</Label>
              <Input
                id="discount"
                type="number"
                placeholder="Discount"
                {...register("discount", { required: true })}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                placeholder="## / ## / ##"
                {...register("endDate", {
                  required: "La fecha de finalización es requerida.",
                  validate: validateEndDate, // Agrega tu función de validación personalizada aquí
                })}
                required
              />
              {/* Muestra el error si existe */}
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="image">Cover Image</Label>
              <Input
                id="image"
                type="file"
                placeholder="Offer Cover Image"
                {...register("image", { required: !params.id })}
              />
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <Label>Products in Offer</Label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleToggleSelectAll}
                    disabled={selectableFilteredIds.length === 0}
                    className="hover:bg-neutral-700 rounded-lg p-1 disabled:pointer-events-none disabled:opacity-40"
                    title={allFilteredSelected ? "Desmarcar todos" : "Marcar todos"}
                  >
                    {allFilteredSelected ? (
                      <SquareCheckBig size={35} />
                    ) : (
                      <Square size={35} />
                    )}
                  </button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="hover:bg-neutral-700 rounded-lg p-1 relative"
                        title="Filtrar por categoría"
                      >
                        <Filter size={35} />
                        {categoryFilter !== "all" && (
                          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-primary" />
                        )}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filtrar por categoría</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                      >
                        <DropdownMenuRadioItem value="all">
                          Todas las categorías
                        </DropdownMenuRadioItem>
                        {categories.map((category) => (
                          <DropdownMenuRadioItem value={category._id} key={category._id}>
                            {category.name}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No hay productos disponibles en esta categoría.
                </p>
              ) : (
                <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
                  {filteredProducts.map((product) => (
                    <FormProductOfferTarget
                      product={product}
                      setProductsInOffer={setProductsInOffer}
                      key={product._id}
                      checkedDefault={productsInOffer.includes(product._id)}
                      currentOfferId={params.id}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-background">
              <Button
                type="submit"
                className={
                  params.id
                    ? "w-1/3 border-1 bg-neutral-200 rounded-sm m-auto p-3 hover:bg-neutral-400 hover:cursor-pointer text-background h-10"
                    : "w-full  text-foreground border-1 bg-neutral-200 rounded-sm m-auto p-3 hover:bg-neutral-400 hover:cursor-pointer"
                }
              >
                {params.id ? "Update" : "Create"}
              </Button>
              {params.id && (
                <button
                  type="button"
                  className="text-foreground border-1 bg-red-800 rounded-sm w-1/3 m-auto p-3 hover:bg-red-700 hover:cursor-pointer h-10 flex items-center justify-center"
                  onClick={OnHandleDelete}
                >
                  Delete Offer
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
      <Toaster theme="system" />
    </div>
  );
}
