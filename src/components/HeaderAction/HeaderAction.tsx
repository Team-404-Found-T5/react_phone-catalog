import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './HeaderAction.module.scss';

interface HeaderActionProps {
  to: string;
  label: string;
  icon: ReactNode;
  count: number;
}

export const HeaderAction: React.FC<HeaderActionProps> = ({
  to,
  label,
  icon,
  count,
}) => {
  return (
    <NavLink
      to={to}
      aria-label={label}
      className={({ isActive }) =>
        classNames(styles.link, { [styles.active]: isActive })
      }
    >
      {icon}
      {count > 0 && <span className={styles.counter}>{count}</span>}
    </NavLink>
  );
};

export default HeaderAction;
