import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { playBoxCloseSound } from '../../modules/PixelHearts/sounds';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    playBoxCloseSound();

    const segments = pathname.split('/').filter(Boolean);
    const parentPath = '/' + segments.slice(0, -1).join('/');

    navigate(parentPath);
  };

  return (
    <button type="button" className={styles.button} onClick={handleClick}>
      <img src="img/ArrowLeft-active.svg" alt="" />
      Back
    </button>
  );
};

export default BackButton;
