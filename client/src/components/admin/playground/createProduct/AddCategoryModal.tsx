import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import modalImage from "@/assets/svg/undraw_software-engineer_xv60.svg";
import { addCategory } from "@/api/category";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg";
};

interface AddCategoryFormValues {
  name: string;
  description: string;
}

export function AddCategoryModal({
  isOpen,
  onClose,
  title,
  // size = "md",
}: ModalProps) {
  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const { register, handleSubmit } = useForm<AddCategoryFormValues>();

  const onSubmit: SubmitHandler<AddCategoryFormValues> = async (values) => {
    try {
      await addCategory(values);
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
            className={`relative z-10 h-[80vh] w-[60vw] rounded-2xl bg-background p-6 shadow-xl flex flex-col`}
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
              <div className="w-5/9 h-full">
                <img
                  src={modalImage}
                  alt="Image"
                  className="h-full w-full object-fit"
                />
              </div>
              <div className="flex flex-col h-full w-4/9">
                {/* Aquí va el contenido del modal para agregar categoría */}
                <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                  <Label htmlFor="category-name">Category Name:</Label>
                  <Input
                    id="category-name"
                    type="text"
                    placeholder="Enter category name"
                    {...register("name", { required: true })}
                  />
                  <Textarea
                    id="category-description"
                    placeholder="Enter category description"
                    {...register("description", { required: true })}
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" type="button" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Category</Button>
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
