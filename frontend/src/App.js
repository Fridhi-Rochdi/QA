import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import VendorProducts from './pages/VendorProducts';
import ProductForm from './pages/ProductForm';
import VendorSales from './pages/VendorSales';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';
import AdminOrders from './pages/AdminOrders';

import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />

              {/* Routes protégées - Client */}
              <Route path="/cart" element={<PrivateRoute allowedRoles={['client']}><Cart /></PrivateRoute>} />
              <Route path="/checkout" element={<PrivateRoute allowedRoles={['client']}><Checkout /></PrivateRoute>} />
              <Route path="/orders" element={<PrivateRoute allowedRoles={['client']}><Orders /></PrivateRoute>} />

              {/* Routes protégées - Vendeur */}
              <Route path="/vendor/products" element={<PrivateRoute allowedRoles={['vendeur']}><VendorProducts /></PrivateRoute>} />
              <Route path="/vendor/products/new" element={<PrivateRoute allowedRoles={['vendeur']}><ProductForm /></PrivateRoute>} />
              <Route path="/vendor/products/edit/:id" element={<PrivateRoute allowedRoles={['vendeur']}><ProductForm /></PrivateRoute>} />
              <Route path="/vendor/sales" element={<PrivateRoute allowedRoles={['vendeur']}><VendorSales /></PrivateRoute>} />

              {/* Routes protégées - Tous les utilisateurs connectés */}
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

              {/* Routes protégées - Admin */}
              <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
              <Route path="/admin/products" element={<PrivateRoute allowedRoles={['admin']}><AdminProducts /></PrivateRoute>} />
              <Route path="/admin/users" element={<PrivateRoute allowedRoles={['admin']}><AdminUsers /></PrivateRoute>} />
              <Route path="/admin/orders" element={<PrivateRoute allowedRoles={['admin']}><AdminOrders /></PrivateRoute>} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
