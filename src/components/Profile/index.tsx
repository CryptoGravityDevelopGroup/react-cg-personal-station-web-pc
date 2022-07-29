import React, { useState,useEffect } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import SelectedHead from '../SeleteHead';
import SelectedTag from '../SelectedTag';
// import { getUserInfo } from '../../api/user';

import "antd/dist/antd.css";
import styles from './index.module.css';

import twitterPic from '@/static/twitter.png';
import telegramPic from '@/static/telegram.png';
import instagramPic from '@/static/instagram.png';
import defaultUserPic from '@/static/default_user.png';

export default function Index(props) {
  const { onNext } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userPicIndex, setUserPicIndex] = useState(null);
  const [formdata, setFormdata] = useState({});
  const [headerPicArr] = useState([])
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
    // getUserInfo({
    //   "ethAddress":"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    //   "tokenType":"nft"
    // }).then((res) => {
    //   const response = res.data;
    //   if(response.code === 0) {
    //     const temp = response.data.token.map(item => {
    //       return {
    //         img: item.logo
    //       }
    //     });
    //     setHeaderPicArr(temp);
    //   }
    // });
  }, []);
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
            >
              <Input placeholder='Enter your name' onChange={ (event) => {
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
            <Form.Item
              label="Email"
              name="Email"
            >
              <Input placeholder="Enter your Email" onChange={(event) => {
                setFormdata({...formdata, ...{ email: event.target.value }});
              }} suffix={<img src={telegramPic} alt="email"/>} />
            </Form.Item>
          </Form>
          <div className={styles.fromBottom}>
            <div className={'button'} onClick={() => {
              console.log('formdata', formdata);
              onNext(formdata);
            }}>Next</div>
          </div>
        </div>
      </div>
      {/* 选择头像 */}
      <SelectedHead headerPicArr={headerPicArr} isModalVisible={isModalVisible} handleOk={handleHeadImgChange}/>
    </>
  )
}
