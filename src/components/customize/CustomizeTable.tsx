"use client"
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Pagination, PaginationContent, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { useDebounce } from '@/hooks/use-debounce'
import Loader from '@/components/loading/loader'
import { toast } from 'sonner'


interface Brand {
    _id: string;
    brandName: string;
}

interface ICustomize {
    _id:string;
    mockUpName: string;
    brands: {
        _id: string;
        brandName: string;
      };
    phoneModel: string;
    coverType: string[];
    coverPrice: number;
    mockUpImage?: string;
    productDescription: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

interface ApiResponse {
    success: boolean;
    data: ICustomize[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
}

interface CoverTypeDisplayProps {
    coverTypes: string[];
}

const CoverTypeDisplay: React.FC<CoverTypeDisplayProps> = ({ coverTypes }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayLimit = 2;

    const getBackgroundColor = (index: number) => {
        const colors = [
            'bg-blue-500 hover:bg-blue-600',
            'bg-green-500 hover:bg-green-600',
            'bg-purple-500 hover:bg-purple-600',
            'bg-orange-500 hover:bg-orange-600',
            'bg-pink-500 hover:bg-pink-600'
        ];
        return colors[index % colors.length];
    };

    if (!coverTypes || coverTypes.length === 0) {
        return <span className="text-gray-500">No Cover Types</span>;
    }

    const displayedTypes = isExpanded ? coverTypes : coverTypes.slice(0, displayLimit);
    const remainingCount = coverTypes.length - displayLimit;

    return (
        <div className="flex flex-wrap gap-2 items-center">
            {displayedTypes.map((cover, index) => (
                <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-white text-sm font-medium transition-colors duration-200 ${getBackgroundColor(index)}`}
                >
                    {cover}
                </span>
            ))}
            {!isExpanded && remainingCount > 0 && (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 text-sm font-medium transition-colors duration-200"
                >
                    +{remainingCount} more
                </button>
            )}
            {isExpanded && coverTypes.length > displayLimit && (
                <button
                    onClick={() => setIsExpanded(false)}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                    Show less
                </button>
            )}
        </div>
    );
};

const CustomizeTable = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearch = useDebounce(searchTerm, 1000)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [productDetails, setProductDetails] = useState<ICustomize[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalProducts, setTotalProducts] = useState(0)
    const [refresh, setRefresh] = useState(false); // State to track refresh
    const itemsPerPage = 10

    const [isDelete,setIsDelete] =  useState(false)
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    

    const fetchProductData = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_LOCAL_PORT}/customize/get-all?page=${currentPage}&limit=${itemsPerPage}&search=${debouncedSearch}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            
            // if (!response.ok) {
            //     throw new Error('Failed to fetch products')
            // }

            const result = await response.json()
            
            if (result.success) {
                setProductDetails(result.data)
                setTotalPages(result.totalPages)
                setTotalProducts(result.totalProducts)
                setCurrentPage(result.currentPage)
            } else {
                if (result.message === "No products found") {
                    // Set a specific state for "no products found" response
                    setError("no_products")
                    setProductDetails([])
                } else {
                    throw new Error(result.message || 'Failed to fetch products')
                }
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred')
            console.error('API Error:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProductData()
    }, [currentPage, debouncedSearch,refresh,isDeleted])

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }

    // const handleStatusChange = async (productId: string, currentStatus: boolean) => {
    //     try {
    //         const updatedStatus = !currentStatus; // Toggle status
    //         const response = await fetch(
    //             `${process.env.NEXT_PUBLIC_LOCAL_PORT}/update-product-status/${productId}?status=${updatedStatus}`,
    //             {
    //                 method: 'PATCH',
    //                 headers: { 'Content-Type': 'application/json' },
    //             }
    //         );
    
    //         const data = await response.json();
    
    //         if (data.success) {
    //             toast.success("Status updated successfully");
    //             //router.refresh(); // Refresh UI
    //             //setRefresh((prev) => !prev); // Toggle refresh state to trigger re-fetch
    //             // Update the local state instead of re-fetching
    //         setProductDetails((prev) =>
    //             prev.map((product) =>
    //                 product._id === productId ? { ...product, isActive: updatedStatus } : product
    //             )
    //         );
    //         } else {
    //             toast.error(data.message || "Failed to update status");
    //         }
    //     } catch (error) {
    //         console.error("Error updating status:", error);
    //         toast.error("Something went wrong. Please try again.");
    //     }
    // };
    
 

    const handleEdit = (productId: string) => {
        router.push(`/customize/edit/${productId}`)
    }

    const handleView = (productId: string) => {
        router.push(`/products/view-product/${productId}`)
    }

    const handleDelete = (productId: string) => {
        setIsDelete(true);
        setSelectedProductId(productId); // Store the ID of the product to delete
      };
    
    const handleCloseDeleteModal = () => {
        setSelectedProductId(null);
        setIsDeleteModalOpen(false);
      };
    

    // if (error) {
    //     return (
    //         <div className="p-8 text-center text-red-600">
    //             <p>Error: {error}</p>
    //             <Button onClick={fetchProductData} className="mt-4">
    //                 Retry
    //             </Button>
    //         </div>
    //     )
    // }

    return (
        <div className="p-8 flex w-full bg-gray-100 min-h-screen">
            <div className="w-11/12 mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                        <p className="text-gray-500 mt-1">Manage your product inventory</p>
                    </div>
                    <Button 
                        onClick={() => router.push("/products/add-product")}
                        className="bg-black text-white hover:bg-gray-800"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </div>

                {/* Search Section */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full max-w-sm"
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-8">
                            <Loader />
                        </div>
                    )  : error === "no_products" ? (
                        <div className="p-8 text-center text-gray-500">
                            {debouncedSearch ? 
                                `No products found matching "${debouncedSearch}"` : 
                                "No products found in the database"}
                        </div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-600">
                            <p>Error: {error}</p>
                            <Button onClick={fetchProductData} className="mt-4">
                                Retry
                            </Button>
                        </div>
                    ) : productDetails.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No products available
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="text-xl">
                                        <TableRow className='bg-gray-50 hover:bg-gray-50'>
                                            <TableHead className="font-semibold">Phone Models</TableHead>
                                            <TableHead className="font-semibold">Brand</TableHead>
                                            <TableHead className="font-semibold">Cover Types</TableHead>
                                            <TableHead className="font-semibold">Price</TableHead>
                                            <TableHead className="text-right font-semibold">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="text-xl">
                                        {productDetails?.map((product) => (
                                            <TableRow key={product._id} className="hover:bg-gray-50">
                                                <TableCell className="flex items-center space-x-6">
                                                    <img
                                                        src={product.mockUpImage}
                                                        alt={product.phoneModel}
                                                        className="h-10 w-10 rounded-lg object-cover"
                                                    />
                                                    <span className="font-medium text-gray-900">{product.phoneModel}</span>
                                                </TableCell>
                                                <TableCell>{product.brands?.brandName || 'No Brand'}</TableCell>
                                                <TableCell>
                                                    <CoverTypeDisplay coverTypes={product.coverType} />
                                                </TableCell>
                                                <TableCell>
                                                    <span className="font-medium">
                                                        Rs {product.coverPrice.toLocaleString('en-IN', { 
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end space-x-2">
                                                        <Button 
                                                            variant="ghost"
                                                            className="hover:bg-blue-100 text-blue-600 hover:text-blue-700 p-2 h-8 w-8"
                                                            onClick={() => handleView(product._id)}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button 
                                                            variant="ghost"
                                                            className="text-green-600 hover:bg-green-100 hover:text-green-700"
                                                            onClick={() => handleEdit(product._id)}
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </Button>
                                                        <Button 
                                                            variant="ghost"
                                                            className="text-red-600 hover:bg-red-100 hover:text-red-700"
                                                            onClick={() => handleDelete(product._id)}
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
                                            <TableCell colSpan={3}>Total Products</TableCell>
                                            <TableCell colSpan={3} className="text-right font-bold">
                                                {totalProducts} Products
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                                {/* {isDelete && selectedProductId ? (
                                    <ProductDeleteFrom 
                                    onClose={handleCloseDeleteModal}
                                    productId={selectedProductId}
                                    onDeleteSuccess={setIsDeleted} 
                                    />
                                ) : null} */}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="p-4 border-t">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationPrevious
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                // disabled={currentPage === 1}
                                            />
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <PaginationLink
                                                    key={index}
                                                    isActive={currentPage === index + 1}
                                                    onClick={() => handlePageChange(index + 1)}
                                                >
                                                    {index + 1}
                                                </PaginationLink>
                                            ))}
                                            <PaginationNext
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                // disabled={currentPage === totalPages}
                                            />
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CustomizeTable