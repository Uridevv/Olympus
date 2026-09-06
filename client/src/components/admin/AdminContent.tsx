import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Warehouse,
  ChartArea,
  Newspaper,
  Tag,
  Users,
  PackagePlus,
  ClipboardList,
  Percent,
  TrendingUp,
  DollarSign,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/store/authStore";
import { getAllPurchases } from "@/api/purchases";
import { getAllOffers } from "@/api/offer";
import { ChartAreaInteractive } from "@/components/admin/Statistics/sells/SellsStats";

const quickLinks: {
  title: string;
  description: string;
  to: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Stock",
    description: "Gestiona el inventario de productos",
    to: "/admin/playground/stock",
    icon: Warehouse,
  },
  {
    title: "Crear producto",
    description: "Agrega un nuevo producto al catálogo",
    to: "/admin/playground/create-product",
    icon: PackagePlus,
  },
  {
    title: "Ofertas",
    description: "Administra descuentos y promociones",
    to: "/admin/settings/offers",
    icon: Percent,
  },
  {
    title: "Novedades",
    description: "Publica noticias y anuncios",
    to: "/admin/settings/news",
    icon: Newspaper,
  },
  {
    title: "Pedidos",
    description: "Consulta y gestiona los pedidos",
    to: "/admin/settings/orders",
    icon: ClipboardList,
  },
  {
    title: "Categorías",
    description: "Organiza las categorías de productos",
    to: "/admin/settings/categories",
    icon: Tag,
  },
  {
    title: "Administradores",
    description: "Gestiona cuentas de administración",
    to: "/admin/settings/admins",
    icon: Users,
  },
  {
    title: "Estadísticas",
    description: "Analiza el rendimiento de ventas",
    to: "/admin/stats/sells",
    icon: ChartArea,
  },
];

interface DashboardStats {
  totalOrders: number;
  deliveredOrders: number;
  revenue: number;
  activeOffers: number;
}

export function Page() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    deliveredOrders: 0,
    revenue: 0,
    activeOffers: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [purchasesRes, offersRes] = await Promise.all([
          getAllPurchases(),
          getAllOffers(),
        ]);
        const purchases = purchasesRes.data;
        const revenue = purchases.reduce(
          (sum, purchase) => sum + (purchase.productBought?.price ?? 0),
          0
        );
        const delivered = purchases.filter(
          (purchase) =>
            purchase.state === "Delivered" || purchase.state === "Entregado"
        ).length;

        setStats({
          totalOrders: purchases.length,
          deliveredOrders: delivered,
          revenue,
          activeOffers: offersRes.data.length,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingStats(false);
      }
    }
    loadStats();
  }, []);

  const statCards: { label: string; value: string; icon: LucideIcon }[] = [
    {
      label: "Pedidos totales",
      value: String(stats.totalOrders),
      icon: ClipboardList,
    },
    {
      label: "Pedidos entregados",
      value: String(stats.deliveredOrders),
      icon: TrendingUp,
    },
    {
      label: "Ingresos totales",
      value: `$${stats.revenue.toFixed(2)}`,
      icon: DollarSign,
    },
    {
      label: "Ofertas activas",
      value: String(stats.activeOffers),
      icon: Percent,
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Bienvenido{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-muted-foreground">
          Aquí tienes un resumen de la actividad de la tienda.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">
                {isLoadingStats ? "—" : value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <ChartAreaInteractive />

      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Accesos rápidos
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map(({ title, description, to, icon: Icon }) => (
            <Link key={to} to={to}>
              <Card className="h-full transition-colors hover:border-primary/50 hover:bg-muted/50">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
