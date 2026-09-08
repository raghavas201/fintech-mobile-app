import { Product, EMIPlan } from '../types/marketplace';
import { MOCK_PRODUCTS, generateEMIPlans } from './mockData';

const DELAY = 600;
// Flip this to true occasionally to test error states
const SIMULATE_ERROR = false;

function delay<T>(value: T, ms = DELAY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const api = {
  async fetchProducts(): Promise<Product[]> {
    if (SIMULATE_ERROR) throw new Error('Failed to load products');
    return delay(MOCK_PRODUCTS);
  },

  async fetchProductById(id: string): Promise<Product> {
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    return delay(product);
  },

  async fetchEMIPlans(price: number, maxTenure = 24): Promise<EMIPlan[]> {
    if (SIMULATE_ERROR) throw new Error('Failed to load EMI plans');
    return delay(generateEMIPlans(price, maxTenure), 400);
  },
};
