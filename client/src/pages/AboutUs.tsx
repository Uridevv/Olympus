import { ShieldCheck, Leaf, Award } from "lucide-react";

export function AboutUs() {
  return (
    <div className="">
      <header className="relative h-[50vh] bg-background text-foreground flex items-center justify-center">
        <div className="absolute inset-0 opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
            Sobre Nosotros
          </h1>
          <p className="mt-4 text-lg text-foreground-description">
            Conoce la historia y los valores detrás de OlympusTS.
          </p>
        </div>
      </header>

      <main className="py-20 px-4 sm:px-6 lg:px-8 dark:bg-neutral-800 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Por qué elegirnos? */}
            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <ShieldCheck className="h-16 w-16 mb-4 text-secondary-foreground" />
              <h2 className="text-2xl font-bold mb-2">¿Por Qué Elegirnos?</h2>
              <p className="text-foreground-description">
                Ofrecemos diseños únicos y vanguardistas que no encontrarás en
                ningún otro lugar. Nuestro enfoque en la calidad y el detalle
                nos distingue, asegurando que cada prenda sea una obra de arte.
              </p>
            </div>

            {/* Nuestro compromiso con el medio ambiente */}
            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Leaf className="h-16 w-16 mb-4  text-secondary-foreground" />
              <h2 className="text-2xl font-bold mb-2">Compromiso Ambiental</h2>
              <p className="text-gray-600">
                Utilizamos materiales sostenibles y procesos de producción
                ecológicos. Cada compra apoya nuestra misión de proteger el
                planeta, promoviendo una moda consciente y responsable.
              </p>
            </div>

            {/* Productos de calidad */}
            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Award className="h-16 w-16 mb-4  text-secondary-foreground" />
              <h2 className="text-2xl font-bold mb-2">Productos de Calidad</h2>
              <p className="text-gray-600">
                Cada una de nuestras prendas está confeccionada con los mejores
                materiales, garantizando durabilidad y confort. La excelencia es
                nuestro estándar en cada costura y acabado.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
