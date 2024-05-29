import http from './http-common';

export function fetchProducts() {
  return http.get('/products');
}

export function getProduct(id) {
  return http.get(`products/${id}`);
}

export function addProduct(data) {
  return http.post('/products', data);
}

export function updateProduct(id, data) {
  return http.put(`/products/${id}`, data);
}

export function deleteProduct(id) {
  return http.delete(`/products/${id}`);
}

