import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import SelectedHead from '../SeleteHead';
import SelectedTag from '../SelectedTag';
import Modal from '../Modal/index.tsx';
import QuestionAndAnswer from "../QuestionAndAnswer/index.tsx";
import { getTokenList, checkoutNickName, upDateUsers, upDateQuestion } from '../../api/user';
import { getCurAddress } from '../../utils/tool';

import upmBtnPic from '../../static/upm-btn.png';
import logoutPic from '../../static/logout.png';
import questionPic from '../../static/question.png';
import userProfilePic from '../../static/user-profile.png';

import styles from './index.module.css';
import twitterPic from '@/static/twitter.png';
import telegramPic from '@/static/telegram.png';
import instagramPic from '@/static/instagram.png';
import defaultUserPic from '@/static/default_user.png';
export default function Index() {
  let qaList = {};
  const walletAddress = getCurAddress();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [menuListStatus, setMenuListStatus] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isQAModalVisible, setIsQAModalVisible] = useState(false);
  const [userPicIndex, setUserPicIndex] = useState(null);
  const [formdata, setFormdata] = useState({});
  const [headerPicArr, setHeaderPicArr] = useState([])
  const menuList = useRef();
  const { TextArea } = Input;
  const handleHeadImgChange = (imgIndex) => {
    setIsModalVisible(false);
    if (imgIndex != null) {
      setUserPicIndex(imgIndex);
      setFormdata({...formdata, ...{ avatar:  headerPicArr[imgIndex].img}});
    }
  };
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
  const showModal = () => {
    setIsModalVisible(true);
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
            <Row className={styles.userIamgeLine}>
              <Col span={5} className={styles.userImage}>
                <div className={styles.userImageWarp}>
                  <img className={styles.userImgContent} src={userPicIndex === null ? defaultUserPic : headerPicArr[userPicIndex].img} alt={'defaultUserPic'}/>
                </div>
              </Col>
              <Col span={19} className={styles.userImageUploadBtn}>
                <Button type="primary" ghost size='large' shape='round' onClick={() => {
                  showModal();
                }}>
                  修改头像
                </Button>
              </Col>
            </Row>
            <Form
              name="useInfo"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              autoComplete="off"
              labelAlign="left"
              size="large"
            >
              <Form.Item
                label="name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      checkoutNickName(value).then((res) => {
                        if(res.success === true) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(new Error('nickname duplicate!'));
                        }
                      }); 
                    }
                  })
                ]}
              >
                <Input placeholder='Enter your name' onChange={(event) => {
                  setFormdata({...formdata, ...{ nickname: event.target.value }});
                }} />
              </Form.Item>
              <Form.Item
                label="tag"
                name="tag"
              >
                {/* 选择tag */}
                <div style={{height: '40.1px'}}>
                  <SelectedTag onTagChange={(tagsVal) => {
                    setFormdata({...formdata, ...{ tags: tagsVal }});
                  }}/>
                </div>
              </Form.Item>
              <Form.Item
                label="about me"
                name="about me"
              >
                <TextArea placeholder="Enter your Info" autoSize={{ minRows: 4, maxRows: 4 }} onChange={(event) => {
                  setFormdata({...formdata, ...{ brief: event.target.value }});
                }} />
              </Form.Item>
              <Form.Item
                label="Instagram"
                name="Instagram"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Instagram!',
                  }
                ]}
              >
                <Input placeholder="Enter your Instagram id" onChange={(event) => {
                  setFormdata({...formdata, ...{ instagramId: event.target.value }});
                }} suffix={<img src={instagramPic} alt="instagramPic"/>}/>
              </Form.Item>
              <Form.Item
                label="Twitter"
                name="Twitter"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Twitter!',
                  }
                ]}
              >
                <Input placeholder="Enter your Twitter id" onChange={(event) => {
                  setFormdata({...formdata, ...{ twitterId: event.target.value }});
                }} suffix={<img src={twitterPic} alt="twitterPic"/>}/>
              </Form.Item>
              <Form.Item
                label="Telegram"
                name="Telegram"
                rules={[
                  {
                    required: true,
                    message: 'Please input your telegram!',
                  }
                ]}
              >
                <Input placeholder="Enter your telegram id" onChange={(event) => {
                  setFormdata({...formdata, ...{ telegramId: event.target.value }});
                }} suffix={<img src={telegramPic} alt="telegramPic"/>} />
              </Form.Item>
              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },{
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  }
                ]}
              >
                <Input placeholder="Enter your Email" onChange={(event) => {
                  setFormdata({...formdata, ...{ email: event.target.value }});
                }} suffix={<img src={telegramPic} alt="email"/>} />
              </Form.Item>
            </Form>
          </div>
        </div>
        {/* 选择头像 */}
        <SelectedHead headerPicArr={headerPicArr} isModalVisible={isModalVisible} handleOk={handleHeadImgChange}/>
      </Modal>
      <Modal visible={isQAModalVisible} title='编辑 Q&A' onOk={() => {
        handleQAModalOk();
      }}>
        <div className={styles.aqModalContentWarp}>
          <QuestionAndAnswer isShowDoneBtn={false} callBackFun={(obj) => {
            qaList = { 'qa': obj };
          }}/>
        </div>
      </Modal>
    </>
  )
}
