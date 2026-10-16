import React from 'react';
import styles from './SwitchBgButtons.module.scss';

export const SwitchBgButtons: React.FC = () => {

  {/*

    якщо хочеш можеш спробувати зробити це через інпут тайп радіо що
    б було обрано щонайменше один параметр, за замовченням це буде
    біла тема і відповідно у нього є той самий атрибут чекед
    + можеш додати якесь пояснення що тут можна поміняти тему

    так само можеш спробувати через звичайні кнопки, дивись що тобі ближче)

*/}

  return (
    <div className={styles.bgButtonsGroup}>
      <label htmlFor="#">
        Light Theme
        <input type="radio" name="bg" value="light" checked />
      </label>
      <label htmlFor="#">
        Dark theme
        <input type="radio" name="bg" value="dark" />
      </label>
    </div>
  );
};

export default SwitchBgButtons;
