"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Search, Plus, Edit2, Trash2, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "../loading/loader";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useDebounce } from "@/hooks/use-debounce";
import DeleteForm from "./DeleteForm";
import { toast } from "sonner";

interface Brands {
  _id: string;
  brandName: string;
  isActive: boolean;
}

const BrandTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 1000);
  const [brandDetail, setBrandDetail] = useState<Brands[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  
  const [isDelete,setIsDelete] =  useState(false)
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);


 

  // const handleOpenDeleteModal = (brandId: string) => {
  //   setSelectedBrandId(brandId);
  //   setIsDeleteModalOpen(true);
  // };



  // const handleDeleteSuccess = () => {
  //   // Refresh your brand list here
  //   console.log("Brand deleted successfully!");
  // };
  
  const fetchBrand = async () => {
    try {
      setLoading(true);
      const getData = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/get-all-brands?page=${currentPage}&limit=${itemsPerPage}&search=${debouncedSearch}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await getData.json();
      if (data.success) {
        setBrandDetail(data.data);
        setTotalPages(data.totalPages);
      } else {
        throw new Error(data.message || "Unable to fetch data.");
      }
    } catch (error) {
      toast.error("Error fetching brands. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = (brandId: string) => {
    setIsDelete(true);
    setSelectedBrandId(brandId); // Store the ID of the brand to delete
  };

  const handleCloseDeleteModal = () => {
    setSelectedBrandId(null);
    setIsDeleteModalOpen(false);
  };

  //const handleDeleteFunc = async() =>{
//     setLoading(true);
//     try {
//         const deleteBrand = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/brands/delete-brand/${brandDetail}`,{
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 },
//         })
//         const response = await deleteBrand.json()
//         if(deleteBrand){
//             toast.success("Deleted Successfully");
//             setIsDelete(true)
//             // state = false
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }// 

  useEffect(() => {
    fetchBrand();
  }, [currentPage,debouncedSearch,isDeleted]); // Refetch when page or searchTerm changes

 
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="w-11/12 mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Brands</h1>
            <p className="text-gray-500 mt-1">Manage your brand portfolio</p>
          </div>
          <Button
            className="bg-black text-white hover:bg-gray-800"
            onClick={() => router.push("brands/add-brand")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Brand
          </Button>
        </div>

        {/* Search Section */}
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

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {loading ? (
                <div>
                <Loader/>
                </div>
            ):
            (
            <div>
            <Table>
                    <TableHeader className="text-xl">
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="font-semibold">Brand Name</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody className="text-xl">
                    {Array.isArray(brandDetail) && brandDetail.map((brand) => (
                        <TableRow
                        key={brand._id}
                        className="hover:bg-gray-50 transition-colors"
                        >
                        <TableCell>
                            <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                                <Shield className="h-4 w-4 text-gray-500" />
                            </div>
                            <span className="font-medium text-gray-700">
                                {brand.brandName}
                            </span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${
                                    brand.isActive
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                            >
                            {brand.isActive ? "Active" : "Inactive"}
                            </span>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={()=>router.push(`/brands/add-model/${brand._id}`)}
                                className="hover:bg-blue-100 text-blue-600 hover:text-blue-600 p-2 h-8 w-8"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.push(`/brands/edit/${brand._id}`)}
                                className="hover:bg-green-100 text-green-600 hover:text-green-600 p-2 h-8 w-8"
                            >
                                <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-red-100 text-red-600 hover:text-red-600 p-2 h-8 w-8"
                                onClick={()=>handleDelete(brand._id)}
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
                        {brandDetail.length} Brands
                        </TableCell>
                    </TableRow>
                    </TableFooter>
            </Table>
            {isDelete && selectedBrandId ? (
              <DeleteForm  
              onClose={handleCloseDeleteModal}
              brandId={selectedBrandId}
              onDeleteSuccess={setIsDeleted} 
              />
            ) : null}

            </div>
                
            )}

          {/* Pagination */}
          <Pagination>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationLink
                key={index}
                isActive={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            ))}
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default BrandTable;
