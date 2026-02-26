// AppSidebar.tsx
import * as React from "react";
import {
  ShoppingCart,
  Heart,
 BellDot,
  SettingsIcon,
  Command,
  House,
} from "lucide-react";
import { usePurchase } from "@/context/PurchaseContext"; // Importa usePurchase
import { useNavigate, useLocation, Link } from "react-router-dom";
import { NavUser } from "@/components/nav-user";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Purchase } from "@/types/purchaseType";

// This is sample data
const data = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/avatars/john.jpg",
  },
  navMain: [
    {
      title: "Compras Realizadas",
      url: "/profile",
      icon: ShoppingCart,
    },
    {
      title: "Lista de Deseos",
      url: "/profile/wishlist",
      icon: Heart,
    },
    {
      title: "Devoluciones",
      url: "/profile/notifications",
      icon: BellDot,
    },
    {
      title: "Configuración",
      url: "/profile/settings",
      icon: SettingsIcon,
    },
    {
      title: "Home",
      url: "/",
      icon: House,
    },

  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const location = useLocation();

  const [filteredPurchases, setFilteredPurchases] = React.useState<Purchase[]>(
    []
  );
  const [searchQuery, setSearchQuery] = React.useState("");

  const { purchases } = usePurchase();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredPurchases(purchases);
    } else {
      const filtered = purchases.filter((purchase) =>
        purchase.productBought.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPurchases(filtered);
    }
  };

  React.useEffect(() => {
    setFilteredPurchases(purchases);
  }, [purchases]);

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        navigate(item.url); // <- navegación por URL
                      }}
                      isActive={location.pathname === item.url} // <- verificación por ruta
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <SidebarInput
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {filteredPurchases.map((purchase, index) => (
                <Link
                  to={`/profile/purchases/${purchase._id}`}
                  key={`${purchase.productBought.name}-${index}`}
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="font-medium">
                      {purchase.productBought.name}
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {purchase.createdAt}
                    </span>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {purchase.productBought.name}
                    </span>
                    <span className="font-semibold text-green-600">
                      {purchase.productBought.price}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      purchase.state === "Entregado"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {purchase.state}
                  </span>
                </Link>
              ))}
              {filteredPurchases.length === 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No se encontraron productos
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
