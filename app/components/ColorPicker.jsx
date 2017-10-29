import React from 'react';
import { GithubPicker } from 'react-color';

import { SimpleBrick } from 'components/Icons';

import styles from 'styles/components/color-picker';


class ColorPicker extends React.Component {
  state = {
    background: '#fff',
  }

  constructor(props) {
    super(props);
    this._handleChangeColor = this._handleChangeColor.bind(this);
  }

  _handleChangeColor(color) {
    this.setState({
      background: color.hex,
    });
  }

  render() {
    const { background } = this.state;
    return (
      <div className={styles.colorPicker}>
        <div className={styles.brick}>
          <SimpleBrick />
        </div>
        <div className={styles.picker}>
          <GithubPicker
            color={background}
            onChangeComplete={this._handleChangeColor}
          />
        </div>
      </div>
    );
  }
}


export default ColorPicker;
