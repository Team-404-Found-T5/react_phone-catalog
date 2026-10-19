import React from 'react';
import styles from './SwitchBgButtons.module.scss';

type Prop = {
  theme: string;
  setTheme: (param: string) => void;
  variant?: 'modal';
}

export const SwitchBgButtons: React.FC<Prop> = ({ variant, theme, setTheme  }) => {

  return (
    <label className={variant ? `${styles.do} ${styles.themeSwitch}` : styles.themeSwitch}>
      <input
        className={styles.input}
        type="checkbox"
        role="switch"
        aria-label="Dark theme"
        checked={theme === 'dark'}
        onChange={event => setTheme(event.target.checked ? 'dark' : 'light')}
      />

      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb}>{theme === 'dark' ? '🌙' : '☀️'}</span>
      </span>
    </label>
  );
};

export default SwitchBgButtons;
