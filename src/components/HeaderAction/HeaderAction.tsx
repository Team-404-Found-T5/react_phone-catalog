import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './HeaderAction.module.scss';

interface HeaderActionProps {
  to: string;
  label: string;
  icon: ReactNode;
  count: number;
  variant?: 'modal';
  closeModal?: () => void;
  playBoxOpenSound?: () => void;
}

export const HeaderAction: React.FC<HeaderActionProps> = ({
  to,
  label,
  icon,
  count,
  variant,
  closeModal,
  playBoxOpenSound,
}) => {
  return (
    <NavLink
      to={to}
      onClick={() => {
        closeModal?.();
        playBoxOpenSound?.();
      }}
      aria-label={label}
      className={({ isActive }) =>
        classNames(
          styles.link,
          { [styles.active]: isActive },
          styles[`item-${variant}`],
        )
      }
    >
      <span className={styles.iconWrapper}>
        {icon}
        {count > 0 && <span className={styles.counter}>{count}</span>}
      </span>
    </NavLink>
  );
};

export default HeaderAction;
