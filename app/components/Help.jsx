import React from 'react';
import  { Portal } from 'react-portal';


import styles from 'styles/components/help';


class Help extends React.Component {
  state = {
    open: true,
  }

  constructor(props) {
    super(props);
    this._toggleHelp = this._toggleHelp.bind(this);
    this._handleClickEscape = this._handleClickEscape.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleClickEscape, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleClickEscape, false);
  }

  render() {
    const { open } = this.state;
    return (
      <div className={styles.help}>
        <div className={styles.text} onClick={this._toggleHelp}>
          <i className="ion-information-circled" />
          <span>Help</span>
        </div>
        <Portal>
          <div className={open ? styles.modalWrapper : styles.closedModal}>
            <div className={styles.modal}>
              <div className={styles.close} onClick={this._toggleHelp}>
                <i className="ion-close" />
              </div>
              <h1 style={{ textAlign: 'center' }}>
                Brick Builder
              </h1>
              <h3>What is this?</h3>
              <p>Brick Builder is a simple web app to create brick objects (heavily inspired by Lego in fact). You can also import and export models from the side menu!</p>
              <h2 style={{ textAlign: 'center' }}>
                Available commands
              </h2>
            </div>
          </div>
        </Portal>
      </div>
    );
  }

  _toggleHelp() {
    this.setState({
      open: ! this.state.open,
    });
  }

  _handleClickEscape(e) {
    if (e.keyCode === 27) {
      this.setState({
        open: false,
      });
    }
  }
};


export default Help;
