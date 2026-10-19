import React, { useEffect, useRef, useState } from 'react';
import styles from './SearchInput.module.scss';
import type { FormEvent } from 'react';
import type { Product } from '../../types/product';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchProducts } from '../../api/products';
import { SearchModal } from '../SearchModal/SearchModal';
import { SearchFormContent } from '../SearchFormContent/SearchFormContent';

export const SearchInput: React.FC = () => {
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const modalInputRef = useRef<HTMLInputElement>(null);

  const [searchBy, setSearchBy] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSearched, setDataSearched] = useState<Product[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const delaySearchInp = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSearchBy('');
    setIsSearching(false);
    setIsModalOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800 && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        modalInputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

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

    setIsSearching(true);

    delaySearchInp.current = setTimeout(() => {
      searchProducts(searchBy, 8)
        .then(products => {
          if (!isCancelled) setDataSearched(products);
        })
        .catch((error: unknown) => {
          if (!isCancelled) console.error('Failed to search products:', error);
        })
        .finally(() => {
          if (!isCancelled) setIsSearching(false);
        });
    }, 200);

    return () => {
      if (delaySearchInp.current) clearTimeout(delaySearchInp.current);
      isCancelled = true;
    };
  }, [searchBy]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchBy('');
    setDataSearched([]);
  };

  const executeSearch = () => {
    const query = searchBy.trim();
    if (!query) return;

    setIsSearching(false);
    setIsModalOpen(false);
    setSearchBy('');
    setDataSearched([]);
    navigate(`/catalog?q=${encodeURIComponent(query)}`);
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    executeSearch();
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.lupaBtn}
        type="button"
        aria-label="Open search modal"
      >
        <img className={styles.lupa} src="public/img/lupa.png" alt="Search" />
        <span>Search</span>
      </button>

      <div className={styles.searchGroup}>
        <div className={styles.searchGroup}>
          <SearchFormContent
            inputRef={desktopInputRef}
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            isSearching={isSearching}
            dataSearched={dataSearched}
            onSubmit={submitSearch}
            onSearchAll={executeSearch}
            onKeyDown={event => {
              if (event.key === 'Escape') {
                desktopInputRef.current?.blur();
              }
            }}
          />
        </div>
      </div>

      <SearchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        isSearching={isSearching}
        dataSearched={dataSearched}
        onSubmit={submitSearch}
        onSearchAll={executeSearch}
        modalInputRef={modalInputRef}
      />
    </>
  );
};

export default SearchInput;
