import React, { useEffect, useState, useRef } from 'react';
import Modal from '../Modal/index.tsx';
import QuestionAndAnswer from "../QuestionAndAnswer/index.tsx";

import upmBtnPic from '../../static/upm-btn.png';
import logoutPic from '../../static/logout.png';
import questionPic from '../../static/question.png';
import userProfilePic from '../../static/user-profile.png';

import styles from './index.module.css';
export default function Index() {
  const [menuListStatus, setMenuListStatus] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isQAModalVisible, setIsQAModalVisible] = useState(false);
  const menuList = useRef();
  useEffect(() => {
    if(menuListStatus) {
      (document.getElementsByTagName('body')[0]).addEventListener('click', (event) => {
        const res = menuList.current.contains(event.target);
        if(!res) {
          setMenuListStatus(false);
        }
      })
    }
  }, [menuListStatus]);

  const editProfile = () => {
    setIsProfileModalVisible(true);
    setMenuListStatus(false);
  }

  const editQA = () => {
    setIsQAModalVisible(true);
    setMenuListStatus(false);
  }
  const handleProfileModalOk = () => {
    setIsProfileModalVisible(false);
  }
  const handleQAModalOk = () =>{
    setIsQAModalVisible(false);
  }
  return (
    <>
      <div className={styles.warp} ref={menuList}>
        <img src={upmBtnPic} alt="upmBtnPic" className={styles.upmBtnPicContent} onClick={() => {
          setMenuListStatus(!menuListStatus);
        }} />
        {
          menuListStatus && 
          <div className={styles.menuList}>
            <div className={styles.menuItem} onClick={() => {
              editProfile();
            }}>
              <div className={styles.itemIcon}>
                <img src={userProfilePic}  alt="userProfilePic"/>
              </div>
              <span className={styles.itemName}>编辑个人资料</span>
            </div>
            <div className={styles.menuItem} onClick={() => {
              editQA();
            }}>
              <div className={styles.itemIcon}>
                <img src={questionPic}  alt="questionPic"/>
              </div>
              <span className={styles.itemName}>编辑 Q&A</span>
            </div>
            <div className={styles.menuItem}>
              <div className={styles.itemIcon}>
                <img src={logoutPic}  alt="logoutPic"/>
              </div>
              <span className={styles.itemName}>退出</span>
            </div>
          </div>
        }
      </div>
      <Modal visible={isProfileModalVisible} title='编辑个人资料' onOk={() => {
        handleProfileModalOk();
      }}>
      </Modal>
      <Modal visible={isQAModalVisible} title='编辑 Q&A' onOk={() => {
        handleQAModalOk();
      }}>
        <div className={styles.aqModalContentWarp}>
          <QuestionAndAnswer isShowDoneBtn={false} />
        </div>
      </Modal>
    </>
  )
}
