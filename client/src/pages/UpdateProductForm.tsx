import { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useProduct } from "../store/productStore.js";
import { useCategory } from "../context/CategoryContext.js";
import { ImageSelect } from "../components/admin/playground/createProduct/ImageSelect.js";
import { AddParameterProduct } from "../components/admin/playground/createProduct/AddParameterProduct.js";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../api/product.js";
import { getProductAllImages } from "../api/productImages.js";
import {  Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Switch } from "@/components/ui/switch";
import {
  ProductFormData,
  ProductImageForm,
  ProductImage,
  ImageFile,
} from "../types/productType.ts";
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
      loadProductData();
      getProductImages();
    }
  }, []);

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    try {
      data.colors = colors.filter((c) => c !== "Nuevo Valor");
      data.size = size;
      data.price = parseInt(data.price.toString());
      data.stock = parseInt(data.stock.toString());
      data.active = isActive;

      if (params.id) {
        const res = await toast.promise(updateProduct(params.id, data), {
          loading: "Actualizando producto...",
          success: "Producto actualizado correctamente.",
          error: "Hubo un error al actualizar el producto.",
        });

        if (!res) throw new Error("Producto no actualizado correctamente");

        const imagesToUpdate: ProductImage[] = productImages
          .filter((item, index): item is ProductImage => {
            const hasChanged =
              JSON.stringify(item) !== JSON.stringify(productImagesCopy[index]);
            const isNotFile = !(item as ProductImageForm).file; // Verificamos si la propiedad 'file' no existe
            return hasChanged && isNotFile && "_id" in item; // Aseguramos que tenga la propiedad '_id' de ProductImage
          })
          .map((item) => ({
            _id: item._id,
            url: item.url,
            color: item.color,
            public_id: item.public_id,
            productId: item.productId,
          }));
        if (imagesToUpdate.length > 0) await updateImages(imagesToUpdate);

        //Imagenes a subir a render.
        const imagesUpload = productImages.filter(
          (image) => "file" in image && image.file instanceof File
        );

        // Subir imagenes a la base de datos despues de tener la url.
        if (imagesUpload.length > 0) {
          // Subir a cloudinary y obtener las urls.
          const urls: ImageFile[] = await uploadImages(imagesUpload, params.id);

          // SUbir imagenes a la base de datos.
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
          deleteImagesDb(imagesToDelete);
          deleteImagesFromCloudinary(imagesToDelete);
        }

        navigate("/admin/playground/stock");
      } else {
        const res = await createProduct(data);
        if (!res) throw new Error("Producto no creado correctamente");

        const imageUrls: ImageFile[] = await uploadImages(
          productImages,
          res._id!
        );
        await toast.promise(createImagesProduct(imageUrls, res._id), {
          loading: "Loading...",
          success: () => {
            setTimeout(() => {
              navigate("/admin/playground/stock");
            }, 2000);
            return "Product created successfully! Redirecting...";
          },
          error: "Error",
        });

        getProducts();
      }
    } catch (error) {
      console.error(error);
    }
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
            setTimeout(() => {
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
      <div className="h-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl mb-4 font-bold">
            {params.id ? "Update Product" : "Crear Product"}
          </h1>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="airplane-mode">Active</Label>
            <Switch id="" checked={isActive} onClick={handleActiveChange} />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg p-4 backdrop-blur-[200px] border-gray-700 gap-7"
        >
          <Label htmlFor="" className="text-xl">
            Product Name:
          </Label>
          <Input
            type="text"
            placeholder="Product Name"
            className="border-gray-600 outline-0 text-xl"
            {...register("name", { required: true })}
          />
          <Separator />
          <Label htmlFor="" className="text-xl">
            Product Description:
          </Label>
          <Textarea
            className="border-gray-600 outline-0 text-xl"
            placeholder="Description"
            {...register("description", { required: true })}
          ></Textarea>
          <Separator />
          <div className="flex h-15 space-x-4 text-sm justify-between">
            <div className="flex flex-col w-1/2 items-center">
              <Label htmlFor="" className="text-xl">
                Product Price:
              </Label>
              <Input
                type="number"
                className="border-gray-600 outline-0 text-xl mt-5 w-1/2 text-center"
                placeholder="Price"
                min={0}
                {...register("price", { required: true })}
              />
            </div>

            <Separator orientation="vertical" />

            <div className="flex flex-col w-1/2 items-center">
              <Label htmlFor="" className="text-xl">
                Product Stock:
              </Label>
              <Input
                type="number"
                className="border-gray-600 outline-0 text-xl mt-5 w-1/2 text-center"
                placeholder="Stock"
                min={0}
                {...register("stock", { required: true })}
              />
            </div>
          </div>
          <Separator className="mt-10" />
          <Label className="text-xl">Category:</Label>
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
                    <SelectItem value="select" className="text-gray-500">Select Category</SelectItem>
                    {categories.map((category) => (
                      <SelectItem value={category._id} key={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}

                    <SelectItem value="add-category">Add Category</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Separator className="mt-10" />
          <AddParameterProduct
            parameters={colors}
            setParameters={setColors}
            name={"Colors"}
          />
          <AddParameterProduct
            parameters={size}
            setParameters={setSize}
            name={"Size"}
          />
          <ImageSelect
            productImages={productImages}
            setProductImages={setProductImages}
            colors={colors}
          />
          <div className="flex justify-between items-center">
            {params.id && (
              <button
                type="button"
                className="text-foreground border-1 bg-red-800 rounded-sm w-1/4 m-auto p-3 hover:bg-red-700 hover:cursor-pointer"
                onClick={OnCLickDeleteProduct}
              >
                Delete Product
              </button>
            )}
            <button className="border-1 text-foreground rounded-sm w-1/4 m-auto p-3  hover:cursor-pointer bg-sky-700 hover:bg-sky-600">
              {params.id ? "Update Product" : "Crear Product"}
            </button>
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
