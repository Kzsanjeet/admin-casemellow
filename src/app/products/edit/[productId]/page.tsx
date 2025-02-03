"use client";
import Loader from "@/components/loading/loader";
import EditForm from "@/components/products/EditForm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ProductFormData {
    _id: string;
    productName: string;
    productPrice: number;
    productDescription: string;
    productImage: string; // Changed from File | null to string
    productCategory: string;
    brands: {
      _id: string;
      brandName: string;
    };
    phoneModel: string;
    coverType: string[];
  }

const Page = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState<ProductFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSpecificProduct = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/products/get/${productId}`
      );
      const data = await response.json();
      
      if (data.success) {
        setProductDetails({
          ...data.data,
          // Ensure the backend returns productImage as a string URL
          productImage: data.data.productImage || '' 
        });
      } else {
        setError("No data found");
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchSpecificProduct();
    }
  }, [productId]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!productDetails) return <div>No data found for this product.</div>;

  return (
    <div className="w-full">
      <EditForm productDetails={productDetails} />
    </div>
  );
};

export default Page;