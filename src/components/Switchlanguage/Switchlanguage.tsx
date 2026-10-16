import React from 'react';
import styles from './Switchlanguage.module.scss';

export const Switchlanguage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/*

        если хочешь то можешь попробовать сделать через инпуты тайп
        радио что бы было выбрано как минимум одно значение, по умолчанию
        это будет украинский и соответсвенно у него уже есть атрибут чекед.

        так же можешь попробовать через обычные кнопки, смотри что тебе ближе)

      */}

      <div className={styles.langBtnsGroup}>
        <label htmlFor="#">
          Українська
          <input type="radio" name="lang" value="ukr" checked />
        </label>
        <label htmlFor="#">
          English
          <input type="radio" name="lang" value="eng" />
        </label>
      </div>
    </div>
  );
};

export default Switchlanguage;
