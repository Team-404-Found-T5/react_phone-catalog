import { Product } from '../types/product';
import { ProductCategory, ProductDetails } from '../types/product';

const BASE_URL = '/api';

export type ProductsPage = {
  products: Product[];
  total: number;
  totalPages: number;
};

const visibleProductsCache = new Map<string, Product>();
const productsPagesCache = new Map<string, ProductsPage>();
const productsPagesRequests = new Map<string, Promise<ProductsPage>>();
const detailsCache = new Map<ProductCategory, ProductDetails[]>();
const detailsRequests = new Map<ProductCategory, Promise<ProductDetails[]>>();

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchData<T>(url: string): Promise<T> {
  return delay(500)
    .then(() => fetch(url))
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${url}, status: ${response.status}`);
      }

      return response.json() as Promise<T>;
    });
}

export const getProducts = (): Promise<Product[]> =>
  fetchData<Product[]>(`${BASE_URL}/products.json`);

export const cacheVisibleProducts = (products: Product[]): void => {
  products.forEach(product => {
    visibleProductsCache.set(product.itemId, product);
  });
};

export const getProductsPage = (
  category: string,
  page: number,
  perPage = 8,
): Promise<ProductsPage> => {
  if (!category) {
    return Promise.reject(new Error('Category is required'));
  }

  if (!Number.isInteger(page) || page < 1) {
    return Promise.reject(new Error('Page must be a positive integer'));
  }

  if (!Number.isInteger(perPage) || perPage < 1) {
    return Promise.reject(
      new Error('Per-page value must be a positive integer'),
    );
  }

  const cacheKey = `${category}:${page}:${perPage}`;
  const cachedPage = productsPagesCache.get(cacheKey);

  if (cachedPage) {
    return Promise.resolve(cachedPage);
  }

  const pendingRequest = productsPagesRequests.get(cacheKey);

  if (pendingRequest) {
    return pendingRequest;
  }

  const startIndex = (page - 1) * perPage;
  const request = getProducts()
    .then(products => {
      const categoryProducts = products.filter(
        product => product.category === category,
      );
      const total = categoryProducts.length;
      const totalPages = Math.ceil(total / perPage);
      const pageProducts = categoryProducts.slice(
        startIndex,
        startIndex + perPage,
      );

      cacheVisibleProducts(pageProducts);
      const productsPage = {
        products: pageProducts,
        total,
        totalPages,
      };

      productsPagesCache.set(cacheKey, productsPage);

      return productsPage;
    })
    .catch(error => {
      productsPagesRequests.delete(cacheKey);
      throw error;
    });

  productsPagesRequests.set(cacheKey, request);

  return request;
};

export const getProductByItemId = (
  itemId: string,
): Promise<Product | undefined> => {
  const cachedProduct = visibleProductsCache.get(itemId);

  if (cachedProduct) {
    return Promise.resolve(cachedProduct);
  }

  return getProducts().then(products =>
    products.find(product => product.itemId === itemId),
  );
};

const categoryEndpoints: Record<ProductCategory, string> = {
  phones: `${BASE_URL}/phones.json`,
  tablets: `${BASE_URL}/tablets.json`,
  accessories: `${BASE_URL}/accessories.json`,
};

export const getProductDetails = (
  category: ProductCategory,
): Promise<ProductDetails[]> => {
  const cachedProducts = detailsCache.get(category);

  if (cachedProducts) {
    return Promise.resolve(cachedProducts);
  }

  const pendingRequest = detailsRequests.get(category);

  if (pendingRequest) {
    return pendingRequest;
  }

  const request = fetchData<ProductDetails[]>(categoryEndpoints[category])
    .then(products => {
      detailsCache.set(category, products);

      return products;
    })
    .catch(error => {
      detailsRequests.delete(category);
      throw error;
    });

  detailsRequests.set(category, request);

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

export type VariantChange = {
  color?: string;
  capacity?: string;
};

export const getAvailableColors = (products: ProductDetails[]): string[] =>
  Array.from(new Set(products.map(product => product.color)));

export const getAvailableCapacities = (products: ProductDetails[]): string[] =>
  Array.from(new Set(products.map(product => product.capacity)));

export const findProductVariant = (
  products: ProductDetails[],
  currentProduct: ProductDetails,
  change: VariantChange,
): ProductDetails | undefined => {
  const targetColor = change.color ?? currentProduct.color;
  const targetCapacity = change.capacity ?? currentProduct.capacity;

  const exactMatch = products.find(
    product =>
      product.color === targetColor && product.capacity === targetCapacity,
  );

  if (exactMatch) {
    return exactMatch;
  }

  if (change.color) {
    return products.find(product => product.color === targetColor);
  }

  if (change.capacity) {
    return products.find(product => product.capacity === targetCapacity);
  }

  return undefined;
};

export const getSuggestedProducts = (currentId: string): Promise<Product[]> =>
  delay(300).then(() =>
    getProducts()
      // рандомні 4, крім поточного
      .then(all =>
        all
          .filter(p => p.itemId !== currentId)
          .sort(() => Math.random() - 0.5)
          .slice(0, 4),
      ),
  );
