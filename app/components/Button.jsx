import React from 'react';

import styles from 'styles/components/button';


const Button = ({ text, icon, active, onClick }) => (
  <div className={active ? styles.active : styles.button} onClick={onClick}>
    <div className={styles.icon}>
      <i className={`ion-${icon}`} />
    </div>
    <div className={styles.text}>
      {text}
    </div>
  </div>
);


export default Button;
