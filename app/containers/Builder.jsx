import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getMode, getColor } from 'selectors';
import { setMode, setColor } from 'actions';
import Scene from 'components/engine/Scene';
import Sidebar from 'components/Sidebar';

import styles from 'styles/containers/builder';


class Builder extends React.Component {
  componentDidMount() {
  }

  render() {
    const { mode, setMode, color, setColor } = this.props;
    return (
      <div className={styles.builder}>
        <Scene />
        <Sidebar
          onClickSetMode={setMode}
          onClickSetColor={setColor}
          mode={mode}
          color={color} />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  mode: getMode(state),
  color: getColor(state),
});


const mapDispatchToProps = {
  setMode,
  setColor,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Builder);
