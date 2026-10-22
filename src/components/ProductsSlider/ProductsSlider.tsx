import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import type { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { playClick4Sound } from '../../modules/PixelHearts/sounds';

const PRODUCTS_PER_SLIDE = 4;

type Props = {
  title: string;
  products: Product[];
  isLoading?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  isLoading = false,
}) => {
  const productsListRef = useRef<HTMLDivElement>(null);
  const pendingScrolls = useRef(0);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_SLIDE);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const getStep = (list: HTMLDivElement) => {
    const firstCard = list.firstElementChild;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 0;
    const listStyles = window.getComputedStyle(list);
    const gap = Number.parseFloat(listStyles.columnGap || listStyles.gap) || 0;

    return PRODUCTS_PER_SLIDE * (cardWidth + gap);
  };

  const updateScrollState = useCallback(() => {
    const list = productsListRef.current;

    if (!list) {
      return;
    }

    setCanScrollBack(list.scrollLeft > 0);
    setCanScrollForward(
      list.scrollLeft + list.clientWidth < list.scrollWidth - 1,
    );
  }, []);

  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_SLIDE);
    pendingScrolls.current = 0;

    if (productsListRef.current) {
      productsListRef.current.scrollLeft = 0;
    }
  }, [products]);

  useEffect(() => {
    const list = productsListRef.current;
    const scrolls = pendingScrolls.current;

    if (list && scrolls > 0) {
      pendingScrolls.current = 0;

      list.scrollBy({
        left: scrolls * getStep(list),
        behavior: 'smooth',
      });
    }

    updateScrollState();
  }, [visibleCount, products, isLoading, updateScrollState]);

  const showNextProducts = () => {
    const list = productsListRef.current;

    if (!list) {
      return;
    }

    if (visibleCount < products.length) {
      pendingScrolls.current += 1;
      setVisibleCount(current =>
        Math.min(current + PRODUCTS_PER_SLIDE, products.length),
      );

      return;
    }

    list.scrollBy({ left: getStep(list), behavior: 'smooth' });
  };

  const showPreviousProducts = () => {
    const list = productsListRef.current;

    if (!list) {
      return;
    }

    list.scrollBy({ left: -getStep(list), behavior: 'smooth' });
  };

  const hasMoreToLoad = visibleCount < products.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.controls}>
          <button
            className={styles.prevButton}
            type="button"
            aria-label="Previous products"
            disabled={!canScrollBack}
            onClick={() => {
              playClick4Sound()
              showPreviousProducts()}}
          >
            <img
              src="img/ArrowLeft-active.svg"
              alt=""
              className={styles.arrowIcon}
            />
          </button>
          <button
            className={styles.nextButton}
            type="button"
            aria-label="Next products"
            disabled={isLoading || (!hasMoreToLoad && !canScrollForward)}
            onClick={() => {
              playClick4Sound()
              showNextProducts()}}
          >
            <img
              src="img/ArrowRight-active.svg"
              alt=""
              className={styles.arrowIcon}
            />
          </button>
        </div>
      </div>

      <div
        className={styles.productsList}
        ref={productsListRef}
        onScroll={updateScrollState}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <ProductCardSkeleton count={PRODUCTS_PER_SLIDE} />
        ) : (
          products
            .slice(0, visibleCount)
            .map(product => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </div>
  );
};

export default ProductsSlider;
