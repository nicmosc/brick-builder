import React from 'react';

import styles from 'styles/components/button';


class Button extends React.Component {
  render() {
    const { text, icon, active, onClick } = this.props;
    return (
      <div className={active ? styles.active : styles.button} onClick={onClick}>
        <div className={styles.icon}>
          <i className={`ion-${icon}`} />
        </div>
        <div className={styles.text}>
          {text}
        </div>
      </div>
    );
  }
}


export default Button;
