import { ProductImageSelec } from "../../../../types/productType";

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
  };

  return (
    <>
      <label htmlFor="fileInput" className="border-1 border-dashed rounded-lg p-4 flex items-center hover:cursor-pointer border-foreground">
        Add Image +
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={handleImageChange}
      />
    </>
  );
}
