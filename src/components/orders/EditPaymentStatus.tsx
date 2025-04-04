// import React, { useEffect, useState } from 'react';


// interface EditFormProps {
//   onClose: () => void; // Callback to close the modal
//   orderId: string; // ID of the brand to delete
//   // onEditSuccess: (isDeleted: boolean) => void; // Callback after successful deletion
// }

// const EditPaymentStatus = ({ onClose, orderId}: EditFormProps)=> {
//     const [paymentStatus, setPaymentStatus] = useState('')

//     const updatePaymentStatus = async() =>{
//         try {
//           const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/payment/update-status?orderId=${orderId}`,{
//             method: 'PATCH',
//             headers: {
//               'Content-Type': 'application/json',
//               },
//             body:
//             JSON.stringify({ paymentStatus: paymentStatus })
//           })
//           const data = await response.json()
//           if(data.success){
//             console.log(data)
//             onClose()
//           }
//         } catch (error) {
//           console.log(error)
//         }
//       }

//       useEffect(()=>{
//         updatePaymentStatus()
//       },[paymentStatus])



//   return (
//     <div className="p-4 border rounded-lg shadow-md">
//       <h1 className="text-lg font-semibold mb-2">Edit Payment Status</h1>
      
//       <select
//         id="payment-status"
//         name="paymentStatus"
//         value={paymentStatus}
//         onChange={(e) => setPaymentStatus(e.target.value)}
//         className="border p-2 rounded-md"
//       >
//         <option value="" disabled>Select status</option>
//         <option value="paid">Paid</option>
//         <option value="unpaid">Unpaid</option>
//       </select>+


//       <p className="mt-2">Selected Status: <strong>{paymentStatus || "None"}</strong></p>
//     </div>
//   );
// };

// export default EditPaymentStatus;








import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface EditFormProps {
  onClose: () => void;
  orderId: string;
  onUpdateSuccess?: () => void;
}

const EditPaymentStatus = ({ onClose, orderId, onUpdateSuccess }: EditFormProps) => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async () => {
    if (!paymentStatus) {
      setError('Please select a payment status');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/payment/update-status?orderId=${orderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentStatus:paymentStatus }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        // Wait a moment to show success message before closing
        setTimeout(() => {
          if (onUpdateSuccess) onUpdateSuccess();
          onClose();
        }, 1000);
      } else {
        setError(data.message || 'Failed to update payment status');
      }
    } catch (err) {
      console.error('Update error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle clicking outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Update Payment Status</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6">
          <div className="mb-4">
            <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Status
            </label>
            <select
              id="paymentStatus"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled>Select payment status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="cancel">Cancel</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-600">
              Payment status updated successfully!
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={!paymentStatus || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPaymentStatus;