import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { playBoxCloseSound } from '../../modules/PixelHearts/sounds';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => {
        playBoxCloseSound()
        navigate(-1)}}
    >
      <img src="img/ArrowLeft-active.svg" alt="" />
      Back
    </button>
  );
};

export default BackButton;
