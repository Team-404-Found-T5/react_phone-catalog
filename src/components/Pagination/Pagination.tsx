import React from 'react';
import styles from './Pagination.module.scss';
import { playClickSound } from '../../modules/PixelHearts/sounds';

type PageItem = number | 'ellipsis';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

const getPageItems = (currentPage: number, totalPages: number): PageItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5, 'ellipsis', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      2,
      'ellipsis',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    'ellipsis',
    totalPages - 1,
    totalPages,
  ];
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
          playClickSound()
          onPageChange(safeCurrentPage - 1)}}
      >
        ‹
      </button>

      {pageItems.map((item, index) =>
        item === 'ellipsis' ? (
          <button
            type="button"
            className={styles.page}
            key={`ellipsis-${index}`}
            disabled
            aria-hidden="true"
          >
            ...
          </button>
        ) : (
          <button
            type="button"
            className={`${styles.page} ${
              item === safeCurrentPage ? styles.active : ''
            }`}
            key={item}
            aria-current={item === safeCurrentPage ? 'page' : undefined}
            disabled={disabled}
            onClick={() => {
              playClickSound()
              onPageChange(item)}}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        className={styles.arrow}
        aria-label="Next page"
        disabled={disabled || safeCurrentPage === totalPages}
        onClick={() => {
          playClickSound()
          onPageChange(safeCurrentPage + 1)}}
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;
