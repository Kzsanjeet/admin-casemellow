"use client"
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { Plus, Search, Edit2, Trash2, MoreVertical, Eye } from 'lucide-react'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'


// Sample data with more relevant product information
const products = [
    {
        id: "PRD001",
        thumbnail: "/api/placeholder/100/100",
        name: "iPhone 14 Pro",
        brand: "Apple",
        price: 999.99,
        stock: 45,
        status: "In Stock"
    },
    {
        id: "PRD002",
        thumbnail: "/api/placeholder/100/100",
        name: "Galaxy S23 Ultra",
        brand: "Samsung",
        price: 1199.99,
        stock: 30,
        status: "Low Stock"
    },
    {
        id: "PRD003",
        thumbnail: "/api/placeholder/100/100",
        name: "MacBook Pro 16",
        brand: "Apple",
        price: 2499.99,
        stock: 15,
        status: "In Stock"
    },
    {
        id: "PRD004",
        thumbnail: "/api/placeholder/100/100",
        name: "iPad Air",
        brand: "Apple",
        price: 599.99,
        stock: 0,
        status: "Out of Stock"
    },
    {
        id: "PRD005",
        thumbnail: "/api/placeholder/100/100",
        name: "Pixel 7 Pro",
        brand: "Google",
        price: 899.99,
        stock: 20,
        status: "In Stock"
    }
]

const ProductTable = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // const getStockStatusColor = (status) => {
    //     switch (status) {
    //         case "In Stock":
    //             return "text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm"
    //         case "Low Stock":
    //             return "text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-sm"
    //         case "Out of Stock":
    //             return "text-red-600 bg-red-50 px-2 py-1 rounded-full text-sm"
    //         default:
    //             return ""
    //     }
    // }

    const totalValue = filteredProducts.reduce((sum, product) => sum + (product.price * product.stock), 0)

    return (
        <div className="p-8 flex w-full items-center justify-center bg-gray-100 min-h-full">
            <div className="w-11/12 h-screen mx-auto space-y-6">
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

                {/* Search and Filter Section */}
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
                <div className="bg-white max-h-80 rounded-lg shadow-sm overflow-hidden scroll-auto">
                    <Table>
                        <TableHeader className='text-2xl'>
                            <TableRow>
                                <TableHead className='font-semibold'>Product</TableHead>
                                <TableHead className='font-semibold'>Brand</TableHead>
                                <TableHead className='font-semibold'>Price</TableHead>
                                {/* <TableHead>Stock</TableHead>
                                <TableHead>Status</TableHead> */}
                                <TableHead className='font-semibold'>Activate</TableHead>
                                <TableHead className="text-right font-semibold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='text-xl'>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="flex items-center space-x-6">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.name}
                                            className="h-10 w-10 rounded-lg object-cover"
                                        />
                                        <span className="font-medium text-gray-700">{product.name}</span>
                                    </TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>Rs <span className='text-xl text-gray-700'>{product.price.toFixed(2)}</span></TableCell>
                                    {/* <TableCell>{product.stock}</TableCell> */}
                                    {/* <TableCell>
                                        <span className={getStockStatusColor(product.status)}>
                                            {product.status}
                                        </span>
                                    </TableCell> */}
                                    <TableCell>
                                        <span className="">
                                            <div className="flex items-center space-x-2">
                                                <Switch id="feature" />
                                                <Label htmlFor="airplane-mode" className='text-xl text-gray-700'>Activate</Label>
                                            </div>
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-2">
                                        <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="hover:bg-blue-100 text-blue-600 hover:text-blue-700 p-2 h-8 w-8"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className='text-green-600 hover:bg-green-100 hover:text-green-700'>
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-100 hover:text-red-700">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total Inventory Value</TableCell>
                                <TableCell colSpan={3} className="text-right font-bold">
                                    Rs{totalValue.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ProductTable