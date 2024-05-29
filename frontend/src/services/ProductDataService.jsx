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

export function getSignedUrl({key,content_type}) {
  return http.post('/s3/signed_url', {key,content_type});
}

export function uploadFileToSignedUrl(signedUrl, file, contentType, onProgress, onComplete) {
  http.put(signedUrl, file, {
    onUploadProgress:onProgress,
    headers: {
      'Content-Type': contentType
    },
  }).then((response) => {
    onComplete(response);
  }).catch((error) => {
    console.log(error);
  })
}

export function updateProduct(id, data) {
  return http.put(`/products/${id}`, data);
}

export function deleteProduct(id) {
  return http.delete(`/products/${id}`);
}

