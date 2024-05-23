import http from './http-common';

export function fetchProducts() {
  return http.get('/products.json');
}

