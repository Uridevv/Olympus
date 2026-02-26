import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types/productType";
import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { useProduct } from "@/store/productStore";
import { Skeleton } from "@/components/ui/skeleton";


interface FormProductOfferTargetProps {
  product: Product;
  setProductsInOffer?: Dispatch<SetStateAction<string[]>>;
  checkedDefault: boolean;
}

export function FormProductOfferTarget({
  product,
  setProductsInOffer,
  checkedDefault,
}: FormProductOfferTargetProps) {
  const [imageProduct, setImageProduct] = useState("");
  const [checked, setChecked] = useState(checkedDefault); // estado controlado
  const { getImageProduct } = useProduct();

  const onHandleChange = (isChecked: boolean) => {
    setChecked(isChecked); // actualizar estado local

    if (setProductsInOffer) {
      setProductsInOffer((prevState) => {
        if (isChecked) {
          return [...new Set([...prevState, product._id])]; // evita duplicados
        } else {
          return prevState.filter((id) => id !== product._id);
        }
      });
    }
  };

  useEffect(() => {
    setChecked(checkedDefault); // sincroniza cuando cambie checkedDefault
  }, [checkedDefault]);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await getImageProduct(product._id);
        setImageProduct(res.url);
      } catch (error) {
        console.error("Error al cargar la imagen del producto", error);
      }
    }
    loadImages();
  }, []);


  if(!imageProduct) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-lg border-1 p-4 minh-30 justify-between">
        <Skeleton className="h-60 w-full rounded-lg"/>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-5 rounded-lg border-1 p-4 min-h-30 justify-between">
      <div className="h-60 w-full">
        <img
          src={imageProduct}
          alt={product.name}
          className="h-full w-full cover"
        />
      </div>
      <Checkbox
        id={product._id}
        onCheckedChange={onHandleChange}
        checked={checked} // ahora es controlado
      />
    </div>
  );
}