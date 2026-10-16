import React from 'react';
import styles from './Pagination.module.scss';
import { playClickSound } from '../../modules/PixelHearts/sounds';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

const getPageItems = (currentPage: number, totalPages: number): number[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  let pages: number[];

  if (currentPage <= 3) {
    pages = [1, 2, 3, 4, 5, totalPages - 1, totalPages];
  } else if (currentPage >= totalPages - 3) {
    pages = [
      1,
      2,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    pages = [
      1,
      2,
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [...new Set(pages)];
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}) => {
  if (totalPages < 1) {
    return null;
  }

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const pageItems = getPageItems(safeCurrentPage, totalPages);

  return (
    <nav className={styles.container} aria-label="Pagination">
      <button
        type="button"
        className={styles.arrow}
        aria-label="Previous page"
        disabled={disabled || safeCurrentPage === 1}
        onClick={() => {
          playClickSound();
          onPageChange(safeCurrentPage - 1);
        }}
      >
        ‹
      </button>

      <div className={styles.pages}>
        {pageItems.map(page => (
          <button
            type="button"
            className={`${styles.page} ${
              page === safeCurrentPage ? styles.active : ''
            }`}
            key={page}
            aria-current={page === safeCurrentPage ? 'page' : undefined}
            disabled={disabled}
            onClick={() => {
              playClickSound();
              onPageChange(page);
            }}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.arrow}
        aria-label="Next page"
        disabled={disabled || safeCurrentPage === totalPages}
        onClick={() => {
          playClickSound();
          onPageChange(safeCurrentPage + 1);
        }}
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;
