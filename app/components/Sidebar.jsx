import React from 'react';

import Button from 'components/Button';
import ColorPicker from 'components/ColorPicker';

import styles from 'styles/components/sidebar';


class Sidebar extends React.Component {
  render() {
    const { mode, onClickSetMode } = this.props;
    return (
      <div className={styles.sidebar}>
        <div className={styles.section}>
          <div className={styles.title}>
            Mode
          </div>
          <Button
            active={mode === 'build'}
            onClick={() => onClickSetMode('build')}
            icon="hammer"
            text="Build" />
          <Button
            active={mode === 'paint'}
            onClick={() => onClickSetMode('paint')}
            icon="paintbrush"
            text="Paint" />
        </div>
        <div className={styles.section}>
          <div className={styles.title}>
            Color
          </div>
          <ColorPicker />
        </div>
      </div>
    );
  }
}


export default Sidebar;
