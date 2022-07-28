import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Header.module.css';
import logoPic from '../../static/logo.png';
import UserPowerManage from '../UserPowerManage/index.tsx';
import goBackIcon from '../../static/curved-arrow-right.png';

export default function Header(props) {
  const { upmStatus, goHomeBtnStatus } = props; 
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/profile');
  }
  return (
    <div className={styles.headerWrap}>
      <div className={styles.content}>
        <img className={styles.logoImage} src={logoPic} alt="logo" onClick={() => {
          goHome()
        }} />
        <div className={styles.headeLeft}>
          { upmStatus && <UserPowerManage/> } 
          {
            goHomeBtnStatus ? (
              <div className={styles.goHomeBtn} onClick={() => {
                goHome()
              }}>
                <div className={styles.goBackIcon}>
                  <img src={goBackIcon} alt="goBackIcon" />
                </div>
                <div className={styles.goBackContent}>返回主页</div>
              </div>
            ) : ''
          }
        </div>
      </div>
    </div>
  )
}
