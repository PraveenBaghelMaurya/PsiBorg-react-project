import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api/products';
import EditProductModal from '../components/EditProductModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  if (error || !product) return <div className="text-center mt-10 text-red-600">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate('/products')} className="mb-4 text-blue-600 hover:underline flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Products
      </button>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 flex items-center justify-center bg-white border-b md:border-b-0 md:border-r border-gray-100">
          <img src={product.image} alt={product.title} className="max-h-96 max-w-full object-contain" />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-4 font-semibold">{product.category}</p>
          <div className="flex items-center mb-6">
            <span className="text-4xl font-bold text-blue-600 mr-6">${product.price.toFixed(2)}</span>
            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
              <span className="text-yellow-500 mr-1 text-lg">★</span>
              <span className="font-medium text-gray-700">{product.rating.rate} <span className="text-gray-400 text-sm">({product.rating.count} reviews)</span></span>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mb-8 text-lg">{product.description}</p>
          
          <div className="mt-auto flex space-x-4">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
            >
              Edit Product
            </button>
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex-1 px-6 py-3 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-semibold"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditProductModal 
          product={product} 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          productId={product.id}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
