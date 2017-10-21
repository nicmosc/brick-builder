import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Scene from 'components/engine/Scene';


class Builder extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Scene />
        <h1 style={{position: 'absolute', top: 0, left: 0}}>UI</h1>
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
