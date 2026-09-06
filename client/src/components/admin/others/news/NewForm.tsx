import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ListPlus } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { createNew, getNew, updateNew, deleteNew } from "@/api/new";
import { New } from "@/Types/newType";

type NewFormData = {
  title: string;
  description: string;
  image: FileList;
  endDate: string;
};

export function NewForm() {

  const params = useParams();
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState<New>();
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<NewFormData>();

  const validateEndDate = (value: string) => {
    const selectedDate = new Date(value);
    const today = new Date();
    // Normaliza la fecha de hoy a medianoche para comparar solo la fecha sin la hora
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0); // También normaliza la fecha seleccionada

    return (
      selectedDate > today ||
      "La fecha de finalización debe ser posterior a hoy."
    );
  };

  useEffect(() => {
    async function loadNewData() {
      if (params.id) {
        setIsLoading(true);
        try {
          const res = await getNew(params.id);
          const data = res.data;
          setNewItem(data);
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("endDate", data.endDate);
        } catch (error) {
          console.error("Error al cargar la novedad:", error);
          toast.error("No se pudo cargar la novedad.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
    loadNewData();
  }, [params.id, setValue]);

  const onSubmit: SubmitHandler<NewFormData> = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("endDate", values.endDate);

    // Lógica para el CASO DE ACTUALIZACIÓN (si hay params.id)
    if (params.id) {
      const imageFile = getValues("image")?.[0];
      if (imageFile) {
        formData.append("image", imageFile);
      }

      toast.promise(updateNew(params.id, formData), {
        loading: "Updating new...",
        success: (response) => {
          const newData = response.data;
          setTimeout(() => navigate("/admin/settings/news"), 2000);
          return `New "${newData.title}" updated successfully!`;
        },
        error: (err) => {
          const errorMessage = err.response?.data?.message || err.message;
          return `Failed to update new: ${errorMessage}`;
        },
      });
      return;
    }

    // Lógica para el CASO DE CREACIÓN
    const imageFile = getValues("image")?.[0];
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      toast.error("Por favor, sube una imagen para la novedad.");
      return;
    }

    toast.promise(createNew(formData), {
      loading: "Creating new...",
      success: (response) => {
        const newData = response.data;
        setTimeout(() => navigate("/admin/settings/news"), 2000);
        return `New "${newData.title}" created successfully!`;
      },
      error: (err) => {
        const errorMessage = err.response?.data?.message || err.message;
        return `Failed to create new: ${errorMessage}`;
      },
    });
  };

  const onHandleDelete = async () => {
    if (params.id) {
      toast.promise(deleteNew(params.id), {
        loading: "Deleting new...",
        success: () => {
          setTimeout(() => navigate("/admin/settings/news"), 2000);
          return "New deleted successfully!";
        },
        error: "Failed to delete new.",
      });
    }
  };

  if (isLoading) {
    return <div>Cargando formulario...</div>;
  }

  if (params.id && !newItem) {
    return <div>Novedad no encontrada</div>;
  }

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-3/5">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <ListPlus className="size-6" />
            <h1 className="text-xl font-bold">
              {params.id ? "Update New." : "Create New."}
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Title"
                {...register("title", { required: true })}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description"
                {...register("description", { required: true })}
                required
                className="h-[25vh]"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                placeholder="## / ## / ##"
                {...register("endDate", {
                  required: "La fecha de finalización es requerida.",
                  validate: validateEndDate,
                })}
                required
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="image">Cover Image</Label>
              <Input
                id="image"
                type="file"
                placeholder="New Cover Image"
                {...register("image", { required: !params.id })}
              />
            </div>

            <div className="flex justify-between items-center text-background">
              <Button
                type="submit"
                className={
                  params.id
                    ? "w-1/3 border-1 bg-neutral-200 rounded-sm m-auto p-3 hover:bg-neutral-400 hover:cursor-pointer text-background h-10"
                    : "w-full  text-foreground border-1 bg-neutral-200 rounded-sm m-auto p-3 hover:bg-neutral-400 hover:cursor-pointer"
                }
              >
                {params.id ? "Update" : "Create"}
              </Button>
              {params.id && (
                <button
                  type="button"
                  className="text-foreground border-1 bg-red-800 rounded-sm w-1/3 m-auto p-3 hover:bg-red-700 hover:cursor-pointer h-10 flex items-center justify-center"
                  onClick={onHandleDelete}
                >
                  Delete New
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
      <Toaster theme="system" />
    </div>
  );
}
