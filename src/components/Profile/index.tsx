import React, { useState,useEffect } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import SelectedHead from '../SeleteHead';
import SelectedTag from '../SelectedTag';
import { getNFTList, checkoutNickName } from '../../api/user';
import { getCurAddress } from '../../utils/tool';

import "antd/dist/antd.css";
import styles from './index.module.css';

import twitterPic from '@/static/twitter.png';
import telegramPic from '@/static/telegram.png';
import instagramPic from '@/static/instagram.png';
import defaultUserPic from '@/static/default_user.png';

export default function Index(props) {
  const { profileDataChange, initFormData } = props;
  console.log('-----', initFormData);
  const walletAddress = getCurAddress();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userPicIndex, setUserPicIndex] = useState(null);
  const [formdata, setFormdata] = useState({});
  const [headerPicArr, setHeaderPicArr] = useState([]);
  const [nftNameList, setNftNameList] = useState([]);
  const { TextArea } = Input;
  const handleHeadImgChange = (imgIndex) => {
    setIsModalVisible(false);
    if (imgIndex != null) {
      setUserPicIndex(imgIndex);
      setFormdata({...formdata, ...{ avatar:  headerPicArr[imgIndex].img}});
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    // 获取 NFT
    getNFTList({
      "ethAddress": walletAddress,
      "tokenType":"nft"
    }).then((res) => {
      const response = res.data;
      console.log('***', response.data);
      if(response.code === 0) {
        let tempNftName = [];
        const temp = response.data.token.map(item => {
          return {
            img: item.logo
          }
        });
        setHeaderPicArr(temp);
        response.data.token.forEach(item => {
          if(item.contractAddress === "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85") {
            tempNftName.push(item.name);
          }
        });
        setNftNameList(tempNftName);
      }
    });
  }, []);
  useEffect(() => {
    profileDataChange(formdata);
  }, [formdata])
  
  return (
    <>
      <div className={styles.wrap}>
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
                Modify Avatar
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
            initialValues={{
              name: initFormData.nickname,
              aboutMe: initFormData.brief,
              Instagram: initFormData.instagramId,
              Twitter: initFormData.twitterId,
              Telegram: initFormData.telegramId,
            }}
          >
            <Form.Item
              label="name"
              name="name"
              extra="If you have purchased an ens domain name, we recommend using an ens domain name."
              rules={[
                {
                  required: true,
                  message: 'Please enter your name',
                },{
                  validator: (_, value) => {
                    if(value.indexOf('.eth') !== -1){
                      if(nftNameList.includes(value) === false) {
                        return Promise.reject(new Error(`You havn't the domain name ${value}`));
                      }
                    }
                    if(value.indexOf('.') !== -1 && value.indexOf('.eth') === -1){
                      return Promise.reject(new Error(`"Nicknames in ${value} format cannot be used`));
                    }
                    return Promise.resolve();
                  }
                },{
                  validator: async (_, value, callback) => {
                    const res = await checkoutNickName(value);
                    console.log('checkName', res.data.success);
                    if(res.data.success) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(new Error('nickname duplicate!'));
                    }
                  }
                }
              ]}
            >
              <Input placeholder='Enter your name' onChange={(event) => {
                let value = event.target.value;
                setFormdata({...formdata, ...{ nickname: value }});
              }} />
            </Form.Item>
            <Form.Item
              label="tag"
              name="tag"
            >
              {/* 选择tag */}
              <div style={{height: '40.1px'}}>
                <SelectedTag initTagList={[...initFormData.tags]} onTagChange={(tagsVal) => {
                  setFormdata({...formdata, ...{ tags: tagsVal }});
                }}/>
              </div>
            </Form.Item>
            <Form.Item
              label="about me"
              name="aboutMe"
              rules={[
                
              ]}
            >
              <TextArea showCount maxLength={300} placeholder="Enter your Info" autoSize={{ minRows: 4, maxRows: 4 }} onChange={(event) => {
                setFormdata({...formdata, ...{ brief: event.target.value }});
              }} />
            </Form.Item>
            <Form.Item
              label="Instagram"
              name="Instagram"
            >
              <Input placeholder="Enter your Instagram id" onChange={(event) => {
                setFormdata({...formdata, ...{ instagramId: event.target.value }});
              }} suffix={<img src={instagramPic} alt="instagramPic"/>}/>
            </Form.Item>
            <Form.Item
              label="Twitter"
              name="Twitter"
            >
              <Input placeholder="Enter your Twitter id" onChange={(event) => {
                setFormdata({...formdata, ...{ twitterId: event.target.value }});
              }} suffix={<img src={twitterPic} alt="twitterPic"/>}/>
            </Form.Item>
            <Form.Item
              label="Telegram"
              name="Telegram"
            >
              <Input placeholder="Enter your telegram id" onChange={(event) => {
                setFormdata({...formdata, ...{ telegramId: event.target.value }});
              }} suffix={<img src={telegramPic} alt="telegramPic"/>} />
            </Form.Item>
            {/* <Form.Item
              label="Email"
              name="Email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                }
              ]}
            >
              <Input placeholder="Enter your Email" onChange={(event) => {
                setFormdata({...formdata, ...{ email: event.target.value }});
              }} suffix={<img src={telegramPic} alt="email"/>} />
            </Form.Item> */}
          </Form>
        </div>
      </div>
      {/* 选择头像 */}
      <SelectedHead headerPicArr={headerPicArr} isModalVisible={isModalVisible} handleOk={handleHeadImgChange}/>
    </>
  )
}
