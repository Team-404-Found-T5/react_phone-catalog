import React from 'react';
import { NavLink } from 'react-router-dom';
import type { Product } from '../../types/product';
import styles from './SearchDropdown.module.scss';

interface SearchDropdownProps {
  searchBy: string;
  isSearching: boolean;
  dataSearched: Product[];
  onSearchAll: () => void;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  searchBy,
  isSearching,
  dataSearched,
  onSearchAll,
}) => {
  if (!searchBy.trim()) return null;

  return (
    <ul className={styles.listOfSearches}>
      {isSearching ? (
        <li className={styles.searchStatus} role="status">
          Searching products...
        </li>
      ) : dataSearched.length > 0 ? (
        dataSearched.map(product => (
          <li className={styles.searchedItem} key={product.itemId}>
            <NavLink
              className={styles.linkToProduct}
              to={`/${product.category}/${product.itemId}`}
              onMouseDown={event => event.preventDefault()}
            >
              <img
                className={styles.SearchedProductImage}
                src={product.image}
                alt={product.name}
              />
              <span>{product.name}</span>
            </NavLink>
          </li>
        ))
      ) : (
        <li className={styles.searchStatus}>No products found</li>
      )}
      <li className={styles.searchAllItem}>
        <button
          type="button"
          className={styles.searchAllButton}
          onMouseDown={event => event.preventDefault()}
          onClick={onSearchAll}
        >
          Search all products for “{searchBy.trim()}”
        </button>
      </li>
    </ul>
  );
};
