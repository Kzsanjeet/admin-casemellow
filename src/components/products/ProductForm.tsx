"use client"
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductForm = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Add New Product
            </CardTitle>
            <Button
              onClick={() => router.push(`/products`)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-red-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Enter the details for the new product
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter product name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-sm font-medium text-gray-700"
              >
                Price (Rs)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Enter product price"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                rows={4}
                required
              />
            </div>

            {/* Product Image */}
            <div className="space-y-2">
              <label
                htmlFor="product-image"
                className="text-sm font-medium text-gray-700"
              >
                Product Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="product-image"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, or JPG</p>
                  </div>
                  <input id="product-image" type="file" className="hidden" />
                </label>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                required
              >
                <option value="">Select a category</option>
                <option value="phones">Phones</option>
                <option value="tablets">Tablets</option>
                <option value="laptops">Laptops</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-black text-white hover:bg-gray-800 rounded-lg py-2 transition-colors"
              >
                Save Product
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-red-50 rounded-lg py-2 transition-colors"
                onClick={() => router.push('/products')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;