"use client"
import { ChevronUp, Home, Inbox, ShoppingBag, ShoppingCart, ShoppingCartIcon, User2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "@/provider/OrderCountContext";


interface Pending{
   getTotalPendingOrders: number;
   getTotalPendingCustomize: number;
}

export function AppSidebar() {
    const { data: sessionData } = useSession()
    const session = sessionData as unknown as SessionData
    const userName = session?.user?.name

    const[pendingData,setPendingData] = useState<Pending | null >(null)

      const{ordercount} = useContext(OrderContext)!  // for changing the pendign order count

    const router = useRouter();

    const handleSignOut = async() => {
      await signOut({ redirect: false })
      router.push("/login") 
    }

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
      {
        title: "Orders",
        url: "/orders",
        icon: ShoppingCartIcon,
        badge: (pendingData?.getTotalPendingOrders ?? 0), // ← Add this dynamically later
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
         badge: (pendingData?.getTotalPendingCustomize ?? 0), // ← Add this dynamically later
      }
    ];


    const fetchPendingOrders = async() =>{
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/get-pending-count`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if(data.success){
          setPendingData(data.data)
        }else{
          console.log(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      fetchPendingOrders()
    },[ordercount])


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
                      className="flex items-center justify-between w-full px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700 text-[18px] font-medium">
                          {item.title}
                        </span>
                      </div>
                    {typeof item.badge === "number" && item.badge > 0 && (
                      <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5 min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
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