import type React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar-profile";
import { usePurchase } from "@/context/PurchaseContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { Footer } from "@/components/main/Footer";
import { Toaster } from "sonner";

const sectionTitles: { match: string; title: string }[] = [
  { match: "/profile/wishlist", title: "Lista de Deseos" },
  { match: "/profile/notifications", title: "Notificaciones" },
  { match: "/profile/settings", title: "Configuración" },
  { match: "/profile/purchases", title: "Mis Compras" },
];

function getSectionTitle(pathname: string) {
  return (
    sectionTitles.find((section) => pathname.startsWith(section.match))
      ?.title ?? "Mis Compras"
  );
}

export function Profile() {
  const { getAllPurchases, purchases } = usePurchase();
  const location = useLocation();
  const sectionTitle = getSectionTitle(location.pathname);

  useEffect(() => {
    const loadPurchases = async () => {
      try {
        await getAllPurchases();
      } catch (error) {
        console.log(error);
      }
    };
    loadPurchases();
  }, []);

  if (!purchases) {
    return (
      <div className="p-20 flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold">Loading....</h2>
          <p className="text-muted-foreground">Please wait one moment.</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "17rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/profile">Mi Perfil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{sectionTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="mx-auto w-full max-w-6xl flex-1">
          <Outlet />
        </div>
        <Footer />
      </SidebarInset>
      <Toaster position="bottom-right" richColors />
    </SidebarProvider>
  );
}
