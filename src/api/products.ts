import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const updateProduct = async (id: number, data: Partial<Product>): Promise<Product> => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<Product> => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
