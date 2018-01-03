import React from 'react';
import If from 'if-only';

import { displayNameFromDimensions, getBrickIconFromDimensions } from 'utils';
import { bricks } from 'utils/constants';

import styles from 'styles/components/brick-picker';


class BrickPicker extends React.Component {
  state = {
    open: false,
  }

  constructor(props) {
    super(props);
    this._togglePicker = this._togglePicker.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this._handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside);
  }

  render() {
    const { selectedSize, handleSetBrick } = this.props;
    const { open } = this.state;
    return (
      <div className={styles.brickPicker}>
        <div className={styles.brick} onClick={this._togglePicker}>
          <div className={styles.brickIcon}>
            {getBrickIconFromDimensions(selectedSize)}
          </div>
          {displayNameFromDimensions(selectedSize)}
        </div>
        <If cond={open}>
          <div className={styles.picker} ref={(picker) => this.picker = picker}>
            {bricks.map((b, i) => (
              <div key={i} className={styles.brickExample} onClick={() => handleSetBrick(b)}>
                {displayNameFromDimensions(b)}
              </div>
            ))}
          </div>
        </If>
      </div>
    );
  }

  _togglePicker() {
    this.setState({
      open: !this.state.open,
    });
  }

  _handleClickOutside() {
    if (this.picker && !this.picker.contains(event.target)) {
      this.setState({
        open: false,
      });
    }
  }
}


export default BrickPicker;
