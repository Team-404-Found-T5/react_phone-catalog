import React from 'react';
import type { FormEvent, RefObject } from 'react';
import styles from './SearchModal.module.scss';
import type { Product } from '../../types/product';
import { SearchFormContent } from '../SearchFormContent/SearchFormContent';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchBy: string;
  setSearchBy: (val: string) => void;
  isSearching: boolean;
  dataSearched: Product[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onSearchAll: () => void;
  modalInputRef: RefObject<HTMLInputElement | null>;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchBy,
  setSearchBy,
  isSearching,
  dataSearched,
  onSubmit,
  onSearchAll,
  modalInputRef,
}) => {
  return (
    <div
      role="presentation"
      className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlayOpen : ''}`}
      onClick={onClose}
      onKeyDown={event => {
        if (event.key === 'Escape') onClose();
      }}
    >
      <div
        role="presentation"
        className={`${styles.searchModalDiv} ${isOpen ? styles.searchModalOpen : ''}`}
        onClick={event => event.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3>Search Catalog</h3>
          <button
            type="button"
            className={styles.closeModalBtn}
            onClick={onClose}
            aria-label="Close search"
          >
            ✕
          </button>
        </div>

        <div className={styles.searchGroup2}>
          <SearchFormContent
            inputRef={modalInputRef}
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            isSearching={isSearching}
            dataSearched={dataSearched}
            onSubmit={onSubmit}
            onSearchAll={onSearchAll}
            onKeyDown={event => {
              if (event.key === 'Escape') onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};
