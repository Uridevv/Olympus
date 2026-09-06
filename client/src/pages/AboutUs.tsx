import { ShieldCheck, Leaf, Award, Users, Globe, Sparkles } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "¿Por Qué Elegirnos?",
    description:
      "Ofrecemos diseños únicos y vanguardistas que no encontrarás en ningún otro lugar. Nuestro enfoque en la calidad y el detalle nos distingue, asegurando que cada prenda sea una obra de arte.",
  },
  {
    icon: Leaf,
    title: "Compromiso Ambiental",
    description:
      "Utilizamos materiales sostenibles y procesos de producción ecológicos. Cada compra apoya nuestra misión de proteger el planeta, promoviendo una moda consciente y responsable.",
  },
  {
    icon: Award,
    title: "Productos de Calidad",
    description:
      "Cada una de nuestras prendas está confeccionada con los mejores materiales, garantizando durabilidad y confort. La excelencia es nuestro estándar en cada costura y acabado.",
  },
];

const stats = [
  { icon: Users, value: "50K+", label: "Clientes satisfechos" },
  { icon: Globe, value: "20+", label: "Países alcanzados" },
  { icon: Sparkles, value: "500+", label: "Diseños exclusivos" },
];

export function AboutUs() {
  return (
    <div className="bg-background">
      <header className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-secondary-background text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="relative z-10 px-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Sparkles size={16} />
            Nuestra historia
          </span>
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-foreground lg:text-7xl">
            Sobre Nosotros
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-description">
            Conoce la historia y los valores detrás de OlympusOfficial.
          </p>
        </div>
      </header>

      <section className="border-b border-border py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-3xl font-bold text-foreground">
              Moda con propósito
            </h2>
            <p className="leading-relaxed text-foreground-description">
              Nacimos con la idea de que la moda puede ser a la vez elegante y
              responsable. Desde nuestros inicios, cada colección de
              OlympusOfficial combina diseño vanguardista, materiales
              cuidadosamente seleccionados y procesos que respetan a las
              personas y al planeta.
            </p>
            <p className="leading-relaxed text-foreground-description">
              Hoy seguimos creciendo junto a una comunidad que valora la
              calidad y la autenticidad tanto como nosotros, llevando estilo a
              cada rincón del mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                  <p className="text-sm text-foreground-description">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Lo que nos define
            </h2>
            <p className="mt-2 text-foreground-description">
              Los pilares que guían cada decisión que tomamos.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="text-foreground-description">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
