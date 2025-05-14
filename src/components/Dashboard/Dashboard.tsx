"use client"

import { Box, Package, ShoppingBag, ShoppingCart, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import type { SessionData } from "@/Types"

const Dashboard = () => {
  const { data: sessionData } = useSession()
  const session = sessionData as unknown as SessionData
  const userName = session?.user?.name

  return (
    <div className="w-full">
        <div className="p-6 max-w-[100%] mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Hello, {userName || "User"}</h1>
        <p className="text-muted-foreground">Welcome to your dashboard. Here's an overview of your store.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card className="border-l-4 border-l-red-500 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <div className="p-2 bg-red-100 rounded-full">
              <Package className="h-5 w-5 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">120</div>
            <div className="flex items-center mt-1">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Brands</CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <ShoppingBag className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <div className="flex items-center mt-1">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <div className="p-2 bg-green-100 rounded-full">
              <ShoppingCart className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">342</div>
            <div className="flex items-center mt-1">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Customize</CardTitle>
            <div className="p-2 bg-purple-100 rounded-full">
              <Box className="h-5 w-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">56</div>
            <div className="flex items-center mt-1">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: "35%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Customize Orders</CardTitle>
            <div className="p-2 bg-amber-100 rounded-full">
              <Users className="h-5 w-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78</div>
            <div className="flex items-center mt-1">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "52%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="font-medium">Order #1234</div>
                <div className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completed</div>
              </div>
              <div className="flex items-center justify-between p-4 border-b">
                <div className="font-medium">Order #1233</div>
                <div className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Processing</div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="font-medium">Order #1232</div>
                <div className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center">
                  <Package className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <div className="font-medium">Product A</div>
                  <div className="text-sm text-muted-foreground">42 sales</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="font-medium">Product B</div>
                  <div className="text-sm text-muted-foreground">38 sales</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center">
                  <Package className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="font-medium">Product C</div>
                  <div className="text-sm text-muted-foreground">27 sales</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>    
    </div>
    
  )
}

export default Dashboard
