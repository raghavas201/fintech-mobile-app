export interface ProductVariant {
  id: string;
  label: string; // e.g. "128GB - Black"
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  basePrice: number;
  description: string;
  variants: ProductVariant[];
  maxEmiTenureMonths: number; // for "No-cost EMIs upto N months" subtitle
}

export interface EMIPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number; // annual %
  processingFee: number;
  totalPayable: number;
}

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T };
