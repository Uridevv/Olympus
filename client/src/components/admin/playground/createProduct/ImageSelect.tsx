import { ProductImageSelect } from "./ProductImageSelect.jsx";
import { useEffect, useState } from "react";
import { ProductImageSelec } from "@/types/productType.js";

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
    <div className="mt-4 flex gap-4 flex-wrap">
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
            className="h-40 grow min-w-40 p-4 border-1 border-dashed border-gray-600 flex relative"
            key={index}
          >
            <div className="h-full w-1/2 flex ">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={`Product ${index}`}
                  className="object-cover h-full"
                />
              ) : (
                <span className="text-gray-500">No image available</span>
              )}
            </div>
            <select
              onChange={(e) => onChangeColor(index, e.target.value)}
              className="bg-transparent"
              value={image.color} // Establecer el valor seleccionado aquí
            >
              {colors.map((color, i) => (
                <option value={color} key={i} className="bg-neutral-900">
                  {color}
                </option>
              ))}
            </select>

            <i
              className="fa-solid fa-circle-xmark absolute right-2  text-red-900 text-xl hover:cursor-pointer hover:text-red-600"
              onClick={() => deleteProduct(image)}
            ></i>
          </div>
        );
      })}
    </div>
  );
}
