import { ProductImageSelect } from "./ProductImageSelect.jsx";
import { useEffect, useState } from "react";
import { ProductImageSelec } from "@/Types/productType";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ImageSelectProps {
  productImages: ProductImageSelec[]; // Cambia el tipo según tu necesidad
  setProductImages: (images: any[]) => void; // Cambia el tipo según tu necesidad
  colors: string[]; // Cambia el tipo según tu necesidad
}

export function ImageSelect({ productImages, setProductImages, colors }:ImageSelectProps) {
  const [ImageColor, setImageColor] = useState<string>();

  const addProductImage = (newImage:ProductImageSelec) => {
    setProductImages([...productImages, newImage]);
  };

  const deleteProduct = (image: ProductImageSelec) => {

    const newProductImages = productImages.filter((item) => {
      if ("file" in item && "file" in image) {
        return item.file !== image.file;
      } else if (item.url && image.url) {
        return item.url !== image.url;
      }
      return true;
    });
    setProductImages(newProductImages);
  };

  const onChangeColor = (idex:number, newColor:string) => {
    const newProductImages = [...productImages];
    newProductImages[idex].color = newColor;
    setProductImages(newProductImages);
  };

  useEffect(() => {
    return () => {
      productImages.forEach((image) => {
        if ("file" in image && image.file instanceof File) {
          URL.revokeObjectURL(image.objectUrl? image.objectUrl : "");
        }
      });
    };
  }, [productImages]);

  useEffect(() => {
    setImageColor(colors[0]);
  }, [colors]);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <ProductImageSelect
        addProductImage={addProductImage}
        color={ImageColor? ImageColor : colors[0]} // Cambia el color según tu necesidad
      />

      {productImages.map((image, index) => {
        let imageUrl = "";

        if ("file" in image && image.file instanceof File) {
          if (!image.objectUrl) {
            image.objectUrl = URL.createObjectURL(image.file);
          }
          imageUrl = image.objectUrl;
        } else if (image.url) {
          imageUrl = image.url;
        }
        return (
          <div
            className="group relative flex flex-col overflow-hidden rounded-xl border bg-card"
            key={index}
          >
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={`Product ${index}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-center text-xs text-muted-foreground">
                  Sin imagen disponible
                </div>
              )}
              <button
                type="button"
                onClick={() => deleteProduct(image)}
                className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-destructive group-hover:opacity-100"
              >
                <X className="size-4" />
                <span className="sr-only">Eliminar imagen</span>
              </button>
            </div>

            <div className="p-2">
              <Select
                value={image.color}
                onValueChange={(value) => onChangeColor(index, value)}
              >
                <SelectTrigger size="sm" className="w-full">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map((color, i) => (
                    <SelectItem value={color} key={i}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      })}
    </div>
  );
}
