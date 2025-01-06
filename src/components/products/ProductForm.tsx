"use client"
import { Button } from "@/components/ui/button";
import { Cross, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ProductForm = () => {

    const router = useRouter()


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 bg-opacity-5">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Add Product</h1>
          
          <Button onClick={()=>router.push(`/products`)} variant="destructive" className="text-gray-900 hover:text-black">
            <X/>
          </Button>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter product name"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price (Rs)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter product price"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
              rows={4}
              required
            />
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Enter product category"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
              required
            />
          </div>

          {/* Save Button */}
          <div>
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-2"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
