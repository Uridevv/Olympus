import { useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface AddParameterProductProps {
  parameters: string[];
  setParameters: (value: any) => void;
  name: string;
}

export function AddParameterProduct({
  parameters,
  setParameters,
  name,
}: AddParameterProductProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const prevLength = useRef(parameters.length);

  useEffect(() => {
    if (parameters.length > 0) {
      const lastIndex = parameters.length - 1;
      const input = inputRefs.current[lastIndex];

      if (input) {
        input.focus();
        input.select(); // 🔥 selecciona todo el texto automáticamente
      }
    }
  }, [parameters.length]);

  useEffect(() => {
    if (parameters.length > prevLength.current) {
      const lastIndex = parameters.length - 1;
      const input = inputRefs.current[lastIndex];

      input?.focus();
      input?.select();
    }

    prevLength.current = parameters.length;
  }, [parameters.length]);

  const addParameter = () => {
    setParameters([...parameters, "Nuevo Valor"]);
  };

  const handleParameterChange = (index: number, newValue: string) => {
    const newParameters = [...parameters]; // Crea una copia del array original
    newParameters[index] = newValue; // Actualiza el valor en el índice correcto
    setParameters(newParameters); // Actualiza el estado con el nuevo array
  };

  const handleDeleteParameter = (index: number) => {
    const newParameters = [...parameters]; // Crea una copia del array original
    newParameters.splice(index, 1); // Elimina el parámetro en el índice proporcionado
    setParameters(newParameters); // Actualiza el estado con el nuevo array
  };

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-sm font-medium text-foreground">{name}</Label>
      <div className="flex flex-wrap items-center gap-2">
        {parameters.map((parameter, index) => (
          <div
            key={index}
            className="flex items-center gap-1 rounded-full border bg-muted/40 py-1 pr-1.5 pl-3 transition-colors focus-within:border-primary"
          >
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              value={parameter}
              size={Math.max(parameter.length, 1)}
              onChange={(e) => handleParameterChange(index, e.target.value)}
              className="max-w-40 bg-transparent text-sm text-foreground outline-none"
            />
            <button
              type="button"
              onClick={() => handleDeleteParameter(index)}
              className="flex size-5 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="size-3.5" />
              <span className="sr-only">Eliminar {parameter}</span>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addParameter}
          className="flex items-center gap-1.5 rounded-full border border-dashed border-muted-foreground/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Plus className="size-3.5" />
          Agregar
        </button>
      </div>
      {parameters.length === 0 && (
        <p className="text-xs text-muted-foreground">
          Todavía no se agregó ningún valor.
        </p>
      )}
    </div>
  );
}
