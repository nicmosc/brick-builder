import React from 'react';
import { GithubPicker } from 'react-color';

import { SimpleBrick } from 'components/Icons';
import { colors } from 'utils/constants';

import styles from 'styles/components/color-picker';


class ColorPicker extends React.Component {
  state = {
    open: false,
  }

  constructor(props) {
    super(props);
    this._handleChangeColor = this._handleChangeColor.bind(this);
    this._togglePicker = this._togglePicker.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }

  componentDidMount() {
    const { background } = this.props;
    document.addEventListener('mousedown', this._handleClickOutside);
    this.setState({
      background,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside);
  }

  _handleChangeColor(color) {
    const { handleSetColor } = this.props;
    handleSetColor(color.hex);
    this._togglePicker();
  }

  _handleClickOutside() {
    const { background } = this.props;
    if (this.picker && !this.picker.contains(event.target)) {
      this.setState({
        open: false,
        background,
      });
    }
  }

  _togglePicker() {
    const { background } = this.props;
    this.setState({
      open: !this.state.open,
      background,
    });
  }

  render() {
    const { background, open } = this.state;
    return (
      <div className={styles.colorPicker}>
        <div className={styles.brick} onClick={this._togglePicker}>
          <SimpleBrick color={background} />
        </div>
        <div className={open ? styles.visible : styles.picker} ref={(picker) => this.picker = picker}>
          <GithubPicker
            color={background}
            colors={colors}
            onChangeComplete={this._handleChangeColor}
            onSwatchHover={(color) => this.setState({ background: color.hex })}
          />
        </div>
      </div>
    );
  }
}


export default ColorPicker;
