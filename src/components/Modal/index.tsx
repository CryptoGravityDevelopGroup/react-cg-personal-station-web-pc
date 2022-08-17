import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from './index.module.css';
import closePic from '../../static/close.png';

export default function Index(props) {
  const { visible, children, onOk, title, onClose, modalBtn } = props;
  
  const handleOk = () => {
    onOk && onOk();
  };
  useEffect(() => {
    let bodyDOM = document.getElementsByTagName('body')[0];
    let modalList = document.getElementById('modalDialog');
    if(visible) {
      bodyDOM.style.overflow = 'hidden';
    }
    if(!visible && modalList === null) {
      bodyDOM.style.overflow = 'auto';
    }
  }, [visible])
  
  const modalTemplate =  (
    <>
      {
        visible && (
          <>
            <div className={styles.modalMask} onClick={() => {
              handleOk();
            }}></div>
            <div id="modalDialog" className={styles.modal}>
              <div className={styles.modalTitleWrap}>
                <span className={styles.title}>{title}</span>
                <img className={styles.modalClose} src={closePic} alt="close" onClick={() => {
                  onClose();
                }} />
              </div>
              <div className={styles.modalContent}>
                {children}
              </div>
              {/* <div className={styles.modalBottom}>
                <div className={'button'} onClick={() => {
                  handleOk();
                }}>Ok</div>
              </div> */}
            </div>
          </>
        )
      }
    </>
  )
  if (typeof window !== 'undefined') {
    return ReactDOM.createPortal(modalTemplate, document.getElementsByTagName('body')[0]);
  }
}
