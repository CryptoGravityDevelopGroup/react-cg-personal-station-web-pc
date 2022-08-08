import React, { useEffect, useState, useRef } from 'react';

import Modal from '../Modal/index.tsx';
import QuestionAndAnswer from "../QuestionAndAnswer/index.tsx";
import { getTokenList, upDateUsers, upDateQuestion, getUsersInfo } from '../../api/user';
import { getCurAddress } from '../../utils/tool';
import Profile from "../../components/Profile/index.tsx";

import upmBtnPic from '../../static/upm-btn.png';
import logoutPic from '../../static/logout.png';
import questionPic from '../../static/question.png';
import userProfilePic from '../../static/user-profile.png';

import styles from './index.module.css';
export default function Index() {
  let qaList = {};
  const walletAddress = getCurAddress();
  const [menuListStatus, setMenuListStatus] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isQAModalVisible, setIsQAModalVisible] = useState(false);
  const [formdata, setFormdata] = useState({
    tags:[],
    qa:[]
  });
  const [initFormData, setInitFormData] = useState({
    tags:[],
    qa:[]
  });
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
    formdata.ethAddress = walletAddress;
    formdata.tags = JSON.stringify(formdata.tags);
    upDateUsers({...formdata}).then((res) => {
      console.log('====', res);
    })
    setIsProfileModalVisible(false);
  }
  const handleQAModalOk = () =>{
    qaList.ethAddress = walletAddress;
    qaList.qa = JSON.stringify(qaList.qa);
    upDateQuestion({...qaList}).then((res) => {
      console.log('====', res);
    })
    setIsQAModalVisible(false);
  };
  useEffect(() => {
    // 获取 NFT
    getTokenList({
      "ethAddress": walletAddress,
      "tokenType":"nft"
    }).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        const temp = response.data.token.map(item => {
          return {
            img: item.logo
          }
        });
        setHeaderPicArr(temp);
      }
    });
    // 获取个人信息
    getUsersInfo({walletAddress: walletAddress, nickName: ''}).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        response.data.qa = JSON.parse(response.data.qa);
        response.data.tags = JSON.parse(response.data.tags);
        console.log('initFormData', initFormData);
        setInitFormData(JSON.parse(JSON.stringify(response.data)))
        setFormdata(response.data);
      }
    })
  }, []);
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
        <div className={styles.useInfoForm}>
          <div className={styles.content}>
            <Profile initFormData={initFormData} profileDataChange={(obj) => {
              // userInfo = { ...obj };
              setFormdata({ ...obj });
            }}/>
          </div>
        </div>
      </Modal>
      <Modal visible={isQAModalVisible} title='编辑 Q&A' onOk={() => {
        handleQAModalOk();
      }}>
        <div className={styles.aqModalContentWarp}>
          <QuestionAndAnswer initQaList={initFormData.qa} isShowDoneBtn={false} callBackFun={(obj) => {
            qaList = { 'qa': obj };
          }}/>
        </div>
      </Modal>
    </>
  )
}
