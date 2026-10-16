import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './HeaderAction.module.scss';

interface HeaderActionProps {
  to: string;
  label: string;
  icon: ReactNode;
  count: number;
<<<<<<< HEAD
  onClick?: () => void;
=======
  variant?: 'modal';
  closeModal?: () => void;
>>>>>>> upstream/develop
}

export const HeaderAction: React.FC<HeaderActionProps> = ({
  to,
  label,
  icon,
  count,
<<<<<<< HEAD
  onClick,
=======
  variant,
  closeModal,
>>>>>>> upstream/develop
}) => {
  return (
    <NavLink
      onClick={onClick}
      to={to}
      onClick={closeModal}
      aria-label={label}
      className={({ isActive }) =>
        classNames(styles.link, { [styles.active]: isActive }, styles[`item-${variant}`])
      }
    >
      {icon}
      {count > 0 && <span className={styles.counter}>{count}</span>}
    </NavLink>
  );
};

export default HeaderAction;
