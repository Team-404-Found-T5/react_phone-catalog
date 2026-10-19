import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SortType } from '../../api/products';
import styles from './Sort.module.scss';

interface Option<T extends string> {
  value: T;
  label: string;
}

const SORT_OPTIONS: Option<SortType>[] = [
  { value: 'age', label: 'Newest' },
  { value: 'price', label: 'Cheapest' },
  { value: 'price-desc', label: 'Expensive' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'screen', label: 'Screen size' },
  { value: 'capacity', label: 'Capacity' },
  { value: 'ram', label: 'RAM' },
];

const PER_PAGE_OPTIONS: Option<string>[] = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

const CAPACITY_OPTIONS: Option<string>[] = [
  { value: '', label: 'All' },
  { value: '64GB', label: '64 GB' },
  { value: '128GB', label: '128 GB' },
  { value: '256GB', label: '256 GB' },
  { value: '512GB', label: '512 GB' },
  { value: '1TB', label: '1 TB' },
];

const COLOR_OPTIONS: Option<string>[] = [
  { value: '', label: 'All' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'gold', label: 'Gold' },
  { value: 'silver', label: 'Silver' },
  { value: 'spacegray', label: 'Space Gray' },
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'purple', label: 'Purple' },
];

interface SelectProps<T extends string> {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
}

const CustomSelect = <T extends string>({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find(option => option.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={styles.selectWrapper} ref={dropdownRef}>
        <button
          type="button"
          className={`${styles.trigger} ${isOpen ? styles.triggerActive : ''}`}
          onClick={() => !disabled && setIsOpen(prev => !prev)}
          disabled={disabled}
        >
          <span>{selectedOption.label}</span>
          <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`} />
        </button>

        {isOpen && (
          <ul className={styles.dropdown} role="listbox">
            {options.map(option => (
              <li
                key={option.value}
                className={`${styles.option} ${
                  option.value === value ? styles.optionSelected : ''
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

interface SortProps {
  disabled?: boolean;
}

export const Sort: React.FC<SortProps> = ({ disabled = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = searchParams.get('filtersOpen') === 'true';

  const setIsOpen = (open: boolean) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (open) {
        next.set('filtersOpen', 'true');
      } else {
        next.delete('filtersOpen');
      }
      return next;
    });
  };

  // Чернетковий стейт для всіх опцій фільтрації та сортування
  const [draftSort, setDraftSort] = useState<SortType>(
    (searchParams.get('sort') as SortType) || 'age',
  );
  const [draftPerPage, setDraftPerPage] = useState(
    searchParams.get('perPage') || '16',
  );
  const [draftCapacity, setDraftCapacity] = useState(
    searchParams.get('capacity') || '',
  );
  const [draftColor, setDraftColor] = useState(
    searchParams.get('color') || '',
  );
  const [draftMinPrice, setDraftMinPrice] = useState(
    searchParams.get('minPrice') || '',
  );
  const [draftMaxPrice, setDraftMaxPrice] = useState(
    searchParams.get('maxPrice') || '',
  );

  useEffect(() => {
    setDraftSort((searchParams.get('sort') as SortType) || 'age');
    setDraftPerPage(searchParams.get('perPage') || '16');
    setDraftCapacity(searchParams.get('capacity') || '');
    setDraftColor(searchParams.get('color') || '');
    setDraftMinPrice(searchParams.get('minPrice') || '');
    setDraftMaxPrice(searchParams.get('maxPrice') || '');
  }, [searchParams]);

  const handleApply = () => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);

      if (draftSort) next.set('sort', draftSort);
      else next.delete('sort');

      if (draftPerPage) next.set('perPage', draftPerPage);
      else next.delete('perPage');

      if (draftCapacity) next.set('capacity', draftCapacity);
      else next.delete('capacity');

      if (draftColor) next.set('color', draftColor);
      else next.delete('color');

      if (draftMinPrice) next.set('minPrice', draftMinPrice);
      else next.delete('minPrice');

      if (draftMaxPrice) next.set('maxPrice', draftMaxPrice);
      else next.delete('maxPrice');

      next.set('page', '1');
      next.set('filtersOpen', 'true');
      return next;
    });
  };

  return (
    <div className={styles.wrapper}>
      {!isOpen && (
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={() => setIsOpen(true)}
        >
          <span>Filters</span>
          <span className={styles.arrow} />
        </button>
      )}

      <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sortGroup}>
          <CustomSelect
            label="Sort by"
            value={draftSort}
            options={SORT_OPTIONS}
            onChange={val => setDraftSort(val)}
            disabled={disabled}
          />
        </div>

        <div className={styles.filterGroup}>
          <CustomSelect
            label="Capacity"
            value={draftCapacity}
            options={CAPACITY_OPTIONS}
            onChange={val => setDraftCapacity(val)}
            disabled={disabled}
          />
        </div>

        <div className={styles.filterGroup}>
          <CustomSelect
            label="Color"
            value={draftColor}
            options={COLOR_OPTIONS}
            onChange={val => setDraftColor(val)}
            disabled={disabled}
          />
        </div>

        <div className={styles.priceGroup}>
          <label className={styles.label}>Price range ($)</label>
          <div className={styles.priceInputs}>
            <input
              type="number"
              className={styles.priceInput}
              placeholder="from"
              value={draftMinPrice}
              disabled={disabled}
              onChange={e => setDraftMinPrice(e.target.value)}
            />
            <span className={styles.priceSeparator}>—</span>
            <input
              type="number"
              className={styles.priceInput}
              placeholder="to"
              value={draftMaxPrice}
              disabled={disabled}
              onChange={e => setDraftMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.perPageGroup}>
          <CustomSelect
            label="Items on page"
            value={draftPerPage}
            options={PER_PAGE_OPTIONS}
            onChange={val => setDraftPerPage(val)}
            disabled={disabled}
          />
        </div>

        <div className={styles.applyGroup}>
          <button
            type="button"
            className={styles.applyBtn}
            onClick={handleApply}
            disabled={disabled}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
