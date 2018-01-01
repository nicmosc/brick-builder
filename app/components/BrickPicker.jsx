import React from 'react';

import { displayNameFromDimensions } from 'utils';
import { bricks } from 'utils/constants';

import styles from 'styles/components/brick-picker';


class BrickPicker extends React.Component {
  state = {

  }

  render() {
    const { selectedSize, handleSetBrick } = this.props;
    return (
      <div className={styles.brickPicker}>
        <div className={styles.brick}>
          {displayNameFromDimensions(selectedSize)}
        </div>
        <div className={styles.picker}>
          {bricks.map((b, i) => (
            <div key={i} className={styles.brickExample} onClick={() => handleSetBrick(b)}>
              {displayNameFromDimensions(b)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}


export default BrickPicker;
