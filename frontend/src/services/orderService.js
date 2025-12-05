import api from './api';

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMyOrders = async () => {
  try {
    const response = await api.get('/orders/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getVendorSales = async () => {
  try {
    const response = await api.get('/orders/vendor/sales');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
