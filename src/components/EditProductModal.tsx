import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct, Product } from '../api/products';
import toast from 'react-hot-toast';

interface EditProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, isOpen, onClose }) => {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Partial<Product>) => updateProduct(product.id, data),
    onSuccess: (updatedProduct) => {
      // Optimistic update or cache invalidation
      // Since it's a fake API, the server doesn't actually update. 
      // We need to update the cache manually to show the change.
      
      // Update single product cache
      queryClient.setQueryData(['product', String(product.id)], (old: Product) => ({
        ...old,
        ...updatedProduct,
        title: title, // Override with local state because fake API might not return the change exactly as we sent if it doesn't persist
        price: price
      }));

      // Update list cache if it exists
      queryClient.setQueryData(['products'], (old: Product[] | undefined) => {
        if (!old) return [];
        return old.map(p => p.id === product.id ? { ...p, title, price } : p);
      });

      toast.success('Product updated successfully!');
      onClose();
    },
    onError: () => {
      toast.error('Failed to update product');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, price });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Price</label>
            <input
              type="number"
              step="0.01"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {mutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
