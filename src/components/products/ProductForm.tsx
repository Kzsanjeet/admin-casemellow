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

interface ProductFormData {
  productName: string;
  productPrice: number;
  discount:number;
  productDescription: string;
  productImage: File | null;
  productCategory: string;
  brands: string; // Changed from Brand[] to string
  phoneModel: string;
  coverTypes: string[];
}

const ProductForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  
  const [formData, setFormData] = useState<ProductFormData>({
    productName: "",
    productPrice: 0,
    discount: 0,
    productDescription: "",
    productImage: null,
    productCategory: "",
    brands: "", // Changed to string
    phoneModel: "",
    coverTypes: [],
  });

  const autoFill = () => {
    setFormData((prevState) => ({
      ...prevState, // Keeps existing form data
      productName: "Abstract case",
      productPrice: 1250,
      productDescription: "The best premium cover inspired by abstract theme.",
      productImage: null, // Ensure it matches expected type (File or string)
      productCategory: "Abstract",
      brands: "", // Changed to string
      phoneModel: "iPhone 11",
      coverTypes: [], // Ensure it matches expected type (array)
    }));
  };
  

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
      'name': 'productName',
      'price': 'productPrice',
      'discount': 'discount',
      'description': 'productDescription',
      'category': 'productCategory',
      'brand': 'brands', // Updated to match new field name
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
      setFormData((prev) => ({
        ...prev,
        productImage: e.target.files![0],
      }));
    }
  };

  const handleCoverTypeChange = (type: string) => {
    setFormData(prev => {
      const updatedCoverTypes = prev.coverTypes.includes(type)
        ? prev.coverTypes.filter(t => t !== type)
        : [...prev.coverTypes, type];

      return {
        ...prev,
        coverTypes: updatedCoverTypes
      };
    });
  };

  const handleSelectAllCoverTypes = () => {
    setFormData(prev => ({
      ...prev,
      coverTypes: prev.coverTypes.length === coverTypes.length ? [] : [...coverTypes]
    }));
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/brands/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setBrands(data.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Failed to fetch brands');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create FormData object for multipart/form-data
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'productImage' && value instanceof File) {
          formDataToSend.append('productImage', value);
        } else if (key === 'coverTypes') {
          formDataToSend.append('coverTypes', JSON.stringify(value));
        } else {
          formDataToSend.append(key, String(value));
        }
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/products/add-product`, {
        method: 'POST',
        body: formDataToSend, // Send as FormData instead of JSON
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success("Product added successfully");
        router.push('/products');
      } else {
        toast.error(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the product");
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
            <button onClick={autoFill}>
              autofill
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Enter the details for the new product
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={formData.productName}
                onChange={handleInputChange}
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
                value={formData.productPrice}
                onChange={handleInputChange}
                placeholder="Enter product price"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                required
              />
            </div>

             {/* discount*/}
             <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-sm font-medium text-gray-700"
              >
                Discount (%)
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                placeholder="Enter discount in percent eg: 10%"
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
                value={formData.productDescription}
                onChange={handleInputChange}
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
                  <input 
                    id="product-image" 
                    type="file"
                    accept="image/*"
                    className="hidden" 
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
              {formData.productImage && (
                <p className="text-sm text-gray-500 font-bold mt-2">
                  Selected file: {formData.productImage.name}
                  {/* <img 
                    src={formData.productImage} 
                    alt="Current product" 
                    className="h-20 w-20 object-cover rounded" 
                  /> */}
                </p>
              )}
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
                value={formData.productCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                required
              >
                <option value="">Select a category</option>
                <option value="Anime">Anime</option>
                <option value="Sports">Sports</option>
                <option value="Marvel">Marvel</option>
                <option value="God">God</option>
                <option value="Mandala">Mandala</option>
                <option value="Luxury">Luxury</option>
                <option value="Abstract">Abstract</option>
                <option value="Abstract">Unique</option>
              </select>
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

            {/* model Name */}
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
                  {formData.coverTypes.length === coverTypes.length ? 'Unselect All' : 'Select All'}
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {coverTypes.map((type) => (
                  <label
                    key={type}
                    className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.coverTypes.includes(type) 
                        ? 'bg-blue-100 border-gray-400' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.coverTypes.includes(type)}
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
                {loading ? 'Saving...' : 'Save Product'}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
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



