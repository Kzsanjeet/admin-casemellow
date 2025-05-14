import { Calendar, ChevronUp, Home, Inbox, Search, Settings, ShoppingBag, ShoppingBasketIcon, ShoppingCart, ShoppingCartIcon, User2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SessionData } from "@/Types";



const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Products",
    url: "/products",
    icon: ShoppingCart,
  },
  {
    title: "Brands",
    url: "/brands",
    icon: ShoppingBag,
  },
  // {
  //   title: "Offers",
  //   url: "/offers",
  //   icon: Calendar,
  // },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingCartIcon,
  },
  {
    title: "Customize",
    url: "/customize",
    icon: Inbox,
  },
  {
    title: "Custom Orders",
    url: "/customize/orders",
    icon: ShoppingCartIcon,
  },
  // {
  //   title: "Customer",
  //   url: "/happy-customers",
  //   icon: ShoppingCartIcon,
  // }
];

export function AppSidebar() {
    const { data: sessionData } = useSession()
    const session = sessionData as unknown as SessionData
    const userName = session?.user?.name

const router = useRouter();

  const handleSignOut = async() => {
    await signOut({ redirect: false })
    router.push("/login") 
  }

  return (
    <Sidebar className="flex flex-col h-screen">
      {/* Logo Section */}
      <div className="px-4 pt-3 w-full h-auto border-b-1 flex flex-col justify-center items-center gap-4">
        <div>
          <Image
            src={"/image/case.png"}
            width={400}
            height={100}
            alt="casemellow logo"
            className="rounded-md shadow-sm shadow-black"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-red-500">Application</h1>
        </div>
      </div>

      {/* Main Content Section */}
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup className="h-full flex flex-col">
          <SidebarGroupContent className="flex-1 py-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="hover:bg-gray-100 py-1 rounded-lg mx-2"
                >
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 px-4 py-3"
                    >
                      <item.icon className="w-5 h-5 size-7 text-gray-600" />
                      <span className="text-gray-700 text-xl font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          {/* Footer Section */}
          <SidebarFooter className="border-t mt-auto mb-10">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full px-4 py-3">
                      <div className="flex items-center gap-3">
                        <User2 className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700 text-sm font-semibold">
                          {userName}
                        </span>
                        <ChevronUp className="ml-auto w-4 h-4 text-gray-500" />
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                  >
                    {/* <DropdownMenuItem className="py-2 text-xl text-gray-700">
                      <span>Account</span>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={handleSignOut} className="py-2 text-xl text-gray-700">
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}