import React from 'react';
import autobind from 'autobind-decorator';

import styles from '../styles/components/file-uploader';


class FileUploader extends React.Component {
  state = {}

  render() {
    const { children } = this.props;
    return (
      <div className={styles.wrapper}>
        <input key="input" className={styles.input} type="file" onChange={(e) => this._handleImageChange(e)} />
        {children}
      </div>
    );
  }

  _handleImageChange(e) {

  }
}


export default FileUploader;
