import type { Product, ProductCategory } from '../types/product';
import type { SortType } from './products';

const CATEGORIES: ProductCategory[] = ['phones', 'tablets', 'accessories'];

export const mixCategories = (products: Product[]): Product[] => {
  const productsByCategory = CATEGORIES.map(category =>
    products.filter(product => product.category === category),
  );
  const mixedProducts: Product[] = [];
  const longestList = Math.max(
    ...productsByCategory.map(categoryProducts => categoryProducts.length),
  );

  for (let index = 0; index < longestList; index++) {
    productsByCategory.forEach(categoryProducts => {
      const product = categoryProducts[index];

      if (product) {
        mixedProducts.push(product);
      }
    });
  }

  return mixedProducts;
};

const parseNumericValue = (value: string | undefined): number => {
  if (!value) return 0;
  const match = value.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

const parseCapacityValue = (capacity: string | undefined): number => {
  if (!capacity) return 0;
  const num = parseNumericValue(capacity);
  return capacity.toUpperCase().includes('TB') ? num * 1024 : num;
};

export const sortProducts = (
  products: Product[],
  sort: SortType,
): Product[] => {
  const sorted = [...products];

  switch (sort) {
    case 'title':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'screen':
      return sorted.sort(
        (a, b) => parseNumericValue(b.screen) - parseNumericValue(a.screen),
      );
    case 'capacity':
      return sorted.sort(
        (a, b) =>
          parseCapacityValue(b.capacity) - parseCapacityValue(a.capacity),
      );
    case 'ram':
      return sorted.sort(
        (a, b) => parseCapacityValue(b.ram) - parseCapacityValue(a.ram),
      );
    case 'age':
    default:
      return sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  }
};
