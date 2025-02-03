"use client";
import EditBrand from "@/components/brands/EditBrand";
import Loader from "@/components/loading/loader";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// interface PhoneModel {
//   modelName: string;
//   coverTypes: string[];
//   _id?: string;
// }

interface Brand {
  _id: string;
  brandName: string;
  // phoneModels: PhoneModel[];
  isActive: boolean;
}

const Page = () => {
  const { brandId } = useParams();
  const [brandData, setBrandData] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBrandById = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/get-specific-brand/${brandId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setBrandData(data.data);
      } else {
        setError(data.message || "Failed to fetch brand data.");
      }
    } catch (err) {
      console.error("Error fetching brand:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (brandId) fetchBrandById();
  }, [brandId]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!brandData) return <div>No data found for this brand.</div>;

  return (
    <div className="w-full">
      <EditBrand
        brandName={brandData.brandName}
        // modelName={brandData.phoneModels[0].modelName}
        // coverTypes={brandData.phoneModels[0].coverTypes}
        brandId={brandData._id}
        isActive={brandData.isActive}
      />
    </div>
  );
};

export default Page;