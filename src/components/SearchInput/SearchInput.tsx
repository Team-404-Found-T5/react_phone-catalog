import React, { useEffect, useRef, useState } from 'react';
import styles from './SearchInput.module.scss';
import type { FormEvent } from 'react';
import type { Product } from '../../types/product';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { searchProducts } from '../../api/products';

export const SearchInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchBy, setSearchBy] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dataSearched, setDataSearched] = useState<Product[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const delaySearchInp = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSearchBy('');
    setIsFocused(false);
    setIsSearching(false);
    inputRef.current?.blur();
  }, [location.pathname]);

  useEffect(() => {
    let isCancelled = false;

    if (delaySearchInp.current) {
      clearTimeout(delaySearchInp.current);
    }

    if (!searchBy.trim()) {
      setDataSearched([]);
      setIsSearching(false);

      return;
    }

    setDataSearched([]);
    setIsSearching(true);

    delaySearchInp.current = setTimeout(() => {
      searchProducts(searchBy, 8)
        .then(products => {
          if (!isCancelled) {
            setDataSearched(products);
          }
        })
        .catch((error: unknown) => {
          if (!isCancelled) {
            console.error('Failed to search products:', error);
          }
        })
        .finally(() => {
          if (!isCancelled) {
            setIsSearching(false);
          }
        });
    }, 100);

    return () => {
      if (delaySearchInp.current) {
        clearTimeout(delaySearchInp.current);
      }

      isCancelled = true;
    };
  }, [searchBy]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchBy.trim();

    if (!query) {
      inputRef.current?.focus();

      return;
    }

    setIsFocused(false);
    setIsSearching(false);
    setSearchBy('');
    setDataSearched([]);
    navigate(`/catalog?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className={styles.searchGroup}>
      <form className={styles.searchForm} onSubmit={submitSearch}>
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            onChange={event => setSearchBy(event.target.value)}
            value={searchBy}
            placeholder="Search products..."
            aria-label="Search products"
            className={styles.headeSearchInp}
            type="text"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={event => {
              if (event.key === 'Escape') {
                setIsFocused(false);
                inputRef.current?.blur();
              }
            }}
          />
          {searchBy && (
            <button
              type="button"
              className={styles.clearSearchButton}
              aria-label="Clear search"
              onMouseDown={event => event.preventDefault()}
              onClick={() => {
                setSearchBy('');
                setDataSearched([]);
                inputRef.current?.focus();
              }}
            >
              ×
            </button>
          )}
        </div>
      </form>
      {isFocused && searchBy.trim() && (
        <ul className={styles.listOfSearches}>
          {isSearching ? (
            <li className={styles.searchStatus} role="status">
              Searching products...
            </li>
          ) : (
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
                    alt=""
                  />
                  <span>{product.name}</span>
                </NavLink>
              </li>
            ))
          )}
          <li className={styles.searchAllItem}>
            <button
              type="button"
              className={styles.searchAllButton}
              onMouseDown={event => event.preventDefault()}
              onClick={() => {
                setIsFocused(false);
                navigate(`/catalog?q=${encodeURIComponent(searchBy.trim())}`);
              }}
            >
              Search all products for “{searchBy.trim()}”
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
