import React from 'react';

import styles from 'styles/components/sidebar';


class Sidebar extends React.Component {
  render() {
    return (
      <div className={styles.sidebar}>
        <div className={styles.section}>
          <div className={styles.title}>
            Mode
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>
            Colour
          </div>
        </div>
      </div>
    );
  }
}


export default Sidebar;
