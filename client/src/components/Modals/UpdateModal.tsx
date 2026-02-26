import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button.tsx";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { getCategory, updateCategory } from "@/api/category";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg";
  id: string;
};

type UpdateCategoryeFormValues = {
  name: string;
  description: string;
};

export function UpdateModal({ isOpen, onClose, title, id }: ModalProps) {
  
  useEffect(() => {
    // Aquí podrías cargar los datos de la categoría usando el ID
    const loadCategoryData = async () => {
      try {
        const categoryData = await getCategory(id);
        setValue("name", categoryData.data.name);
        setValue("description", categoryData.data.description);
      } catch (error) {
        console.log(error);
      }
    };
    loadCategoryData();
  }, [id]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const { register, handleSubmit, setValue } =
    useForm<UpdateCategoryeFormValues>();

  const onSubmit: SubmitHandler<UpdateCategoryeFormValues> = async (values) => {
    try {
      const res = await updateCategory({_id:id, ...values});
      console.log(res)
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Cerrar clic fuera */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            className={`relative z-10 h-[50vh] w-[40vw] rounded-2xl bg-background p-6 shadow-xl flex flex-col`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Header */}
            {title && (
              <div className="mb-4 flex justify-between items-center h-10">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-red-900 hover:text-red-600 font-bold text-xl"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Contenido dinámico */}
            <div className="flex relative h-full gap-5">
              <div className="flex flex-col h-full w-full">
                {/* Aquí va el contenido del modal para agregar categoría */}
                <form
                  className="flex flex-col gap-4 w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="w-full flex justify-end space-x-2 flex-col gap-4">
                    <Label htmlFor="category-name">Category name</Label>
                    <Input
                      id="category-name"
                      placeholder="Category name"
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div className="w-full flex justify-end space-x-2 flex-col gap-4">
                    <Label htmlFor="category-description">
                      Category description
                    </Label>
                    <Input
                      id="category-description"
                      placeholder="Category description"
                      {...register("description", { required: true })}
                    />
                  </div>
                  <div className="w-full flex justify-end space-x-2 gap-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit">Update Category</Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
