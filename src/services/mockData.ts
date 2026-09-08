import { Product, EMIPlan } from '../types/marketplace';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15',
    brand: 'Apple Premium Reseller',
    imageUrl: 'https://picsum.photos/seed/iphone15/400/400',
    basePrice: 69900,
    description: 'A16 Bionic chip, 48MP camera, all-day battery life.',
    maxEmiTenureMonths: 24,
    variants: [
      { id: 'v1', label: '128GB - Black', price: 69900, inStock: true },
      { id: 'v2', label: '256GB - Blue', price: 79900, inStock: true },
      { id: 'v3', label: '512GB - Pink', price: 94900, inStock: false },
    ],
  },
  {
    id: 'p2',
    name: 'Galaxy S24',
    brand: 'Samsung',
    imageUrl: 'https://picsum.photos/seed/s24/400/400',
    basePrice: 74999,
    description: 'Snapdragon 8 Gen 3, AI-powered camera, 120Hz display.',
    maxEmiTenureMonths: 12,
    variants: [
      { id: 'v1', label: '128GB - Onyx Black', price: 74999, inStock: true },
      { id: 'v2', label: '256GB - Marble Gray', price: 82999, inStock: true },
    ],
  },
  {
    id: 'p3',
    name: 'MacBook Air M2',
    brand: 'Apple Premium Reseller',
    imageUrl: 'https://picsum.photos/seed/macair/400/400',
    basePrice: 99900,
    description: '13-inch, M2 chip, up to 18 hours battery.',
    maxEmiTenureMonths: 24,
    variants: [
      { id: 'v1', label: '256GB - Midnight', price: 99900, inStock: true },
      { id: 'v2', label: '512GB - Starlight', price: 119900, inStock: true },
    ],
  },
  {
    id: 'p4',
    name: 'Gold Coin 10g',
    brand: 'Tanishq',
    imageUrl: 'https://picsum.photos/seed/goldcoin/400/400',
    basePrice: 71500,
    description: '24K 999 purity hallmarked gold coin.',
    maxEmiTenureMonths: 6,
    variants: [
      { id: 'v1', label: '10g', price: 71500, inStock: true },
      { id: 'v2', label: '20g', price: 142500, inStock: true },
    ],
  },
];

// Generates EMI plans for a given price, capped to the product's max tenure
export function generateEMIPlans(price: number, maxTenure = 24): EMIPlan[] {
  const allTenures = [3, 6, 9, 12, 18, 24];
  const tenures = allTenures.filter((t) => t <= maxTenure);
  const annualRate = 0; // no-cost EMI, matching the real app's "No-cost EMIs" model
  return tenures.map((months) => {
    const monthlyAmount = Math.round(price / months);
    const totalPayable = price;
    const processingFee = Math.round(price * 0.01);
    return {
      id: `emi-${months}`,
      tenureMonths: months,
      monthlyAmount,
      interestRate: annualRate,
      processingFee,
      totalPayable,
    };
  });
}
