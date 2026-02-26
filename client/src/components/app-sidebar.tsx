import * as React from "react"
import {
  AudioWaveform,
  ChartArea,
  Command,
  House,
  GalleryVerticalEnd,
  User,
  Store,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Olympus Shop",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/admin",
        },
        {
          title: "Stock",
          url: "/admin/playground/stock",
        },
        {
          title: "Create Product",
          url: "/admin/playground/create-product",
        },
        {
          title: "Add User",
          url: "/admin/playground/addUserAdmin",
        },
      ],
    },
    {
      title: "Stats",
      url: "#",
      icon: ChartArea,
      items: [
        {
          title: "Sells",
          url: "/admin/stats/sells",
        },
        {
          title: "Users",
          url: "/admin/stats/users",
        },
        {
          title: "Products",
          url: "/admin/stats/products",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Castegories",
          url: "/admin/settings/categories",
        },
        {
          title: "News",
          url: "/admin/settings/news",
        },
        {
          title: "Offers",
          url: "/admin/settings/offers",
        },
        {
          title: "Admins",
          url: "/admin/settings/admins",
        },
        {
          title: "Orders",
          url: "/admin/settings/orders",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Home",
      url: "/",
      icon: House,
    },
    {
      name: "Clothes",
      url: "/ropa-page",
      icon: Store,
    },
    {
      name: "About Us",
      url: "/about-us",
      icon: User,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
