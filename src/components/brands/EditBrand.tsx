"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { toast } from 'sonner';

interface EditBrandProps {
  brandName: string;
  // modelName: string;
  // coverTypes: string[];
  brandId: string;
  isActive: boolean;
}

const EditBrand: React.FC<EditBrandProps> = ({
  brandName,
  // modelName,
  // coverTypes: existingCoverTypes,
  brandId,
  isActive,
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    // // Available cover types
    // const coverTypes = [
    //   "Premium Double Layer",
    //   "3D hard cover",
    //   "2D Cover",
    // ];
  
    // Form data state
    const [formData, setFormData] = useState({
      brandName: brandName,
      // modelName: modelName,
      // coverTypes: existingCoverTypes,
      isActive: isActive
    });
  
    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    // Handle cover type selection
    // const handleCoverTypeChange = (type: string) => {
    //   setFormData(prev => ({
    //     ...prev,
    //     coverTypes: prev.coverTypes.includes(type)
    //       ? prev.coverTypes.filter(t => t !== type)
    //       : [...prev.coverTypes, type]
    //   }));
    // };
  
    // Handle select/unselect all cover types
    // const handleSelectAllCoverTypes = () => {
    //   setFormData(prev => ({
    //     ...prev,
    //     coverTypes: prev.coverTypes.length === coverTypes.length ? [] : [...coverTypes]
    //   }));
    // };
  
    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        console.log('Sending update data:', ); // Debug log
  
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_PORT}/edit-brand/${brandId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                brandName: formData.brandName,
                // modelName: formData.modelName,
                // coverTypes: formData.coverTypes
            }),
          }
        );
  
        const data = await response.json();
        // console.log('Response:', data); 
  
        if (!response.ok) {
          throw new Error(data.message || 'Failed to update brand');
        }
  
        if (data.success) {
          toast.success('Brand updated successfully');
          router.push('/brands');
          router.refresh();
        } else {
          toast.error(data.message || 'Failed to update brand');
        }
      } catch (error) {
        console.error('Error updating brand:', error);
        toast.error('Failed to update brand. Please try again.');
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
              Edit Brand
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
            Update the brand details
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            {/* <div className="space-y-2">
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
            </div> */}

            {/* Cover Types */}
            {/* <div className="space-y-2">
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
            </div> */}

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-black text-white hover:bg-gray-800 rounded-lg py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Brand"}
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

export default EditBrand;