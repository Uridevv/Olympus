import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/Types/productType";
import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { useProduct } from "@/store/productStore";
import { Skeleton } from "@/components/ui/skeleton";


interface FormProductOfferTargetProps {
  product: Product;
  setProductsInOffer?: Dispatch<SetStateAction<string[]>>;
  checkedDefault: boolean;
  currentOfferId?: string;
}

export function FormProductOfferTarget({
  product,
  setProductsInOffer,
  checkedDefault,
  currentOfferId,
}: FormProductOfferTargetProps) {
  const [imageProduct, setImageProduct] = useState("");
  const [checked, setChecked] = useState(checkedDefault); // estado controlado
  const { getImageProduct } = useProduct();
  const isOutOfStock = product.stock <= 0;
  // Un producto ya asignado a OTRA oferta no puede agregarse a esta.
  // Si pertenece a la oferta que se está editando, sí se permite (para poder quitarlo).
  const belongsToCurrentOffer =
    !!currentOfferId && product.offered.offers.includes(currentOfferId);
  const isLockedByOtherOffer =
    product.offered.isOffered && !belongsToCurrentOffer;

  const onHandleChange = (isChecked: boolean) => {
    if (isOutOfStock && isChecked) {
      return; // no se pueden agregar productos agotados a nuevas ofertas
    }
    if (isLockedByOtherOffer && isChecked) {
      return; // no se pueden agregar productos que ya están en otra oferta
    }
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
    <div className="flex flex-col items-center gap-5 rounded-lg border-1 p-4 min-h-30 justify-between relative">
      {isOutOfStock && (
        <div className="absolute top-2 left-2 z-10 rounded-lg bg-neutral-900 text-white font-bold px-2 py-1 text-xs uppercase tracking-wide border border-white/20">
          Agotado
        </div>
      )}
      {isLockedByOtherOffer && (
        <div className="absolute top-2 right-2 z-10 rounded-lg bg-red-800 text-white font-bold px-2 py-1 text-xs uppercase tracking-wide border border-white/20">
          En otra oferta
        </div>
      )}
      <div className="h-60 w-full">
        <img
          src={imageProduct}
          alt={product.name}
          className={`h-full w-full cover ${
            isOutOfStock || isLockedByOtherOffer ? "grayscale opacity-70" : ""
          }`}
        />
      </div>
      <Checkbox
        id={product._id}
        onCheckedChange={onHandleChange}
        checked={checked} // ahora es controlado
        disabled={(isOutOfStock && !checked) || (isLockedByOtherOffer && !checked)}
      />
    </div>
  );
}