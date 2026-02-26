interface AddParameterProductProps {
  parameters:string[],
  setParameters:(value:any)=>void,
  name:string
}


export function AddParameterProduct({ parameters, setParameters, name }:AddParameterProductProps) {
  
  const addParameter = () => {
    setParameters([...parameters, "Nuevo Valor"]);
    console.log(`Agregado parámetro número ${parameters.length + 1}`);
  };

  const handleParameterChange = (index:number, newValue:string) => {
    const newParameters = [...parameters]; // Crea una copia del array original
    newParameters[index] = newValue; // Actualiza el valor en el índice correcto
    setParameters(newParameters); // Actualiza el estado con el nuevo array
  };

  const handleDeleteParameter = (index:number) =>{
    const newParameters = [...parameters]; // Crea una copia del array original
    newParameters.splice(index, 1); // Elimina el parámetro en el índice proporcionado
    setParameters(newParameters); // Actualiza el estado con el nuevo array
    console.log(`Eliminado parámetro número ${index + 1}`);
  }

  return (
    <div className="w-full">
      <h2>{name}</h2>
      <div className="flex w-full gap-3 flex-wrap">
        <span
          className="border-1 border-dashed border-foreground rounded-lg p-3 hover:cursor-pointer"
          onClick={addParameter}
        >
          + Add
        </span>
        {parameters.map((parameter, index) => (
          <div
            className="relative grow min-w-40 border-1 border-dashed border-gray-600 rounded-lg"
            key={index}
          >
            <input
              key={index}
              type="text"
              value={parameter}
              className="p-3 w-full outline-0"
              onChange={(e) => handleParameterChange(index, e.target.value)}
            />
            <i
              className="fa-solid fa-circle-xmark absolute right-1 top-1  text-red-900 text-xl hover:cursor-pointer hover:text-red-600"
              onClick={() => handleDeleteParameter(index)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
}
