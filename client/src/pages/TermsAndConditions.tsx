import { Link } from "react-router-dom";
import {
  BadgePercent,
  CalendarClock,
  CheckCircle2,
  Mail,
  PackageCheck,
  Scale,
  ShieldCheck,
  Ticket,
  TriangleAlert,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    icon: CheckCircle2,
    title: "1. Elegibilidad de la oferta",
    body: "Las ofertas y promociones son válidas únicamente para compras realizadas a través de nuestro sitio web oficial. Para ser elegible, los clientes deben cumplir con todos los requisitos especificados en la promoción, que pueden incluir, entre otros, una compra mínima, la compra de productos específicos o la aplicación de un código de descuento al momento de la compra.",
  },
  {
    icon: CalendarClock,
    title: "2. Período de validez",
    body: "Cada oferta tendrá un período de validez claramente indicado. Las compras realizadas fuera de este período no serán elegibles para la promoción. OlympusTS se reserva el derecho de modificar o cancelar cualquier oferta en cualquier momento sin previo aviso.",
  },
  {
    icon: Ticket,
    title: "3. Uso de códigos promocionales",
    body: "Los códigos promocionales deben ser aplicados en el carrito de compras antes de finalizar el pago. No se aplicarán descuentos de forma retroactiva a compras ya completadas. Los códigos no son transferibles y no pueden ser canjeados por efectivo.",
  },
  {
    icon: TriangleAlert,
    title: "4. Limitaciones",
    body: 'Las ofertas no son acumulables con otras promociones a menos que se especifique lo contrario. Las promociones de "envío gratis" aplican únicamente a envíos estándar dentro del territorio nacional. OlympusTS se reserva el derecho de limitar la cantidad de artículos por cliente.',
  },
  {
    icon: PackageCheck,
    title: "5. Devoluciones y cambios",
    body: "Los productos adquiridos bajo una promoción especial están sujetos a nuestra política de devoluciones estándar. Si se devuelve un producto que formaba parte de una oferta, el reembolso se ajustará para reflejar el descuento recibido.",
  },
  {
    icon: Scale,
    title: "6. Ley aplicable",
    body: "Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de [País/Estado], y te sometes irrevocablemente a la jurisdicción exclusiva de los tribunales de ese Estado o ubicación.",
  },
];

const highlights = [
  "Las promociones solo aplican en compras hechas desde nuestro sitio oficial.",
  "Cada oferta tiene fecha de inicio y fin: fuera de ese rango, no se aplica.",
  "Los códigos se ingresan antes de pagar; no hay reembolsos retroactivos.",
];

export function TermsAndConditions() {
  return (
    <div className="bg-background">
      <header className="border-b border-border bg-secondary-background py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <ShieldCheck size={16} />
            Ofertas y promociones
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Términos y Condiciones
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-foreground-description">
            Reglas claras para que disfrutes nuestras ofertas y promociones sin
            sorpresas.
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-3xl px-4 py-12">
        <p className="mb-8 text-foreground-description">
          Estos términos y condiciones describen las reglas y regulaciones
          para el uso de las ofertas y promociones del sitio web de
          OlympusTS, ubicado en [URL del sitio web]. Al acceder a este sitio
          web y participar en nuestras promociones, asumimos que aceptas
          estos términos. No continúes usando OlympusTS si no estás de
          acuerdo con todos los términos y condiciones establecidos en esta
          página.
        </p>

        <Card className="mb-10 border-primary/20 bg-primary/5">
          <CardContent>
            <div className="flex items-center gap-2 text-primary">
              <BadgePercent size={20} />
              <h2 className="font-semibold">En resumen</h2>
            </div>
            <ul className="mt-3 space-y-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-sm text-foreground-description"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col">
          {sections.map(({ icon: Icon, title, body }, index) => (
            <div key={title}>
              <div className="flex gap-4 py-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={18} />
                </div>
                <div>
                  <h2 className="mb-2 text-lg font-semibold text-foreground">
                    {title}
                  </h2>
                  <p className="text-foreground-description">{body}</p>
                </div>
              </div>
              {index < sections.length - 1 && <Separator />}
            </div>
          ))}
        </div>

        <Card className="mt-6">
          <CardContent className="flex flex-col items-start gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail size={18} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  7. ¿Tienes preguntas?
                </h2>
                <p className="mt-1 text-foreground-description">
                  Si tienes alguna duda sobre estos Términos y Condiciones,
                  escríbenos a{" "}
                  <a
                    href="mailto:soporte@olympusts.com"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    soporte@olympusts.com
                  </a>
                  .
                </p>
              </div>
            </div>
            <Link
              to="/offers"
              className="inline-flex shrink-0 items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Ver ofertas activas
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
