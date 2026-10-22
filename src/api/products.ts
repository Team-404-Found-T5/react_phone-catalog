import type {
  Product,
  ProductCategory,
  ProductDetails,
} from '../types/product';
import { delayResult } from '../utils/loadingDelay';
import { fetchJson } from './httpClient';
import { mixCategories, sortProducts } from './catalogTransformers';

const API_URL = `${import.meta.env.BASE_URL}api`;
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
const productDetailsData = new Map<ProductCategory, ProductDetails[]>();
const suggestedProducts = new Map<string, Promise<Product[]>>();
let productsPromise: Promise<Product[]> | undefined;
let productsData: Product[] | undefined;

const getProductsData = (): Promise<Product[]> => {
  if (!productsPromise) {
    productsPromise = fetchJson<Product[]>(`${API_URL}/products.json`)
      .then(products => {
        productsData = products.map(product => ({
          ...product,
          oldPrice: product.fullPrice,
        }));

        return productsData;
      })
      .catch(error => {
        productsPromise = undefined;
        productsData = undefined;
        throw error;
      });
  }

  return productsPromise;
};

export const getProducts = (): Promise<Product[]> => {
  const wasCached = productsData !== undefined;
  const request = getProductsData();

  return wasCached ? delayResult(request) : request;
};

export const searchProducts = (
  query: string,
  limit = Number.POSITIVE_INFINITY,
): Promise<Product[]> => {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return Promise.resolve([]);
  }

  return getProductsData().then(products =>
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
    getProductsData(),
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

  if (
    perPage !== 'all' &&
    (!Number.isInteger(perPage) || perPage < 1)
  ) {
    return Promise.reject(
      new Error('Per-page value must be a positive integer'),
    );
  }

  const wasCached = productsData !== undefined;
  const request = searchTerm.trim()
    ? searchProducts(searchTerm)
    : getProductsData();

  const pageResult = request.then(products => {
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

  return wasCached ? delayResult(pageResult) : pageResult;
};

export const getProductByItemId = (
  itemId: string,
): Promise<Product | undefined> => {
  const cachedProduct = visibleProducts.get(itemId);

  if (cachedProduct) {
    return Promise.resolve(cachedProduct);
  }

  return getProductsData().then(products =>
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
  )
    .then(products => {
      productDetailsData.set(category, products);

      return products;
    })
    .catch(error => {
      productDetails.delete(category);
      productDetailsData.delete(category);
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
  skipCachedDelay = false,
): Promise<ProductDetails | undefined> => {
  const wasCached = productDetailsData.has(category);
  const request = getProductDetails(category).then(products =>
    products.find(product => product.id === productId),
  );

  return wasCached && !skipCachedDelay ? delayResult(request) : request;
};

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

  const request = getProductsData()
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
