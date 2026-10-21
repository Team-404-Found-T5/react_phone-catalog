import React from 'react';
import styles from './ClearAllbtn.module.scss';

interface Props {
  onClear: () => void;
  className?: string;
  label?: string;
}

export const ClearAllbtn: React.FC<Props> = ({
  onClear,
  className,
  label = 'Clear all',
}) => {
  return (
    <button
      type="button"
      className={className || styles.clearBtn}
      onClick={onClear}
    >
      {label}
    </button>
  );
};
