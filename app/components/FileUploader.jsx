import React from 'react';
import autobind from 'autobind-decorator';

import styles from '../styles/components/file-uploader';


class FileUploader extends React.Component {
  state = {}

  render() {
    const { children } = this.props;
    return (
      <div className={styles.wrapper}>
        <input key="input" className={styles.input} type="file" onChange={(e) => this._handleFileChange(e)} />
        {children}
      </div>
    );
  }

  @autobind
  _handleFileChange(e) {
    e.preventDefault();
    const { onFinish } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      const uri = reader.result;
      const decoded = JSON.parse(uri);
      onFinish(decoded);
      // this.setState({
      //   file: file,
      //   filePreviewUrl: reader.result,
      // });
    }
    reader.readAsText(file);
  }
}


export default FileUploader;
