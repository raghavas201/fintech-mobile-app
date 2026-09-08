import { useAsync } from './useAsync';
import { api } from '../services/api';

export function useProducts() {
  return useAsync(() => api.fetchProducts(), []);
}

export function useProductDetail(id: string) {
  return useAsync(() => api.fetchProductById(id), [id]);
}

export function useEMIPlans(price: number | null, maxTenure = 24) {
  return useAsync(
    () => (price ? api.fetchEMIPlans(price, maxTenure) : Promise.resolve([])),
    [price, maxTenure]
  );
}
