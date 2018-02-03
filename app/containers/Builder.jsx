import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getMode, getColor, getIsGridVisible, getBrickDimensions, getAreUtilsOpen } from 'selectors';
import { setMode, setColor, toggleGrid, setBrick, toggleUtils } from 'actions';
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
          <Sidebar utilsOpen={utilsOpen} />
        </Topbar>
        <Scene brickColor={color} mode={mode} grid={gridVisible} dimensions={dimensions} />
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
});


const mapDispatchToProps = {
  setMode,
  setColor,
  toggleGrid,
  setBrick,
  toggleUtils,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Builder);
