import React, { useEffect, useState, useRef } from 'react';
import { Button } from "antd";
import Modal from '../Modal/index.tsx';
import QuestionAndAnswer from "../QuestionAndAnswer/index.tsx";
import { getTokenList, upDateUsers, upDateQuestion, getUsersInfo } from '../../api/user';
import { getCurAddress, logout } from '../../utils/tool';
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
    formdata.qa = JSON.stringify(formdata.qa);
    upDateUsers({...formdata}).then((res) => {
      console.log('====', res);
      window.location.reload();
    })
    setIsProfileModalVisible(false);
  }
  const handleQAModalOk = () =>{
    qaList.ethAddress = walletAddress;
    qaList.qa = JSON.stringify(qaList.qa);
    upDateQuestion({...qaList}).then((res) => {
      console.log('====', res);
      window.location.reload();
    })
    setIsQAModalVisible(false);
  };
  const handleLogout = () => {
    logout();
  }
  useEffect(() => {
    if(!walletAddress) return;
    // 获取 NFT
    getTokenList({
      "ethAddress": walletAddress,
      "tokenType":"nft"
    }).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        const temp = response.data.map(item => {
          return {
            img: item.logo
          }
        });
        // setInitFormData({...initFormData, })
      }
    });
    // 获取个人信息
    getUsersInfo({walletAddress: walletAddress, nickName: ''}).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        response.data.qa = response.data.qa.length > 0 ? JSON.parse(response.data.qa) : [];
        response.data.tags = response.data.tags.length > 0 ? JSON.parse(response.data.tags) : [];
        setInitFormData(JSON.parse(JSON.stringify(response.data)))
        setFormdata(response.data);
      }
    })
  }, [walletAddress]);
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
              <span className={styles.itemName}>Edit profile</span>
            </div>
            <div className={styles.menuItem} onClick={() => {
              editQA();
            }}>
              <div className={styles.itemIcon}>
                <img src={questionPic}  alt="questionPic"/>
              </div>
              <span className={styles.itemName}>Edit Q&A</span>
            </div>
            <div className={styles.menuItem} onClick={() => {
              handleLogout();
            }}>
              <div className={styles.itemIcon}>
                <img src={logoutPic}  alt="logoutPic"/>
              </div>
              <span className={styles.itemName}>Quit</span>
            </div>
          </div>
        }
      </div>
      <Modal visible={isProfileModalVisible} title='Edit profile' onClose={() => {
        setIsProfileModalVisible(false);
      }}>
        <div className={styles.useInfoForm}>
          <div className={styles.content}>
            <Profile
            initFormData={initFormData}
            profileDataChange={(obj) => {
              console.log(obj);
              setFormdata({ ...formdata ,...obj });
            }}
            onFinishCallBack={() => {
              handleProfileModalOk();
            }}
            onFinishFailedCallBack={() => {

            }}
            >
              <div className={styles.fromBottom}>
                <div className='button'>
                  <Button type="primary" shape="round" block htmlType='submit'>
                    Ok
                  </Button>
                </div>
              </div>
            </Profile>
          </div>
        </div>
      </Modal>
      <Modal visible={isQAModalVisible} title='Edit Q&A' onClose={() => {
        setIsQAModalVisible(false);
      }}>
        <div className={styles.aqModalContentWarp}>
          <QuestionAndAnswer initQaList={initFormData.qa} isShowDoneBtn={false} callBackFun={(obj) => {
            qaList = { 'qa': obj };
          }}/>
          <div className={styles.fromBottom}>
          <div className='button'>
              <Button size='large' type="primary" shape="round" block htmlType='submit' onClick={() => {
                handleQAModalOk();
              }}>
                Ok
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
