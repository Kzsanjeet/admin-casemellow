"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Search, Trash2, Plus, Edit2, Indent, Link, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import Loader from "@/components/loading/loader"
import { useDebounce } from "@/hooks/use-debounce"
import { useSession } from "next-auth/react"

import { SessionData } from "@/Types"                                                           
import EditPaymentStatus from "./Edit"
import EditOrderStatus from "./EditOrderStatusCustomize"
import OrderDeleteFrom from "./Delete"
import Image from "next/image"

export interface Order {
  _id: string
  clientId: {
    _id: string
    name: string
    number: string
  },
  customize: {
    _id: string;
    brands: {
      _id: string;
      brandName: string;
    };
    phoneModel: string;
    coverType: string; 
    coverPrice: number
  },
  paymentMethod: "Khalti" | "COD"
  croppedImage: string,
  pickUpAddress: string
  deliveryAddress: string
  totalQuantity: number
  orderStatus: "pending" | "picked up" | "sent for delivery" | "delivered"
  paymentStatus: "pending" | "paid" | "cancel"
  totalPrice: number
  orderDate: string 
}

const OrderTable = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearch = useDebounce(searchTerm, 1000)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [currentPage, setCurrentPage] = useState(1) 
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10
  const [editOrders, setEditOrders] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditPaymentModalOpen, setIsEditPaymentModalOpen] = useState(false);
  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const {data:sessionData} = useSession()

  const session = sessionData as unknown as SessionData

  const userName = session?.user?.name


  const fetchOrderData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/customize/get?page=${currentPage}&limit=${itemsPerPage}&search=${debouncedSearch}`,
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
  }, [currentPage, debouncedSearch, isDeleted])

  // Add this useEffect to log orders after they've been updated
  useEffect(() => {
    if (orders.length > 0) {
      console.log("First order sample:", orders[0])
    }
  }, [orders])

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
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

  const handleUpdateSuccess = () => {
    fetchOrderData(); // Refetch orders to update the table
  };
  
  const handleEditPaymentStatus = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsEditPaymentModalOpen(true);
  };
  
  const handleEditOrderStatus = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsEditOrderModalOpen(true);
  };
  
  const handleClosePaymentModal = () => {
    setSelectedOrderId(null);
    setIsEditPaymentModalOpen(false);
  };
  
  const handleCloseOrderModal = () => {
    setSelectedOrderId(null);
    setIsEditOrderModalOpen(false);
  };

  const handleDelete = (orderId: string) => {
    setIsDelete(true);
    setSelectedOrderId(orderId); 
  };

const handleCloseDeleteModal = () => {
    setSelectedOrderId(null);
    setIsDeleteModalOpen(false);
  };


  return (
    <div className="p-8 flex w-full bg-gray-100 min-h-screen">
      <div className="w-11/12 mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Orders {userName}</h1>
                        <p className="text-gray-500 mt-1">Manage your orders</p>
                    </div>
                    <Button 
                        onClick={() => router.push("/orders/add-product")}
                        className="bg-black text-white hover:bg-gray-800"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Order
                    </Button>
                </div>

                {/* Search Section */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
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
                      <TableHead className="font-semibold">Ordered Design</TableHead>
                      <TableHead className="font-semibold">Product Name</TableHead>
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

                          {/* 💡 Notes:
                                The fl_attachment/ in the Cloudinary URL tells it to serve the image as a downloadable file.

                                If order.croppedImage already has upload/ in it, we can replace the URL part after upload/ dynamically.

                                The download attribute ensures the image gets downloaded.

                                Use target="_blank" and rel="noopener noreferrer" for best practice (especially for external links). */}


                          <TableCell>
                            {order._id && order._id.length > 0 ? (
                                <a
                                href={`https://res.cloudinary.com/watchmebby/image/upload/fl_attachment/${order.croppedImage.split('/upload/')[1]}`}
                                download
                                className="relative group block w-[100px] h-[200px] rounded-xl overflow-hidden"
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                {order.croppedImage ? (
                                    <>
                                    <Image 
                                        src={order.croppedImage}
                                        alt="Product"
                                        width={100}
                                        height={60}
                                        className="object-cover w-full h-full transition duration-300 group-hover:opacity-60"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40">
                                        <Download className="text-white w-6 h-6" />
                                    </div>
                                    </>
                                ) : (
                                    <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                    <span className="text-xs text-gray-500">No image</span>
                                    </div>
                                )}
                                </a>
                            ) : (
                                "No products"
                            )}
                            </TableCell>


                          <TableCell>
                          <div className="flex flex-col">
                                  <span className="font-medium text-gray-900">
                                    {order.customize.phoneModel || "Unnamed Product"}
                                  </span>
                                  {/* {order.productId.length > 1 && (
                                    <span className="text-xs text-gray-500">
                                      and {order.productId.length - 1} more items
                                    </span>
                                  )} */}
                                </div>
                          </TableCell>                                                 

                          {/* Payment Method */}
                          <TableCell className={order.paymentMethod === "COD" ? "text-black font-medium" : "text-black font-medium"}>
                            {order.paymentMethod === "COD" ? "COD" : order.paymentMethod}
                          </TableCell>

                          {/* Order Status */}
                          <TableCell>
                            <div className="flex px-1 items-center space-x-2">
                            <span className={order.orderStatus === "pending" ? "font-medium text-red-500" : "text-green-500 font-medium"}>
                            {order.orderStatus || "N/A"}
                            </span>
                            {/* Order Status Edit */}
                            <button onClick={() => handleEditOrderStatus(order._id)}>
                              <Edit2 className="hover:underline" size={20} />
                            </button>
                            </div>
                        </TableCell>

                          {/* Payment Status */}
                          <TableCell>
                            <div className="flex px-1 items-center space-x-2">
                            <span className={order.paymentStatus === "pending" || order.paymentStatus === "cancel"?"font-medium text-red-500":"text-green-500 font-medium"}>{order.paymentStatus || "N/A"}</span>
                            <span className="text-blue-500 cursor-pointer hover:underline" title="Edit payment Status">
                            {/* Payment Status Edit */}
                            <button onClick={() => handleEditPaymentStatus(order._id)}>
                              <Edit2 className="hover:underline" size={20} />
                            </button>
                            </span>
                            </div>
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
                                className="text-red-600 hover:bg-red-100 hover:text-red-700"
                                onClick={() =>handleDelete(order._id)}
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
                {isEditPaymentModalOpen && selectedOrderId && (
                  <EditPaymentStatus
                    onClose={handleClosePaymentModal}
                    orderId={selectedOrderId}
                    onUpdateSuccess={handleUpdateSuccess} 
                  />
                )}

                {isEditOrderModalOpen && selectedOrderId && (
                  <EditOrderStatus
                    onClose={handleCloseOrderModal}
                    orderId={selectedOrderId}
                    onUpdateSuccess={handleUpdateSuccess} 
                  />
                )}
                  {isDelete && selectedOrderId ? (
                    <OrderDeleteFrom
                    onClose={handleCloseDeleteModal}
                    orderId={selectedOrderId}
                    onDeleteSuccess={setIsDeleted} 
                    />
                  ) : null}
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



