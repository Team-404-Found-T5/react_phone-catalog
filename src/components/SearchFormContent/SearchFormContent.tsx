import React from 'react';
import type { FormEvent, RefObject } from 'react';
import type { Product } from '../../types/product';
import { SearchDropdown } from '../SearchDropdown';
import styles from './SearchFormContent.module.scss';

interface SearchFormContentProps {
  inputRef: RefObject<HTMLInputElement | null>;
  searchBy: string;
  setSearchBy: (val: string) => void;
  isSearching: boolean;
  dataSearched: Product[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSearchAll: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchFormContent: React.FC<SearchFormContentProps> = ({
  inputRef,
  searchBy,
  setSearchBy,
  isSearching,
  dataSearched,
  onSubmit,
  onSearchAll,
  onKeyDown,
}) => {
  return (
    <>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            onChange={event => setSearchBy(event.target.value)}
            value={searchBy}
            placeholder="Search products..."
            aria-label="Search products"
            className={styles.headeSearchInp}
            type="text"
            onKeyDown={onKeyDown}
          />
          {searchBy && (
            <button
              type="button"
              className={styles.clearSearchButton}
              aria-label="Clear search"
              onMouseDown={event => event.preventDefault()}
              onClick={() => {
                setSearchBy('');
                inputRef.current?.focus();
              }}
            >
              ×
            </button>
          )}
        </div>
      </form>
      <SearchDropdown
        searchBy={searchBy}
        isSearching={isSearching}
        dataSearched={dataSearched}
        onSearchAll={onSearchAll}
      />
    </>
  );
};
