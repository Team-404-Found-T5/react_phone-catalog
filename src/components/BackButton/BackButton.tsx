import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => navigate(-1)}
    >
      <img src="img/ArrowLeft.svg" alt=""/>
      Back
    </button>
  );
};

export default BackButton;
