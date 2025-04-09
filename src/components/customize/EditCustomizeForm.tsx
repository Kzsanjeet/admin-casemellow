"use client"
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

interface Brand {
  _id: string;
  brandName: string;
}

interface ProductProps {
  productDetails: {
    _id: string;
    mockUpName: string;
    brands: {
      _id: string;
      brandName: string;
    };
    phoneModel: string;
    coverType: string[];
    coverPrice: number;
    mockUpImage?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}



const EditCustomizeForm: React.FC<ProductProps> = ({ productDetails }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [newImage, setNewImage] = useState<File | null>(null); // Track new image file
  const [existingImage, setExistingImage] = useState(productDetails.mockUpImage || ''); // Existing image URL

  const [formData, setFormData] = useState({
    // productName: productDetails.productName || '',
    productPrice: productDetails.coverPrice || 0,
    brands: productDetails.brands._id || '',
    phoneModel: productDetails.phoneModel || '',
    coverType: productDetails.coverType || [],
  });

  const coverTypes = [
    "Premium Double Layer",
    "3D hard cover",
    "2D Cover",
  ];

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldMapping: { [key: string]: string } = {
      'price': 'productPrice',
      'brand': 'brands',
      'modelName': 'phoneModel',
    };

    const stateField = fieldMapping[name] || name;
    setFormData((prev) => ({
      ...prev,
      [stateField]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]); // Set new image file
    }
  };

  const handleCoverTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      coverType: prev.coverType.includes(type)
        ? prev.coverType.filter(t => t !== type)
        : [...prev.coverType, type]
    }));
  };

  const handleSelectAllCoverTypes = () => {
    setFormData(prev => ({
      ...prev,
      coverType: prev.coverType.length === coverTypes.length ? [] : [...coverTypes]
    }));
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/brands/get`);
      const data = await response.json();
      setBrands(data.data);
    } catch (error) {
      toast.error('Failed to fetch brands');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('productPrice', String(formData.productPrice));
      formDataToSend.append('brands', formData.brands);
      formDataToSend.append('phoneModel', formData.phoneModel);
      formDataToSend.append('coverType', JSON.stringify(formData.coverType));

      if (newImage) {
        formDataToSend.append('productImage', newImage); // Append new image if exists
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/customize/edit/${productDetails._id}`, {
        method: 'PATCH',
        body: formDataToSend,
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success("Mockup updated successfully");
        router.push('/customize');
      } else {
        toast.error(data.message || "Failed to update product");
      }
    } catch (error) {
      toast.error("An error occurred while updating the product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Edit Product
            </CardTitle>
            <Button
              onClick={() => router.push(`/customize`)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-red-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Update the mock up details
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={formData.productPrice}
                onChange={handleInputChange}
                placeholder="Enter product price"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
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
                  <input 
                    id="product-image" 
                    type="file"
                    accept="image/*"
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {existingImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Current Image:</p>
                  <img 
                    src={existingImage} 
                    alt="Current product" 
                    className="h-20 w-20 object-cover rounded" 
                  />
                </div>
              )}
              {newImage && (
                <p className="text-sm text-gray-500 font-semibold mt-2 w-52 h-52">
                  New selected file: {newImage.name}
                </p>
              )}
            </div>

            {/* Brand Selection */}
            <div className="space-y-2">
              <label
                htmlFor="brand"
                className="text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <select
                id="brand"
                name="brand"
                value={formData.brands}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                required
              >
                <option value="">Select a brand</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.brandName}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Name */}
            <div className="space-y-2">
              <label
                htmlFor="modelName"
                className="text-sm font-medium text-gray-700"
              >
                Phone Model
              </label>
              <input
                type="text"
                id="modelName"
                name="modelName"
                value={formData.phoneModel}
                onChange={handleInputChange}
                placeholder="Enter model name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Cover Types */}
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Cover Types Available
                </label>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAllCoverTypes}
                    className="text-xs px-2 py-1 h-7"
                    >
                    {formData.coverType.length === coverTypes.length ? 'Unselect All' : 'Select All'}
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {coverTypes.map((type) => (
                  <label
                    key={type}
                    className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.coverType.includes(type) 
                        ? 'bg-blue-100 border-gray-400' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.coverType.includes(type)}
                      onChange={() => handleCoverTypeChange(type)}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-400"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-black text-white hover:bg-gray-800 rounded-lg py-2 transition-colors"
              >
                {loading ? 'Updating...' : 'Update Product'}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-red-50 rounded-lg py-2 transition-colors"
                onClick={() => router.push('/customize')}
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

export default EditCustomizeForm;