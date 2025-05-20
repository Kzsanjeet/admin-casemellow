import React, { useState, useEffect, useContext } from 'react';
import { X } from 'lucide-react';
import OrderCountContext, { OrderContext } from '@/provider/OrderCountContext';

interface EditFormProps {
  onClose: () => void;
  orderId: string;
  onUpdateSuccess?: () => void;
}

const EditOrderStatus = ({ onClose, orderId, onUpdateSuccess }: EditFormProps) => {
  const [orderStatus, setOrderStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const{ordercount,setOrdercount} = useContext(OrderContext)!

  const toggle = () =>{
    setOrdercount(!ordercount)
  }

  const handleUpdate = async () => {
    if (!orderStatus) {
      setError('Please select a payment status');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/order/update-status?orderId=${orderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderStatus:orderStatus }),
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
        toggle()
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
            <label htmlFor="orderStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Order Status
            </label>
            <select
              id="orderStatus"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled>Select Order status</option>
              <option value="pending">Pending</option>
              <option value="picked up">Picked Up</option>
              <option value="sent for delivery">Sent for Delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-600">
              Order status updated successfully!
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
            disabled={!orderStatus || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderStatus;