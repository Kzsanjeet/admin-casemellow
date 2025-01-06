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
import { Eye, Search, Plus, Edit2, Trash2, Shield } from 'lucide-react'

// Sample brand data
const brands = [
    {
        id: "BRD001",
        name: "Apple",
        logo: "/api/placeholder/50/50",
        status: "Active"
    },
    {
        id: "BRD002",
        name: "Samsung",
        logo: "/api/placeholder/50/50",
        status: "Active"
    },
    {
        id: "BRD003",
        name: "Google",
        logo: "/api/placeholder/50/50",
        status: "Active"
    },
    {
        id: "BRD004",
        name: "Microsoft",
        logo: "/api/placeholder/50/50",
        status: "Active"
    },
    {
        id: "BRD005",
        name: "Sony",
        logo: "/api/placeholder/50/50",
        status: "Active"
    }
]

const BrandTable = () => {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-8 bg-gray-200 min-h-screen">
            <div className="w-11/12 mx-auto space-y-6">
                {/* Header Section - Keeping existing code */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
                        <p className="text-gray-500 mt-1">Manage your brand portfolio</p>
                    </div>
                    <Button className="bg-black text-white hover:bg-gray-800">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Brand
                    </Button>
                </div>

                {/* Search Section - Keeping existing code */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                            placeholder="Search brands..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full max-w-sm"
                        />
                    </div>
                </div>

                {/* Improved Table Section */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className='text-xl'>
                            <TableRow className="bg-gray-50 hover:bg-gray-50">
                                <TableHead className="w-12 font-semibold">ID</TableHead>
                                <TableHead className="font-semibold">Brand Name</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="text-right font-semibold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='text-xl'>
                            {filteredBrands.map((brand) => (
                                <TableRow 
                                    key={brand.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <TableCell className="text-sm text-gray-500">
                                        {brand.id}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                                                <Shield className="h-4 w-4 text-gray-500" />
                                            </div>
                                            <span className="font-medium text-gray-900">{brand.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            ${brand.status === 'Active' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {brand.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-1">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="hover:bg-blue-100 text-blue-600 hover:text-blue-600 p-2 h-8 w-8"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="hover:bg-green-100 text-green-600 hover:text-green-600 p-2 h-8 w-8"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="hover:bg-red-100 text-red-600 hover:text-red-600 p-2 h-8 w-8"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="bg-gray-50 hover:bg-gray-50">
                                <TableCell colSpan={2}>Total Brands</TableCell>
                                <TableCell colSpan={2} className="text-right font-bold">
                                    {filteredBrands.length} Brands
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default BrandTable