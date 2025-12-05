import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import ProductListPage from './pages/ProductListPage'
import ProductDetailPage from './pages/ProductDetailPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App