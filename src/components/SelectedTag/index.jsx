import React, { useEffect, useRef, useState } from 'react';

import Modal from '../Modal/index.tsx';
import styles from './index.module.css';
import addTagPic from '../../static/add-tag.png';
import deleteTagPic from '../../static/delete-tag.png';
export default function Index(props) {
  const { onTagChange } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTagList, setNewTagList] = useState([]);
  const tagInputRed = useRef();
  const recommendTagList = ['canarylarruped','sketchburkitt','drearilyscone','sticksmeat','snoopplow','platinumoffice','pinslunch','pointersnutmeg','blockedlunation'];
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
      <Modal visible={isModalVisible} title='tag' onOk={() => {
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
                newTagList.length < 3 && <input ref={tagInputRed} className={styles.addTagInput} type="text" placeholder='多个标签请用回车分隔' onKeyUp={(e) => {
                  handleInputKeyUp(e.keyCode);
                }} />
              }
            </div>
            <div className={styles.newTagNum}>
              <span>{newTagList.length} / 3</span>
            </div>
            <div className={styles.line}></div>
            <div className={styles.tagRecommendWrap}>
              <div className={styles.tagsTitle}>推荐</div>
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
      </Modal>
    </>
  )
}
