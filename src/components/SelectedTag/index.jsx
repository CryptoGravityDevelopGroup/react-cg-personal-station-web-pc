import React, { useEffect, useRef, useState } from 'react';
import { Button } from "antd";
import Modal from '../Modal/index.tsx';
import styles from './index.module.css';
import addTagPic from '../../static/add-tag.png';
import deleteTagPic from '../../static/delete-tag.png';
export default function Index(props) {
  const { onTagChange, initTagList } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTagList, setNewTagList] = useState([...initTagList]);
  const tagInputRed = useRef();
  const recommendTagList = ['Investor', 'NFT collector', 'Web 3.0 investor', 'DAO founder', 'entrepreneur', 'leek', 'lost 100 million', 'crypto practitioner', 'all in Web 3.0', 'Front-end Engineer', 'Community Manager'];
  const addNewTag = (value) => {
    if(newTagList.length + 1 <= 3) {
      newTagList.push(value);
      setNewTagList([...newTagList]);
    }
  }
  const handleInputKeyUp = (keyCode) => {
    if(tagInputRed) {
      let inputVal = tagInputRed.current.value;
      if(keyCode === 13 && inputVal.length > 0) { // 回车
        addNewTag(inputVal);
        tagInputRed.current.value = null;
      }
    }
  }
  const handleTagDelete = (tagIndex) => {
    newTagList.splice(tagIndex, 1);
    setNewTagList([...newTagList]);
  }
  useEffect(() => {
    onTagChange(newTagList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[newTagList])
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.tagContent}>
          {
            newTagList && newTagList.map((item, index) => {
              return (
                <div key={index} className={styles.tagItem}>
                  {item}
                </div>
              )
            })
          }
        </div>
        <img className={styles.addTagBtn} src={addTagPic} alt='tagAddPic' onClick={() => {
          setIsModalVisible(true);
        }} />
      </div>
      <Modal visible={isModalVisible} title='Tag' onClose={() => {
        setIsModalVisible(false);
      }}>
        <div className={ styles.modalContent }>
          <div className={ styles.tagAreaWrap }>
            <div className={ styles.tagAreaInputArea} onClick={() => {
              tagInputRed.current && tagInputRed.current.focus();
            }}>
              {
                newTagList.map((item, index) => {
                  return (
                    <div className={ styles.newTagItem } key={index}>
                      {item} <img className={styles.deleteTagBtn} src={deleteTagPic} alt="deleteTagPic" onClick={() => {
                        handleTagDelete(index);
                      }}/>
                    </div>
                  )
                })
              }
              {
                newTagList.length < 3 && <input ref={tagInputRed} className={styles.addTagInput} type="text" placeholder='Separate multiple tags with carriage returns' onKeyUp={(e) => {
                  handleInputKeyUp(e.keyCode);
                }} />
              }
            </div>
            <div className={styles.newTagNum}>
              <span>{newTagList.length} / 3</span>
            </div>
            <div className={styles.line}></div>
            <div className={styles.overLenTips}>{
              newTagList.length === 3 && 'Up to 3 tags can be entered'
            }</div>
            <div className={styles.tagRecommendWrap}>
              <div className={styles.tagsTitle}>recommend</div>
              <div className={styles.tagsContent}>
                {
                  recommendTagList.map((item, index) => {
                    return (
                      <div className={styles.tagRecommendItem} key={index} onClick={() => {
                        addNewTag(item);
                      }}>{item}</div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <div className={styles.modalBottom}>
          <div className='button'>
            <Button size='large' type="primary" shape="round" block onClick={() => {
              setIsModalVisible(false);
            }}>
              Ok
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
