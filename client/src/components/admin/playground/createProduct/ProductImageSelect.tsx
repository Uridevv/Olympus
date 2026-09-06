import { ImagePlus } from "lucide-react";
import { ProductImageSelec } from "../../../../Types/productType";

interface ProductImageSelectProps {
  addProductImage: (image:ProductImageSelec) => void;
  color: string;
}

export function ProductImageSelect({ addProductImage, color }:ProductImageSelectProps) {

  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file != null) {
      addProductImage({ file, color });
    }
    e.target.value = "";
  };

  return (
    <label
      htmlFor="fileInput"
      className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/30 text-muted-foreground transition-colors hover:cursor-pointer hover:border-primary hover:text-primary"
    >
      <ImagePlus className="size-8" />
      <span className="text-center text-sm font-medium">Agregar imagen</span>
      <input
        id="fileInput"
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={handleImageChange}
      />
    </label>
  );
}
