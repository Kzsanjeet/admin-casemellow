import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Products",
    url: "/products",
    icon: Calendar,
  },
  {
    title: "Brands",
    url: "/brands",
    icon: Inbox,
  },
  {
    title: "Offers",
    url: "/offers",
    icon: Calendar,
  },
  {
    title:"Orders",
    url: "/orders",
    icon: Inbox
  },
  {
    title: "Customize",
    url: "/customize",
    icon: Search,
  },
  {
    title: "PromoCode",
    url: "/promocodes",
    icon: Inbox,
    },
  {
    title: "Customer",
    url: "/happy-customers",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl text-red-600 font-bold py-14 pl-7">Casemellow</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="text-gray-800"/>
                      <span className="text-gray-800 text-2xl py-4">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}   
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
