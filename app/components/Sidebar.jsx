import React from 'react';

import styles from '../styles/components/sidebar';


class Sidebar extends React.Component {
  render() {
    const { utilsOpen } = this.props;
    return (
      <div className={utilsOpen ? styles.visible : styles.sidebar}>
        <div className={styles.separator} />
        <div className={styles.content}>
          <div className={styles.row}>
            Reset scene
          </div>
        </div>
      </div>
    );
  }
}


export default Sidebar;
