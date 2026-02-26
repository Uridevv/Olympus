import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button.tsx";
import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg";
};

export function DeleteModal({ isOpen, onClose, title }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

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
                <form className="flex flex-col gap-4 w-full">
                  <p>Are you sure you want to delete this category?</p>
                  <p>if you delete it, all products in this category will be removed.</p>
                  <div className="w-full flex justify-end space-x-2">
                    <Button type="button" className="bg-neutral-700 hover:cursor-pointer hover:bg-neutral-500" onClick={onClose}>Cancel</Button>
                    <Button type="button" className="bg-red-800 hover:cursor-pointer hover:bg-red-500" >Delete</Button>
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
