import React from 'react';

import styles from 'styles/components/message';


const Message = ({ text, children }) => {
  return (
    <div className={styles.message}>
      {children}
    </div>
  );
}


export default Message;
