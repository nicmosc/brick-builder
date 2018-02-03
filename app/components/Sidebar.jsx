import React from 'react';

import styles from '../styles/components/sidebar';


class Sidebar extends React.Component {
  render() {
    const { utilsOpen } = this.props;
    return (
      <div className={utilsOpen ? styles.visible : styles.sidebar}>
        <div className={styles.content}>
          <div className={styles.row}>
            <i className="ion-trash-a" />
            <span>Reset scene</span>
          </div>
          <div className={styles.row}>
            <i className="ion-log-out" />
            <span>Export scene</span>
          </div>
          <div className={styles.row}>
            <i className="ion-log-in" />
            <span>Import scene</span>
          </div>
        </div>
      </div>
    );
  }
}


export default Sidebar;
