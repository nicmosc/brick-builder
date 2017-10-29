import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Scene from 'components/engine/Scene';
import Sidebar from 'components/Sidebar';

import styles from 'styles/containers/builder';


class Builder extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.builder}>
        <Scene />
        <Sidebar />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
});


const mapDispatchToProps = {
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Builder);
