import React, { useState } from 'react';
import { Button } from "antd";
import styles from './index.module.css';
import Modal from '../Modal/index.tsx';
import tickPic from '../../static/tick.png';
import nullImg from '../../static/null_img.png'

export default function Index(props) {
  const { headerPicArr, isModalVisible, handleOk } = props;
  const [headerPicIndex, setHeaderPicIndex] = useState(null);
  const handleHeaderPicClick = (index) => {
    setHeaderPicIndex(index);
  };
  return (
    <>
      <Modal visible={isModalVisible} title='Please select a portrait' onClose={() => {
        handleOk(headerPicIndex);
      }}>
        <div className={styles.headerPicWrap}>
          {
            headerPicArr.length > 0 && headerPicArr.map((item, index) => {
              return (
                <div key={index} className={styles.headerPicItem} onClick={() => {
                  handleHeaderPicClick(index);
                }}>
                  <img className={styles.headerPicImg} layout="fill" src={`${item.img}`} alt='headerPic' />
                  {
                    index === headerPicIndex && <div className={styles.tickWrap}>
                      <img src={tickPic} alt='tickPic'/>
                    </div>
                  }
                </div> 
              )
            })
          }
          {
            headerPicArr.length === 0 && (
              <div className={styles.headerPicItem}>
                <img className={styles.headerPicImg} layout="fill" src={nullImg} alt='headerPic' />
              </div>  
            )
          }
        </div>
        <div className={styles.modalBottom}>
          <div className='button'>
            <Button size='large' type="primary" shape="round" block onClick={() => {
              handleOk(headerPicIndex);
            }}>
              Ok
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
