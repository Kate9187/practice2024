import http from '../http-common';

class ProductDataService {
  get(id) {
    return http.get(`/categories/${id}/products`);
  }

  getById(id) {
    return http.get(`/products/${id}`);
  }

  create(id, data) {
    return http.post(`/categories/${id}/products`, data);
  }

  getByCategory(id) {
    return http.get(`/categories/${id}/products`);
  }

  update(id, data) {
    return http.put(`/products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }

  deleteByCategory(id) {
    return http.delete(`/categories/${id}/products`);
  }

  getAll() {
    return http.get('/allProducts');
  }
}

export default new ProductDataService();
