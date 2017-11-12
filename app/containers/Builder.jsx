import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getMode, getColor, getIsGridVisible } from 'selectors';
import { setMode, setColor, toggleGrid } from 'actions';
import Scene from 'components/engine/Scene';
import Sidebar from 'components/Sidebar';
import Help from 'components/Help';

import styles from 'styles/containers/builder';


class Builder extends React.Component {
  componentDidMount() {
  }

  render() {
    const { mode, setMode, color, setColor, gridVisible, toggleGrid } = this.props;
    return (
      <div className={styles.builder}>
        <Scene brickColor={color} mode={mode} grid={gridVisible} />
        <Sidebar
          onClickSetMode={setMode}
          onClickSetColor={setColor}
          onClickToggleGrid={toggleGrid}
          mode={mode}
          color={color}
          grid={gridVisible} />
        <Help />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  mode: getMode(state),
  color: getColor(state),
  gridVisible: getIsGridVisible(state),
});


const mapDispatchToProps = {
  setMode,
  setColor,
  toggleGrid,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Builder);
