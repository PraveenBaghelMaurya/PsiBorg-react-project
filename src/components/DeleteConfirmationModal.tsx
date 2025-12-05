import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct, Product } from '../api/products';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface DeleteConfirmationModalProps {
  productId: number;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ productId, isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Update list cache
      queryClient.setQueryData(['products'], (old: Product[] | undefined) => {
        if (!old) return [];
        return old.filter(p => p.id !== productId);
      });
      
      toast.success('Product deleted successfully');
      navigate('/products');
    },
    onError: () => {
      toast.error('Failed to delete product');
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-red-600">Delete Product</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => mutation.mutate(productId)}
            disabled={mutation.isPending}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {mutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
