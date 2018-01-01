import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getMode, getColor, getIsGridVisible, getBrickDimensions } from 'selectors';
import { setMode, setColor, toggleGrid } from 'actions';
import Scene from 'components/engine/Scene';
import Topbar from 'components/Topbar';
import Help from 'components/Help';

import styles from 'styles/containers/builder';


class Builder extends React.Component {
  componentDidMount() {
  }

  render() {
    const { mode, setMode, color, setColor, gridVisible, toggleGrid, dimensions } = this.props;
    return (
      <div className={styles.builder}>
        <Scene brickColor={color} mode={mode} grid={gridVisible} dimensions={dimensions} />
        <Topbar
          onClickSetMode={setMode}
          onClickSetColor={setColor}
          onClickToggleGrid={toggleGrid}
          mode={mode}
          color={color}
          grid={gridVisible}
          brickSize={dimensions} />
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
});


const mapDispatchToProps = {
  setMode,
  setColor,
  toggleGrid,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Builder);
