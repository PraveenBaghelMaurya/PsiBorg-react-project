import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, Product } from '../api/products';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

const ProductListPage = () => {
  const { logout } = useAuth();
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center text-red-600 bg-red-50 p-6 rounded-lg shadow">
          <p className="text-lg font-semibold">Error loading products</p>
          <p className="text-sm mt-2">Please check your connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Store App</h1>
          <button 
            onClick={logout}
            className="text-sm text-red-600 hover:text-red-800 font-medium px-4 py-2 rounded hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListPage;
