import React, { useState } from 'react';
import { Input } from 'antd';

import style from './index.module.css';
import deleteBtnPic from '../../static/delete-btn.png'
import addBtnPic from '../../static/add-btn.png'

export default function Index(props) {
  const { onNext, isShowDoneBtn } = props;
  const { TextArea } = Input;
  const [questionList, setQuestionList] = useState([{
    question:'',
    answer:''
  }]);
  const deleteQuestion = (index) => {
    questionList.splice(index,1);
    setQuestionList([...questionList]);
  }
  const addQuestion = () => {
    questionList.push({
      question:'',
      answer:''
    })
    setQuestionList([...questionList]);
  }
  return (
    <>
      <div className={style.wrap}>
        {
          questionList.map((item, index) => {
            return (
              <div key={index} className={style.qaItem}>
                <div className={style.deletBtn} onClick={() => {
                  deleteQuestion();
                }}>
                  <img src={deleteBtnPic} alt='deleteBtnPic'/>
                </div>
                <div className={style.title}>
                  question {index + 1}
                </div>
                <Input style={{marginBottom: '24px',}} onChange={(event) => {
                  item.question = event.target.value;
                }}/>
                <div className={style.title}>
                  answer
                </div>
                <TextArea placeholder="Enter your Answer" autoSize={{ minRows: 4, maxRows: 4 }} onChange={(event) => {
                  item.answer = event.target.value;
                }} />
              </div>
            )
          })
        }
        <div className={style.addQuestion} onClick={() => {
            addQuestion()
          }}>
          <div className={style.addBtnPic}>
            <img src={addBtnPic} alt='addBtnPic'/>
          </div>
          <span className={style.addContent}>add</span>
        </div>
        
        {
          isShowDoneBtn === false ? "" : (
            <div className={'button'} onClick={() => {
              onNext(questionList);
            }}>Done</div>
          )
        }
      </div>
    </>
  )
}
