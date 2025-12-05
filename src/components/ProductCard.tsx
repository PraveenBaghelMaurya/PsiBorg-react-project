import React from 'react';
import { Product } from '../api/products';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full border border-gray-200"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="h-48 p-4 flex items-center justify-center bg-white relative">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 leading-tight" title={product.title}>
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide font-medium">{product.category}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
          <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
            <span className="text-yellow-500 mr-1 text-sm">★</span>
            <span className="text-xs font-medium text-gray-700">{product.rating.rate} <span className="text-gray-400">({product.rating.count})</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
