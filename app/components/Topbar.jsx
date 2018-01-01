import React from 'react';

import Button from 'components/Button';
import ColorPicker from 'components/ColorPicker';
import BrickPicker from 'components/BrickPicker';

import styles from 'styles/components/topbar';


const Topbar = ({
  mode,
  onClickSetMode,
  color,
  onClickSetColor,
  grid,
  onClickToggleGrid,
  brickSize,
}) => {
  return (
    <div className={styles.topbar}>
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
        <ColorPicker background={color} handleSetColor={onClickSetColor} />
      </div>
      <div className={styles.section}>
        <div className={styles.title}>
          Brick
        </div>
        <BrickPicker selectedSize={brickSize} />
      </div>
      <div className={styles.section}>
        <div className={styles.title}>
          Scene
        </div>
        <Button
          active={grid}
          onClick={onClickToggleGrid}
          icon="grid"
          text="Grid" />
      </div>
    </div>
  );
}


export default Topbar;
