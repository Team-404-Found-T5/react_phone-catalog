import React, { useState, useEffect } from 'react';
import styles from './SwitchBgButtons.module.scss';

export const SwitchBgButtons: React.FC = () => {
  {
    /*перемикання теми*/
  }
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      return 'dark';
    }

    return 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <label className={styles.themeSwitch}>
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
