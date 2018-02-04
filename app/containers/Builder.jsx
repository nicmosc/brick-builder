import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getMode, getColor, getIsGridVisible, getBrickDimensions, getAreUtilsOpen, getBricks } from 'selectors';
import { setMode, setColor, toggleGrid, setBrick, toggleUtils, addBrick, removeBrick, updateBrick, resetScene } from 'actions';
import Scene from 'components/engine/Scene';
import Topbar from 'components/Topbar';
import Help from 'components/Help';
import Sidebar from 'components/Sidebar';

import styles from 'styles/containers/builder';


class Builder extends React.Component {
  render() {
    const {
      mode,
      setMode,
      color,
      setColor,
      gridVisible,
      toggleGrid,
      dimensions,
      setBrick,
      utilsOpen,
      toggleUtils,
      removeBrick,
      addBrick,
      bricks,
      updateBrick,
      resetScene,
    } = this.props;
    return (
      <div className={styles.builder}>
        <Topbar
          onClickSetMode={setMode}
          onClickSetColor={setColor}
          onClickToggleGrid={toggleGrid}
          mode={mode}
          color={color}
          grid={gridVisible}
          brickSize={dimensions}
          onClickSetBrick={setBrick}
          utilsOpen={utilsOpen}
          onClickToggleUtils={toggleUtils}>
          <Sidebar utilsOpen={utilsOpen} resetScene={resetScene} />
        </Topbar>
        <Scene
          brickColor={color}
          objects={bricks}
          mode={mode}
          grid={gridVisible}
          dimensions={dimensions}
          shifted={utilsOpen}
          removeObject={removeBrick}
          addObject={addBrick}
          updateObject={updateBrick} />
        <Help />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  mode: getMode(state),
  color: getColor(state),
  gridVisible: getIsGridVisible(state),
  dimensions: getBrickDimensions(state),
  utilsOpen: getAreUtilsOpen(state),
  bricks: getBricks(state),
});


const mapDispatchToProps = {
  setMode,
  setColor,
  toggleGrid,
  setBrick,
  toggleUtils,
  removeBrick,
  addBrick,
  updateBrick,
  resetScene,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Builder);
