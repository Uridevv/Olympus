import { useState } from "react";
import { SizeGuideModal } from "@/components/products/SizeGuideModal";

interface ProductParamProps {
  paramName: string;
  actualItem: string;
  updateSelected: (item: string) => void;
  list: string[];
}

export function ProductParam({
  paramName,
  actualItem,
  updateSelected,
  list,
}: ProductParamProps) {
  const isSize = paramName === "Size";
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
        {paramName}
      </h3>
      {isSize ? (
        <button
          type="button"
          className="text-sm font-medium text-primary hover:underline hover:cursor-pointer"
          onClick={() => setIsSizeGuideOpen(true)}
        >
          {paramName} Guide
        </button>
      ) : (
        <a className="text-sm font-medium text-primary hover:underline" href="#">
          {paramName} Guide
        </a>
      )}
      {isSize && (
        <SizeGuideModal
          open={isSizeGuideOpen}
          onOpenChange={setIsSizeGuideOpen}
        />
      )}
      <div className="flex gap-5 mt-2">
        {list.map((item, index) => {
          if (item == actualItem) {
            return (
              <span
                className="border-1 border-foreground p-2 rounded-lg hover:cursor-pointer"
                key={index}
                onClick={() => {
                  updateSelected(item);
                }}
              >
                {item}
              </span>
            );
          } else {
            return (
              <span
                className="border-1 border-foreground p-2 rounded-lg border-dashed hover:cursor-pointer"
                key={index}
                onClick={() => {
                  updateSelected(item);
                }}
              >
                {item}
              </span>
            );
          }
        })}
      </div>
    </div>
  );
}
