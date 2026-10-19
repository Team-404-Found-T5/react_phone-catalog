import type {
  Product,
  ProductCategory,
  ProductDetails,
} from '../types/product';

const API_URL = `${import.meta.env.BASE_URL}api`;
const RESPONSE_DELAY_MS = 500;
const CATEGORIES: ProductCategory[] = ['phones', 'tablets', 'accessories'];

export type ProductsPage = {
  products: Product[];
  total: number;
  totalPages: number;
};

export type VariantChange = {
  color?: string;
  capacity?: string;
};

export type SortType =
  | 'age'
  | 'title'
  | 'price'
  | 'price-desc'
  | 'screen'
  | 'capacity'
  | 'ram';

export type FilterOptions = {
  capacity?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
};

const visibleProducts = new Map<string, Product>();
const productDetails = new Map<ProductCategory, Promise<ProductDetails[]>>();
const suggestedProducts = new Map<string, Promise<Product[]>>();
let productsPromise: Promise<Product[]> | undefined;

const fetchJson = <T>(url: string): Promise<T> => {
  const response = fetch(url);
  const responseDelay = new Promise<void>(resolve => {
    setTimeout(resolve, RESPONSE_DELAY_MS);
  });

  return Promise.all([response, responseDelay]).then(([result]) => {
    if (!result.ok) {
      throw new Error(`Failed to fetch ${url}: ${result.status}`);
    }

    return result.json() as Promise<T>;
  });
};

const mixCategories = (products: Product[]): Product[] => {
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

const sortProducts = (products: Product[], sort: SortType): Product[] => {
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
      return sorted.sort((a, b) => b.year - a.year);
  }
};

export const getProducts = (): Promise<Product[]> => {
  if (!productsPromise) {
    productsPromise = fetchJson<Product[]>(`${API_URL}/products.json`)
      .then(products =>
        products.map(product => ({
          ...product,
          oldPrice: product.fullPrice,
        })),
      )
      .catch(error => {
        productsPromise = undefined;
        throw error;
      });
  }

  return productsPromise;
};

export const searchProducts = (
  query: string,
  limit = Number.POSITIVE_INFINITY,
): Promise<Product[]> => {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return Promise.resolve([]);
  }

  return getProducts().then(products =>
    products
      .filter(product => {
        const productText =
          `${product.name} ${product.itemId} ${product.category} ${product.id}`.toLowerCase();

        return words.every(word => productText.includes(word));
      })
      .slice(0, limit),
  );
};

export const preloadProductData = (): Promise<void> =>
  Promise.all([
    getProducts(),
    ...CATEGORIES.map(category => getProductDetails(category)),
  ]).then(() => undefined);

export const cacheVisibleProducts = (products: Product[]): void => {
  products.forEach(product => {
    visibleProducts.set(product.itemId, product);
  });
};

export const getProductsPage = (
  category: string,
  page: number,
  perPage: number | 'all' = 8,
  searchTerm = '',
  sort: SortType = 'age',
  filters: FilterOptions = {},
): Promise<ProductsPage> => {
  if (!category) {
    return Promise.reject(new Error('Category is required'));
  }

  if (!Number.isInteger(page) || page < 1) {
    return Promise.reject(new Error('Page must be a positive integer'));
  }

  const productsPromise = searchTerm.trim()
    ? searchProducts(searchTerm)
    : getProducts();

  return productsPromise.then(products => {
    let filteredProducts =
      category === 'all'
        ? mixCategories(products)
        : products.filter(product => product.category === category);

    if (filters.capacity) {
      filteredProducts = filteredProducts.filter(
        product => product.capacity === filters.capacity,
      );
    }

    if (filters.color) {
      filteredProducts = filteredProducts.filter(product =>
        product.itemId.toLowerCase().includes(filters.color!.toLowerCase()),
      );
    }

    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.price >= filters.minPrice!,
      );
    }

    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.price <= filters.maxPrice!,
      );
    }

    const sortedProducts = sortProducts(filteredProducts, sort);

    const itemsPerPage =
      perPage === 'all' ? sortedProducts.length || 1 : Number(perPage);

    const start = (page - 1) * itemsPerPage;
    const pageProducts = sortedProducts.slice(start, start + itemsPerPage);

    cacheVisibleProducts(pageProducts);

    return {
      products: pageProducts,
      total: sortedProducts.length,
      totalPages: Math.ceil(sortedProducts.length / itemsPerPage) || 1,
    };
  });
};

export const getProductByItemId = (
  itemId: string,
): Promise<Product | undefined> => {
  const cachedProduct = visibleProducts.get(itemId);

  if (cachedProduct) {
    return Promise.resolve(cachedProduct);
  }

  return getProducts().then(products =>
    products.find(product => product.itemId === itemId),
  );
};

const getProductDetails = (
  category: ProductCategory,
): Promise<ProductDetails[]> => {
  const cachedRequest = productDetails.get(category);

  if (cachedRequest) {
    return cachedRequest;
  }

  const request = fetchJson<ProductDetails[]>(
    `${API_URL}/${category}.json`,
  ).catch(error => {
    productDetails.delete(category);
    throw error;
  });

  productDetails.set(category, request);

  return request;
};

export const getPhones = (): Promise<ProductDetails[]> =>
  getProductDetails('phones');

export const getTablets = (): Promise<ProductDetails[]> =>
  getProductDetails('tablets');

export const getAccessories = (): Promise<ProductDetails[]> =>
  getProductDetails('accessories');

export const getProductDetailsById = (
  category: ProductCategory,
  productId: string,
): Promise<ProductDetails | undefined> =>
  getProductDetails(category).then(products =>
    products.find(product => product.id === productId),
  );

export const getRelatedProducts = (
  product: ProductDetails,
): Promise<ProductDetails[]> =>
  getProductDetails(product.category).then(products =>
    products.filter(item => item.namespaceId === product.namespaceId),
  );

export const getAvailableColors = (products: ProductDetails[]): string[] =>
  Array.from(new Set(products.map(product => product.color)));

export const getAvailableCapacities = (products: ProductDetails[]): string[] =>
  Array.from(new Set(products.map(product => product.capacity)));

export const findProductVariant = (
  products: ProductDetails[],
  currentProduct: ProductDetails,
  change: VariantChange,
): ProductDetails | undefined => {
  const color = change.color ?? currentProduct.color;
  const capacity = change.capacity ?? currentProduct.capacity;

  const exactMatch = products.find(
    product => product.color === color && product.capacity === capacity,
  );

  if (exactMatch) {
    return exactMatch;
  }

  if (change.color) {
    return products.find(product => product.color === color);
  }

  if (change.capacity) {
    return products.find(product => product.capacity === capacity);
  }

  return undefined;
};

export const getSuggestedProducts = (currentId: string): Promise<Product[]> => {
  const cachedRequest = suggestedProducts.get(currentId);

  if (cachedRequest) {
    return cachedRequest;
  }

  const request = getProducts()
    .then(products =>
      products
        .filter(product => product.itemId !== currentId)
        .sort(() => Math.random() - 0.5),
    )
    .catch(error => {
      suggestedProducts.delete(currentId);
      throw error;
    });

  suggestedProducts.set(currentId, request);

  return request;
};
