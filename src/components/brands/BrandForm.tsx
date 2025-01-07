"use client"
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface BrandFormData {
  brandName: string;
  modelName: string;
  coverTypes: string[];
}

const BrandForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BrandFormData>({
    brandName: "",
    modelName: "",
    coverTypes: [],
  });

  const coverTypes = [
    "Premium Double Layer",
    "3D hard cover",
    "2D Cover",
  ];

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBrandForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.brandName || !formData.modelName || formData.coverTypes.length === 0) {
        throw new Error("Please fill in all required fields");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/add-brand`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brandName: formData.brandName,
          phoneModels:[
            {
                modelName: formData.modelName,
                coverTypes: formData.coverTypes
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add brand');
      }

      toast.success("Brand added successfully!");
      router.push('/brands');
      router.refresh();

    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
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
              Add New Brand
            </CardTitle>
            <Button
              onClick={() => router.push(`/brands`)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-red-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Enter the details for the new brand
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBrandForm} className="space-y-6">
            {/* Brand Name */}
            <div className="space-y-2">
              <label
                htmlFor="brandName"
                className="text-sm font-medium text-gray-700"
              >
                Brand Name
              </label>
              <Input
                type="text"
                id="brandName"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                placeholder="Enter brand name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Model Name */}
            <div className="space-y-2">
              <label
                htmlFor="modelName"
                className="text-sm font-medium text-gray-700"
              >
                Model Name
              </label>
              <Input
                type="text"
                id="modelName"
                name="modelName"
                value={formData.modelName}
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
                className="flex-1 bg-black text-white hover:bg-gray-800 rounded-lg py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save Brand"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-red-50 rounded-lg py-2 transition-colors"
                onClick={() => router.push('/brands')}
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

export default BrandForm;