import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getMode } from 'selectors';
import { setMode } from 'actions';
import Scene from 'components/engine/Scene';
import Sidebar from 'components/Sidebar';

import styles from 'styles/containers/builder';


class Builder extends React.Component {
  componentDidMount() {
  }

  render() {
    const { mode, setMode } = this.props;
    return (
      <div className={styles.builder}>
        <Scene />
        <Sidebar
          onClickSetMode={setMode}
          mode={mode} />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  mode: getMode(state),
});


const mapDispatchToProps = {
  setMode,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Builder);
