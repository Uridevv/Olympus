import { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useProduct } from "../store/productStore.js";
import { useCategory } from "../context/CategoryContext.js";
import { ImageSelect } from "../components/admin/playground/createProduct/ImageSelect.js";
import { AddParameterProduct } from "../components/admin/playground/createProduct/AddParameterProduct.js";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../api/product.js";
import { getProductAllImages } from "../api/productImages.js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ProductFormData,
  ProductImageForm,
  ProductImage,
} from "../Types/productType.ts";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddCategoryModal } from "@/components/admin/playground/createProduct/AddCategoryModal.tsx";

export function UpdateProductForm() {
  const [colors, setColors] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [productImages, setProductImages] = useState<
    (ProductImage | ProductImageForm)[]
  >([]);
  const [productImagesCopy, setProductImagesCopy] = useState<
    (ProductImage | ProductImageForm)[]
  >([]);

  const { getAllCategories, categories } = useCategory();

  const {
    createProduct,
    uploadImages,
    createImagesProduct,
    getProducts,
    updateImages,
    deleteImagesDb,
    deleteImagesFromCloudinary,
    deleteProduct,
  } = useProduct();

  const { handleSubmit, control, register, setValue } =
    useForm<ProductFormData>();

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    getAllCategories();

    async function loadProductData() {
      const res = await getProduct(params.id!);
      const data = res.data;

      setValue("name", data.name);
      setValue("description", data.description);
      setValue("price", data.price);
      setValue("stock", data.stock);
      setValue("category", data.category);
      setColors(data.colors);
      setSize(data.size);
      setIsActive(data.active);
    }

    async function getProductImages() {
      const res = await getProductAllImages({ productId: params.id! });
      setProductImages(res.data);
      setProductImagesCopy(structuredClone(res.data));
    }

    if (params.id) {
      // Se cargan primero los colores del producto y luego sus imágenes:
      // el <select> de color de cada imagen necesita que sus <option>
      // (los colores del producto) ya existan para poder mostrar
      // seleccionado el color que trae cada imagen. Si las imágenes
      // llegaran antes (peticiones en paralelo, orden no garantizado),
      // el <select> se renderiza sin opciones todavía y el navegador
      // cae por defecto al primer color para todas las imágenes.
      (async () => {
        await loadProductData();
        await getProductImages();
      })();
    }
  }, []);

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
  toast.promise(
    (async () => {
      data.colors = colors.filter((c) => c !== "Nuevo Valor");
      data.size = size;
      data.price = parseInt(data.price.toString());
      data.stock = parseInt(data.stock.toString());
      data.active = isActive;

      if (params.id) {
        const res = await updateProduct(params.id, data);
        if (!res) throw new Error("Producto no actualizado");

        // update imágenes
        const imagesToUpdate: ProductImage[] = productImages
          .filter((item, index): item is ProductImage => {
            const hasChanged =
              JSON.stringify(item) !== JSON.stringify(productImagesCopy[index]);
            const isNotFile = !(item as ProductImageForm).file;
            return hasChanged && isNotFile && "_id" in item;
          })
          .map((item) => ({
            _id: item._id,
            url: item.url,
            color: item.color,
            public_id: item.public_id,
            productId: item.productId,
          }));

        if (imagesToUpdate.length > 0) await updateImages(imagesToUpdate);

        const imagesUpload = productImages.filter(
          (image) => "file" in image && image.file instanceof File
        );

        if (imagesUpload.length > 0) {
          const urls = await uploadImages(imagesUpload, params.id);
          await createImagesProduct(urls, params.id);
        }

        const imagesToDelete: ProductImage[] = productImagesCopy
          .filter((image): image is ProductImage => {
            const isNotFile = !(image as ProductImageForm).file;
            return (
              "_id" in image &&
              isNotFile &&
              !productImages.find((img) => img._id === image._id)
            );
          })
          .map((image) => ({
            _id: image._id,
            url: image.url,
            color: image.color,
            public_id: image.public_id,
            productId: image.productId,
          }));

        if (imagesToDelete.length > 0) {
          await deleteImagesDb(imagesToDelete);
          await deleteImagesFromCloudinary(imagesToDelete);
        }
        await getProducts();
        return "Producto actualizado correctamente";
      } else {
        const res = await createProduct(data);
        if (!res) throw new Error("Producto no creado");

        const imageUrls = await uploadImages(productImages, res._id!);
        await createImagesProduct(imageUrls, res._id);

        return "Producto creado correctamente";
      }
    })(),
    {
      loading: "Procesando producto...",
      success: (msg) => {
        setTimeout(async () => {
          await getProducts();
          navigate("/admin/playground/stock");
        }, 2000);
        return msg;
      },
      error: "Hubo un error en el proceso",
    }
  );
};

  const OnCLickDeleteProduct = async () => {
    try {
      if (params.id) {
        //Obtener imagenes del producto.
        const imagesToDelete: ProductImage[] = productImagesCopy
          .filter((image): image is ProductImage => {
            const isNotFile = !(image as ProductImageForm).file;
            return (
              "_id" in image &&
              isNotFile &&
              !productImages.find((img) => img._id === image._id)
            );
          })
          .map((image) => ({
            _id: image._id,
            url: image.url,
            color: image.color,
            public_id: image.public_id,
            productId: image.productId,
          }));

        if (imagesToDelete.length > 0) {
          deleteImagesDb(imagesToDelete);
          await deleteImagesFromCloudinary(imagesToDelete);
        }

        toast.promise(deleteProduct(params.id), {
          loading: "Eliminando producto...",
          success: () => {
            setTimeout(async() => {
              await getProducts();
              navigate("/admin/playground/stock");
            }, 2000);
            return "Product deleted successfully! Redirecting...";
          },
          error: "Hubo un error al eliminar el producto.",
        });
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const handleActiveChange = () => {
    setIsActive((isActive) => !isActive);
  };

  return (
    <>
      <div className="mx-auto flex max-w-4xl flex-col gap-6 pb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {params.id ? "Editar producto" : "Crear producto"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {params.id
                ? "Actualiza la información, imágenes, colores y tallas del producto."
                : "Completa los datos para publicar un nuevo producto en la tienda."}
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-2">
            <Label htmlFor="product-active" className="text-sm font-medium">
              Producto activo
            </Label>
            <Switch
              id="product-active"
              checked={isActive}
              onClick={handleActiveChange}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Información general</CardTitle>
              <CardDescription>
                Nombre y descripción visibles para los clientes.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre del producto</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ej. Camisa de lino"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe el producto..."
                  className="min-h-32"
                  {...register("description", { required: true })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Precio e inventario</CardTitle>
              <CardDescription>
                Define el precio de venta y las unidades disponibles.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price">Precio</Label>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="price"
                    type="number"
                    min={0}
                    placeholder="0.00"
                    className="pl-7"
                    {...register("price", { required: true })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  min={0}
                  placeholder="0"
                  {...register("stock", { required: true })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categoría</CardTitle>
              <CardDescription>
                Selecciona en qué categoría del catálogo aparecerá.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      if (value === "add-category") {
                        setIsAddCategoryModalOpen(true);
                        return;
                      }
                      field.onChange(value);
                    }} // Vincula el cambio de valor
                    value={field.value} // Muestra el valor actual de React Hook Form
                    // No necesitas `defaultValue` si `value` está controlado por RHF
                  >
                    <SelectTrigger className="w-full">
                      {/* Usa SelectValue para mostrar el valor seleccionado */}
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorías</SelectLabel>
                        <SelectItem value="select" className="text-gray-500">
                          Select Category
                        </SelectItem>
                        {categories.map((category) => (
                          <SelectItem value={category._id} key={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}

                        <SelectItem value="add-category">
                          Add Category
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Colores y tallas</CardTitle>
              <CardDescription>
                Variantes disponibles para este producto.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <AddParameterProduct
                parameters={colors}
                setParameters={setColors}
                name={"Colores"}
              />
              <Separator />
              <AddParameterProduct
                parameters={size}
                setParameters={setSize}
                name={"Tallas"}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Imágenes</CardTitle>
              <CardDescription>
                Sube al menos una imagen por color disponible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageSelect
                productImages={productImages}
                setProductImages={setProductImages}
                colors={colors}
              />
            </CardContent>
          </Card>

          <div
            className={`flex items-center gap-4 rounded-lg border bg-card p-4 ${
              params.id ? "justify-between" : "justify-end"
            }`}
          >
            {params.id && (
              <Button
                type="button"
                variant="destructive"
                onClick={OnCLickDeleteProduct}
              >
                Eliminar producto
              </Button>
            )}
            <Button type="submit" size="lg">
              {params.id ? "Guardar cambios" : "Crear producto"}
            </Button>
          </div>
        </form>
      </div>

      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        title="Add Category"
      />
    </>
  );
}
