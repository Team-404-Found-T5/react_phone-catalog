import styles from './CompareFilters.module.scss';
import { Filter } from '../../types/compare';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'phones', label: 'Phones' },
  { value: 'tablets', label: 'Tablets' },
  { value: 'accessories', label: 'Accessories' },
];

type Props = {
  filter: Filter;
  counts: Record<Filter, number>;
  onlyDifferences: boolean;
  canCompareDifferences: boolean;
  onFilterChange: (filter: Filter) => void;
  onDifferencesChange: (value: boolean) => void;
};

export const CompareFilters = ({
  filter,
  counts,
  onlyDifferences,
  canCompareDifferences,
  onFilterChange,
  onDifferencesChange,
}: Props) => (
  <div className={styles.controls}>
    <div className={styles.filters}>
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={`${styles.filterBtn} ${
            filter === value ? styles.filterBtnActive : ''
          }`}
          onClick={() => onFilterChange(value)}
        >
          {label} ({counts[value]})
        </button>
      ))}
    </div>

    <label className={styles.diffToggle}>
      <input
        type="checkbox"
        checked={onlyDifferences}
        disabled={!canCompareDifferences}
        onChange={event => onDifferencesChange(event.target.checked)}
      />
      Show only differences
    </label>
  </div>
);
