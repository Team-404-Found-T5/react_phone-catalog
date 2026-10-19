import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProductsPage } from '../../api/products';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { NotFoundPage } from '../NotFoundPage';
import type { Product, ProductCategory } from '../../types/product';
import styles from './CatalogPage.module.scss';

const categories: Record<
  ProductCategory | 'all',
  { title: string; plural: string }
> = {
  all: { title: 'All products', plural: 'products' },
  phones: { title: 'Phones', plural: 'phones' },
  tablets: { title: 'Tablets', plural: 'tablets' },
  accessories: { title: 'Accessories', plural: 'accessories' },
};

const isProductCategory = (
  category: string | undefined,
): category is ProductCategory =>
  category === 'phones' || category === 'tablets' || category === 'accessories';

const PRODUCTS_PER_PAGE = 16;

export const CatalogPage: React.FC = () => {
  const { category: categoryParam } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q')?.trim() ?? '';
  const [products, setProducts] = useState<Product[]>([]);
  const [pageSelection, setPageSelection] = useState<{
    category: string | null;
    page: number;
  }>({ category: null, page: 1 });
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const paginationTop = useRef<number | null>(null);

  const category =
    categoryParam === 'catalog'
      ? 'all'
      : isProductCategory(categoryParam)
        ? categoryParam
        : null;
  const currentPage =
    pageSelection.category === `${category}:${searchTerm}`
      ? pageSelection.page
      : 1;

  useEffect(() => {
    if (!category) {
      return;
    }
    let isActive = true;

    setIsLoading(true);
    setError('');

    getProductsPage(category, currentPage, PRODUCTS_PER_PAGE, searchTerm)
      .then(({ products: pageProducts, total, totalPages: pages }) => {
        if (isActive) {
          setProducts(pageProducts);
          setTotalProducts(total);
          setTotalPages(pages);
        }
      })
      .catch((loadError: unknown) => {
        if (isActive) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Failed to load products',
          );
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [category, currentPage, searchTerm]);

  useLayoutEffect(() => {
    if (isLoading || paginationTop.current === null) {
      return;
    }

    const pagination = document.querySelector('nav[aria-label="Pagination"]');

    if (pagination) {
      window.scrollBy(
        0,
        pagination.getBoundingClientRect().top - paginationTop.current,
      );
    }

    paginationTop.current = null;
  }, [isLoading]);

  if (!category) {
    return <NotFoundPage />;
  }

  if (isLoading && products.length === 0) {
    return (
      <section className={styles.container}>
        <Loader />
      </section>
    );
  }

  const { title, plural } = categories[category];

  return (
    <section className={styles.container} aria-busy={isLoading}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <Loader />
        </div>
      )}

      <Breadcrumbs
        items={[{ label: category === 'all' ? 'Catalog' : title }]}
      />

      <h1 className={styles.title}>
        {category === 'phones' ? 'Mobile phones' : title}
      </h1>
      <p className={styles.count}>
        {searchTerm
          ? `${totalProducts} ${plural} found for “${searchTerm}”`
          : `${totalProducts} ${plural}`}
      </p>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {!error && !isLoading && products.length === 0 && (
        <p className={styles.empty}>
          {searchTerm
            ? `No products found for “${searchTerm}”.`
            : 'There are no products in this category.'}
        </p>
      )}

      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard key={product.itemId} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={page => {
          paginationTop.current =
            document
              .querySelector('nav[aria-label="Pagination"]')
              ?.getBoundingClientRect().top ?? null;
          setIsLoading(true);
          setPageSelection({ category: `${category}:${searchTerm}`, page });
        }}
        disabled={isLoading}
      />
    </section>
  );
};

export default CatalogPage;
