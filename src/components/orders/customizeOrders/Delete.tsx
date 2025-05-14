// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react'
// import { toast } from 'sonner';


// interface DeleteFormProps {
//   onClose: () => void; // Callback to close the modal
//   orderId: string; // ID of the brand to delete
//   onDeleteSuccess: (isDeleted: boolean) => void; // Callback after successful deletion
// }

// const OrderDeleteFrom = ({ onClose, orderId, onDeleteSuccess}: DeleteFormProps) => {
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();
//   //   const [error, setError] = useState<string | null>(null);
  
//     const handleDeleteFunc = async () => {
//       setLoading(true);
//       // setError(null); // Clear any previous errors
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/customize/delete/${orderId}`,
//           {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const data = await response.json();
  
//         if (response.ok) {
//           toast.success(data.message || "Order deleted successfully!");
//           // onDeleteSuccess(); // Trigger parent callback to refresh or update
//           onDeleteSuccess(true)
//           onClose(); // Close the modal
//         } else {
//           throw new Error(data.message || "Failed to delete the brand.");
//         }
//       } catch (error: any) {
//       //   setError(error.message || "Something went wrong.");
//         toast.error(error.message || "Failed to delete the brand.");
//       } finally {
//         setLoading(false);
//         // onDeleteSuccess(false)
//       }
//     };
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">
//             Are you sure?
//           </h1>
//           <p className="text-gray-600 mb-6">
//             This action cannot be undone.
//           </p>
//         </div>
//         <div className="flex justify-center space-x-4">
//           <button
//             onClick={handleDeleteFunc}
//             className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:bg-red-300"
//             disabled={loading}
//           >
//             {loading ? "Deleting..." : "Yes, Delete"}
//           </button>
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
//             disabled={loading}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OrderDeleteFrom



import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"

interface DeleteFormProps {
  onClose: () => void // Callback to close the modal
  orderId: string // ID of the brand to delete
  onDeleteSuccess: (isDeleted: boolean) => void // Callback after successful deletion
}

const OrderDeleteFrom = ({ onClose, orderId, onDeleteSuccess }: DeleteFormProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  //   const [error, setError] = useState<string | null>(null);

  const handleDeleteFunc = async () => {
    setLoading(true)
    // setError(null); // Clear any previous errors
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/customize/delete/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || "Order deleted successfully!")
        // onDeleteSuccess(); // Trigger parent callback to refresh or update
        onDeleteSuccess(true)
        onClose() // Close the modal
      } else {
        throw new Error(data.message || "Failed to delete the brand.")
      }
    } catch (error: any) {
      //   setError(error.message || "Something went wrong.");
      toast.error(error.message || "Failed to delete the brand.")
    } finally {
      setLoading(false)
      // onDeleteSuccess(false)
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Are you sure?</h1>
          <p className="text-gray-600 mb-6">This action cannot be undone.</p>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDeleteFunc}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:bg-red-300"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderDeleteFrom
