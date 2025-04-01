// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Search, Eye, Trash2 } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import Loader from "@/components/loading/loader";
// import { toast } from "sonner";

// export interface Order {
//   paymentMethod: "Khalti" | "COD";
//   _id: string;
//   clientId: {
//     _id: string;
//     name: string;
//     number: string;
//   };
//   productId: {
//     product: {
//       _id: string;
//       productName: string;
//       productPrice: number;
//       productImage: string;
//       productCategory: string;
//     };
//     quantity: number;
//   }[];
//   pickUpAddress: string;
//   deliveryAddress: string;
//   totalQuantity: number;
//   orderStatus: "pending" | "picked up" | "sent for delivery" | "delivered";
//   paymentStatus: "pending" | "paid" | "failed";
//   totalPrice: number;
//   orderDate: string; // ISO Date string
// }

// const OrderTable = () => {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 10;

//   const fetchOrderData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/get?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error("Failed to fetch orders");
//       }

//       const result = await response.json();

//       if (result.success) {
//         setOrders(result.data.orders);
//         setTotalPages(result.data.pagination.totalPages);
//       } else {
//         throw new Error(result.message || "Failed to fetch orders");
//       }
//     } catch (error) {
//       setError(error instanceof Error ? error.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchOrderData();
//     console.log(orders);
//   }, [currentPage, searchTerm])

//   console.log(orders)

//   const handlePageChange = (page: number) => {
//     setCurrentPage(Math.max(1, Math.min(page, totalPages)));
//   };

//   const handleViewOrder = (orderId: string) => {
//     router.push(`/orders/${orderId}`);
//   };

//   return (
//     <div className="p-8 flex w-full bg-gray-100 min-h-screen">
//       <div className="w-11/12 mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <Input
//               placeholder="Search orders..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 w-full max-w-sm"
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           {loading ? (
//             <div className="p-8">
//               <Loader />
//             </div>
//           ) : error ? (
//             <div className="p-8 text-center text-red-600">
//               <p>Error: {error}</p>
//               <Button onClick={fetchOrderData} className="mt-4">
//                 Retry
//               </Button>
//             </div>
//           ) : orders.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">No orders found</div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-gray-50 hover:bg-gray-50">
//                       <TableHead className="font-semibold">Client</TableHead>
//                       <TableHead className="font-semibold">Payment Method</TableHead>
//                       <TableHead className="font-semibold">Order Status</TableHead>
//                       <TableHead className="font-semibold">Payment Status</TableHead>
//                       <TableHead className="font-semibold">Total Price</TableHead>
//                       <TableHead className="font-semibold">Order Date</TableHead>
//                       <TableHead className="text-right font-semibold">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                     <TableBody className="text-xl">
//                     {Array.isArray(orders) && orders.map((order) => ( 
//                         <TableRow key={order._id} className="hover:bg-gray-50">
//                         {/* Client Name */}
//                         <TableCell className="font-medium">
//                           {order.clientId ? order.clientId.name : "Unknown Client"}
//                         </TableCell>

//                         {/* Payment Method */}
//                         <TableCell>
//                             {order.paymentMethod}
//                         </TableCell>

//                         {/* Order Status */}
//                         <TableCell>
//                             <span className="font-medium text-gray-900">{order.orderStatus}</span>
//                         </TableCell>

//                         {/* Payment Status */}
//                         <TableCell>
//                             <span className="font-medium">{order.paymentStatus}</span>
//                         </TableCell>

//                         {/* Total Price */}
//                         <TableCell>
//                             <span className="font-medium">
//                             Rs {order.totalPrice.toLocaleString('en-IN', { 
//                                 minimumFractionDigits: 2,
//                                 maximumFractionDigits: 2
//                             })}
//                             </span>
//                         </TableCell>

//                         {/* Order Date */}
//                         <TableCell>
//                             {new Date(order.orderDate).toLocaleDateString()}
//                         </TableCell>

//                         {/* Actions */}
//                         <TableCell className="text-right">
//                             <div className="flex justify-end space-x-2">
//                             <Button 
//                                 variant="ghost"
//                                 className="hover:bg-blue-100 text-blue-600 hover:text-blue-700 p-2 h-8 w-8"
//                                 onClick={() => handleViewOrder(order._id)}
//                             >
//                                 <Eye className="h-4 w-4" />
//                             </Button>
//                             <Button 
//                                 variant="ghost"
//                                 className="text-red-600 hover:bg-red-100 hover:text-red-700"
//                                 // onClick={() => handleDelete && handleDelete(order._id)}
//                             >
//                                 <Trash2 className="h-4 w-4" />
//                             </Button>
//                             </div>
//                         </TableCell>
//                         </TableRow>
//                     ))}
//                     </TableBody>
//                                     <TableFooter>
//                     <TableRow>
//                       <TableCell colSpan={5}>Total Orders</TableCell>
//                       <TableCell>
//                       {/* {orders.reduce ? new Date(order.createdAt).toLocaleString() : "N/A"} */}
//                     </TableCell>

//                     </TableRow>
//                   </TableFooter>
//                 </Table>
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="p-4 border-t flex justify-center space-x-2">
//                   {[...Array(totalPages)].map((_, index) => (
//                     <Button
//                       key={index}
//                       variant={currentPage === index + 1 ? "default" : "outline"}
//                       onClick={() => handlePageChange(index + 1)}
//                     >
//                       {index + 1}
//                     </Button>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderTable;







"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Search, Eye, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import Loader from "@/components/loading/loader"

export interface Order {
  paymentMethod: "Khalti" | "COD"
  _id: string
  clientId: {
    _id: string
    name: string
    number: string
  }
  productId: {
    product: {
      _id: string
      productName: string
      productPrice: number
      productImage: string
      productCategory: string
    }
    quantity: number
  }[]
  pickUpAddress: string
  deliveryAddress: string
  totalQuantity: number
  orderStatus: "pending" | "picked up" | "sent for delivery" | "delivered"
  paymentStatus: "pending" | "paid" | "failed"
  totalPrice: number
  orderDate: string // ISO Date string
}

const OrderTable = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  const fetchOrderData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/get?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      const result = await response.json()
      console.log("API Response:", result) // Log the full response

      if (result.success) {
        // Validate and sanitize the data before setting state
        const sanitizedOrders = result.data.orders.map((order:any) => ({
          ...order,
          // Ensure totalPrice is a number
          totalPrice: typeof order.totalPrice === "number" ? order.totalPrice : 0,
          // Ensure orderDate is a valid string
          orderDate: order.orderDate || new Date().toISOString(),
        }))

        setOrders(sanitizedOrders)
        setTotalPages(result.data.pagination.totalPages)
      } else {
        throw new Error(result.message || "Failed to fetch orders")
      }
    } catch (error) {
      console.error("Fetch error:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrderData()
  }, [currentPage, searchTerm])

  // Add this useEffect to log orders after they've been updated
  useEffect(() => {
    if (orders.length > 0) {
      console.log("First order sample:", orders[0])
    }
  }, [orders])

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const handleViewOrder = (orderId: string) => {
    router.push(`/orders/${orderId}`)
  }

  // Helper function to safely format price
  const formatPrice = (price: any) => {
    if (typeof price !== "number") {
      return "Rs 0.00"
    }

    try {
      return `Rs ${price.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    } catch (error) {
      console.error("Error formatting price:", error)
      return `Rs ${price}`
    }
  }

  return (
    <div className="p-8 flex w-full bg-gray-100 min-h-screen">
      <div className="w-11/12 mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full max-w-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8">
              <Loader />
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">
              <p>Error: {error}</p>
              <Button onClick={fetchOrderData} className="mt-4">
                Retry
              </Button>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No orders found</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="font-semibold">Client</TableHead>
                      <TableHead className="font-semibold">Payment Method</TableHead>
                      <TableHead className="font-semibold">Order Status</TableHead>
                      <TableHead className="font-semibold">Payment Status</TableHead>
                      <TableHead className="font-semibold">Total Price</TableHead>
                      <TableHead className="font-semibold">Order Date</TableHead>
                      <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xl">
                    {Array.isArray(orders) &&
                      orders.map((order) => (
                        <TableRow key={order._id} className="hover:bg-gray-50">
                          {/* Client Name */}
                          <TableCell className="font-medium">
                            {order.clientId ? order.clientId.name : "Unknown Client"}
                          </TableCell>

                          {/* Payment Method */}
                          <TableCell>{order.paymentMethod || "N/A"}</TableCell>

                          {/* Order Status */}
                          <TableCell>
                            <span className="font-medium text-gray-900">{order.orderStatus || "N/A"}</span>
                          </TableCell>

                          {/* Payment Status */}
                          <TableCell>
                            <span className="font-medium">{order.paymentStatus || "N/A"}</span>
                          </TableCell>

                          {/* Total Price - Using the safe formatter */}
                          <TableCell>
                            <span className="font-medium">{formatPrice(order.totalPrice)}</span>
                          </TableCell>

                          {/* Order Date */}
                          <TableCell>
                            {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                          </TableCell>

                          {/* Actions */}
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                className="hover:bg-blue-100 text-blue-600 hover:text-blue-700 p-2 h-8 w-8"
                                onClick={() => handleViewOrder(order._id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                className="text-red-600 hover:bg-red-100 hover:text-red-700"
                                // onClick={() => handleDelete && handleDelete(order._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={5}>Total Orders</TableCell>
                      <TableCell>{orders.length}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t flex justify-center space-x-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderTable



