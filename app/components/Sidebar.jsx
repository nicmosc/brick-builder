import React from 'react';
import { saveAs } from 'file-saver';
import autobind from 'autobind-decorator';

import FileUploader from './FileUploader';

import styles from '../styles/components/sidebar';


class Sidebar extends React.Component {
  render() {
    const { utilsOpen, resetScene } = this.props;
    return (
      <div className={utilsOpen ? styles.visible : styles.sidebar}>
        <div className={styles.content}>
          <div className={styles.row} onClick={resetScene}>
            <div className={styles.text}>
              <i className="ion-trash-a" />
              <span>Reset scene</span>
            </div>
          </div>
          <div className={styles.row} onClick={this._exportFile}>
            <div className={styles.text}>
              <i className="ion-log-out" />
              <span>Export scene</span>
            </div>
          </div>
          <div className={styles.row}>
            <FileUploader>
              <div className={styles.text}>
                <i className="ion-log-in" />
                <span>Import scene</span>
              </div>
            </FileUploader>
          </div>
        </div>
      </div>
    );
  }

  @autobind
  _exportFile() {
    const { objects } = this.props;
    const fileName = 'scene.json';
    var fileToSave = new Blob([JSON.stringify(objects)], {
      type: 'application/json',
      name: fileName,
    });
    saveAs(fileToSave, fileName);
  }
}


export default Sidebar;
