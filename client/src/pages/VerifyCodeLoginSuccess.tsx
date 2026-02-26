import { useNavigate } from "react-router-dom";

export function VerifyCodeLoginSuccess() {
  
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#111118] dark group/design-root overflow-x-hidden">
        <div className="flex h-full grow flex-col">
          <div className="flex flex-1 items-center justify-center py-5">
            <div className="flex w-full max-w-md flex-col items-center rounded-2xl bg-[#181822] p-8 shadow-2xl">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                <span className="material-symbols-outlined text-5xl">
                  {" "}
                  verified{" "}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white">
                Verificación Exitosa
              </h2>
              <p className="mt-2 text-center text-gray-400">
                ¡Felicidades! Tu cuenta ha sido verificada. Ahora puedes acceder
                a todas las funciones de nuestra plataforma.
              </p>
              <div className="mt-8 w-full">
                <button
                  className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-[var(--primary-color)] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                  onClick={()=>{navigate("/")}}
                >
                  <span className="truncate">Go to home page</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
